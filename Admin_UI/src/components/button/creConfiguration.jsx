import { useState } from 'react';
import { Stack, Button, Dialog } from '@mui/material';
// import Index from '../configurationDevice/newConfig/weather';
import Index from '../configurationDevice/newConfig';

const CreateButtonConfig = ({ onRefresh }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack direction="row" sx={{ height: 50 }}>
      <Button variant="contained" onClick={handleOpen} sx={{ width: 120 }}>
        Tạo cấu hình
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Index onClose={handleClose} onRefresh={onRefresh} />
      </Dialog>
    </Stack>
  );
};

export default CreateButtonConfig;
