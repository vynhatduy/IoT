import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDevice() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Xử lý logic xóa tại đây
    console.log("Đã xác nhận xóa");
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        color="error"
        variant="contained"
        startIcon={<DeleteIcon fontSize="large" />}
        onClick={handleClickOpen}
      >
        Xóa thiết bị
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Vui lòng chọn thiết bị.
          </DialogContentText>
        </DialogContent>
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
