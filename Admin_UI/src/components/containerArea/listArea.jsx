import React, { useState, useEffect, useCallback } from 'react';
import { Button, Container, Grid, Paper, Typography, Box, Card, CardContent, Backdrop, CircularProgress } from '@mui/material';
import IOSSwitch from '../switch/customSwitchIos';
import { useArea } from '../../service/useArea';
import { useEnvironmentDataLatestByArea } from '../../service/useEnvironmentData';
import { useAreaDevice } from '../../service/useAreaDevice';
import { useControlDevice } from '../../service/useControlDevice';
import { useCameraByAreaId } from '../../service/useCamera';
import ListCardCamera from '../cards/listCardCamera';

const AreaDashboard = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [deviceStates, setDeviceStates] = useState({});
  const [changedDevices, setChangedDevices] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [isReloading, setIsReloading] = useState(false);

  const { areas } = useArea();
  const { controlDevice } = useControlDevice();

  const { dataEnvironment, dataEnvironmentLoading } = useEnvironmentDataLatestByArea(selectedArea);
  const { dataAreaDevice, loadingAreaDevice, refetchAreaDevice } = useAreaDevice(selectedAreaId, refreshData);
  const { data: cameraData, loading: cameraLoading, error: cameraError, refetchData: refetchCamera } = useCameraByAreaId(selectedArea);

  console.log('cameraData', cameraData);
  const handleAreaClick = (areaName, areaId) => {
    setSelectedArea(areaName);
    setSelectedAreaId(areaId);
    setDeviceStates({});
    setChangedDevices([]);
  };

  const reloadDeviceData = useCallback(() => {
    setIsReloading(true);
    setTimeout(() => {
      setRefreshData((prev) => prev + 1);
      refetchAreaDevice?.();
      setIsReloading(false);
    }, 1000);
  }, [refetchAreaDevice]);

  const handleDeviceToggle = (deviceId, controlType) => {
    const device = dataAreaDevice.find((d) => d.id === deviceId);
    if (!device) return;

    const originalStatus = device.details[0];
    setDeviceStates((prev) => ({
      ...prev,
      [deviceId]: {
        ...(prev[deviceId] ?? originalStatus),
        [controlType]: !(prev[deviceId] ?? originalStatus)[controlType]
      }
    }));
  };

  const handleSubmit = async (deviceState, deviceName, deviceId) => {
    const controlValues = deviceStates[deviceId];
    if (!controlValues) return;

    const payload = {
      area: selectedAreaId,
      deviceId: deviceName,
      ...Object.fromEntries(Object.entries(controlValues).map(([k, v]) => [k, v ? 1 : 0]))
    };

    const result = await controlDevice(payload);
    if (result) {
      reloadDeviceData();
      setChangedDevices((prev) => prev.filter((id) => id !== deviceId));
    }
  };

  useEffect(() => {
    if (dataAreaDevice?.length) {
      const initialStates = {};
      dataAreaDevice.forEach((device) => {
        if (device.details?.length) {
          initialStates[device.id] = device.details[0];
        }
      });

      setDeviceStates((prev) => {
        const updated = { ...prev };
        Object.keys(initialStates).forEach((id) => {
          if (!changedDevices.includes(id)) {
            updated[id] = initialStates[id];
          }
        });
        return updated;
      });
    }
  }, [dataAreaDevice]);

  useEffect(() => {
    if (!selectedAreaId || !dataAreaDevice?.length) return;

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

  return (
    <Container>
      {/* Chọn khu vực */}
      <Grid container justifyContent="center" spacing={2} mb={4}>
        {areas.map((area) => (
          <Grid item xs={4} key={area.id}>
            <Button
              variant={selectedArea === area.id ? 'contained' : 'outlined'}
              color="primary"
              fullWidth
              sx={{ height: 100 }}
              onClick={() => handleAreaClick(area.name, area.id)}
            >
              {area.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Nội dung Dashboard */}
      {selectedArea && (
        <Box>
          {dataEnvironmentLoading ? (
            <Typography>Đang tải dữ liệu môi trường...</Typography>
          ) : !dataEnvironment || Object.keys(dataEnvironment).length === 0 ? (
            <Typography color="error">Không tìm thấy dữ liệu môi trường cho khu vực này.</Typography>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {areas.find((a) => a.name === selectedArea)?.name}
              </Typography>

              {/* Hiển thị chỉ số môi trường */}
              <Grid container spacing={2} mb={2}>
                {[
                  { label: 'Độ ẩm', value: dataEnvironment?.humidity, unit: '%' },
                  { label: 'Nhiệt độ', value: dataEnvironment?.temperature, unit: '°C' },
                  { label: 'Ánh sáng', value: dataEnvironment?.light, unit: 'LUX' },
                  { label: 'Không khí', value: dataEnvironment?.airQuality, unit: 'AQI' }
                ].map((item, idx) => (
                  <Grid item xs={3} key={idx}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {item.label}
                      </Typography>
                      <Typography variant="h5">
                        {item.value ?? 0} {item.unit}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Camera & Thiết bị */}
              <Grid container spacing={2}>
                {/* CAMERA */}
                <Grid item xs={8}>
                  <Typography variant="subtitle1" mb={1}>
                    CAMERA
                  </Typography>
                  <Paper sx={{ height: '95%', width: '100%', bgcolor: 'background.paper' }}>
                    <Grid container spacing={2}>
                      {/* Các phần khác */}
                      <ListCardCamera cameras={cameraData} />
                    </Grid>
                  </Paper>
                </Grid>

                {/* THIẾT BỊ */}
                <Grid item xs={4}>
                  <Typography variant="subtitle1" mb={1}>
                    THIẾT BỊ
                  </Typography>
                  <Card>
                    <CardContent>
                      {loadingAreaDevice ? (
                        <Typography>Đang tải dữ liệu thiết bị...</Typography>
                      ) : dataAreaDevice?.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          Không tìm thấy thiết bị
                        </Typography>
                      ) : (
                        dataAreaDevice.map((device, idx) => (
                          <Box key={device.id} mb={2}>
                            <Typography variant="subtitle1" gutterBottom>
                              {`Thiết bị ${idx + 1}`}
                            </Typography>
                            {device.details?.length > 0 && (
                              <Box>
                                {['pump', 'light', 'fan', 'heater'].map(
                                  (key) =>
                                    device.details[0][key] !== undefined && (
                                      <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                                        <Typography>
                                          {key === 'pump' ? 'Máy Bơm' : key === 'light' ? 'Đèn' : key === 'fan' ? 'Quạt' : 'Máy Sưởi'}
                                        </Typography>
                                        <IOSSwitch
                                          checked={!!(deviceStates[device.id]?.[key] ?? device.details[0][key])}
                                          onChange={() => handleDeviceToggle(device.id, key)}
                                        />
                                      </Box>
                                    )
                                )}
                                <Box display="flex" justifyContent="flex-end" mt={1}>
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

              {/* Loading overlay */}
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isReloading}>
                <CircularProgress color="inherit" />
              </Backdrop>
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default AreaDashboard;
