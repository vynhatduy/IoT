import React from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import ListAllDevice from '../components/deviceManager/listAllDevice';
import AddDevicelButtons from '../components/button/addDevice';
import DeleteDevice from '../components/button/deleteDevice';

const quanLyThietBi = () => {
  return (
    <Box>
      <AddDevicelButtons />
      <DeleteDevice />
      <Box marginTop={2}>
        <Typography variant="subtitle1">Danh Sách Thiết Bị</Typography>
      </Box>
      <StyleBackground>
        <ListAllDevice />
      </StyleBackground>
    </Box>
  );
};

export default quanLyThietBi;
