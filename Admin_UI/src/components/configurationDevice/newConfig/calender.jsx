import React, { useState } from 'react';
import { Button, Box, Stack, Typography, Container, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SelectArea from '../../dropdown/selectArea';
import SelectDevice from '../../dropdown/selectDevice';
import DatePicker from '../../date/pickerDate';
import OnOffDropdown from '../../dropdown/switchOnOff';
import DateTimePickerValue from '../../date/pickerDateAndTime';

const Calender = () => {
  const data = [
    { id: 1, title: 'Tên', component: <TextField fullWidth placeholder="Nhập tên..." /> },
    { id: 2, title: 'Chọn ngày', component: <DateTimePickerValue /> },
    { id: 3, title: 'Chọn loại', component: <SelectDevice /> },
    { id: 4, title: 'Chọn khu vực', component: <SelectArea fullWidth /> }
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
