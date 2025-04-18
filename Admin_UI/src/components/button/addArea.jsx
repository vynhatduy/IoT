import React from 'react';
import { useState } from 'react';
import { Button, Dialog } from '@mui/material';
import AddAreaContent from '../addArea/addAreaContent';
const AddArea = () => {
  const [open, setOpen] = useState(false);
  const handOpend = () => setOpen(true);
  const handClose = () => setOpen(false);
  return (
    <div>
      <Button variant="contained" onClick={handOpend} sx={{ width: 150 }}>
        Thêm khu vực
      </Button>
      <Dialog open={open} onClose={handClose}>
        <AddAreaContent onClose={handClose} />
      </Dialog>
    </div>
  );
};

export default AddArea;
