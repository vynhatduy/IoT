import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAllAreaDevice } from '../../service/useAreaDevice';
import ContainerDevice from './container';

const deviceTypeMapping = {
  light: 'Đèn',
  fan: 'Quạt',
  heater: 'Máy Sưởi',
  pump: 'Máy Bơm'
};

const ListAllDevice = ({ refreshKey, onDeleteSelected, selectedDevices }) => {
  const { refetchFetchData, data, loading, error } = useAllAreaDevice();

  useEffect(() => {
    refetchFetchData();
  }, [refreshKey, refetchFetchData]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const groupedDevicesByType = {
    light: [],
    fan: [],
    heater: [],
    pump: []
  };

  const separatedDevices = [];
  data.forEach((area) => {
    const { topic, deviceDetails } = area;
    deviceDetails.forEach((device, deviceIdx) => {
      const { id, name, details } = device;
      details.forEach((statusObj, detailIndex) => {
        Object.entries(statusObj).forEach(([type, value]) => {
          if (deviceTypeMapping[type] !== undefined) {
            separatedDevices.push({
              id: `${area.id}-${id}-${deviceTypeMapping[type]}`,
              areaId: area.areaId,
              deviceId: area.id,
              originalId: id,
              name: `${deviceTypeMapping[type]} - Thiết bị ${deviceIdx + 1}`,
              groupType: type,
              label: deviceTypeMapping[type],
              status: value,
              topic
            });
          }
        });
      });
    });
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {Object.entries(groupedDevicesByType).map(([typeKey]) => (
          <Grid item xs={6} key={typeKey}>
            <Typography variant="h6" gutterBottom>
              {deviceTypeMapping[typeKey]}
            </Typography>
            <ContainerDevice
              deviceInfo={{ name: deviceTypeMapping[typeKey] }}
              deviceData={separatedDevices.filter((d) => d.groupType === typeKey)}
              selectedDevices={selectedDevices}
              onDeleteSelected={onDeleteSelected}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListAllDevice;
