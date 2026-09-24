import { useState, useEffect } from 'react';
import { GoogleSheetsAPI } from '../services/googleSheetsApi';

export function useSheetData(sheetName: string, mockData: any[]) {
  const [data, setData] = useState<any[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await GoogleSheetsAPI.getSheetData(sheetName);
        
        if (result && result.data && result.data.length > 0) {
          setData(result.data);
          setIsLive(true);
        } else {
          setData(mockData);
          setIsLive(false);
        }
      } catch (err) {
        console.error(`Failed to fetch ${sheetName}:`, err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setData(mockData);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetName]);

  return { data, loading, error, isLive };
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
