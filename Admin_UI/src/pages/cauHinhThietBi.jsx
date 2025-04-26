import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import ListCalender from '../components/configurationDevice/listDevice/autoWithCalender';
import CreateButtonConfig from '../components/button/creConfiguration';
import ListWeather from '../components/configurationDevice/listDevice/autoWithWeather';
const cauHinhThietBi = () => {
  const [refreshKey, setRefreshKey] = useState(0); // trigger để reload

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // mỗi lần gọi sẽ khiến component ListArea re-render
  };
  return (
    <Box>
      <Typography variant="subtitle1">CAU HINH THIET BI</Typography>
      <StyleBackground>
        <CreateButtonConfig onRefresh={handleRefresh} />
        <Box sx={{ margin: '20px 0px 0px 0px' }}>
          <Typography variant="subtitle1">Danh sách thiết bị tự động theo thời tiết</Typography>
          <ListWeather refresh={refreshKey} onRefresh={handleRefresh} />
        </Box>
        <Box sx={{ margin: '20px 0px 0px 0px' }}>
          <Typography variant="subtitle1">Danh sách thiết bị tự động theo lịch</Typography>
          <ListCalender refresh={refreshKey} onRefresh={handleRefresh} />
        </Box>
      </StyleBackground>
    </Box>
  );
};

export default cauHinhThietBi;
