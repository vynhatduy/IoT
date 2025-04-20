import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import mockdata from '../../data/mockdata.json';

const weather = mockdata.weather;

export default function SelectWeather() {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl sx={{ ml: 2, paddingTop: 1, minWidth: 120 }} size="small">
      <InputLabel id="weather-select-label">Chọn thời tiết</InputLabel>
      <Select labelId="weather-select-label" id="weather-select" value={selectedValue} label="Weather" onChange={handleChange}>
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        {weather.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
