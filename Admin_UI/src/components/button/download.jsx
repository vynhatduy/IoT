import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export const DownloadButtons = ({ onClick }) => {
  return (
    <Stack direction="row"  sx={{height: 50 }}>
      <Button variant="contained" onClick={onClick} sx={{width:100}}>
        Tải xuống
      </Button>
    </Stack>
  );
};





