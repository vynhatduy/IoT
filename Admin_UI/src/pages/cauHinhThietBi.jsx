import React from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import TableComponent from '../components/configurationDevice/listDevice';
import CreateButtonConfig from '../components/button/creConfiguration';
import { margin } from '@mui/system';
const cauHinhThietBi = () => {
  return (
    <Box>
      <Typography>CAU HINH THIET BI</Typography>
      <StyleBackground>
        <CreateButtonConfig />
        <Box sx={{ margin: '20px 0px 0px 0px' }}>
          <Typography>Danh sách thiết bị thủ công</Typography>
          <TableComponent />
        </Box>
        <Box sx={{ margin: '20px 0px 0px 0px' }}>
          <Typography>Danh sách thiết bị tự động</Typography>
          <TableComponent />
        </Box>
      </StyleBackground>
    </Box>
  );
};

export default cauHinhThietBi;
