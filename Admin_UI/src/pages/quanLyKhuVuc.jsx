import React from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import AddArea from '../components/button/addArea';
import ListArea from '../components/containerArea/listArea';
const KhuVuc = () => {
  return (
    <Box>
      <Typography variant="subtitle1">Quản lý khu vực</Typography>
      <StyleBackground>
        <AddArea />
        <></>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          Danh sách khu vực
        </Typography>
        <ListArea />
      </StyleBackground>
    </Box>
  );
};

export default KhuVuc;
