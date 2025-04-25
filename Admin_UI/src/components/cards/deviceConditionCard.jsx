import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, Autocomplete, TextField } from '@mui/material';
import { Lightbulb, Air, Opacity, Whatshot, Label } from '@mui/icons-material';

// Component con cho một phần cấu hình (min/max)
const ControlField = ({ label, options, value, onChange, type }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const validateValue = (val) => {
    if (!Number.isInteger(val) || val < 0) {
      setError(true);
      setHelperText('Giá trị phải là số nguyên không âm');
      return false;
    }

    switch (type) {
      case 'light':
        if (val > 100) {
          setError(true);
          setHelperText('Giá trị ánh sáng phải từ 0 - 100');
          return false;
        }
        break;
      case 'temperature':
        if (val > 40) {
          setError(true);
          setHelperText('Nhiệt độ phải từ 0 - 40');
          return false;
        }
        break;
      case 'humidity':
        if (val < 10 || val > 90) {
          setError(true);
          setHelperText('Độ ẩm phải từ 10 - 90');
          return false;
        }
        break;
      case 'airQuality':
        if (val > 1000) {
          setError(true);
          setHelperText('Chất lượng không khí phải từ 0 - 1000');
          return false;
        }
        break;
    }

    setError(false);
    setHelperText('');
    return true;
  };

  const handleValueChange = (input) => {
    const parsed = Number(input);
    if (!isNaN(parsed)) {
      if (validateValue(parsed)) {
        onChange?.(parsed);
      }
    }
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" mb={1}>
        <strong>{label}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            freeSolo
            options={options}
            value={value ?? null}
            onChange={(e, newValue) => handleValueChange(newValue)}
            onInputChange={(e, newInputValue, reason) => {
              if (reason === 'input') {
                handleValueChange(newInputValue);
              }
            }}
            getOptionLabel={(option) => option?.toString?.() ?? ''}
            renderInput={(params) => (
              <TextField
                {...params}
                type="number"
                placeholder="Ngưỡng giá trị hợp lệ..."
                variant="outlined"
                fullWidth
                size="small"
                error={error}
                helperText={helperText}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Component chính cho thiết bị
const DeviceControl = ({
  deviceType,
  icon: DeviceIcon,
  iconColor,
  label,
  controlFields = [],
  noConfigMessage = 'Chưa có điều kiện được cấu hình'
}) => {
  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        height: 'auto'
      }}
    >
      <Grid container>
        {/* PHẦN 1: Label */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            //bgcolor: '#f5f5f5',
            p: 2,
            borderRight: { md: '1px solid #e0e0e0' },
            borderBottom: { xs: '1px solid #e0e0e0', md: 'none' },
            alignContent: 'center'
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DeviceIcon color={iconColor} />
            <Typography variant="subtitle1" fontWeight="900">
              {label}
            </Typography>
          </Stack>
        </Grid>

        {/* PHẦN 2: Điều kiện */}
        <Grid item xs={12} md={9} sx={{ p: 2 }}>
          {controlFields.length > 0 ? (
            <Stack spacing={3}>
              {controlFields.map((field, index) => (
                <ControlField key={`${deviceType}-field-${index}`} {...field} />
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {noConfigMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

// Component chính quản lý tất cả các thiết bị
const DeviceConfigPanel = ({
  selectedDevice,
  // Light
  lightValue,
  handleLightChange,
  // Fan
  fanTemp,
  handleFanTempChange,
  fanAqi,
  handleFanAqiChange,
  fanHum,
  handleFanHumChange,
  // Pump
  pumpTemp,
  handlePumpTempChange,

  // Heater
  heaterTemp,
  handleHeaterTempChange,
  // Options for dropdowns
  lightDataOptions,
  temperatureDataOptions,
  airQualityDataOptions,
  humidityDataOptions
}) => {
  // Cấu hình cho từng loại thiết bị
  const deviceConfigs = {
    light: {
      deviceType: 'light',
      icon: Lightbulb,
      iconColor: 'warning',
      label: 'Đèn',
      controlFields: [
        {
          label: ' Ánh sáng (Lux): Nhỏ hơn 30 là ánh sáng mạnh; Lớn hơn 80 là ánh sáng yếu',
          options: lightDataOptions,
          value: lightValue,
          onChange: handleLightChange,
          type: 'light'
        }
      ]
    },
    fan: {
      deviceType: 'fan',
      icon: Air,
      iconColor: 'primary',
      label: 'Quạt',
      controlFields: [
        {
          label: 'Nhiệt độ (°C)',
          options: temperatureDataOptions,
          value: fanTemp,
          onChange: handleFanTempChange,
          type: 'temperature'
        },
        {
          label: 'Chất lượng không khí (AQI): Nhỏ hơn 150 là chất lượng tốt; Lớn hơn 700 là ôi nhiễm',
          options: airQualityDataOptions,
          value: fanAqi,
          onChange: handleFanAqiChange,
          type: 'airQuality'
        },
        {
          label: 'Độ ẩm (%)',
          options: humidityDataOptions,
          value: fanHum,
          onChange: handleFanHumChange,
          type: 'humidity'
        }
      ]
    },
    pump: {
      deviceType: 'pump',
      icon: Opacity,
      iconColor: 'info',
      label: 'Máy bơm',
      controlFields: [
        {
          label: ' Nhiệt độ (°C)',
          options: humidityDataOptions,
          value: pumpTemp,
          onChange: handlePumpTempChange,
          type: 'temperature'
        }
      ] // Không có trường cấu hình
    },
    heater: {
      deviceType: 'heater',
      icon: Whatshot,
      iconColor: 'error',
      label: 'Sưởi',
      controlFields: [
        {
          label: 'Nhiệt độ (°C)',
          options: temperatureDataOptions,
          value: heaterTemp,
          onChange: handleHeaterTempChange,
          type: 'temperature'
        }
      ]
    }
  };
  return (
    <Stack spacing={3} sx={{ height: '100%', width: '100%', mt: 2 }}>
      {/* Render tất cả các thiết bị đã chọn */}
      {Object.keys(deviceConfigs).map((deviceKey) => {
        return selectedDevice[deviceKey] !== undefined ? <DeviceControl key={deviceKey} {...deviceConfigs[deviceKey]} /> : null;
      })}
    </Stack>
  );
};

export default DeviceConfigPanel;
