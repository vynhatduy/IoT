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
  Alert,
  Snackbar
} from '@mui/material';
import { useAllDeviceConfigWeather } from '../../../service/useDeviceConfigWeather';

const ListWeather = ({ refresh }) => {
  const { data, error, loading, refetchFetchData } = useAllDeviceConfigWeather();
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const headers = ['STT', 'TÊN', 'MODULE', 'KHU VỰC', 'THIẾT BỊ', 'TỪ NGÀY', 'ĐẾN NGÀY', 'TÌNH TRẠNG', 'CHỈNH SỬA'];
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    refetchFetchData();
  }, [refresh]);

  const handleInputChange = (index, field, value) => {
    console.log(`Changed ${field} to ${value} for item at index ${index}`);
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting with ID:', id);

      const response = await fetch(`${apiUrl}deviceConfig/according-weather/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        console.log('Delete successful');
        setNotification({ open: true, message: 'Xóa thành công!', severity: 'success' });
        refetchFetchData();
      } else {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        setNotification({ open: true, message: `Lỗi khi xóa: ${errorText}`, severity: 'error' });
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleString('vi-VN');
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
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex} hover>
                  <TableCell align="center">{rowIndex + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.deviceName}</TableCell>
                  <TableCell>{row.area}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {row.conditions?.light !== undefined && <div>Đèn-LUX: {row.conditions.light}</div>}
                      {row.conditions?.pump !== undefined && <div>Máy bơm: {row.conditions.pump}°C</div>}
                      {row.conditions?.heater !== undefined && <div>Sưởi: {row.conditions.heater}°C</div>}
                      {row.conditions?.fan && (
                        <>
                          {row.conditions.fan.temperature !== undefined && <div>Quạt - Nhiệt độ: {row.conditions.fan.temperature}°C</div>}
                          {row.conditions.fan.humidity !== undefined && <div>Quạt - Độ ẩm: {row.conditions.fan.humidity}%</div>}
                          {row.conditions.fan.aqi !== undefined && <div>Quạt - AQI: {row.conditions.fan.aqi}</div>}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="center">{formatDate(row.createAt)}</TableCell>
                  <TableCell align="center">{formatDate(row.updateAt)}</TableCell>
                  <TableCell align="center">{row.status ? 'Hoạt động' : 'Tắt'}</TableCell>
                  <TableCell align="center">
                    <Button sx={{ '&:hover': { color: 'red' }, color: 'black' }} onClick={() => handleDelete(row.id)}>
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

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
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

export default ListWeather;
