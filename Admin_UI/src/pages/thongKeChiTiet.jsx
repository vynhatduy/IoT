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
import useEnvironmentData from '../service/useEnvironmentData';
import ChartComponent from '../components/ChartComponent';

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
        <Box>
          <Typography variant="button">THỐNG KÊ THEO KHU VỰC</Typography>
          <Box sx={{ margin: '10px 0px' }}>
            <SelectArea
              onChange={(value) => {
                console.log('Khu vực đã chọn:', value);
                setArea(value);
              }}
            />
          </Box>

          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6} spacing={3}>
              <CustomDatePicker label="Ngày bắt đầu" value={from} onChange={setFrom} />
              <CustomDatePicker label="Ngày kết thúc" value={to} onChange={setTo} />
            </Grid>
            <Grid item xs={12} md={2} display="flex" justifyContent="center">
              <DownloadButtons onClick={handleDownload} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: '10px', padding: 2 }}>
          {data.length === 0 ? (
            <Typography>Chưa có dữ liệu, vui lòng tải dữ liệu.</Typography>
          ) : (
            <ChartComponent from={from} to={to} data={data} />
          )}
        </Box>
      </StyleBackground>
    </Box>
  );
};

export default ThongKeChiTiet;
