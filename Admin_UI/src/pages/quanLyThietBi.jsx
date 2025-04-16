import React from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import ListAllDevice from '../components/deviceDetails/listAllDevice';

const quanLyThietBi = () => {
  return (
    <Box>
      <Typography>Danh Sách Thiết Bị</Typography>
      <StyleBackground>
        <ListAllDevice />
      </StyleBackground>
    </Box>
  );
};

export default quanLyThietBi;
