import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



export const DownloadButtons = ({ onClick }) => {
  return (
    <Stack direction="row"  sx={{ paddingLeft: '70%', height: 50 }}>
      <Button variant="contained" onClick={onClick} sx={{width:100}}>
        Tải xuống
      </Button>
    </Stack>
  );
};

export const handleButtonClick = (event) => {
  console.log(" Button clicked!", event);
  alert("Đang phát triển");
};

// Component button
export const CreateButtons = ({ onClick = handleButtonClick }) => {
  return (
    <Stack direction="row" sx={{ width: "600px", height: 50 }}>
      <Button variant="contained" onClick={onClick} sx={{ width: 150 }}>
        Tạo cấu hình
      </Button>
    </Stack>
  );
};


