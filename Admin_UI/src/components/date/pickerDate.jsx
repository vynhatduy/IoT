import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Stack, Typography, TextField } from '@mui/material';

const DatePickerOnly = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(dayjs('2025-04-10'));
  const [endDate, setEndDate] = useState(dayjs('2025-04-19'));
  const [endDateError, setEndDateError] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      if (endDate.isBefore(startDate, 'day')) {
        setEndDateError(true);
      } else {
        setEndDateError(false);
        onDateChange?.(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
      }
    }
  }, [startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack spacing={1}>
          {/* <Typography>Từ:</Typography> */}
          <DatePicker
            label="Ngày bắt đầu"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Stack>
        <Stack spacing={1}>
          {/* <Typography>Đến:</Typography> */}
          <DatePicker
            label="Ngày kết thúc"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            renderInput={(params) => <TextField {...params} size="small" error={endDateError} sx={{ mt: 0.5 }} />}
          />
        </Stack>
      </Stack>
      <Typography style={{ color: 'red' }}>{endDateError ? 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu' : ''}</Typography>
    </LocalizationProvider>
  );
};

export default DatePickerOnly;
