import { useState, useEffect, useCallback, use } from 'react';
import API from './useAPI';
import axios from 'axios';

export const useAllDeviceConfigCalender = (refreshFlag = 0) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get('/deviceConfig/according-calender/all');
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
  }, [refreshFlag]);

  return {
    refetchFetchData,
    data,
    error,
    loading
  };
};

export const useCalenderDeviceConfigByArea = (areaId, refreshFlag = 0) => {
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
      const response = await API.get(`/deviceConfig/according-calender/area?area=${areaId}`);
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

  const refetchAreaDevice = useCallback(() => {
    fetchAreaDevice();
  }, [fetchAreaDevice]);

  useEffect(() => {
    fetchAreaDevice();
  }, [fetchAreaDevice, refreshFlag]);
  return {
    dataAreaDevice,
    loadingAreaDevice,
    errorAreaDevice,
    refetchAreaDevice
  };
};

export const useCalenderDeviceConfigByStatus = (status, refreshFlag = 0) => {
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
      const response = await API.get(`/deviceConfig/according-calender?status=${status}`);
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

  const refetchAreaDevice = useCallback(() => {
    fetchAreaDevice();
  }, [fetchAreaDevice]);

  useEffect(() => {
    fetchAreaDevice();
  }, [fetchAreaDevice, refreshFlag]);

  return {
    dataAreaDevice,
    loadingAreaDevice,
    errorAreaDevice,
    refetchAreaDevice
  };
};

export const useDeviceConfigCalenderCreate = () => {
  const [createCalenderSuccess, setCreateSuccess] = useState(false);
  const [loadingCalenderCreate, setLoadingCreate] = useState(false);
  const [createCalenderError, setCreateError] = useState(null);
  const createCalender = async (payload) => {
    if (!payload) return;
    setLoadingCreate(true);
    setCreateSuccess(false);
    setCreateError(null);
    try {
      const response = await API.post('/deviceConfig/according-calender/create', payload);
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
    createCalender,
    createCalenderSuccess,
    loadingCalenderCreate,
    createCalenderError
  };
};
export const useCalenderDeviceUpdate = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const updateDeviceConfig = async (payload) => {
    if (!payload || payload.length === 0) return;
    setLoadingUpdate(true);
    setUpdateSuccess(false);
    setUpdateError(null);
    try {
      const response = await API.delete('/deviceConfig/according-calender/update', {
        data: payload,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setUpdateError(response.data.status);
      if (response?.data?.status) {
        return true;
      } else {
        setUpdateError(response?.data?.message);
        return false;
      }
    } catch (error) {
      console.error('Update error:', error);
      setUpdateError(error);
      return false; // Nếu có lỗi trong quá trình xóa
    } finally {
      setLoadingUpdate(false); // Kết thúc quá trình xóa
    }
  };

  return {
    updateDeviceConfig,
    updateSuccess,
    loadingUpdate,
    updateError
  };
};

export const useCalenderDeviceDelete = () => {
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const deleteDeviceConfig = async (id) => {
    if (!payload || payload.length === 0) return;
    setLoadingDelete(true);
    setDeleteSuccess(false);
    setDeleteError(null);
    try {
      const response = await API.delete(`/deviceConfig/according-calender/delete?id=${id}`, {
        data: payload,
        headers: {
          'Content-Type': 'application/json'
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
      console.error('Update error:', error);
      setDeleteError(error);
      return false; // Nếu có lỗi trong quá trình xóa
    } finally {
      setLoadingDelete(false); // Kết thúc quá trình xóa
    }
  };

  return {
    deleteDeviceConfig,
    deleteSuccess,
    loadingDelete,
    deleteError
  };
};
