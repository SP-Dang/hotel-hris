import { useState, useEffect } from 'react';
import { GoogleSheetsAPI } from '../services/googleSheetsApi';

export function useSheetData(sheetName: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await GoogleSheetsAPI.getSheetData(sheetName);
      
      // Check if we got valid data
      if (result && result.data && Array.isArray(result.data)) {
        setData(result.data);
        console.log(`✅ Successfully fetched ${sheetName}: ${result.data.length} records`);
      } else {
        setData([]);
        console.warn(`⚠️ No data for ${sheetName}`);
      }
    } catch (err) {
      console.error(`❌ Failed to fetch ${sheetName}:`, err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      
      // Check if it's a timeout error
      if (errorMessage.includes('timeout')) {
        setError(`Request timeout for ${sheetName}. The data might be too large.`);
      } else {
        setError(errorMessage);
      }
      
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sheetName]);

  return { data, loading, error, refetch: fetchData };
}

export function useApiStatus() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await GoogleSheetsAPI.testConnection();
        setConnected(result.success);
      } catch (err) {
        setConnected(false);
      }
    };

    checkConnection();
  }, []);

  return { connected };
}
