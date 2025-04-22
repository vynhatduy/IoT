import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box, CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';
import dayjs from 'dayjs';
import { Grid, padding } from '@mui/system';
import StyleBackground from '../themes/stylePage/backgroundPage';
import SelectArea from '../components/dropdown/selectArea';
import CustomDatePicker from '../components/CustomDatePicker';
// import SelectWeather from '../components/button/selectWeather';
import { DownloadButtons } from '../components/button/download';
import { useEnvironmentData } from '../service/useEnvironmentData';
import ChartComponent from '../components/ChartComponent';
// import Statistics from '../components/statisticsContainer/statistics';
import Statistics from '../components/statisticsContainer/mainGraph';

const ThongKeChiTiet = () => {
  const [area, setArea] = useState('');
  const [from, setFrom] = useState(dayjs());
  const [to, setTo] = useState(dayjs());
  const [fetchData, setFetchData] = useState(false);

  const data = useEnvironmentData(area, from.format('YYYY-MM-DD'), to.format('YYYY-MM-DD'), fetchData);

  useEffect(() => {
    if (fetchData) {
      setFetchData(false);
    }
  }, [data]);

  const handleDownload = () => {
    setFetchData(true);
  };
  console.log('chart data:', data);
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
