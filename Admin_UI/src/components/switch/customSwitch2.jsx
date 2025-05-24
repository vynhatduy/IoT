// DeviceSwitch.jsx
import React, { useState } from 'react';
import { FormControlLabel, Switch, CircularProgress } from '@mui/material';
import { updateDeviceStatus } from '../../service/deviceApi';

const DeviceSwitch = ({ initialStatus, deviceId }) => {
  const [isChecked, setIsChecked] = useState(initialStatus === 'on');
  const [loading, setLoading] = useState(false);

  const handleChange = async (event) => {
    const newChecked = event.target.checked;
    const newStatus = newChecked ? 'on' : 'off';

    setLoading(true);
    setIsChecked(newChecked);

    try {
      const result = await updateDeviceStatus(deviceId, newStatus);
      // console.log('Kết quả cập nhật:', result);
    } catch (err) {
      console.error(err);
      // Rollback if error
      setIsChecked(!newChecked);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <span style={{ fontSize: '0.875rem' }}>Đang cập nhật...</span>
      </div>
    );
  }

  return (
    <FormControlLabel
      control={<Switch checked={isChecked} onChange={handleChange} color="primary" size="small" />}
      label={isChecked ? 'Bật' : 'Tắt'}
      labelPlacement="end"
    />
  );
};

export default DeviceSwitch;
