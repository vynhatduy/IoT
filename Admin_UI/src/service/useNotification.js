import { useCallback, useEffect, useState } from 'react';
import API from './useAPI';

export const useNotification = (refreshFlag = 0) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/notification/all');
      setData(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(message);
      setData([]);
    } finally {
      setLoading(false);
    }
  });
  const refetchFetchData = useCallback(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [refreshFlag]);

  return {
    refetchFetchData,
    data,
    error,
    loading
  };
};
