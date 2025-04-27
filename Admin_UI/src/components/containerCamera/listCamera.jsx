import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import { useAllCamera } from '../../service/useCamera';

const ListCamera = ({ refresh, onRefresh }) => {
  const headers = ['STT', 'Tên', 'Url', 'Tên Tài Khoản', 'Kiểu kết nối', 'Khu Vực', 'Chỉnh Sửa'];

  const { data, loading, error, refetchAreaDevice } = useAllCamera(refresh);
  // const { deleteDeviceConfig, loadingDelete } = useCalenderDeviceDelete();

  // useEffect(() => {
  //   refetchFetchData();
  // }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const result = await deleteDeviceConfig(id);
      if (result) {
        setNotification({ open: true, message: `Xóa thành công`, severity: 'success' });
        onRefresh(); // Gọi callback từ cha để cập nhật refreshFlag
      } else {
        setNotification({ open: true, message: `Không thể xóa`, severity: 'warning' });
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setNotification({ open: true, message: `Lỗi khi xóa: ${error.message}`, severity: 'error' });
    }
  };

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
                  <TableCell align="center">
                    <Button
                      sx={{ '&:hover': { color: 'red' }, border: '1px solid red', color: 'black' }}
                      // onClick={() => handleDelete(row.id)}
                      // disabled={loadingDelete}
                    >
                      {/* {loadingDelete ? <CircularProgress size={20} /> : 'Xóa'} */}
                      xóa
                    </Button>
                  </TableCell>
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
