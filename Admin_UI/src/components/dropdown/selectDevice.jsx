import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import mockData from '../../data/mockdata.json';

const { device } = mockData;

export default function SelectDevice() {
  const [selectDevice, setSelectDevice] = useState('');

  const handleDevice = (event) => {
    setSelectDevice(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ minWidth: 200 }}>
      <InputLabel id="select-device-label">Thiết bị</InputLabel>
      <Select labelId="select-device-label" id="select-device" alue={selectDevice} onChange={handleDevice} label="Thiết bị">
        {device && device.length > 0 ? (
          device.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name} ({item.unit})
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Không có thiết bị nào</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
