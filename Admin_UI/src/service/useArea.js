import { useState, useEffect } from 'react';
import API from './useAPI';

export const useArea = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const response = await API.get('area');
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
};

export const useCreateArea = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createArea = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await API.post('area', data);
      setSuccess(true);
      return response.data.status;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  return { createArea, loading, error, success };
};

export const UseDeleteArea = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteArea = async (areaId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await API.delete(`area/${areaId}`);
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        return true;
      } else {
        setError('Không thể xóa khu vực');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  return { deleteArea, loading, error, success };
};
