import React, { useState } from 'react';
import { Button, Container, Dialog } from '@mui/material';
import DeleteAreaContent from '../containerArea/deleteAreaContent';
// import { UseDeleteArea } from '../../service/useArea';
const DeleteArea = () => {
  const [open, setOpenForm] = useState(false);
  const handleOpen = () => setOpenForm(true);
  const handleClose = () => setOpenForm(false);
  // const { DeleteArea, loading, succes, error } = UseDeleteArea();
  return (
    <Container>
      <Button variant="contained" onClick={handleOpen} sx={{ width: 150 }}>
        Xóa khu vực
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DeleteAreaContent />
      </Dialog>
    </Container>
  );
};

export default DeleteArea;
