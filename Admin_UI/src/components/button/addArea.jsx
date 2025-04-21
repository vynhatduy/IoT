import React, { useState } from 'react';
import { Button, Dialog } from '@mui/material';
import AddAreaContent from '../addArea/addAreaContent';
import { useCreateArea } from '../../service/useArea';

const AddArea = () => {
  const [open, setOpen] = useState(false);
  const { createArea, loading, error, success } = useCreateArea();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (payload) => {
    payload.id = '';
    console.log('payload', payload);
    const result = await createArea(payload);
    if (result) {
      console.log('Khu vực đã được tạo:', result);
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ width: 150 }}>
        Thêm khu vực
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <AddAreaContent onClose={handleClose} onSubmit={handleSubmit} />
      </Dialog>
    </div>
  );
};

export default AddArea;
