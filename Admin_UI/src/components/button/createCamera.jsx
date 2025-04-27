import React, { useState } from 'react';
import { Button, Dialog, Box, Typography, DialogActions, Grid, TextField } from '@mui/material';
import SelectArea from '../dropdown/selectArea';

const CreateButtonCamera = () => {
  const [open, setOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    topic: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAreaChange = (area) => {
    setSelectedArea(area);
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    console.log('Selected area:', selectedArea);
    // Xử lý lưu thông tin camera tại đây
    handleClose();
  };

  const formFields = [
    { id: 1, title: 'Tên Camera', component: <TextField placeholder="Nhập tên..." fullWidth /> },
    { id: 1, title: 'Tên Url', component: <TextField placeholder="Nhập url..." fullWidth /> },
    { id: 1, title: 'Tên Tài Khoản', component: <TextField placeholder="Nhập tên tài khoản..." fullWidth /> },
    { id: 1, title: 'Kiểu kết nối', component: <TextField placeholder="nhập kiểu kết nối..." fullWidth /> },
    { id: 1, title: 'Chọn Khu Vực', component: <SelectArea onAreaChange={handleAreaChange} fullWidth /> }
  ];

  return (
    <Box>
      <Button variant="contained" sx={{ width: '120px' }} onClick={handleOpen}>
        Tạo Camera
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3, width: '100%' }}>
          <Box>
            {formFields.map((item) => (
              <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }} key={item.id}>
                <Grid item xs={3}>
                  <Typography>{item.title}</Typography>
                </Grid>
                <Grid item xs={9}>
                  {item.component}
                </Grid>
              </Grid>
            ))}
          </Box>

          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Đồng ý
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CreateButtonCamera;
