/**
 * ============================================================
 * GOOGLE APPS SCRIPT - HR & Admin Management System Backend
 * ENHANCED VERSION - With Write Support & Authentication
 * ============================================================
 * 
 * FEATURES:
 * - Read data from all sheet tabs (GET)
 * - Write/Update data to sheets (POST)
 * - User authentication against User_Roles sheet
 * - Role-based access control
 * 
 * ============================================================
 */

/**
 * Handle GET requests - supports both JSON and JSONP
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'getAllSheets';
    const callback = e.parameter.callback;
    let result;

    switch (action) {
      // Sheet operations
      case 'getAllSheets':
        result = getAllSheetNames();
        break;
      case 'getSheet':
        result = getSheetData(e.parameter.sheet);
        break;
      
      // Authentication
      case 'login':
        result = authenticateUser(e.parameter.email, e.parameter.password);
        break;
      case 'getUser':
        result = getUserData(e.parameter.email);
        break;
      
      // Module-specific getters
      case 'getDashboard':
        result = getDashboardData();
        break;
      case 'getEmployees':
        result = getSheetData('10_Employees');
        break;
      case 'getAttendance':
        result = getSheetData('30_Attendance_Log');
        break;
      case 'getAttendanceSummary':
        result = getSheetData('33_Attendance_Summary');
        break;
      case 'getLeaveRequests':
        result = getSheetData('41_Leave_Requests');
        break;
      case 'getLeaveBalance':
        result = getSheetData('40_Leave_Balance');
        break;
      case 'getPayroll':
        result = getSheetData('50_Payroll_Monthly');
        break;
      case 'getDepartments':
        result = getSheetData('02_Departments');
        break;
      case 'getPositions':
        result = getSheetData('03_Positions');
        break;
      case 'getDocuments':
        result = getSheetData('20_Employee_Documents');
        break;
      case 'getTraining':
        result = getSheetData('71_Training_Records');
        break;
      case 'getPerformance':
        result = getSheetData('61_Performance_Reviews');
        break;
      case 'getJobOpenings':
        result = getSheetData('80_Job_Openings');
        break;
      case 'getApplicants':
        result = getSheetData('81_Applicants');
        break;
      case 'getAssets':
        result = getSheetData('90_Assets');
        break;
      case 'getHolidays':
        result = getSheetData('04_Holidays');
        break;
      case 'getUserRoles':
        result = getSheetData('User_Roles');
        break;
      
      default:
        result = { error: 'Unknown action: ' + action };
    }

    const jsonString = JSON.stringify(result);

    if (callback) {
      return ContentService
        .createTextOutput(callback + '(' + jsonString + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return ContentService
      .createTextOutput(jsonString)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    const errorJson = JSON.stringify({ error: error.toString() });
    
    if (e.parameter.callback) {
      return ContentService
        .createTextOutput(e.parameter.callback + '(' + errorJson + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    return ContentService
      .createTextOutput(errorJson)
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle POST requests - Write operations
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    let result;

    switch (action) {
      // Authentication
      case 'login':
        result = authenticateUser(data.email, data.password);
        break;
      case 'updatePassword':
        result = updatePassword(data.email, data.oldPassword, data.newPassword);
        break;
      
      // Employee operations
      case 'addEmployee':
        result = addRow('10_Employees', data.rowData);
        break;
      case 'updateEmployee':
        result = updateRow('10_Employees', data.rowIndex, data.rowData);
        break;
      case 'deleteEmployee':
        result = deleteRow('10_Employees', data.rowIndex);
        break;
      
      // Leave operations
      case 'addLeaveRequest':
        result = addRow('41_Leave_Requests', data.rowData);
        break;
      case 'updateLeaveRequest':
        result = updateRow('41_Leave_Requests', data.rowIndex, data.rowData);
        break;
      case 'approveLeave':
        result = approveLeaveRequest(data.requestId, data.approvedBy, data.notes);
        break;
      case 'rejectLeave':
        result = rejectLeaveRequest(data.requestId, data.rejectedBy, data.reason);
        break;
      
      // Attendance operations
      case 'addAttendance':
        result = addRow('30_Attendance_Log', data.rowData);
        break;
      case 'updateAttendance':
        result = updateRow('30_Attendance_Log', data.rowIndex, data.rowData);
        break;
      
      // Payroll operations
      case 'updatePayroll':
        result = updateRow('50_Payroll_Monthly', data.rowIndex, data.rowData);
        break;
      
      // Document operations
      case 'addDocument':
        result = addRow('20_Employee_Documents', data.rowData);
        break;
      case 'updateDocument':
        result = updateRow('20_Employee_Documents', data.rowIndex, data.rowData);
        break;
      
      // Training operations
      case 'addTraining':
        result = addRow('71_Training_Records', data.rowData);
        break;
      case 'updateTraining':
        result = updateRow('71_Training_Records', data.rowIndex, data.rowData);
        break;
      
      // Asset operations
      case 'addAsset':
        result = addRow('90_Assets', data.rowData);
        break;
      case 'updateAsset':
        result = updateRow('90_Assets', data.rowIndex, data.rowData);
        break;
      
      // Generic operations
      case 'addRow':
        result = addRow(data.sheet, data.rowData);
        break;
      case 'updateRow':
        result = updateRow(data.sheet, data.rowIndex, data.rowData);
        break;
      case 'deleteRow':
        result = deleteRow(data.sheet, data.rowIndex);
        break;
      
      // System logs
      case 'addLog':
        result = addSystemLog(data.module, data.action, data.userId, data.details);
        break;
      
      default:
        result = { success: false, error: 'Unknown action: ' + action };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// AUTHENTICATION FUNCTIONS
// ============================================================

/**
 * Authenticate user against User_Roles sheet
 */
