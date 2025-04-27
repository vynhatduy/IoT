import React, { useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Lightbulb, Air, Opacity, Whatshot } from '@mui/icons-material';
import TimePickerOnly from '../date/pickerTime';
import SchedulePicker from '../date/pickerSchedule';

// Component con cho một phần cấu hình (chỉ hiển thị 2 component TimePicker và SchedulePicker)
const ControlField = ({ label, component }) => {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" mb={1}>
        <strong>{label}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          {component}
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
const DeviceCalenderConfigPanel = ({
  selectedDevice,

  handleLightOnTimeChange,
  handleLightOnScheduleChange,

  handleFanOnTimeChange,
  handleFanOnScheduleChange,

  handlePumpOnTimeChange,
  handlePumpOnScheduleChange,

  handleHeaterOnTimeChange,
  handleHeaterOnScheduleChange
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
          label: 'Chọn giờ bật/tắt',
          component: <TimePickerOnly onTimeChange={handleLightOnTimeChange} />
        },
        {
          label: 'Loại lịch',
          component: <SchedulePicker onScheduleChange={handleLightOnScheduleChange} />
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
          label: 'Chọn giờ bật/tắt',
          component: <TimePickerOnly onTimeChange={handleFanOnTimeChange} />
        },
        {
          label: 'Loại lịch',
          component: <SchedulePicker onScheduleChange={handleFanOnScheduleChange} />
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
          label: 'Chọn giờ bật/tắt',
          component: <TimePickerOnly onTimeChange={handlePumpOnTimeChange} />
        },
        {
          label: 'Loại lịch',
          component: <SchedulePicker onScheduleChange={handlePumpOnScheduleChange} />
        }
      ]
    },
    heater: {
      deviceType: 'heater',
      icon: Whatshot,
      iconColor: 'error',
      label: 'Sưởi',
      controlFields: [
        {
          label: 'Chọn giờ bật/tắt',
          component: <TimePickerOnly onTimeChange={handleHeaterOnTimeChange} />
        },
        {
          label: 'Loại lịch',
          component: <SchedulePicker onScheduleChange={handleHeaterOnScheduleChange} />
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

export default DeviceCalenderConfigPanel;
