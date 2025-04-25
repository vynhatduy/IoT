import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { useAllDeviceConfigCalender } from '../../../service/useCalenderConfig';

const ListCalender = ({ refresh }) => {
  const headers = ['STT', 'TÊN', 'MODULE', 'KHU VỰC', 'TỪ NGÀY', 'ĐẾN NGÀY', 'TÌNH TRẠNG'];
  const { refetchFetchData, data, error, loading } = useAllDeviceConfigCalender();
  console.log(data);
  useEffect(() => {
    refetchFetchData();
  }, refresh);

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
              <TableCell align="center">{rowIndex + 1}</TableCell>
              <TableCell>{renderEditableCell(row.name, rowIndex, 'name')}</TableCell>
              <TableCell>{renderEditableCell(row.device, rowIndex, 'device')}</TableCell>
              <TableCell>{renderEditableCell(row.area, rowIndex, 'area')}</TableCell>
              <TableCell align="center">{new Date(row.date.start).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell align="center">{new Date(row.date.end).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell align="center">{row.status ? 'Hoạt động' : 'Tạm tắt'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListCalender;
