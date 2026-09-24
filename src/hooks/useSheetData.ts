import { useState, useEffect } from 'react';
import { GoogleSheetsAPI, isConnected } from '../services/googleSheetsApi';

/**
 * Custom hook to fetch data from Google Sheets
 * Falls back to mock data if API is not connected
 */
export function useSheetData<T>(sheetName: string, mockData: T[]) {
  const [data, setData] = useState<T[]>(mockData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isConnected()) {
      setData(mockData);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const result = await GoogleSheetsAPI.getSheetData(sheetName);
        
        if (!cancelled && result && result.rows) {
          // Transform the API response to match our TypeScript types
          const transformedData = result.rows.map((row: any) => {
            // Clean up the row data - convert empty strings to appropriate types
            const cleaned: any = {};
            for (const key in row) {
              if (key === '_rowIndex') {
                cleaned[key] = row[key];
              } else if (row[key] === '' || row[key] === null || row[key] === undefined) {
                cleaned[key] = '';
              } else if (!isNaN(row[key]) && row[key] !== '' && typeof row[key] !== 'object') {
                cleaned[key] = Number(row[key]);
              } else {
                cleaned[key] = row[key];
              }
            }
            return cleaned as T;
          });

          if (transformedData.length > 0) {
            setData(transformedData);
            setIsLive(true);
          } else {
            // If API returns empty, use mock data
            setData(mockData);
            setIsLive(false);
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to fetch data');
          setData(mockData);
          setIsLive(false);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [sheetName]);

  return { data, loading, error, isLive, refetch: () => {} };
}

/**
 * Hook to check if API is connected
 */
export function useApiStatus() {
  const [connected, setConnected] = useState(isConnected());

  useEffect(() => {
    // Check periodically if URL has been updated
    const interval = setInterval(() => {
      setConnected(isConnected());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { connected };
}
