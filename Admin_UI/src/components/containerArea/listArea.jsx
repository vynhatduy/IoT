import React, { useState } from 'react';
import { Button, Container, Grid, Paper, Typography, Box, Switch, Card, CardContent, styled } from '@mui/material';
import mockdata from '../../data/mockdata.json';
import DeviceSwitch from '../switch/customSwitch2';
import IOSSwitch from '../switch/customSwitchIos';

const { area } = mockdata;

// Mock sensor and device data for each area
const areaSensorData = {
  KV1: { temperature: 0, humidity: 0, light: 0, air: 0, devices: { pump: true, fan: true, light: true, sprinkler: true } },
  KV2: { temperature: 25, humidity: 60, light: 800, air: 400, devices: { pump: false, fan: true, light: false, sprinkler: true } },
  KV3: { temperature: 22, humidity: 55, light: 600, air: 350, devices: { pump: true, fan: false, light: true, sprinkler: false } },
  KV4: { temperature: 27, humidity: 70, light: 900, air: 420, devices: { pump: false, fan: false, light: false, sprinkler: true } },
  KV5: { temperature: 24, humidity: 65, light: 750, air: 380, devices: { pump: true, fan: true, light: false, sprinkler: false } },
  KV6: { temperature: 26, humidity: 50, light: 850, air: 410, devices: { pump: false, fan: true, light: true, sprinkler: true } }
};

// Custom styled switch for toggle buttons

const AreaDashboard = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [deviceStates, setDeviceStates] = useState({});

  // Handle area button click
  const handleAreaClick = (areaId) => {
    setSelectedArea(areaId);
    // Initialize device states for the selected area
    if (areaSensorData[areaId]) {
      setDeviceStates(areaSensorData[areaId].devices);
    }
  };

  // Toggle device state
  const handleDeviceToggle = (device) => {
    setDeviceStates((prev) => ({
      ...prev,
      [device]: !prev[device]
    }));
  };

  return (
    <Container>
      {/* Area Buttons */}
      <Grid container justifyContent={'center'} spacing={2} sx={{ mb: 4 }}>
        {area.map((item) => (
          <Grid item xs={4} key={item.id}>
            <Button
              variant={selectedArea === item.id ? 'contained' : 'outlined'}
              color="primary"
              fullWidth
              sx={{ height: 100 }}
              onClick={() => handleAreaClick(item.id)}
            >
              {item.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Dashboard Content - Only shown when an area is selected */}
      {selectedArea && (
        <Box>
          <Typography variant="h5" gutterBottom>
            {area.find((a) => a.id === selectedArea)?.name}
          </Typography>

          {/* Sensor Readings */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Độ ẩm
                </Typography>
                <Typography variant="h5">{areaSensorData[selectedArea]?.humidity || 0}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Nhiệt độ
                </Typography>
                <Typography variant="h5">{areaSensorData[selectedArea]?.temperature || 0}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Ánh sáng
                </Typography>
                <Typography variant="h5">{areaSensorData[selectedArea]?.light || 0}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Không khí
                </Typography>
                <Typography variant="h5">{areaSensorData[selectedArea]?.air || 0}</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {/* Animal List */}
            <Grid item xs={8}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                DANH SÁCH VẬT NUÔI
              </Typography>
              <Paper sx={{ height: 334, bgcolor: 'background.paper' }}>{/* Display list animal */}</Paper>
            </Grid>

            {/* Device Controls */}
            <Grid item xs={4}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                THIẾT BỊ
              </Typography>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography>Máy Bơm</Typography>
                    <IOSSwitch checked={deviceStates.pump || false} onChange={() => handleDeviceToggle('pump')} />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography>Quạt Gió</Typography>
                    <IOSSwitch checked={deviceStates.fan || false} onChange={() => handleDeviceToggle('fan')} />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography>Đèn</Typography>
                    <IOSSwitch checked={deviceStates.light || false} onChange={() => handleDeviceToggle('light')} />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>Máy sưởi</Typography>
                    <IOSSwitch checked={deviceStates.sprinkler || false} onChange={() => handleDeviceToggle('sprinkler')} />
                  </Box>
                </CardContent>
              </Card>

              {/* Camera Display */}
              <Paper
                sx={{
                  height: 150,
                  mt: 2,
                  bgcolor: '#e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  CAMERA
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default AreaDashboard;
