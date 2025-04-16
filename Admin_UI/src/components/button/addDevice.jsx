import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import AddDevice from '../popup/addDevice'

export default function AddDevicelButtons() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
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
          backgroundColor: '#4caf50',
          '&:hover': {
            backgroundColor: '#388e3c'
          }
        }}
      >
        Thêm thiết bị
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <AddDevice onClose={handleClose} />
      </Dialog>
    </Stack>
  );
}
