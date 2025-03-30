import { useState } from 'react';
import { Stack, Button, Dialog } from '@mui/material';
// import Index from '../configurationDevice/newConfig/weather';
import Index from '../configurationDevice/newConfig';
const CreateButtonConfig = () => {
  const [open, setOpen] = useState(false);
  const handOpend = () => setOpen(true);
  const handClose = () => setOpen(false);

  return (
    <Stack direction="row" sx={{height: 50 }}>
      <Button variant="contained" onClick={handOpend} sx={{ width: 120 }}>
        Tạo cấu hình
      </Button>
      <Dialog open={open} onClose={handClose}>
        <Index  onClose={handClose}/>
      </Dialog>
    </Stack>
  );
};

export default CreateButtonConfig;