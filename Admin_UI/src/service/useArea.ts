import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function useArea() {
  const [areas, setAreas] = useState<{ id: string; name: string; topic: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchAreas() {
      try {
        const response = await axios.get<{ id: string; name: string; topic: string }[]>(`${API_URL}area`);
        setAreas(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Đã xảy ra lỗi không xác định');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAreas();
  }, []);
  console.log('api url : ', `${API_URL}area`);

  console.log('area data: ', areas);
  return { areas, loading, error };
}
