import React from 'react';
import { Button } from '@mui/material';
const AddArea = ({ onClick }) => {
  return (
    <div>
      <Button variant="contained" onClick={onClick} sx={{ width: 150 }}>
        Thêm khu vực
      </Button>
    </div>
  );
};

export default AddArea;
