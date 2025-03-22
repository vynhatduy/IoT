import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import SelectArea from '../components/button/selectArea';
import DatePicker from '../components/date/datePicker';
import SelectWeather from '../components/button/selectWeather';
import { margin, padding } from '@mui/system';
const ThongKeChiTiet = () => {
  return (
    <Box>
      <Typography>THONG KE CHI TIET</Typography>
      <StyleBackground>
        <Box>
          <Typography variant="button">CHỌN KHU VỰC</Typography>
          <Box sx={{ margin: '10px 0px' }}>
            <SelectArea />
          </Box>
          <Box sx={{display:'flex', alignItems:'center', gap:'16'}}>
            <DatePicker />
            <SelectWeather sx={{padding:'20px'}} />
          </Box>
        </Box>
      </StyleBackground>
    </Box>
  );
};

export default ThongKeChiTiet;
