import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import mockdata from '../../data/mockdata.json';

const { weather } = mockdata;

export default function SelectWeather() {
  const [selectedWeather, setSelectedWeather] = React.useState('');

  const handleChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-weather-label">Thời tiết</InputLabel>
      <Select
        labelId="select-weather-label"
        id="select-weather"
        value={selectedWeather}
        onChange={handleChange}
        label="Thời tiết"
      >
        {weather.map((item) => (
          <MenuItem key={item.id} value={item.id}>
             {item.name} ({item.unit})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
