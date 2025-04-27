import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAreaDeviceDelete } from '../../service/useAreaDevice';

export const DeleteDevice = ({ listDelete, onAddSuccess }) => {
  const [open, setOpen] = React.useState(false);
  const { deleteDevices, deleteSuccess, loadingDelete, deleteError } = useAreaDeviceDelete();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    // Xử lý logic xóa thiết bị
    console.log('Đã xác nhận xóa các thiết bị: ', listDelete);

    // Gọi hook deleteDevices để xóa
    const success = await deleteDevices(listDelete);

    if (success) {
      console.log('Xóa thiết bị thành công!');
      onAddSuccess(); // Gọi hàm onAddSuccess (có thể là để cập nhật lại dữ liệu sau khi xóa)
    } else {
      console.error('Xóa thiết bị thất bại:', deleteError);
    }

    setOpen(false); // Đóng hộp thoại sau khi xử lý
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button fullWidth color="error" variant="contained" startIcon={<DeleteIcon fontSize="large" />} onClick={handleClickOpen}>
        Xóa thiết bị
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn xóa {listDelete.length} thiết bị đã chọn?</DialogContentText>
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
};
