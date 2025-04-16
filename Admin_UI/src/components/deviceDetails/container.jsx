import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid2,
  Stack
} from '@mui/material';
import DeviceSwitch from '../switch/customSwitch2';
import Switch from '@mui/material/Switch';
import DeleteDevice from '../button/deleteDevice';
import AddDevicelButtons from '../button/addDevice';
import Checkbox from '@mui/material/Checkbox';
import { maxHeight } from '@mui/system';
import mockdata from '../../data/mockdata.json';
// Mock data for demonstration
const { lightdata } = mockdata;

const DeviceContainer = () => {
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    // mock API call
    setTimeout(() => {
      setDeviceData(lightdata);
    }, 500);
  }, []);

  // create from check in list device
  const handleCheckboxChange = (deviceId) => {
    const updated = deviceData.map((group) => ({
      ...group,
      data: group.data.map((device) => (device.id === deviceId ? { ...device, checked: !device.checked } : device))
    }));
    setDeviceData(updated);
  };

  // Create flattened array of all devices
  const allDevices = deviceData.flatMap((group) =>
    group.data.map((device) => ({
      ...device,
      groupkhuvuc: group.khuvuc
    }))
  );
  //create switch on/off
  const onDevices = allDevices.filter((d) => d.switch === 'on').length;
  const offDevices = allDevices.filter((d) => d.switch === 'off').length;
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    // TableLeft
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Box sx={{ maxHeight: 360, overflowY: 'auto' }}>
              <Table stickyHeader sx={{ minWidth: 300 }} aria-label="device table">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                    <TableCell>Chọn thiết bị</TableCell>
                    <TableCell>Tên thiết bị</TableCell>
                    <TableCell>Khu vực</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allDevices.length > 0 ? (
                    allDevices.map((device) => (
                      <TableRow key={device.id} hover>
                        <TableCell>
                          <Checkbox checked={device.checked} onChange={() => handleCheckboxChange(device.id)} />
                        </TableCell>
                        <TableCell>{device.ten}</TableCell>
                        <TableCell>{device.groupkhuvuc}</TableCell>
                        <TableCell>
                          <DeviceSwitch initialStatus={device.switch} deviceId={device.id} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                        <Typography color="text.secondary">Đang tải dữ liệu...</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </TableContainer>
        </Grid>
        {/* Table right */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Thống kê
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Tổng số thiết bị: {allDevices.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Số thiết bị đang bật: {onDevices}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Số thiết bị đang tắt: {offDevices}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Grid2>
            <Stack direction="row" spacing={2} alignItems={'center'} justifyContent="center">
              <Switch {...label} />
              <Typography>Bật toàn bộ</Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems={'center'} justifyContent="center">
              <Switch {...label} />
              <Typography>Tắt toàn bộ</Typography>
            </Stack>

            <Grid2>
              <AddDevicelButtons />
            </Grid2>

            <Grid2>
              <DeleteDevice />
            </Grid2>
          </Grid2>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DeviceContainer;
