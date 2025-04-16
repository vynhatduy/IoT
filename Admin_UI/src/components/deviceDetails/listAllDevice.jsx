import { Box, Grid } from '@mui/material';
import React from 'react';
import mockData from '../../data/mockdata.json';
import { Typography } from '@mui/material';
import ContainerDevice from './container';

const { device, alldevices } = mockData;

// Map loại thiết bị từ alldevices sang device
const deviceTypeMapping = {
  'light': 'Đèn',
  'fan': 'Quạt',
  'suoi': 'Máy Sưởi',
  'maybom': 'Máy Bơm'
  // Thêm các mapping khác nếu cần
};

const ListAllDevice = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {device.map((item) => {
          // Tìm dữ liệu tương ứng trong alldevices
          const deviceData = alldevices.find(
            deviceType => deviceTypeMapping[deviceType.loai] === item.name
          );
          
          // Chỉ hiển thị nếu có dữ liệu tương ứng
          if (!deviceData) return null;
          
          return (
            <Grid item xs={12} md={6} key={item}>
              <Typography variant="h6" gutterBottom>
                {item.name} {item.icon}
              </Typography>
              <Box>
                <ContainerDevice 
                  deviceInfo={item} 
                  deviceData={deviceData.data} 
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ListAllDevice;