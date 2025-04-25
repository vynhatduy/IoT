import React, { useState } from 'react';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

const TimePickerOnly = ({ onTimeChange }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endTimeError, setEndTimeError] = useState(false);

  const validateAndEmit = (newStart, newEnd) => {
    if (newStart && newEnd) {
      if (newEnd.isAfter(newStart)) {
        setEndTimeError(false);
        onTimeChange?.(newStart.format('HH:mm:ss'), newEnd.format('HH:mm:ss'));
      } else {
        setEndTimeError(true);
      }
    }
  };

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
    validateAndEmit(newValue, endTime);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
    validateAndEmit(startTime, newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack spacing={1}>
          <Typography>Từ:</Typography>
          <TimePicker
            label="Giờ bắt đầu"
            value={startTime}
            onChange={handleStartTimeChange}
            slotProps={{
              textField: {
                size: 'small'
              }
            }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography>Đến:</Typography>
          <TimePicker
            label="Giờ kết thúc"
            value={endTime}
            onChange={handleEndTimeChange}
            slotProps={{
              textField: {
                size: 'small',
                error: endTimeError,
                helperText: endTimeError ? 'Giờ kết thúc phải sau giờ bắt đầu' : ''
              }
            }}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export default TimePickerOnly;
