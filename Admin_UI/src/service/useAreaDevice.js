import { useState, useEffect, useCallback } from 'react';
import API from './useAPI';

export const useAreaDevice = (areaId, refreshFlag = 0) => {
  const [dataAreaDevice, setDataAreaDevice] = useState([]);
  const [loadingAreaDevice, setLoadingAreaDevice] = useState(false);
  const [errorAreaDevice, setErrorAreaDevice] = useState(null);

  const fetchAreaDevice = useCallback(async () => {
    if (!areaId) {
      setDataAreaDevice([]);
      return;
    }

    setLoadingAreaDevice(true);
    setErrorAreaDevice(null);

    try {
      const response = await API.get(`/areaDevice/by-area?areaId=${areaId}`);
      const data = response.data[0];
      if (data) {
        setDataAreaDevice(data?.deviceDetails || []);
      } else {
        setErrorAreaDevice('Không thể tải dữ liệu thiết bị');
        setDataAreaDevice([]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định';
      setErrorAreaDevice(message);
      setDataAreaDevice([]);
    } finally {
      setLoadingAreaDevice(false);
    }
  }, [areaId]);

  // Thêm hàm refetch để có thể gọi thủ công
  const refetchAreaDevice = useCallback(() => {
    fetchAreaDevice();
  }, [fetchAreaDevice]);

  useEffect(() => {
    fetchAreaDevice();
  }, [fetchAreaDevice, refreshFlag]); // Thêm refreshFlag vào dependencies

  return {
    dataAreaDevice,
    loadingAreaDevice,
    errorAreaDevice,
    refetchAreaDevice // Export hàm refetch
  };
};
