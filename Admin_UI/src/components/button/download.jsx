import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const OutlinedButtons = ({ onClick }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ paddingLeft: 60, height: 50 }}>
      <Button variant="contained" onClick={onClick}>
        Tải xuống
      </Button>
    </Stack>
  );
};

export default OutlinedButtons;
