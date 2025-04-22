import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
  Grid,
  Button
} from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';

const ContainerDevice = ({ deviceInfo, deviceData, selectedDevices = [], onDeleteSelected }) => {
  const [localDeviceData, setLocalDeviceData] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    if (deviceData && Array.isArray(deviceData)) {
      const updatedData = deviceData.map((device) => {
        const isChecked = selectedDevices.some((d) => d.originalId === device.originalId && d.groupType === device.groupType);
        return { ...device, checked: isChecked };
      });
      setLocalDeviceData(updatedData);
    }
  }, [deviceData, selectedDevices]);

  const handleCheckboxChange = (deviceId) => {
    const targetDevice = localDeviceData.find((d) => d.id === deviceId);
    if (!targetDevice) return;

    const { originalId } = targetDevice;
    const isChecked = !targetDevice.checked;

    const updatedDeviceData = localDeviceData.map((device) =>
      device.originalId === originalId ? { ...device, checked: isChecked } : device
    );
    setLocalDeviceData(updatedDeviceData);

    const selected = updatedDeviceData
      .filter((d) => d.checked)
      .map((d) => ({
        areaId: d.areaId,
        id: d.deviceId,
        groupType: d.groupType,
        originalId: d.originalId
      }));
    setSelectedList(selected);

    // Gửi danh sách đã chọn ra component cha
    onDeleteSelected?.(selected);
  };

  const onDevices = localDeviceData.filter((d) => d.status === true).length;
  const offDevices = localDeviceData.length - onDevices;

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Grid container spacing={3}>
        {/* Bảng bên trái */}
        <Grid item xs={12} md={10}>
          <TableContainer component={Paper}>
            <Box sx={{ height: 360, overflowY: 'auto' }}>
              <Table sx={{ height: 300 }} aria-label="device table">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                    <TableCell>Chọn</TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell>Khu vực</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {localDeviceData.length > 0 ? (
                    localDeviceData.map((device, idx) => (
                      <TableRow key={`${device.id}-${idx}`} hover>
                        <TableCell>
                          <Checkbox checked={device.checked} onChange={() => handleCheckboxChange(device.id)} />
                        </TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>{device.topic}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <span
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: device.status ? 'green' : 'gray',
                                display: 'inline-block'
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                minWidth: 80,
                                color: device.status ? 'text.primary' : 'gray'
                              }}
                            >
                              {device.status ? 'Đang bật' : 'Đang tắt'}
                            </Typography>
                            <PowerSettingsNew fontSize="small" sx={{ color: device.status ? 'green' : 'gray' }} />
                          </Box>
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

        {/* Bảng bên phải */}
        <Grid item xs={12} md={2}>
          <Box sx={{ bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin {deviceInfo.name || 'Thiết bị'}
            </Typography>
            <Typography style={{ textAlign: 'center' }}>
              Đang bật: {onDevices}
              <br />
              Đang tắt: {offDevices}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ContainerDevice;
