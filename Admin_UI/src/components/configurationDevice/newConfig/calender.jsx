import React, { useEffect, useRef, useState } from 'react';
import { Button, Box, Stack, Typography, Container, TextField, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SelectArea from '../../dropdown/selectArea';
import { SelectIoTDevice } from '../../dropdown/selectIoTDevice';
import DatePickerOnly from '../../date/pickerDate';
import TimePickerOnly from '../../date/pickerTime';
import DeviceCalenderConfigPanel from '../../cards/deviceCalenderConfig';
import SchedulePicker from '../../date/pickerSchedule';

const Calender = ({ onChange }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [name, setName] = useState(null);
  const [date, setDate] = useState({ start: '', end: '' });
  const [lightTime, setLightTime] = useState({ start: '', end: '' });
  const [lightSchedule, setLightSchedule] = useState(null);

  const [fanTime, setFanTime] = useState({ start: '', end: '' });
  const [fanSchedule, setFanSchedule] = useState(null);

  const [pumpTime, setPumpTime] = useState({ start: '', end: '' });
  const [pumpSchedule, setPumpSchedule] = useState(null);

  const [heaterTime, setHeaterTime] = useState({ start: '', end: '' });
  const [heaterSchedule, setHeaterSchedule] = useState(null);

  const handleChangeName = (event) => setName(event.target.value);
  const handleOnDateChange = (start, end) => {
    setDate({ start, end });
  };
  const data = [
    { id: 1, title: 'Tên', component: <TextField fullWidth value={name ?? ''} placeholder="Nhập tên..." onChange={handleChangeName} /> },
    { id: 2, title: 'Chọn khu vực', component: <SelectArea fullWidth onChange={(area) => setSelectedArea(area)} /> },
    {
      id: 3,
      title: 'Chọn loại',
      component: <SelectIoTDevice areaId={selectedArea} onChange={(deviceObj) => setSelectedDevice(deviceObj)} />
    },
    { id: 4, title: 'Chọn ngày', component: <DatePickerOnly onDateChange={handleOnDateChange} /> }
  ];

  const handleLightOnTimeChange = (start, end) => {
    setLightTime({ start, end });
  };

  const handleLightOnScheduleChange = (schedule) => {
    setLightSchedule(schedule);
  };

  const handleFanOnTimeChange = (start, end) => {
    setFanTime({ start, end });
  };

  const handleFanOnScheduleChange = (schedule) => {
    setFanSchedule(schedule);
  };

  const handlePumpOnTimeChange = (start, end) => {
    setPumpTime({ start, end });
  };

  const handlePumpOnScheduleChange = (schedule) => {
    setPumpSchedule(schedule);
  };

  const handleHeaterOnTimeChange = (start, end) => {
    setHeaterTime({ start, end });
  };

  const handleHeaterOnScheduleChange = (schedule) => {
    setHeaterSchedule(schedule);
  };

  const prevConfigRef = useRef(null);

  useEffect(() => {
    if (!name && !date && !selectedArea && !selectedDevice && !date.start && !date.end) {
      return;
    }
    const configData = {
      name,
      date,
      area: selectedArea?.name ?? '',
      device: selectedDevice?.name ?? '',
      ...(lightTime.start || lightTime.end || lightSchedule ? { light: { time: lightTime, schedule: lightSchedule } } : {}),
      ...(fanTime.start || fanTime.end || fanSchedule ? { fan: { time: fanTime, schedule: fanSchedule } } : {}),
      ...(pumpTime.start || pumpTime.end || pumpSchedule ? { pump: { time: pumpTime, schedule: pumpSchedule } } : {}),
      ...(heaterTime.start || heaterTime.end || heaterSchedule ? { heater: { time: heaterTime, schedule: heaterSchedule } } : {})
    };
    //So sánh với config cũ
    if (JSON.stringify(prevConfigRef.current) !== JSON.stringify(configData)) {
      prevConfigRef.current = configData;
      onChange?.(configData);
    }
  }, [
    name,
    date,
    selectedArea,
    selectedDevice,
    lightTime,
    fanTime,
    pumpTime,
    heaterTime,
    lightSchedule,
    fanSchedule,
    pumpSchedule,
    heaterSchedule,
    onChange
  ]);

  return (
    <Box sx={{ width: '100%', typography: 'body1', mt: 3 }}>
      {data.map((item, itemIdx) => (
        <Grid container margin={'16px 0px'} spacing={2} alignItems="center" key={itemIdx}>
          <Grid item size={2}>
            <Typography variant="subtitle1">{item.title}</Typography>
          </Grid>
          <Grid item size={10}>
            {item.component}
          </Grid>
        </Grid>
      ))}
      {selectedDevice?.details?.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Thông tin thiết bị:
          </Typography>
          <Typography>
            <strong>Tên:</strong> {selectedDevice.nameDevice}
          </Typography>
          <Typography>
            <strong>schedulel:</strong> {selectedDevice.name}
          </Typography>

          <DeviceCalenderConfigPanel
            selectedDevice={selectedDevice.details[0] ?? null}
            handleLightOnTimeChange={handleLightOnTimeChange}
            handleLightOnScheduleChange={handleLightOnScheduleChange}
            handleFanOnTimeChange={handleFanOnTimeChange}
            handleFanOnScheduleChange={handleFanOnScheduleChange}
            handlePumpOnTimeChange={handlePumpOnTimeChange}
            handlePumpOnScheduleChange={handlePumpOnScheduleChange}
            handleHeaterOnTimeChange={handleHeaterOnTimeChange}
            handleHeaterOnScheduleChange={handleHeaterOnScheduleChange}
          />

          <Typography mt={2}>
            <strong style={{ color: 'red' }}>Lưu ý: </strong>
            <br />- Chọn hàng ngày là thiết bị sẽ tự động bật hàng ngày. <br />- Chọn khoảng thời gian là thiết bị sẽ cách thời gian sẽ bật
            (ví dụ nhập 2 thì ngày hôm nay bật và 2 ngày sau sẽ bật lại).
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Calender;
