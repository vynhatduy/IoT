import React, { useCallback, useState } from 'react';
import {
  Button,
  Box,
  Stack,
  Typography,
  Container,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Calender from './calender';
import Weather from './weather';
import { useDeviceConfigWeatherCreate } from '../../../service/useDeviceConfigWeather';
import { useDeviceConfigCalenderCreate } from '../../../service/useCalenderConfig';

const Index = ({ onClose, onRefresh }) => {
  const [value, setValue] = useState('thoitiet');
  const [weatherConfig, setWeatherConfig] = useState(null);
  const [calendarConfig, setCalendarConfig] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Dialog xác nhận

  const { createWeather, createError, createSuccess, loadingCreate } = useDeviceConfigWeatherCreate();
  const { createCalender, createCalenderError, createCalenderSuccess, loadingCalenderCreate } = useDeviceConfigCalenderCreate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setErrorMessage('');
    if (newValue === 'thoitiet') {
      setCalendarConfig(null);
    } else if (newValue === 'lich') {
      setWeatherConfig(null);
    }
  };

  const handleCheckBeforeSubmit = () => {
    setErrorMessage('');
    if (value === 'thoitiet') {
      if (!weatherConfig || !weatherConfig.name || !weatherConfig.area || !weatherConfig.device || !weatherConfig.conditions) {
        setErrorMessage('Vui lòng điền đầy đủ thông tin cấu hình theo thời tiết.');
        return;
      }
    } else if (value === 'lich') {
      if (
        !calendarConfig ||
        !calendarConfig.name ||
        !calendarConfig.date ||
        !calendarConfig.device ||
        !calendarConfig.fan ||
        !calendarConfig.heater ||
        !calendarConfig.light ||
        !calendarConfig.pump
      ) {
        setErrorMessage('Vui lòng điền đầy đủ thông tin cấu hình theo lịch.');
        return;
      }
    }
    // Nếu hợp lệ thì mở dialog xác nhận
    setOpenConfirmDialog(true);
  };

  const handleSubmit = async () => {
    setOpenConfirmDialog(false); // Đóng dialog
    if (value === 'thoitiet') {
      const result = await createWeather(weatherConfig);
      if (result) {
        onClose();
        onRefresh?.();
      } else setErrorMessage('Tạo cấu hình thất bại. Vui lòng thử lại.');
    } else if (value === 'lich') {
      const result = await createCalender(calendarConfig);
      if (result) {
        onClose();
        onRefresh?.();
      } else setErrorMessage('Tạo cấu hình thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <Container sx={{ margin: '16px 0px', width: 700 }}>
      <Typography variant="h3" mb={2}>
        Cấu hình thiết bị mới
      </Typography>

      <Box sx={{ width: '100%', typography: 'body1', mt: 3 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Cấu hình theo thời tiết" value="thoitiet" />
              <Tab label="Cấu hình theo lịch" value="lich" />
            </TabList>
          </Box>
          <TabPanel value="thoitiet">
            <Weather onChange={setWeatherConfig} />
          </TabPanel>
          <TabPanel value="lich">
            <Calender onChange={setCalendarConfig} />
          </TabPanel>
        </TabContext>
      </Box>

      {errorMessage && (
        <Typography color="error" mt={2}>
          {errorMessage}
        </Typography>
      )}

      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="warning" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="contained" color="success" onClick={handleCheckBeforeSubmit}>
          Hoàn thành
        </Button>
      </Stack>

      {/* Backdrop loading */}
      <Backdrop open={loadingCreate} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Dialog xác nhận */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>
          <strong>Bạn có chắc muốn tạo cấu hình này?</strong>
        </DialogTitle>
        <DialogContent>
          <strong style={{ color: 'red' }}>Lưu ý:</strong>
          <li style={{ marginLeft: 20 }}>Sau khi tạo sẽ không thể sửa!</li>
          <li style={{ marginLeft: 20 }}>Xóa và tạo lại nếu có sai sót</li>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setOpenConfirmDialog(false)}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Index;
