import React, { useState, useEffect } from 'react';
import { Box, Container, Stack, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DatePickeronly from '../date/pickerDate';
import { DownloadButtons } from '../button/download';
import SelectWeather from '../dropdown/selectWeather';
import SelectArea from '../dropdown/selectArea';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import weatherData from '../../data/mockdata.json';

const Statistics = () => {
  const [startDate, setStartDate] = useState('2025-04-10');
  const [endDate, setEndDate] = useState('2025-04-19');
  const [selectedWeather, setSelectedWeather] = useState('temperature');
  const [selectedArea, setSelectedArea] = useState('all');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    filterData();
  }, [startDate, endDate, selectedWeather, selectedArea]);

  const filterData = () => {
    // Lọc dữ liệu theo ngày
    const filteredByDate = weatherData.data.filter((item) => {
      return item.date >= startDate && item.date <= endDate;
    });

    // Xử lý dữ liệu cho biểu đồ
    let processedData = [];

    if (selectedArea === 'all') {
      // Trường hợp hiển thị tất cả khu vực
      filteredByDate.forEach((dayData) => {
        const entry = {
          date: dayData.date
        };

        dayData.areas.forEach((area) => {
          entry[area.name] = area[selectedWeather];
        });

        processedData.push(entry);
      });
    } else {
      // Trường hợp chỉ hiển thị một khu vực cụ thể
      filteredByDate.forEach((dayData) => {
        const areaData = dayData.areas.find((area) => area.name === selectedArea);
        if (areaData) {
          processedData.push({
            date: dayData.date,
            [selectedWeather]: areaData[selectedWeather]
          });
        }
      });
    }

    setChartData(processedData);
  };

  // Hàm xử lý thay đổi ngày bắt đầu và kết thúc từ DatePickeronly
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Hàm xử lý thay đổi loại thời tiết
  const handleWeatherChange = (weather) => {
    setSelectedWeather(weather);
  };

  // Hàm xử lý thay đổi khu vực
  const handleAreaChange = (area) => {
    setSelectedArea(area);
  };

  // Định dạng label cho tooltip
  const getWeatherLabel = () => {
    switch (selectedWeather) {
      case 'temperature':
        return 'Nhiệt độ (°C)';
      case 'humidity':
        return 'Độ ẩm (%)';
      case 'light':
        return 'Ánh sáng (lux)';
      default:
        return '';
    }
  };

  // Tạo danh sách các Bar cho biểu đồ
  const renderBars = () => {
    if (selectedArea === 'all') {
      const areas = ['KV001'];
      const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

      return areas.map((area, index) => <Bar key={area} dataKey={area} name={area} fill={colors[index]} />);
    } else {
      return <Bar dataKey={selectedWeather} name={getWeatherLabel()} fill="#8884d8" />;
    }
  };

  return (
    <Box>
      <Typography mt={1} mb={1}>
        Tìm kiếm dữ liệu theo
      </Typography>
      <Stack justifyContent={'center'} alignItems={'center'} direction={'row'}>
        <DatePickeronly onDateChange={handleDateChange} />
        <SelectWeather onWeatherChange={handleWeatherChange} />
        <Box ml={2}>
          <SelectArea onAreaChange={handleAreaChange} />
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <DownloadButtons data={chartData} />
        </Box>
      </Stack>
      <Container sx={{ mt: 2 }}>
        <Typography variant="h6" mb={2}>
          Biểu đồ {getWeatherLabel()} theo ngàyx
        </Typography>
        {/* display graph */}
        <Paper elevation={3} sx={{ p: 2, height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis label={{ value: getWeatherLabel(), angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {renderBars()}
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Statistics;
