/**
 * Google Sheets API Service - JSONP Version
 * 
 * Uses JSONP (script tag injection) to bypass CORS restrictions.
 * This works in sandboxed preview environments where fetch() is blocked.
 */

// Hardcode your Google Apps Script URL here for production
// Replace with your actual deployed URL
const PRODUCTION_API_URL = 'https://script.google.com/macros/s/AKfycbzCCJI8gdXl-ndEVqvsal2Tj-4z2S1HkJFdtYeQKhH6nmi5yhMxSozWray2CmoGBK6m/exec';

function getApiUrl(): string {
  // Use localStorage if set (for testing), otherwise use production URL
  return localStorage.getItem('hris_api_url') || PRODUCTION_API_URL;
}

function getBackendUrl(): string {
  // In Netlify, use /api routes (redirected to serverless functions via netlify.toml)
  // In development, use localhost backend
  if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
    return '/api';  // Netlify serverless functions
  }
  return localStorage.getItem('hris_backend_url') || 'http://localhost:3001/api';
}

export function isConnected(): boolean {
  const url = getApiUrl();
  return url !== '' && url.length > 10;
}

// JSONP callback counter
let jsonpCounter = 0;

/**
 * Make a JSONP request - bypasses CORS by using script tags
 */
function jsonpFetch(url: string, timeout = 30000): Promise<any> {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_callback_${++jsonpCounter}_${Date.now()}`;
    const script = document.createElement('script');
    
    // Add callback parameter to URL
    const separator = url.includes('?') ? '&' : '?';
    const jsonpUrl = `${url}${separator}callback=${callbackName}`;
    
    // Set up timeout
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('Request timeout'));
    }, timeout);
    
    // Define the callback function globally
    (window as any)[callbackName] = (data: any) => {
      clearTimeout(timeoutId);
      cleanup();
      resolve(data);
    };
    
    // Cleanup function
    const cleanup = () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete (window as any)[callbackName];
    };
    
    // Handle errors
    script.onerror = () => {
      clearTimeout(timeoutId);
      cleanup();
      reject(new Error('Script load failed'));
    };
    
    // Set the source and add to DOM
    script.src = jsonpUrl;
    script.async = true;
    document.head.appendChild(script);
  });
}

/**
 * Fetch data using JSONP
 */
async function fetchWithJsonp(action: string, params: Record<string, string> = {}): Promise<any> {
  const apiUrl = getApiUrl();
  
  if (!apiUrl) {
    throw new Error('No API URL configured');
  }

  // Build the URL
  const url = new URL(apiUrl);
  url.searchParams.set('action', action);
  url.searchParams.set('_t', Date.now().toString());
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const data = await jsonpFetch(url.toString());
  
  if (data && data.error) {
    throw new Error(data.error);
  }
  
  return data;
}

/**
 * Test the connection using JSONP
 */
export async function testConnection(): Promise<{ success: boolean; message: string; sheets?: string[] }> {
  const apiUrl = getApiUrl();
  
  if (!apiUrl) {
    return { success: false, message: 'No URL configured. Please paste your Web App URL.' };
  }

  try {
    const data = await fetchWithJsonp('getAllSheets');
    
    if (data && data.sheets) {
      return { 
        success: true, 
        message: `✅ Connected! Found ${data.count} sheet tabs.`,
        sheets: data.sheets 
      };
    } else {
      return { success: false, message: 'Connected but unexpected response format.' };
    }
  } catch (error: any) {
    return { 
      success: false, 
      message: `❌ ${error.message}\n\nTips:\n• Make sure "Who has access" = "Anyone" in Apps Script\n• Verify the URL works by opening it directly in a browser\n• The URL should end with /exec`
    };
  }
}

/**
 * Fetch data from a specific sheet using JSONP
 */
async function fetchSheetData(sheetName: string): Promise<any> {
  try {
    return await fetchWithJsonp('getSheet', { sheet: sheetName });
  } catch (error) {
    console.error(`Failed to fetch ${sheetName}:`, error);
    return null;
  }
}

/**
 * Make a POST request through the backend server (for write operations)
 */
async function postViaBackend(action: string, data: Record<string, any>): Promise<any> {
  const backendUrl = getBackendUrl();
  
  if (!backendUrl) {
    throw new Error('Backend URL not configured. Please set up the backend server.');
  }

  try {
    const response = await fetch(`${backendUrl}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result && result.error) {
      throw new Error(result.error);
    }
    
    return result;
  } catch (error: any) {
    console.error(`Backend POST failed for ${action}:`, error);
    throw error;
  }
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * POST request for write operations via Netlify proxy
 */
async function postToSheet(action: string, data: Record<string, any>): Promise<any> {
  // Use Netlify proxy for write operations to avoid CORS issues
  const proxyUrl = 'https://hotel-hris-proxy.netlify.app/.netlify/functions/proxy';
  
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...data }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('POST request failed:', error);
    throw error;
  }
}

