import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function OutlinedButtons() {
  return (
    <Stack direction="row" spacing={2} sx={{paddingLeft:60, height:50, }}>
      <Button   variant="contained">Tải xuống</Button>
    </Stack>
  );
}
