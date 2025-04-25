import { MenuItem, Select, FormControl, InputLabel, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useAreaDevice } from '../../service/useAreaDevice';

export const SelectIoTDevice = ({ areaId, onChange }) => {
  const [selectedDevice, setSelectedDevice] = React.useState('');
  const { dataAreaDevice, loadingIotData, errorIotData } = useAreaDevice(areaId?.id);
  const handleChange = (event) => {
    const selected = event.target.value; // chính là object device
    setSelectedDevice(selected);
    onChange(selected); // truyền object ra ngoài
  };
  if (!areaId) return null;
  if (loadingIotData) return <CircularProgress />;
  if (errorIotData) return <Alert severity="error">Lỗi tải thiết bị: {errorIotData}</Alert>;
  return (
    <>
      <FormControl fullWidth sx={{ minWidth: 120 }}>
        <InputLabel id="select-device-label">Thiết bị điều khiển</InputLabel>
        <Select labelId="select-device-label" id="select-device" value={selectedDevice} onChange={handleChange} label="Thiết bị điều khiển">
          {dataAreaDevice.map((device) => (
            <MenuItem key={device} value={device}>
              {device.nameDevice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
