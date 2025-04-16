import PropTypes from 'prop-types';
import { useState } from 'react';

// Material UI
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Biểu đồ
import { LineChart } from '@mui/x-charts/LineChart';

// Component hiển thị Legend
function Legend({ items, onToggle }) {
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center', justifyContent: 'center', mt: 2.5, mb: 1.5 }}>
      {items.map((item) => (
        <Stack
          key={item.label}
          direction="row"
          sx={{ gap: 1.25, alignItems: 'center', cursor: 'pointer' }}
          onClick={() => onToggle(item.label)}
        >
          <Box sx={{ width: 12, height: 12, bgcolor: item.visible ? item.color : 'grey.500', borderRadius: '50%' }} />
          <Typography variant="body2" color="text.primary">
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

// ==============================|| BIỂU ĐỒ THỐNG KÊ MÔI TRƯỜNG ||============================== //
export default function IncomeAreaChart({ data }) {
  const theme = useTheme();

  // Format lại dữ liệu thành từng giờ
  const formattedData = data.map((item) => {
    const adjustedTimestamp = new Date(item.timestamp); // Chuyển đổi timestamp sang Date
    adjustedTimestamp.setHours(adjustedTimestamp.getHours() - 7); // Trừ 7 giờ

    return {
      hour: adjustedTimestamp.getHours().toString().padStart(2, '0') + ':00',
      temperature: item.temperature,
      humidity: item.humidity,
      airQuality: item.airQuality,
      brightness: item.light
    };
  });

  console.log('Data response: ', data);
  console.log('formattedData: ', formattedData);

  // Trạng thái hiển thị
  const [visibility, setVisibility] = useState({
    'Nhiệt độ': true,
    'Độ ẩm': true,
    'Ánh sáng': true,
    'Không khí': true
  });

  // Màu sắc cho từng loại dữ liệu
  const colorMap = {
    'Nhiệt độ': theme.palette.error.main, // Đỏ
    'Độ ẩm': theme.palette.primary.main, // Xanh dương
    'Ánh sáng': theme.palette.warning.main, // Vàng
    'Không khí': theme.palette.success.main // Xanh lá
  };

  // Tạo dữ liệu hiển thị trên biểu đồ
  const visibleSeries = [
    { key: 'temperature', label: 'Nhiệt độ', color: colorMap['Nhiệt độ'], visible: visibility['Nhiệt độ'] },
    { key: 'humidity', label: 'Độ ẩm', color: colorMap['Độ ẩm'], visible: visibility['Độ ẩm'] },
    { key: 'brightness', label: 'Ánh sáng', color: colorMap['Ánh sáng'], visible: visibility['Ánh sáng'] },
    { key: 'airQuality', label: 'Không khí', color: colorMap['Không khí'], visible: visibility['Không khí'] }
  ];

  // Toggle hiển thị từng đường trong biểu đồ
  const toggleVisibility = (label) => {
    setVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <LineChart
        xAxis={[{ scaleType: 'point', data: formattedData.map((item) => item.hour) }]}
        yAxis={[{ label: 'Giá trị đo',}]}
        height={450}
        margin={{ top: 40, bottom: 20, right: 20 }}
        series={visibleSeries
          .filter((series) => series.visible)
          .map((series) => ({
            type: 'line',
            data: formattedData.map((item) => item[series.key]),
            label: series.label,
            color: series.color,
            stroke: series.color,
            strokeWidth: 2
          }))}
        slotProps={{ legend: { hidden: true } }}
        sx={{
          '& .MuiChartsAxis-directionX .MuiChartsAxis-tick': { stroke: theme.palette.divider }
          
        }}
      />
      <Legend items={visibleSeries} onToggle={toggleVisibility} />
    </>
  );
}

Legend.propTypes = { items: PropTypes.array, onToggle: PropTypes.func };
IncomeAreaChart.propTypes = { data: PropTypes.array.isRequired };
