import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const ListWeather = () => {
  const headers = ['STT', 'TÊN', 'LOẠI', 'KHU VỰC', 'SỐ THIẾT BỊ', 'ĐẾN GIÁ TRỊ', 'TỪ NGÀY', 'ĐẾN NGÀY', 'TÌNH TRẠNG', 'THAO TÁC'];

  const [data, setData] = useState([
    {
      id: 1,
      name: 'Thiết bị A',
      type: 'Đèn',
      region: 'KV1',
      devices: 5,
      fromDate: '03/30/2025 06:00 AM',
      toDate: '03/30/2025 01:00 PM',
      status: 'Hoạt động',
      isEditing: false
    },
    {
      id: 2,
      name: 'Thiết bị B',
      type: 'Camera',
      region: 'KV2',
      devices: 3,
      fromDate: '03/30/2025 03:39 PM',
      toDate: '03/30/2025 06:00 PM',
      status: 'Bảo trì',
      isEditing: false
    }
  ]);

  const handleEditToggle = (index) => {
    const newData = [...data];
    newData[index].isEditing = !newData[index].isEditing;
    setData(newData);
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const renderEditableCell = (value, index, field) => {
    return data[index].isEditing ? (
      <TextField
        fullWidth
        value={value}
        onChange={(e) => handleInputChange(index, field, e.target.value)}
        variant="standard"
        size="small"
      />
    ) : (
      value
    );
  };

  return (
    <TableContainer sx={{ margin: '0px 0px 0px 0px' }} component={Paper}>
      <Table aria-label="editable table">
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
              <TableCell>{renderEditableCell(row.name, rowIndex, 'name')}</TableCell>
              <TableCell>{renderEditableCell(row.type, rowIndex, 'type')}</TableCell>
              <TableCell>{renderEditableCell(row.region, rowIndex, 'region')}</TableCell>
              <TableCell align="center">{renderEditableCell(row.devices, rowIndex, 'devices')}</TableCell>
              <TableCell align="center">{renderEditableCell(row.fromDate, rowIndex, 'fromDate')}</TableCell>
              <TableCell align="center">{renderEditableCell(row.toDate, rowIndex, 'toDate')}</TableCell>
              <TableCell align="center">{renderEditableCell(row.status, rowIndex, 'status')}</TableCell>
              <TableCell align="center">
                <Button color="primary" size="small" onClick={() => handleEditToggle(rowIndex)}>
                  {row.isEditing ? 'Lưu' : 'Chỉnh sửa'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListWeather;
