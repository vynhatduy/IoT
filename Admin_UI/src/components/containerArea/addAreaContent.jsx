import React, { useState } from 'react';
import { Box, Button, Stack, Grid, TextField, Typography } from '@mui/material';

const AddAreaContent = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    topic: ''
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {
    // Kiểm tra xem tất cả các trường đã được nhập
    if (formData.name && formData.topic) {
      // In dữ liệu ra console
      // console.log('Dữ liệu form đã gửi:', formData);
      // Gọi onSubmit nếu được cung cấp
      if (onSubmit) {
        onSubmit(formData);
      }
      // Làm trống tất cả các trường
      setFormData({
        areaName: '',
        topic: ''
      });
    } else {
      // Hiển thị thông báo nếu thiếu thông tin
      console.warn('Vui lòng nhập đầy đủ thông tin');
    }
  };

  const formFields = [
    { id: 1, title: 'Tên Khu vực', field: 'name', placeholder: 'Nhập tên...' },
    { id: 2, title: 'Topic', field: 'topic', placeholder: 'Nhập topic để quản lý...' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Thêm thiết bị
      </Typography>

      <Box>
        {formFields.map((item) => (
          <Grid container spacing={3} alignItems="center" sx={{ mb: 2 }} key={item.id}>
            <Grid item xs={3}>
              <Typography>{item.title}</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                placeholder={item.placeholder}
                value={formData[item.field]}
                onChange={handleChange(item.field)}
                required
              />
            </Grid>
          </Grid>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Stack direction="row" justifyContent="space-between">
          <Button variant="contained" color="warning" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Hoàn thành
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddAreaContent;
