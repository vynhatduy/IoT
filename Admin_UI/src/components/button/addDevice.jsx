import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddDevicelButtons() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Xử lý logic xóa tại đây
    console.log('Đã xác nhận xóa');
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={2} marginBottom={2}>
      <Button
        fullWidth
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{
          backgroundColor: '#4caf50', // Màu xanh lá (MUI green[500])
          '&:hover': {
            backgroundColor: '#388e3c' // Màu hover (MUI green[700])
          }
        }}
      >
        Thêm thiết bị
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>...</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
