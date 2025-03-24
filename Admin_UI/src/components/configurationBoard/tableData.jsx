import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TableComponent = () => {
  const headers = [
    'STT',
    'TÊN',
    'LOẠI',
    'KHU VỰC',
    'SỐ THIẾT BỊ',
    'TỪ THIẾT BỊ',
    'ĐẾN GIÁ TRỊ',
    'TỪ NGÀY',
    'ĐẾN NGÀY',
    'TÌNH TRẠNG',
    'THAO TÁC'
  ];

  const data = [
    {
      id: 1,
      name: 'Thiết bị A',
      type: 'Cảm biến',
      region: 'Khu A',
      devices: 5,
      fromDevice: 1,
      toValue: 100,
      fromDate: '01/01/2024',
      toDate: '01/02/2024',
      status: 'Hoạt động',
      actions: 'Chỉnh sửa'
    },
    {
      id: 2,
      name: 'Thiết bị B',
      type: 'Camera',
      region: 'Khu B',
      devices: 3,
      fromDevice: 2,
      toValue: 200,
      fromDate: '02/01/2024',
      toDate: '02/02/2024',
      status: 'Bảo trì',
      actions: 'Chỉnh sửa'
    }
  ];

  const handleClick = (event) =>{
    console.log('Nhấn chuột', event)
    alert("Đang phát triển")
  };
  return (
    <TableContainer sx={{margin:'10px 0px 0px 0px'}} component={Paper}>  
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} align="center" style={{ fontWeight: 'bold' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell align="center">{row.devices}</TableCell>
              <TableCell align="center">{row.fromDevice}</TableCell>
              <TableCell align="center">{row.toValue}</TableCell>
              <TableCell align="center">{row.fromDate}</TableCell>
              <TableCell align="center">{row.toDate}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">
                <Button color="primary" size="small" onClick={handleClick}>
                  {row.actions}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
