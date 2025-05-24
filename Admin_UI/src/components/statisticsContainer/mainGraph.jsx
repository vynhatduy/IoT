import React, { useState, useEffect } from 'react';
import { Box, Container, Stack, Typography, Paper } from '@mui/material';
import DatePickeronly from '../date/pickerDate';
import { DownloadButtons } from '../button/download';
import SelectWeather from '../dropdown/selectWeather';
import SelectArea from '../dropdown/selectArea';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEnvironmentDataStatistics } from '../../service/useEnvironmentData';
import dayjs from 'dayjs';
const Statistics = () => {
  const [startDate, setStartDate] = useState(dayjs().format('YYYY/MM/DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY/MM/DD'));

  const [selectType, setSelectType] = useState('temperature');
  const [selectedArea, setSelectedArea] = useState('KV001');
  const [chartData, setChartData] = useState([]);
  const { data, error, loading } = useEnvironmentDataStatistics(selectedArea, startDate, endDate, selectType, true);
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setChartData(data);
    }
  }, [data]);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleTypeChange = (type) => {
    setSelectType(type);
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area.name);
  };

  const getTypeLabel = () => {
    switch (selectType) {
      case 'temperature':
        return 'Nhiệt độ (°C)';
      case 'humidity':
        return 'Độ ẩm (%)';
      case 'light':
        return 'Ánh sáng (lux)';
      case 'airQuality':
        return 'Chất lượng không khí (AQI)';
      default:
        return '';
    }
  };

  const renderBars = () => {
    if (selectedArea === 'all') {
      const areas = ['KV001'];
      const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
      return areas.map((area, index) => <Bar key={area} dataKey={area} name={area} fill={colors[index]} />);
    } else {
      return <Bar dataKey="value" name={getTypeLabel()} fill="#8884d8" />;
    }
  };

  return (
    <Box>
      <Typography mt={1} mb={1}>
        Tìm kiếm dữ liệu theo
      </Typography>
      <Stack justifyContent="center" alignItems="center" direction="row">
        <DatePickeronly onDateChange={handleDateChange} />
        <SelectWeather onWeatherChange={handleTypeChange} />
        <Box ml={2}>
          <SelectArea onChange={handleAreaChange} />
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <DownloadButtons data={chartData} />
        </Box>
      </Stack>

      <Container sx={{ mt: 2 }}>
        <Typography variant="h6" mb={2}>
          Biểu đồ <strong>{getTypeLabel()}</strong> khu vực <strong>{selectedArea}</strong> theo ngày
        </Typography>
        <Paper elevation={3} sx={{ p: 2, height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeStamp" tickFormatter={(value) => dayjs(value).format('YYYY-MM-DD')} />

              <YAxis label={{ value: getTypeLabel(), angle: -90, position: 'insideLeft', dy: 50 }} />
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
