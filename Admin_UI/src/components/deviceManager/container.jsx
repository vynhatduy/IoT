import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox } from '@mui/material';
import DeviceSwitch from '../switch/deviceSwitch'; // Giả sử component này đã tồn tại
// import AddDevicelButtons from '../button/addDevice';
// import DeleteDevice from '../button/deleteDevice';

const ContainerDevice = ({ deviceInfo, deviceData }) => {
  const [localDeviceData, setLocalDeviceData] = useState([]);

  useEffect(() => {
    // Giả lập API call để lấy dữ liệu
    setTimeout(() => {
      setLocalDeviceData(deviceData);
    }, 500);
  }, [deviceData]);

  // Xử lý sự kiện khi checkbox thay đổi
  const handleCheckboxChange = (deviceId) => {
    const updated = localDeviceData.map((area) => ({
      ...area,
      devices: area.devices.map((device) => (device.id === deviceId ? { ...device, checked: !device.checked } : device))
    }));
    setLocalDeviceData(updated);
  };

  // Tạo mảng phẳng chứa tất cả thiết bị
  const allDevices = localDeviceData.flatMap((area) =>
    area.devices.map((device) => ({
      ...device,
      groupkhuvuc: area.khuvuc
    }))
  );

  // Thống kê trạng thái thiết bị
  const onDevices = allDevices.filter((d) => d.switch === 'on').length;
  const offDevices = allDevices.filter((d) => d.switch === 'off').length;

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Box sx={{ maxHeight: 360, overflowY: 'auto' }}>
              <Table sx={{ minWidth: 300 }} aria-label="device table">
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
                    allDevices.map((device, idx) => (
                      <TableRow key={`${device.id}-${idx}`} hover>
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
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin {deviceInfo.name}
            </Typography>
            <Typography>
              Đang bật: {onDevices} thiết bị
              <br />
              Đang tắt: {offDevices} thiết bị
            </Typography>
          </Box>
          {/* <Box><DeleteDevice/></Box> */}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContainerDevice;
