import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import mockdata from '../../data/mockdata.json';

const { area } = mockdata;

export default function SelectArea() {
  const [khuvuc, setKhuVuc] = React.useState('');

  const handleChange = (event) => {
    setKhuVuc(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="select-area-label">Khu vực</InputLabel>
      <Select labelId="select-area-label" id="select-area" value={khuvuc} onChange={handleChange} label="Khu vực">
        {area.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
