import React, { useState } from 'react';
import { Button, Box, Stack, Typography, Container, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SelectArea from '../../dropdown/selectArea';
import SelectDevice from '../../dropdown/selectDevice';
import DatePicker from '../../date/pickerDate';
import OnOffDropdown from '../../dropdown/switchOnOff';

const Calender = () => {
  const data = [
    { id: 1, title: 'Tên',          component: <TextField fullWidth placeholder="Nhập tên..." /> },
    { id: 5, title: 'Chọn ngày',    component: <DatePicker /> },
    { id: 3, title: 'Chọn loại',    component: <SelectDevice /> },
    {id: 4,  title: 'Chọn khu vực', component: <SelectArea fullWidth onChange={(value) => console.log('Khu vực đã chọn:', value)} />},
    { id: 6, title: 'Tình trạng',   component: <OnOffDropdown /> }
  ];

  return (
      <Box sx={{ width: '100%', typography: 'body1', mt: 3 }}>
        {data.map((item) => (
          <Grid container margin={'16px 0px'} spacing={2} alignItems="center" key={item.id}>
            <Grid item size={2}>
              <Typography variant="subtitle1">{item.title}</Typography>
            </Grid>
            <Grid item size={10}>
              {item.component}
            </Grid>
          </Grid>
        ))}
      </Box>
  );
};

export default Calender;
