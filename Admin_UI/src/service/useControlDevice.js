import { useState, useCallback } from 'react';
import API from './useAPI';

export const useControlDevice = () => {
  const [loadingControlDevice, setLoadingControlDevice] = useState(false);
  const [errorControlDevice, setErrorControlDevice] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updatedDeviceState, setUpdatedDeviceState] = useState(null);

  const controlDevice = useCallback(async (payload) => {
    if (!payload) return false;

    setLoadingControlDevice(true);
    setErrorControlDevice(null);
    setSuccess(false);

    try {
      const response = await API.post('device/control', payload);
      const status = response?.data?.status;

      if (status) {
        setUpdatedDeviceState(response.data.data);
        setSuccess(true);
        return true;
      } else {
        setErrorControlDevice('Gửi không thành công');
        setSuccess(false);
        return false;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định';
      setErrorControlDevice(message);
      setSuccess(false);
      return false;
    } finally {
      setLoadingControlDevice(false);
    }
  }, []);

  return {
    controlDevice,
    loadingControlDevice,
    errorControlDevice,
    success,
    updatedDeviceState
  };
};