function authenticateUser(email, password) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('User_Roles');
  
  if (!sheet) {
    return { success: false, error: 'User_Roles sheet not found' };
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const emailCol = headers.indexOf('Email');
  const passwordCol = headers.indexOf('Password');
  const roleCol = headers.indexOf('Role');
  const statusCol = headers.indexOf('Status');
  const lastLoginCol = headers.indexOf('Last_Login');
  const attemptsCol = headers.indexOf('Attempts');
  const lockedCol = headers.indexOf('Locked_Until');

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const userEmail = row[emailCol];
    const userPassword = row[passwordCol];
    const userRole = row[roleCol];
    const userStatus = row[statusCol];
    
    if (userEmail === email) {
      // Check if account is locked
      if (lockedCol >= 0 && row[lockedCol]) {
        const lockedUntil = new Date(row[lockedCol]);
        if (lockedUntil > new Date()) {
          return { 
            success: false, 
            error: 'Account is locked until ' + lockedUntil.toLocaleString(),
            locked: true 
          };
        }
      }
      
      // Check if account is active
      if (userStatus !== 'Active') {
        return { success: false, error: 'Account is inactive' };
      }
      
      // Check password
      if (userPassword === password) {
        // Note: Write operations (updating Last_Login, Attempts) moved to doPost for better performance
        // GET requests should be fast and read-only
        
        return { 
          success: true, 
          user: {
            email: userEmail,
            role: userRole,
            status: userStatus
          }
        };
      } else {
        // Wrong password - just return error (no writes in GET request)
        return { 
          success: false, 
          error: 'Invalid password' 
        };
      }
    }
  }

  return { success: false, error: 'User not found' };
}

/**
 * Get user data by email
 */
function getUserData(email) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('User_Roles');
  
  if (!sheet) {
    return { success: false, error: 'User_Roles sheet not found' };
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const emailCol = headers.indexOf('Email');
  const roleCol = headers.indexOf('Role');
  const permissionsCol = headers.indexOf('Permissions');
  const statusCol = headers.indexOf('Status');

  for (let i = 1; i < data.length; i++) {
    if (data[i][emailCol] === email) {
      return {
        success: true,
        user: {
          email: data[i][emailCol],
          role: data[i][roleCol],
          permissions: data[i][permissionsCol],
          status: data[i][statusCol]
        }
      };
    }
  }

  return { success: false, error: 'User not found' };
}

/**
 * Update login tracking (called via POST after successful login)
 */
function updateLoginTracking(email) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('User_Roles');
  
  if (!sheet) return { success: false };

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const emailCol = headers.indexOf('Email');
  const lastLoginCol = headers.indexOf('Last_Login');
  const attemptsCol = headers.indexOf('Attempts');

  for (let i = 1; i < data.length; i++) {
    if (data[i][emailCol] === email) {
      // Reset attempts and update last login
      if (attemptsCol >= 0) {
        sheet.getRange(i + 1, attemptsCol + 1).setValue(0);
      }
      if (lastLoginCol >= 0) {
        sheet.getRange(i + 1, lastLoginCol + 1).setValue(new Date());
      }
      return { success: true };
    }
  }
  
  return { success: false };
}

/**
 * Update user password
 */
function updatePassword(email, oldPassword, newPassword) {
  const auth = authenticateUser(email, oldPassword);
  if (!auth.success) {
    return { success: false, error: 'Current password is incorrect' };
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('User_Roles');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const emailCol = headers.indexOf('Email');
  const passwordCol = headers.indexOf('Password');

  for (let i = 1; i < data.length; i++) {
    if (data[i][emailCol] === email) {
      sheet.getRange(i + 1, passwordCol + 1).setValue(newPassword);
      return { success: true, message: 'Password updated successfully' };
    }
  }

  return { success: false, error: 'User not found' };
}

// ============================================================
// DATA OPERATIONS
// ============================================================

function getAllSheetNames() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  return {
    sheets: sheets.map(s => s.getName()),
    count: sheets.length
  };
}

