import React from 'react';
import { Stack, Button, Typography, Box } from '@mui/material';

const DialogDefault = ({ onClose, onSubmit }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Stack height={'auto'} width={'auto'}>
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="warning" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Hoàn thành
        </Button>
      </Stack>
    </Stack>
  );
};

export default DialogDefault;
