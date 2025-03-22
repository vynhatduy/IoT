import React from 'react';
import { Box,Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import ActionsPageContainer from '../components/thongSoMoiTruong/index';
const thongSoMoiTruong = () => {
  return (
    <Box>
    <Typography sx={{}}>THONG SO MOI TRUONG</Typography>
    <StyleBackground>
      <ActionsPageContainer/>
    </StyleBackground>
  </Box>
  );
};

export default thongSoMoiTruong;
