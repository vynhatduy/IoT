import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Container, Box, Typography, Menu } from '@mui/material';
import mockData from '../../data/mockdata.json';

const { temperature } = mockData;

export default function SelectHand() {
  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (event, id) => {
    setSelectedValues((prev) => ({
      ...prev,
      [id]: event.target.value
    }));
  };

  return (
    <Box>
      <Typography sx={{ margin: '10px 0px 0px 0px' }}>thông số thời tiết duy trì trong khoảng</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', margin: '10px 0px 0px 0px' }}>
        {temperature.map((item) => (
          <FormControl key={item.id} sx={{ minWidth: 113 }}>
            <InputLabel id={`select-label-${item.id}`}>{item.id}</InputLabel>
            <Select
              labelId={`select-label-${item.id}`}
              id={`select-${item.id}`}
              value={selectedValues[item.id] || ''}
              onChange={(event) => handleChange(event, item.id)}
            >
              {item.title.map((value) => (
                <MenuItem key={value} value={value}>
                  {value} {item.unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>
    </Box>
  );
}
