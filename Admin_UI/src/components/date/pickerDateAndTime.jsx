import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerValue() {
  // Set default start time to current time
  const [startValue, setStartValue] = React.useState(dayjs());
  // Set default end time to current time plus 1 hour
  const [endValue, setEndValue] = React.useState(dayjs().add(1, 'hour'));

  const handleStartChange = (newValue) => {
    setStartValue(newValue);
    
    // If end time is before the new start time, update end time to start time + 1 hour
    if (endValue && newValue && endValue.isBefore(newValue)) {
      setEndValue(newValue.add(1, 'hour'));
    }
  };

  const handleEndChange = (newValue) => {
    // Only update if the new end time is after or equal to start time
    if (newValue && startValue && newValue.isSameOrAfter(startValue)) {
      setEndValue(newValue);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker 
          label="Thời gian bắt đầu" 
          value={startValue} 
          onChange={handleStartChange}
        />
        <DateTimePicker 
          label="Thời gian kết thúc" 
          value={endValue} 
          onChange={handleEndChange}
          minDateTime={startValue}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}