// import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import mockdata from '../../data/mockdata.json';

// const weathers = mockdata.weather;

// export default function SelectWeather() {
//   const [weather, setweather] = React.useState('');

//   const handleChange = (event) => {
//     setweather(event.target.value);
//   };

//   return (
//     <FormControl sx={{ ml: 2, paddingTop: 1, minWidth: 120 }} size="small">
//       <InputLabel id="weather-select-label">Chọn thời tiết</InputLabel>
//       <Select labelId="weather-select-label" id="weather-select" value={weather} label="Weather" onChange={handleChange}>
//         {/* <MenuItem value="">
//           <em>None</em>
//         </MenuItem> */}
//         {weathers.map((item) => (
//           <MenuItem key={item.id} value={item.id}>
//             {item.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectWeather = ({ onWeatherChange }) => {
  const [weather, setWeather] = useState('temperature');

  const handleChange = (event) => {
    const value = event.target.value;
    setWeather(value);
    if (onWeatherChange) {
      onWeatherChange(value);
    }
  };

  return (
    <FormControl sx={{ minWidth: 150, ml: 2 }}>
      <InputLabel id="weather-select-label">Chỉ số thời tiết</InputLabel>
      <Select labelId="weather-select-label" id="weather-select" value={weather} label="Chỉ số thời tiết" onChange={handleChange}>
        <MenuItem value="temperature">Nhiệt độ (°C)</MenuItem>
        <MenuItem value="humidity">Độ ẩm (%)</MenuItem>
        <MenuItem value="light">Ánh sáng (Lux)</MenuItem>
        <MenuItem value="airQuality">Không khí (AQI)</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SelectWeather;
