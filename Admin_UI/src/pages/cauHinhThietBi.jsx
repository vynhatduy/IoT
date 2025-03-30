import React from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import ListCalender from '../components/configurationDevice/listDevice/autoWithCalender';
import CreateButtonConfig from '../components/button/creConfiguration';
import ListWeather from '../components/configurationDevice/listDevice/autoWithWeather';
const cauHinhThietBi = () => {
  return (
    <Box>
      <Typography>CAU HINH THIET BI</Typography>
      <StyleBackground>
        <CreateButtonConfig />
        <Box sx={{ margin: '20px 0px 0px 0px' }}>
          <Typography>Danh sách thiết bị tự động theo thời tiết</Typography>
          <ListCalender />
        </Box>
        <Box sx={{ margin: '20px 0px 0px 0px' }}>
          <Typography>Danh sách thiết bị tự động theo lịch</Typography>
          <ListWeather />
        </Box>
      </StyleBackground>
    </Box>
  );
};

export default cauHinhThietBi;
