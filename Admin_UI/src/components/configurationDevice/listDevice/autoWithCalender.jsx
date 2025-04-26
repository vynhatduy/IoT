import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useAllDeviceConfigCalender, useCalenderDeviceDelete } from '../../../service/useCalenderConfig';

const ListCalender = ({ refresh, onRefresh }) => {
  const { data, error, loading, refetchFetchData } = useAllDeviceConfigCalender();
  const { deleteDeviceConfig, loadingDelete } = useCalenderDeviceDelete();

  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const headers = ['STT', 'TÊN', 'MODULE', 'KHU VỰC', 'TỪ NGÀY', 'ĐẾN NGÀY', 'TÌNH TRẠNG', 'CHỈNH SỬA'];

  useEffect(() => {
    refetchFetchData();
  }, [refresh]);

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

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const renderEditableCell = (value, index, field) => {
    return data[index]?.isEditing ? (
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

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    refetchFetchData(); // Re-fetch after change
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch (error) {
      console.error('Invalid date format:', error);
      return dateString;
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
        Lỗi khi tải dữ liệu: {error.message}
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
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex} hover>
                  <TableCell align="center">{rowIndex + 1}</TableCell>
                  <TableCell>{renderEditableCell(row.name, rowIndex, 'name')}</TableCell>
                  <TableCell>{renderEditableCell(row.device, rowIndex, 'device')}</TableCell>
                  <TableCell>{renderEditableCell(row.area, rowIndex, 'area')}</TableCell>
                  <TableCell align="center">{formatDate(row.date?.start)}</TableCell>
                  <TableCell align="center">{formatDate(row.date?.end)}</TableCell>
                  <TableCell align="center">{row.status ? 'Hoạt động' : 'Tạm tắt'}</TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{ '&:hover': { color: 'red' }, border: '1px solid red', color: 'black' }}
                      onClick={() => handleDelete(row.id)}
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? <CircularProgress size={20} /> : 'Xóa'}
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

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ListCalender;