function getSheetData(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return { error: 'Sheet not found: ' + sheetName };
  }

  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    return { sheet: sheetName, headers: [],  [], rowCount: 0 };
  }

  const headers = data[0];
  const rows = [];

  for (let i = 1; i < data.length; i++) {
    const row = {};
    let hasData = false;

    for (let j = 0; j < headers.length; j++) {
      const header = String(headers[j]).trim();
      if (header) {
        const value = data[i][j];
        if (value instanceof Date) {
          row[header] = value.toISOString().split('T')[0];
        } else {
          row[header] = value;
        }
        if (value !== '' && value !== null && value !== undefined) {
          hasData = true;
        }
      }
    }

    if (hasData) {
      row['_rowIndex'] = i + 1;
      rows.push(row);
    }
  }

  return {
    sheet: sheetName,
    headers: headers.filter(h => String(h).trim()),
     rows,
    rowCount: rows.length
  };
}

function addRow(sheetName, rowData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return { success: false, error: 'Sheet not found: ' + sheetName };
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const newRow = headers.map(h => rowData[h] || '');

  sheet.appendRow(newRow);

  return { success: true, message: 'Row added successfully' };
}

function updateRow(sheetName, rowIndex, rowData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return { success: false, error: 'Sheet not found: ' + sheetName };
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  for (const key in rowData) {
    const colIndex = headers.indexOf(key);
    if (colIndex >= 0) {
      sheet.getRange(rowIndex, colIndex + 1).setValue(rowData[key]);
    }
  }

  return { success: true, message: 'Row updated successfully' };
}

function deleteRow(sheetName, rowIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return { success: false, error: 'Sheet not found: ' + sheetName };
  }

  sheet.deleteRow(rowIndex);

  return { success: true, message: 'Row deleted successfully' };
}

// ============================================================
// SPECIALIZED OPERATIONS
// ============================================================

function approveLeaveRequest(requestId, approvedBy, notes) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('41_Leave_Requests');
  
  if (!sheet) {
    return { success: false, error: 'Leave Requests sheet not found' };
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const idCol = headers.indexOf('Leave_Request_ID');
  const statusCol = headers.indexOf('Approval_Status');
  const approvedDateCol = headers.indexOf('Approved_Date');
  const approverCol = headers.indexOf('Approver_Employee_ID');

  for (let i = 1; i < data.length; i++) {
    if (data[i][idCol] === requestId) {
      sheet.getRange(i + 1, statusCol + 1).setValue('Approved');
      sheet.getRange(i + 1, approvedDateCol + 1).setValue(new Date());
      if (approverCol >= 0) {
        sheet.getRange(i + 1, approverCol + 1).setValue(approvedBy);
      }
      return { success: true, message: 'Leave request approved' };
    }
  }

  return { success: false, error: 'Leave request not found' };
}

function rejectLeaveRequest(requestId, rejectedBy, reason) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('41_Leave_Requests');
  
  if (!sheet) {
    return { success: false, error: 'Leave Requests sheet not found' };
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const idCol = headers.indexOf('Leave_Request_ID');
  const statusCol = headers.indexOf('Approval_Status');
  const rejectedDateCol = headers.indexOf('Rejected_Date');
  const rejectionReasonCol = headers.indexOf('Rejection_Reason');

  for (let i = 1; i < data.length; i++) {
    if (data[i][idCol] === requestId) {
      sheet.getRange(i + 1, statusCol + 1).setValue('Rejected');
      sheet.getRange(i + 1, rejectedDateCol + 1).setValue(new Date());
      if (rejectionReasonCol >= 0) {
        sheet.getRange(i + 1, rejectionReasonCol + 1).setValue(reason);
      }
      return { success: true, message: 'Leave request rejected' };
    }
  }

  return { success: false, error: 'Leave request not found' };
}

function addSystemLog(module, action, userId, details) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('98_System_Logs');
  
  if (!sheet) {
    return { success: false, error: 'System Logs sheet not found' };
  }

  const now = new Date();
  sheet.appendRow([
    'LOG-' + Date.now(),  // Log_ID
    now,                   // Log_DateTime
    module,                // Module_Name
    action,                // Action_Name
    '',                    // Reference_ID
    'Success',             // Status
    details || '',         // Message
    userId,                // Triggered_By
    '',                    // Old_Value
    '',                    // New_Value
    'Info',                // Severity
    'RUN-' + Date.now()    // Run_ID
  ]);

  return { success: true, message: 'Log added' };
}

function getDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboardSheet = ss.getSheetByName('00_Dashboard');
  let dashboardData = {};

  if (dashboardSheet) {
    const data = dashboardSheet.getDataRange().getValues();
    dashboardData = { raw: data.slice(0, 20) };
  }

  const empSheet = ss.getSheetByName('10_Employees');
  const empCount = empSheet ? Math.max(0, empSheet.getLastRow() - 1) : 0;

  return {
    dashboard: dashboardData,
    summary: {
      totalEmployees: empCount
    }
  };
}

/**
 * Test function
 */
function testScript() {
  const result = getAllSheetNames();
  Logger.log('Available sheets: ' + JSON.stringify(result));

  const empData = getSheetData('10_Employees');
  Logger.log('Employees: ' + empData.rowCount + ' rows');
  
  // Test authentication
  const auth = authenticateUser('admin@hotellaos.com', 'admin123');
  Logger.log('Auth test: ' + JSON.stringify(auth));
}
