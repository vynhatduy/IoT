import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import { useAllCamera, useDeleteCamera } from '../../service/useCamera';

const ListCamera = ({ refresh, onRefresh }) => {
  const headers = ['STT', 'Tên', 'Url', 'Tên Tài Khoản', 'Kiểu kết nối', 'Khu Vực', 'Chỉnh Sửa'];
  const { data, loading, error } = useAllCamera(refresh);
  const { deleteCamera, loading: loadingDelete } = useDeleteCamera();
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const handleDelete = async (id) => {
    try {
      const result = await deleteCamera(id);
      if (result) {
        setNotification({ open: true, message: 'Xóa thành công', severity: 'success' });
        onRefresh();
      } else {
        setNotification({ open: true, message: 'Không thể xóa', severity: 'warning' });
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      setNotification({ open: true, message: `Lỗi khi xóa: ${err.message}`, severity: 'error' });
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, idx) => (
              <TableCell key={idx} align="center" sx={{ fontWeight: 'bold' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length ? (
            data.map((camera, idx) => (
              <TableRow key={camera.id || idx} hover>
                <TableCell align="center">{idx + 1}</TableCell>
                <TableCell>{camera.name}</TableCell>
                <TableCell>{camera.url || '-'}</TableCell>
                <TableCell>{camera.username || '-'}</TableCell>
                <TableCell>{camera.typeConnect || '-'}</TableCell>
                <TableCell>{camera.area || '-'}</TableCell>
                <TableCell align="center">
                  <Button
                    sx={{
                      '&:hover': { color: 'red' },
                      border: '1px solid red',
                      color: 'black'
                    }}
                    onClick={() => handleDelete(camera.id)}
                    disabled={loadingDelete}
                  >
                    Xóa
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
  );
};

export default ListCamera;
