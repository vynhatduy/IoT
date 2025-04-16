import { Box, Grid } from '@mui/material'; // Sửa import từ @mui/system sang @mui/material
import React from 'react';
import mockData from '../../data/mockdata.json';
import { Typography } from '@mui/material';
import ContainerDevice from './container';

const { device } = mockData;

const ListAllDevice = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {device.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Typography variant="h6" gutterBottom>
              {item.name}
            </Typography>
            <Box>
              <ContainerDevice dataDeviceManager={item.data} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListAllDevice;
