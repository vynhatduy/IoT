import React from 'react';
import { Typography, Box } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import Statistics from '../components/statisticsContainer/mainGraph';

const ThongKeChiTiet = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        THỐNG KÊ CHI TIẾT
      </Typography>

      <StyleBackground>
        <Statistics />
      </StyleBackground>
    </Box>
  );
};

export default ThongKeChiTiet;
