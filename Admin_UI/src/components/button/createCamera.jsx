import React, { useState } from 'react';
import { Button, Dialog, Box, Typography, DialogActions, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SelectArea from '../dropdown/selectArea';
import { useCreateCamera } from '../../service/useCamera';

// Enum cho các kiểu kết nối
const ConnectionTypeEnum = {
  RTSP: 'RTSP',
  HTTP: 'HTTP',
  HTTPS: 'HTTPS',
  ONVIF: 'ONVIF'
};

const CreateButtonCamera = ({ refresh, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    port: '',
    username: '',
    password: '',
    typeConnect: '',
    area: null
  });
  const [errorMessage, setErrorMessage] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSuccessClose = () => setSuccessDialogOpen(false);
  const handleErrorClose = () => setErrorDialogOpen(false);

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleAreaChange = (area) => {
    setFormData((prev) => ({
      ...prev,
      area: area.name ?? area.id ?? area
    }));
  };

  const { createCamera, error } = useCreateCamera();

  const handleSubmit = async () => {
    // console.log('Form data:', formData);
    setErrorMessage(null);
    try {
      if (
        !formData.name ||
        !formData.url ||
        !formData.port ||
        !formData.typeConnect ||
        !formData.area ||
        !formData.username ||
        !formData.password
      ) {
        setErrorMessage('Vui lòng điền đầy đủ thông tin.');
        return;
      }
      const result = await createCamera(formData);
      if (result) {
        setSuccessDialogOpen(true); // Show success dialog
        onRefresh?.();
        handleClose();
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorDialogOpen(true); // Show error dialog
    }
  };

  const formFields = [
    { id: 1, title: 'Tên Camera', field: 'name', placeholder: 'Nhập tên...', type: 'text' },
    { id: 2, title: 'Địa chỉ Ip', field: 'url', placeholder: '192.186.1.1' },
    { id: 3, title: 'Cổng', field: 'port', placeholder: '8080', type: 'number' },
    { id: 4, title: 'Tên Tài Khoản', field: 'username', placeholder: 'Nhập tên tài khoản...' },
    { id: 5, title: 'Mật Khẩu', field: 'password', placeholder: 'Nhập mật khẩu...', type: 'password' }
  ];

  return (
    <Box>
      <Button variant="contained" sx={{ width: 120 }} onClick={handleOpen}>
        Tạo Camera
      </Button>

      {/* Dialog for creating camera */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          {formFields.map(({ id, title, field, placeholder, type }) => (
            <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }} key={id}>
              <Grid item xs={3}>
                <Typography>{title}</Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  placeholder={placeholder}
                  fullWidth
                  value={formData[field]}
                  onChange={handleInputChange(field)}
                  type={type || 'text'}
                />
              </Grid>
            </Grid>
          ))}

          {/* Kiểu kết nối */}
          <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <Typography>Kiểu Kết Nối</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth>
                <InputLabel>Chọn Kiểu Kết Nối</InputLabel>
                <Select value={formData.typeConnect} onChange={handleInputChange('typeConnect')} label="Chọn Kiểu Kết Nối">
                  {Object.keys(ConnectionTypeEnum).map((key) => (
                    <MenuItem key={key} value={ConnectionTypeEnum[key]}>
                      {ConnectionTypeEnum[key]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <Typography>Chọn Khu Vực</Typography>
            </Grid>
            <Grid item xs={9}>
              <SelectArea onChange={handleAreaChange} fullWidth />
            </Grid>
          </Grid>

          {errorMessage !== null && <Typography color="red">{errorMessage}</Typography>}

          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Đồng ý
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Success dialog */}
      <Dialog open={successDialogOpen} onClose={handleSuccessClose}>
        <Box sx={{ p: 3, minWidth: 250 }}>
          <Typography variant="h6" color="success.main">
            Tạo camera thành công!
          </Typography>
          <DialogActions>
            <Button onClick={handleSuccessClose}>Đóng</Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Error dialog */}
      <Dialog open={errorDialogOpen} onClose={handleErrorClose}>
        <Box sx={{ p: 3, minWidth: 250 }}>
          <Typography variant="h6" color="error.main">
            Lỗi khi tạo camera. Vui lòng thử lại!
          </Typography>
          <DialogActions>
            <Button onClick={handleErrorClose}>Đóng</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CreateButtonCamera;
