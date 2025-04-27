import React, { useState } from 'react';
import { Button, Container, Dialog } from '@mui/material';
import DeleteAreaContent from '../containerArea/deleteAreaContent';

const DeleteArea = ({ onRefresh }) => {
  const [open, setOpenForm] = useState(false);

  const handleOpen = () => setOpenForm(true);
  const handleClose = () => {
    setOpenForm(false);
    if (onRefresh) {
      onRefresh(); // Gọi hàm refresh khi dialog đóng (sau khi xóa thành công)
    }
  };

  return (
    <Container>
      <Button style={{ backgroundColor: 'red' }} variant="contained" onClick={handleOpen} sx={{ width: 150 }}>
        Xóa khu vực
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DeleteAreaContent onClose={handleClose} onRefresh={onRefresh} />
      </Dialog>
    </Container>
  );
};

export default DeleteArea;
