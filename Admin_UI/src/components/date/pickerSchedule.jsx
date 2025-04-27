import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const options = ['Hằng ngày', 'Khoảng thời gian'];

const SchedulePicker = ({ onScheduleChange }) => {
  const [mode, setMode] = useState('Hằng ngày');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (mode === 'Khoảng thời gian') {
      const parsed = parseInt(duration);
      if (!isNaN(parsed) && parsed > 0 && /^\d+$/.test(duration)) {
        setError(false);
        onScheduleChange?.({ mode: 'range', hours: parsed });
      } else if (duration !== '') {
        setError(true);
      }
    }
  }, [mode, duration]);

  const handleModeChange = (event, newValue) => {
    setMode(newValue);
    setDuration('');
    setError(false);
    if (newValue === 'Hằng ngày') {
      onScheduleChange?.({ mode: 'daily' });
    }
  };

  const handleValueChange = (newValue) => {
    setDuration(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        <Autocomplete
          freeSolo
          options={options}
          value={mode}
          onChange={(e, newValue) => handleModeChange(e, newValue)}
          onInputChange={(e, newInputValue, reason) => {
            if (reason === 'input') {
              handleModeChange(e, newInputValue);
            }
          }}
          getOptionLabel={(option) => option?.toString?.() ?? ''}
          renderInput={(params) => <TextField {...params} variant="outlined" fullWidth size="small" label="Chọn kiểu lịch" />}
        />

        {mode === 'Khoảng thời gian' && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Khoảng thời gian (giờ):</Typography>
            <Autocomplete
              freeSolo
              options={[]}
              value={duration}
              onChange={(e, newValue) => handleValueChange(newValue)}
              onInputChange={(e, newInputValue, reason) => {
                if (reason === 'input') {
                  handleValueChange(newInputValue);
                }
              }}
              getOptionLabel={(option) => option?.toString?.() ?? ''}
              renderInput={(params) => (
                <TextField {...params} type="number" placeholder="Nhập số giờ" variant="outlined" fullWidth size="small" error={error} />
              )}
            />
          </Stack>
        )}
      </Stack>
    </LocalizationProvider>
  );
};

export default SchedulePicker;
