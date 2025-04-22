// import * as React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const DatePickeronly = () => {
//   const [value, setValue] = React.useState(dayjs('2024-01-01'));

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker', 'DatePicker']}>
//         <DatePicker label="Ngày bắt đầu" defaultValue={dayjs('2024-01-01')} />
//         <DatePicker label="Ngày kết thúc" value={value} onChange={(newValue) => setValue(newValue)} />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// };
// export default DatePickeronly;
import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Stack, Typography, TextField } from '@mui/material';

const DatePickerOnly = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(dayjs('2025-04-10'));
  const [endDate, setEndDate] = useState(dayjs('2025-04-19'));

  const handleStartDateChange = (newDate) => {
    if (newDate) {
      setStartDate(newDate);
      onDateChange?.(newDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'));
    }
  };

  const handleEndDateChange = (newDate) => {
    if (newDate) {
      setEndDate(newDate);
      onDateChange?.(startDate.format('YYYY-MM-DD'), newDate.format('YYYY-MM-DD'));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Từ:</Typography>
        <DatePicker
          label="Ngày bắt đầu"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
        <Typography>Đến:</Typography>
        <DatePicker
          label="Ngày kết thúc"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePickerOnly;
