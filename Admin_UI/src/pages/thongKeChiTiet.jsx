import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box, CircularProgress } from '@mui/material';
import { blue } from '@mui/material/colors';
import dayjs from 'dayjs';

import StyleBackground from '../themes/stylePage/backgroundPage';
import SelectArea from '../components/button/selectArea';
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

  // Gọi API khi fetchData thay đổi
  const data = useEnvironmentData(area, from.format('YYYY-MM-DD'), to.format('YYYY-MM-DD'), fetchData);

  // Reset fetchData sau khi tải xong để có thể tải lại
  useEffect(() => {
    if (fetchData) {
      setFetchData(false);
    }
  }, [data]);

  // Xử lý tải dữ liệu
  const handleDownload = () => {
    setFetchData(true); // Đảm bảo giá trị thay đổi để kích hoạt tải
  };
  console.log('chart data:', data);
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        THỐNG KÊ CHI TIẾT
      </Typography>

      <StyleBackground>
        {/* Chọn khu vực và thời gian */}
        <Box>
          <Typography variant="button">THỐNG KÊ THEO KHU VỰC</Typography>
          <Box sx={{ margin: '10px 0px' }}>
            <SelectArea
              onChange={(value) => {
                console.log('Khu vực đã chọn:', value); // Kiểm tra log
                setArea(value);
              }}
            />
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <CustomDatePicker label="Ngày bắt đầu" value={from} onChange={setFrom} />
            <CustomDatePicker label="Ngày kết thúc" value={to} onChange={setTo} />
            <DownloadButtons onClick={handleDownload} />
          </Stack>
        </Box>

        {/* Hiển thị dữ liệu và biểu đồ */}
        <Box sx={{marginTop: '10px', padding: 2 }}>
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
