import React from 'react';
import { Typography, Box } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import Statistics from '../components/statisticsContainer/mainGraph';

const ThongKeChiTiet = () => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        THỐNG KÊ THÔNG SỐ MÔI TRƯỜNG
      </Typography>

      <StyleBackground>
        <Statistics />
      </StyleBackground>
    </Box>
  );
};

export default ThongKeChiTiet;
