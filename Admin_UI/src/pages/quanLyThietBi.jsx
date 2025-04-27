import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import ListAllDevice from '../components/deviceManager/listAllDevice';
import { AddDevicelButtons } from '../components/button/addDevice';
import { DeleteDevice } from '../components/button/deleteDevice';

const quanLyThietBi = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState([]); // Lưu danh sách thiết bị đã chọn

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteDevices = (selectedDevices) => {
    setSelectedDevices(selectedDevices); // Lưu lại danh sách thiết bị đã chọn
  };

  return (
    <Box>
      <AddDevicelButtons onAddSuccess={handleRefresh} />
      <DeleteDevice listDelete={selectedDevices} onAddSuccess={handleRefresh} />
      <Box marginTop={2}>
        <Typography variant="subtitle1">Danh Sách Thiết Bị</Typography>
      </Box>
      <StyleBackground>
        <ListAllDevice refreshKey={refreshKey} onDeleteSelected={handleDeleteDevices} selectedDevices={selectedDevices} />
      </StyleBackground>
    </Box>
  );
};

export default quanLyThietBi;
