import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import { useAllCamera } from '../../service/useCamera';

const ListCamera = ({ refresh, onRefresh }) => {
  const headers = ['STT', 'Tên', 'Url', 'Tên Tài Khoản', 'Kiểu kết nối', 'Khu Vực'];

  const { data, loading, error, refetchAreaDevice } = useAllCamera(refresh);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: '20px 0' }}>
        Lỗi khi tải dữ liệu: {error}
      </Alert>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} align="center" sx={{ fontWeight: 'bold' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.url || '-'}</TableCell>
                  <TableCell>{row.username || '-'}</TableCell>
                  <TableCell>{row.typeConnect || '-'}</TableCell>
                  <TableCell>{row.area || '-'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListCamera;
