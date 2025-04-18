import PropTypes from 'prop-types';
import { useState } from 'react';

// Material UI
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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

// Component hiển thị biểu đồ riêng lẻ
function SingleChart({ title, data, xAxisData, dataKey, color, visible }) {
  const theme = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" align="center" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <LineChart
        xAxis={[{ scaleType: 'point', data: xAxisData }]}
        yAxis={[{ label: 'Giá trị đo' }]}
        height={220}
        margin={{ top: 20, bottom: 30, right: 20, left: 40 }}
        series={[
          {
            type: 'line',
            data: data.map((item) => item[dataKey]),
            label: title,
            color: color,
            stroke: color,
            strokeWidth: 2
          }
        ]}
        slotProps={{ legend: { hidden: true } }}
        sx={{
          '& .MuiChartsAxis-directionX .MuiChartsAxis-tick': { stroke: theme.palette.divider }
        }}
      />
    </Box>
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
  const chartConfig = [
    { key: 'temperature', dataKey: 'temperature', label: 'Nhiệt độ', color: colorMap['Nhiệt độ'], visible: visibility['Nhiệt độ'] },
    { key: 'humidity', dataKey: 'humidity', label: 'Độ ẩm', color: colorMap['Độ ẩm'], visible: visibility['Độ ẩm'] },
    { key: 'brightness', dataKey: 'brightness', label: 'Ánh sáng', color: colorMap['Ánh sáng'], visible: visibility['Ánh sáng'] },
    { key: 'airQuality', dataKey: 'airQuality', label: 'Không khí', color: colorMap['Không khí'], visible: visibility['Không khí'] }
  ];

  // Toggle hiển thị từng đường trong biểu đồ
  const toggleVisibility = (label) => {
    setVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Stack>
            <SingleChart
              title="Nhiệt độ"
              data={formattedData}
              xAxisData={formattedData.map((item) => item.hour)}
              dataKey="temperature"
              color={colorMap['Nhiệt độ']}
              visible={visibility['Nhiệt độ']}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <SingleChart
            title="Độ ẩm"
            data={formattedData}
            xAxisData={formattedData.map((item) => item.hour)}
            dataKey="humidity"
            color={colorMap['Độ ẩm']}
            visible={visibility['Độ ẩm']}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SingleChart
            title="Ánh sáng"
            data={formattedData}
            xAxisData={formattedData.map((item) => item.hour)}
            dataKey="brightness"
            color={colorMap['Ánh sáng']}
            visible={visibility['Ánh sáng']}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SingleChart
            title="Không khí"
            data={formattedData}
            xAxisData={formattedData.map((item) => item.hour)}
            dataKey="airQuality"
            color={colorMap['Không khí']}
            visible={visibility['Không khí']}
          />
        </Grid>
      </Grid>

      {/* Legend chung cho tất cả biểu đồ */}
      <Legend items={chartConfig} onToggle={toggleVisibility} />
    </>
  );
}

// PropTypes
Legend.propTypes = {
  items: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired
};

SingleChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  xAxisData: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
};

IncomeAreaChart.propTypes = {
  data: PropTypes.array.isRequired
};
