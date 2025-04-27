import React, { useState } from 'react';
import { Container, Typography, Button, Stack, Box, Grid, Paper, Snackbar, Alert } from '@mui/material';
import { Lightbulb, AcUnit, Opacity, Whatshot, CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import SelectArea from '../dropdown/selectArea';
import { useAreaDeviceCreate, useIoTDeviceByArea } from '../../service/useAreaDevice';
import { SelectAllIoTDevice, SelectIoTDevice } from '../dropdown/selectIoTDevice';

const AddDevice = ({ onClose, onAddSuccess }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { create, loadingCreate, createError } = useAreaDeviceCreate();
  const { refetchAreaDevice } = useIoTDeviceByArea(selectedArea);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!selectedArea || !selectedDevice) {
      alert('Vui lòng chọn đầy đủ khu vực và thiết bị!');
      return;
    }

    const payload = {
      areaId: selectedArea.id ?? selectedArea.name,
      topic: selectedArea?.topic ?? selectedArea.name,
      deviceDetails: [
        {
          name: selectedDevice.deviceID,
          nameDevice: selectedDevice.name,
          model: selectedDevice.espModel,
          type: 0,
          details: [
            {
              pump: Boolean(selectedDevice?.pump),
              light: Boolean(selectedDevice?.light),
              fan: Boolean(selectedDevice?.fan),
              heater: Boolean(selectedDevice?.heater)
            }
          ]
        }
      ]
    };

    const result = await create(payload);
    if (result) {
      setShowSuccess(true);
      onAddSuccess(); // Gọi sự kiện thành công
    }
  };

  const formFields = [
    {
      id: 1,
      title: 'Chọn khu vực',
      component: <SelectArea fullWidth onChange={(area) => setSelectedArea(area)} />
    },
    {
      id: 2,
      title: 'Thiết bị điều khiển',
      component: <SelectAllIoTDevice areaId={selectedArea} onChange={(deviceObj) => setSelectedDevice(deviceObj)} />
    }
  ];

  return (
    <Container style={{ padding: 16, minWidth: 400, maxWidth: 500 }}>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => {
          setShowSuccess(false);
          onClose();
          refetchAreaDevice();
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" icon={<CheckCircleOutline fontSize="inherit" />} sx={{ width: '100%' }}>
          Tạo thiết bị thành công!
        </Alert>
      </Snackbar>

      <Snackbar open={!!createError} autoHideDuration={3000} onClose={() => {}} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" icon={<ErrorOutline fontSize="inherit" />} sx={{ width: '100%' }}>
          {`Không thể tạo thiết bị vui lòng kiểm tra lại.`}
        </Alert>
      </Snackbar>

      <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
        Thêm thiết bị
      </Typography>
      <Box>
        {formFields.map((item) => (
          <Grid container spacing={2} alignItems="center" marginBottom={2} key={item.id}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">{item.title}</Typography>
            </Grid>
            <Grid item xs={9}>
              {item.component}
            </Grid>
          </Grid>
        ))}
      </Box>

      {selectedDevice && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Thông tin thiết bị:
          </Typography>
          <Typography>
            <strong>Tên:</strong> {selectedDevice.deviceID}
          </Typography>
          <Typography>
            <strong>Model:</strong> {selectedDevice.espModel}
          </Typography>
          <Typography>
            <strong>Trạng thái:</strong> {selectedDevice.status}
            <span
              style={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                backgroundColor: selectedDevice.status.toLowerCase() === 'online' ? 'green' : 'gray',
                marginLeft: 20,
                display: 'inline-block'
              }}
            ></span>
          </Typography>

          <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
            {selectedDevice.light !== undefined && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Lightbulb color="warning" />
                <Typography>Đèn</Typography>
              </Stack>
            )}

            {selectedDevice.fan !== undefined && (
              <Stack direction="row" spacing={1} alignItems="center">
                <AcUnit color="primary" />
                <Typography>Quạt</Typography>
              </Stack>
            )}

            {selectedDevice.pump !== undefined && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Opacity color="info" />
                <Typography>Máy bơm</Typography>
              </Stack>
            )}

            {selectedDevice.heater !== undefined && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Whatshot color="error" />
                <Typography>Sưởi</Typography>
              </Stack>
            )}
          </Stack>
        </Paper>
      )}

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Button variant="contained" color="warning" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit} disabled={loadingCreate}>
          {loadingCreate ? 'Đang tạo...' : 'Hoàn thành'}
        </Button>
      </Stack>
    </Container>
  );
};

export default AddDevice;
