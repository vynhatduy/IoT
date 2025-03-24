import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme, Box, Typography, Stack } from '@mui/material';

const ChartComponent = ({ from, to, data }) => {
  const theme = useTheme();
  const validHours = [6, 9, 12, 15, 18, 21, 0, 3];

  // Chuyển đổi from và to thành chuỗi ngày
  const fromDate = from.format('YYYY-MM-DD');
  const toDate = to.format('YYYY-MM-DD');

  // Lọc và xử lý dữ liệu
  const filteredData = data
    .map((item) => ({
      day: item.timestamp.substring(0, 10), // YYYY-MM-DD
      hour: parseInt(item.timestamp.substring(11, 13), 10), // HH
      temperature: item.temperature,
      humidity: item.humidity,
      brightness: item.brightness,
      airQuality: item.airQuality
    }))
    .filter((item) => item.day >= fromDate && item.day <= toDate && validHours.includes(item.hour)); // Lọc dữ liệu

  // Tạo danh sách ngày duy nhất
  const uniqueDays = [...new Set(filteredData.map((item) => item.day))];

  // Nhóm dữ liệu theo ngày và lấy dữ liệu mới nhất trong ngày
  const getLatestData = (key) =>
    uniqueDays.map((day) => {
      const latestItem = [...filteredData] // Sao chép để tránh ảnh hưởng mảng gốc
        .filter((item) => item.day === day)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Sắp xếp theo thời gian
        .pop(); // Lấy bản ghi mới nhất
      return latestItem ? latestItem[key] : null;
    });
  console.log(
    'Sorted Data:',
    filteredData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  );

  const seriesData = {
    temperature: getLatestData('temperature'),
    humidity: getLatestData('humidity'),
    brightness: getLatestData('brightness'),
    airQuality: getLatestData('airQuality')
  };
  console.log('Series Data:', seriesData);
  const colors = {
    temperature: theme.palette.primary.main,
    humidity: theme.palette.success.main,
    brightness: theme.palette.warning.main,
    airQuality: theme.palette.error.main
  };

  const [visibility, setVisibility] = useState({
    temperature: true,
    humidity: true,
    brightness: true,
    airQuality: true
  });

  const toggleVisibility = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  console.log('Filtered Data:', filteredData);
  console.log('Unique Days:', uniqueDays);
  console.log('Series Data:', seriesData);

  return (
    <Box>
      <LineChart
        xAxis={[{ scaleType: 'point', data: uniqueDays }]}
        yAxis={[{ label: 'Giờ', tickMinStep: 1, domain: [0, 24] }]}
        height={400}
        series={[
          visibility.temperature && {
            type: 'line',
            id: 'temperature',
            label: 'Nhiệt độ (°C)',
            data: seriesData.temperature,
            color: colors.temperature,
            showMark: false,
            area: true
          },
          visibility.humidity && {
            type: 'line',
            id: 'humidity',
            label: 'Độ ẩm (%)',
            data: seriesData.humidity,
            color: colors.humidity,
            showMark: false,
            area: true
          },
          visibility.brightness && {
            type: 'line',
            id: 'brightness',
            label: 'Ánh sáng (lux)',
            data: seriesData.brightness,
            color: colors.brightness,
            showMark: false,
            area: true
          },
          visibility.airQuality && {
            type: 'line',
            id: 'airQuality',
            label: 'Không khí (AQI)',
            data: seriesData.airQuality,
            color: colors.airQuality,
            showMark: false,
            area: true
          }
        ].filter(Boolean)}
      />

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {Object.keys(visibility).map((key) => (
          <Stack key={key} direction="row" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => toggleVisibility(key)}>
            <Box sx={{ width: 12, height: 12, bgcolor: visibility[key] ? colors[key] : 'grey.500', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default ChartComponent;