export const GoogleSheetsAPI = {
  isConnected,
  getApiUrl,
  testConnection,
  
  // Authentication - uses JSONP (GET) for preview environment compatibility
  async login(email: string, password: string) {
    return fetchWithJsonp('login', { email, password });
  },
  async getUser(email: string) {
    return fetchWithJsonp('getUser', { email });
  },
  async updateLoginTracking(email: string) {
    return postViaBackend('updateLoginTracking', { email });
  },
  
  // Read operations (JSONP)
  async getAllSheets() { return fetchWithJsonp('getAllSheets').catch(() => null); },
  async getSheetData(sheetName: string) { return fetchSheetData(sheetName); },
  async getDashboard() { return fetchWithJsonp('getDashboard').catch(() => null); },
  async getEmployees() { return fetchSheetData('10_Employees'); },
  async getDepartments() { return fetchSheetData('02_Departments'); },
  async getPositions() { return fetchSheetData('03_Positions'); },
  async getAttendance() { return fetchSheetData('30_Attendance_Log'); },
  async getAttendanceSummary() { return fetchSheetData('33_Attendance_Summary'); },
  async getLeaveRequests() { return fetchSheetData('41_Leave_Requests'); },
  async getLeaveBalance() { return fetchSheetData('40_Leave_Balance'); },
  async getPayroll() { return fetchSheetData('50_Payroll_Monthly'); },
  async getDocuments() { return fetchSheetData('20_Employee_Documents'); },
  async getTraining() { return fetchSheetData('71_Training_Records'); },
  async getPerformance() { return fetchSheetData('61_Performance_Reviews'); },
  async getJobOpenings() { return fetchSheetData('80_Job_Openings'); },
  async getApplicants() { return fetchSheetData('81_Applicants'); },
  async getAssets() { return fetchSheetData('90_Assets'); },
  async getHolidays() { return fetchSheetData('04_Holidays'); },
  async getUserRoles() { return fetchSheetData('User_Roles'); },
  
  // Write operations (POST via backend)
  async addEmployee(rowData: Record<string, any>) {
    return postViaBackend('addEmployee', { rowData });
  },
  async updateEmployee(rowIndex: number, rowData: Record<string, any>) {
    return postViaBackend('updateEmployee', { rowIndex, rowData });
  },
  async deleteEmployee(rowIndex: number) {
    return postViaBackend('deleteEmployee', { rowIndex });
  },
  
  async addLeaveRequest(rowData: Record<string, any>) {
    return postViaBackend('addLeaveRequest', { rowData });
  },
  async updateLeaveRequest(rowIndex: number, rowData: Record<string, any>) {
    return postViaBackend('updateLeaveRequest', { rowIndex, rowData });
  },
  async approveLeave(requestId: string, approvedBy: string, notes?: string) {
    return postViaBackend('approveLeave', { requestId, approvedBy, notes });
  },
  async rejectLeave(requestId: string, rejectedBy: string, reason: string) {
    return postViaBackend('rejectLeave', { requestId, rejectedBy, reason });
  },
  
  async addAttendance(rowData: Record<string, any>) {
    return postViaBackend('addAttendance', { rowData });
  },
  async updateAttendance(rowIndex: number, rowData: Record<string, any>) {
    return postViaBackend('updateAttendance', { rowIndex, rowData });
  },
  
  async updatePayroll(rowIndex: number, rowData: Record<string, any>) {
    return postViaBackend('updatePayroll', { rowIndex, rowData });
  },
  
  async addDocument(rowData: Record<string, any>) {
    return postViaBackend('addDocument', { rowData });
  },
  async updateDocument(rowIndex: number, rowData: Record<string, any>) {
    return postViaBackend('updateDocument', { rowIndex, rowData });
  },
  
  async addTraining(rowData: Record<string, any>) {
    return postViaBackend('addTraining', { rowData });
  },
  async updateTraining(rowIndex: number, rowData: Record<string, any>) {
    return postViaBackend('updateTraining', { rowIndex, rowData });
  },
  
  async addAsset(rowData: Record<string, any>) {
    return postViaBackend('addAsset', { rowData });
  },
  async updateAsset(rowIndex: number, rowData: Record<string, any>) {
    return postViaBackend('updateAsset', { rowIndex, rowData });
  },
  
  async addLog(module: string, action: string, userId: string, details?: string) {
    return postViaBackend('addLog', { module, action, userId, details });
  },
  
  // Generic operations
  async addRow(sheetName: string, rowData: Record<string, any>) {
    return postViaBackend('addRow', { sheet: sheetName, rowData });
  },
  async updateRow(sheetName: string, rowIndex: number, rowData: Record<string, any>) {
    return postViaBackend('updateRow', { sheet: sheetName, rowIndex, rowData });
  },
  async deleteRow(sheetName: string, rowIndex: number) {
    return postViaBackend('deleteRow', { sheet: sheetName, rowIndex });
  },
};

export default GoogleSheetsAPI;
