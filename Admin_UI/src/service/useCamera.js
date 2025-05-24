import { useState, useEffect, useCallback } from 'react';
import API from './useAPI';

export const useAllCamera = (refreshFlag = 0) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.get(`camera/all`);
      // console.log(response.data);
      const data = response.data;
      if (data) {
        setData(data);
      } else {
        setError('Không thể tải dữ liệu thiết bị');
        setData([]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Thêm hàm refetch để có thể gọi thủ công
  const refetchData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshFlag]);

  return {
    data,
    loading,
    error,
    refetchData
  };
};

export const useCameraByAreaId = (area, refreshFlag = 0) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (id) => {
    if (!id) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await API.get(`camera/byArea?area=${id}`);
      const data = response.data;
      if (data) {
        setData(data);
      } else {
        setError('Không thể tải dữ liệu thiết bị');
        setData([]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định';
      setError(message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Thêm hàm refetch để có thể gọi thủ công
  const refetchData = useCallback(() => {
    if (area) {
      fetchData(area);
    }
  }, [area, fetchData]);
  useEffect(() => {
    if (area) {
      fetchData(area);
    }
  }, [area, refreshFlag, fetchData]);

  return { data, loading, error, refetchData };
};

export const useCreateCamera = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createCamera = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await API.post('camera/create', data);
      setSuccess(true);
      return response.data.status;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  return { createCamera, loading, error, success };
};

export const useDeleteCamera = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteCamera = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await API.delete(`camera/delete?id=${id}`);
      // console.log(response);
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

  return { deleteCamera, loading, error, success };
};

export const useCameraStream = (camera) => {
  const streamUrl = useMemo(() => {
    if (!camera || !camera.username || !camera.password || !camera.url || !camera.port) {
      return null;
    }
    return `http://${camera.username}:${camera.password}@${camera.url}:${camera.port}/video`;
  }, [camera]);

  return streamUrl;
};
