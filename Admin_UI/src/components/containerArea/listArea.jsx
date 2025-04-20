import React, { useState, useEffect, useCallback } from 'react';
import { Button, Container, Grid, Paper, Typography, Box, Card, CardContent, Backdrop, CircularProgress } from '@mui/material';
import IOSSwitch from '../switch/customSwitchIos';
import useArea from '../../service/useArea';
import { useEnvironmentDataLatestByArea } from '../../service/useEnvironmentData';
import { useAreaDevice } from '../../service/useAreaDevice';
import { useControlDevice } from '../../service/useControlDevice';

const AreaDashboard = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [deviceStates, setDeviceStates] = useState({});
  const [changedDevices, setChangedDevices] = useState([]);
  // Thêm state để theo dõi khi nào cần tải lại dữ liệu
  const [refreshData, setRefreshData] = useState(0);

  const { areas } = useArea();

  // Handle area button click
  const handleAreaClick = (areaName, areaId) => {
    setSelectedArea(areaName);
    setSelectedAreaId(areaId);
    // Reset device states khi chuyển khu vực
    setDeviceStates({});
    setChangedDevices([]);
  };

  const { dataEnvironment, dataEnvironmentLoading, dataEnvironmentError } = useEnvironmentDataLatestByArea(selectedArea);

  // Truyền refreshData vào dependency array để tải lại dữ liệu khi refreshData thay đổi
  const { dataAreaDevice, loadingAreaDevice, errorAreaDevice, refetchAreaDevice } = useAreaDevice(selectedAreaId, refreshData);
  // Tạo hàm riêng để tải lại dữ liệu thiết bị
  const [isReloading, setIsReloading] = useState(false);

  const reloadDeviceData = useCallback(() => {
    setIsReloading(true); // bật popup loading

    setTimeout(() => {
      // Gây ra reload dữ liệu sau 1s
      setRefreshData((prev) => prev + 1);
      if (typeof refetchAreaDevice === 'function') {
        refetchAreaDevice();
      }

      setIsReloading(false); // tắt popup loading
    }, 1000); // thời gian loading giả lập (1 giây)
  }, [refetchAreaDevice]);

  // Toggle device state
  const handleDeviceToggle = (deviceId, controlType) => {
    const currentDevice = dataAreaDevice.find((d) => d.id === deviceId);
    if (!currentDevice) return;

    const originalStatus = currentDevice.details[0];

    setDeviceStates((prevStates) => {
      const updatedStates = { ...prevStates };
      const currentState = updatedStates[deviceId] ?? originalStatus;

      const newState = {
        ...currentState,
        [controlType]: !currentState[controlType]
      };

      updatedStates[deviceId] = newState;

      return updatedStates;
    });
  };

  // Reset device states khi dữ liệu thiết bị thay đổi
  useEffect(() => {
    if (dataAreaDevice?.length > 0) {
      // Cập nhật lại deviceStates với dữ liệu mới nhất từ API
      const initialDeviceStates = {};
      dataAreaDevice.forEach((device) => {
        if (device.details && device.details.length > 0) {
          initialDeviceStates[device.id] = device.details[0];
        }
      });

      // Cập nhật state nhưng chỉ cho các thiết bị chưa được thay đổi
      setDeviceStates((prevStates) => {
        const newStates = { ...prevStates };
        Object.keys(initialDeviceStates).forEach((deviceId) => {
          if (!changedDevices.includes(deviceId)) {
            newStates[deviceId] = initialDeviceStates[deviceId];
          }
        });
        return newStates;
      });
    }
  }, [dataAreaDevice]);

  // Calculate changed devices based on deviceStates
  useEffect(() => {
    if (!selectedAreaId || dataAreaDevice.length === 0) return;

    const updatedChanged = dataAreaDevice.reduce((acc, device) => {
      const original = device.details[0];
      const current = deviceStates[device.id];

      if (!current) return acc;

      const isChanged = Object.keys(original).some((key) => current[key] !== original[key]);
      if (isChanged) acc.push(device.id);

      return acc;
    }, []);

    setChangedDevices(updatedChanged);
  }, [deviceStates, dataAreaDevice, selectedAreaId]);

  const { controlDevice } = useControlDevice();

  const handleSubmit = async (data, deviceName, deviceId) => {
    const controlValues = deviceStates[deviceId];
    if (!controlValues) return;

    const payload = {
      deviceId: deviceName,
      ...Object.fromEntries(Object.entries(controlValues).map(([k, v]) => [k, v ? 1 : 0]))
    };

    const result = await controlDevice(payload);
    if (result) {
      reloadDeviceData();

      setChangedDevices((prev) => prev.filter((id) => id !== deviceId));
    } else {
    }
  };

  // Phần return component không thay đổi
  return (
    <Container>
      {/* Area Buttons */}
      <Grid container justifyContent={'center'} spacing={2} sx={{ mb: 4 }}>
        {areas.map((item) => (
          <Grid item xs={4} key={item.id}>
            <Button
              variant={selectedArea === item.id ? 'contained' : 'outlined'}
              color="primary"
              fullWidth
              sx={{ height: 100 }}
              onClick={() => handleAreaClick(item.name, item.id)}
            >
              {item.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Dashboard Content - Only shown when an area is selected */}
      {selectedArea && (
        <Box>
          {dataEnvironmentLoading ? (
            <Typography>Đang tải dữ liệu môi trường...</Typography>
          ) : !dataEnvironment || Object.keys(dataEnvironment).length === 0 ? (
            <Typography color="error">Không tìm thấy dữ liệu môi trường cho khu vực này.</Typography>
          ) : (
            <Box>
              <Typography variant="h5" gutterBottom>
                {areas.find((a) => a.name === selectedArea)?.name}
              </Typography>

              {/* Sensor Readings */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Độ ẩm
                    </Typography>
                    <Typography variant="h5">{dataEnvironment?.humidity || 0} %</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Nhiệt độ
                    </Typography>
                    <Typography variant="h5">{dataEnvironment?.temperature || 0} °C</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Ánh sáng
                    </Typography>
                    <Typography variant="h5">{dataEnvironment?.light || 0} LUX</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Không khí
                    </Typography>
                    <Typography variant="h5">{dataEnvironment?.airQuality || 0} AQI</Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                {/* Animal List */}
                <Grid item xs={8}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    CAMERA
                  </Typography>
                  <Paper sx={{ height: '65%', bgcolor: 'background.paper' }}>{/* Display list animal */}</Paper>
                </Grid>

                {/* Device Controls */}

                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isReloading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Grid item xs={4}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    THIẾT BỊ
                  </Typography>
                  <Card>
                    <CardContent>
                      {loadingAreaDevice ? (
                        <Typography>Đang tải dữ liệu thiết bị...</Typography>
                      ) : dataAreaDevice.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          Không tìm thấy thiết bị
                        </Typography>
                      ) : (
                        dataAreaDevice.map((device, idx) => (
                          <Box key={device.id || idx} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              {idx === 0 ? 'Thiết bị' : `Thiết bị ${idx + 1}`}
                            </Typography>

                            {device.details.length > 0 && (
                              <Box>
                                {/* Render các trường nếu có trong 'details' */}
                                {device.details[0].pump !== undefined && (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Máy Bơm</Typography>
                                    <IOSSwitch
                                      checked={!!(deviceStates[device.id]?.pump ?? device.details[0].pump)}
                                      onChange={() => handleDeviceToggle(device.id, 'pump')}
                                    />
                                  </Box>
                                )}
                                {device.details[0].light !== undefined && (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Đèn</Typography>
                                    <IOSSwitch
                                      checked={!!(deviceStates[device.id]?.light ?? device.details[0].light)}
                                      onChange={() => handleDeviceToggle(device.id, 'light')}
                                    />
                                  </Box>
                                )}
                                {device.details[0].fan !== undefined && (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Quạt</Typography>
                                    <IOSSwitch
                                      checked={!!(deviceStates[device.id]?.fan ?? device.details[0].fan)}
                                      onChange={() => handleDeviceToggle(device.id, 'fan')}
                                    />
                                  </Box>
                                )}
                                {device.details[0].heater !== undefined && (
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Máy Sưởi</Typography>
                                    <IOSSwitch
                                      checked={!!(deviceStates[device.id]?.heater ?? device.details[0].heater)}
                                      onChange={() => handleDeviceToggle(device.id, 'heater')}
                                    />
                                  </Box>
                                )}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                  <Button
                                    onClick={() => handleSubmit(deviceStates, device.name, device.id)}
                                    variant="outlined"
                                    disabled={!changedDevices.includes(device.id)}
                                    sx={{
                                      bgcolor: changedDevices.includes(device.id) ? 'green' : 'lightgreen',
                                      color: 'white',
                                      fontWeight: 'bold',
                                      cursor: changedDevices.includes(device.id) ? 'pointer' : 'not-allowed',
                                      '&:hover': {
                                        bgcolor: changedDevices.includes(device.id) ? 'darkgreen' : 'green'
                                      }
                                    }}
                                  >
                                    Xác nhận
                                  </Button>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default AreaDashboard;
