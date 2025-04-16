import React, { useState } from 'react';
import { Switch } from '@mui/material';

const DeviceSwitch = ({ initialStatus, deviceId }) => {
  const [status, setStatus] = useState(initialStatus === 'on');

  const handleChange = () => {
    setStatus(!status);
    // Ở đây bạn có thể thêm code để gửi trạng thái mới lên server
  };

  return (
    <Switch 
      checked={status} 
      onChange={handleChange} 
      color="primary" 
    />
  );
};

export default DeviceSwitch;