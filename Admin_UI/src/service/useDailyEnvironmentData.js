import { useEffect, useState } from 'react';
import API from './useAPI';

const API_URL = import.meta.env.VITE_API_URL;

export default function useDailyEnvironmentData(date, area) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!date || !area) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await API.get(`environment/dataByDate`, {
          params: { date, area }
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Lỗi khi fetch dữ liệu:', err);
        setData([]);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date, area]);

  return { data, loading, error };
}
