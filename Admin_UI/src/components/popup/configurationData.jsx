import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, Alert } from '@mui/material';

const PopupDataConfig = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (!name || !email || !phone) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    setError('');
    // console.log("Thông tin đã gửi:", { name, email, phone });
    alert('Thông tin đã được gửi thành công!');
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Mở Popup
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="popup-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            margin: '0px 160px 0px 16px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography id="popup-title" variant="h5" component="h2" gutterBottom>
            Nhập thông tin của bạn
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            fullWidth
            label="Họ và tên"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            type="tel"
            variant="outlined"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2, width: '100%' }}>
            Gửi thông tin
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PopupDataConfig;
