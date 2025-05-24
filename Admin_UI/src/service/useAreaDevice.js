import { useState, useEffect, useCallback, use } from 'react';
import API from './useAPI';
import axios from 'axios';

export const useAllAreaDevice = (refreshFlag = 0) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/areaDevice/get-all');
      setData(response.data.data);
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
  }, [refreshFlag]); // Thêm refreshFlag vào dependencies

  return {
    refetchFetchData,
    data,
    error,
    loading
  };
};

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

export const useIoTDeviceByArea = (refreshFlag = 0) => {
  const [iotData, setIotData] = useState([]);
  const [loadingIotData, setLoadingIotData] = useState(false);
  const [errorIotData, setErrorIotData] = useState(null);

  const fetchIoTDevice = useCallback(async () => {
    setLoadingIotData(true);
    setErrorIotData(null);

    try {
      const response = await API.get(`/areaDevice/iot-device`);

      const data = response.data.data;
      if (data) {
        setIotData(data);
      } else {
        setLoadingIotData('Không thể tải dữ liệu thiết bị');
        setIotData([]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định';
      setErrorIotData(message);
      setIotData([]);
    } finally {
      setLoadingIotData(false);
    }
  }, []);

  const refetchAreaDevice = useCallback(() => {
    fetchIoTDevice();
  }, [fetchIoTDevice]);

  useEffect(() => {
    fetchIoTDevice();
  }, [fetchIoTDevice, refreshFlag]); // Thêm refreshFlag vào dependencies

  return {
    iotData,
    loadingIotData,
    errorIotData,
    refetchAreaDevice // Export hàm refetch
  };
};

export const useAreaDeviceCreate = () => {
  const [createSuccess, setCreateSuccess] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [createError, setCreateError] = useState(null);
  const create = async (payload) => {
    if (!payload) return;
    setLoadingCreate(true);
    setCreateSuccess(false);
    setCreateError(null);
    try {
      const response = await API.post('/areaDevice/create', payload);
      setCreateSuccess(response.data.status);
      if (response?.data?.status) {
        return true;
      } else {
        setCreateError(response?.data?.message);
        return false;
      }
    } catch (error) {
      console.error('Create error:', error);
      setCreateError(error);
      return false;
    } finally {
      setLoadingCreate(false);
    }
  };
  return {
    create,
    createSuccess,
    loadingCreate,
    createError
  };
};
export const useAreaDeviceDelete = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const deleteDevices = async (payload) => {
    if (!payload || payload.length === 0) return;
    setLoadingDelete(true);
    setDeleteSuccess(false);
    setDeleteError(null);
    try {
      // console.log('payload', payload);
      const response = await API.delete('/areaDevice/deleteDevices', {
        data: payload,
        headers: {
          'Content-Type': 'application/json' // Đảm bảo rằng bạn gửi đúng Content-Type
        }
      });
      setDeleteSuccess(response.data.status);
      if (response?.data?.status) {
        return true; // Nếu xóa thành công
      } else {
        setDeleteError(response?.data?.message);
        return false; // Nếu xóa thất bại
      }
    } catch (error) {
      console.error('Delete error:', error);
      setDeleteError(error);
      return false; // Nếu có lỗi trong quá trình xóa
    } finally {
      setLoadingDelete(false); // Kết thúc quá trình xóa
    }
  };

  return {
    deleteDevices,
    deleteSuccess,
    loadingDelete,
    deleteError
  };
};
