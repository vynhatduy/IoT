import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomDatePicker = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker size={{ xs: 12, md: 7, lg: 12 }} label={label} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
