import React from 'react';
import { Box, Button, Stack, Dialog, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddDevice from '../../components/popup/addDevice';

export const AddDevicelButtons = ({ onAddSuccess }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <AddDevice onClose={handleClose} onAddSuccess={onAddSuccess} />
      </Dialog>
    </Stack>
  );
};
