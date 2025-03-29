import { useState, useEffect } from 'react';
import API from './useAPI';

const API_URL = import.meta.env.VITE_API_URL;

export default function useArea() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const response = await API.get(`area`);
        setAreas(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
      } finally {
        setLoading(false);
      }
    }

    fetchAreas();
  }, []);


  return { areas, loading, error };
}
