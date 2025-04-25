// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';

// export const DownloadButtonss = ({ onClick }) => {
//   return (
//     <Stack direction="row" sx={{ height: 50 }}>
//       <Button variant="contained" onClick={onClick} sx={{ width: 100 }}>
//         Tải xuống
//       </Button>
//     </Stack>
//   );
// };
import React from 'react';
import { Button, Stack } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const DownloadButtons = ({ data }) => {
  const downloadCSV = () => {
    if (!data || data.length === 0) return;

    // Tạo tiêu đề cho file CSV
    const headers = Object.keys(data[0]);
    let csvContent = headers.join(',') + '\n';

    // Thêm dữ liệu
    data.forEach((item) => {
      const row = headers.map((header) => {
        const value = item[header] !== undefined ? item[header] : '';
        // Xử lý giá trị chứa dấu phẩy
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      });
      csvContent += row.join(',') + '\n';
    });

    // Tạo và tải file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `weather_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const downloadJSON = () => {
  //   if (!data || data.length === 0) return;

  //   const jsonContent = JSON.stringify(data, null, 2);
  //   const blob = new Blob([jsonContent], { type: 'application/json' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.setAttribute('href', url);
  //   link.setAttribute('download', `weather_data_${new Date().toISOString().split('T')[0]}.json`);
  //   link.style.visibility = 'hidden';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <Stack direction="row" spacing={1}>
      <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={downloadCSV} size="small">
        CSV
      </Button>
      {/* <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={downloadJSON} size="small">
        JSON
      </Button> */}
    </Stack>
  );
};
