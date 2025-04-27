import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Paper, Grid } from '@mui/material';
import SelectArea from '../../dropdown/selectArea';
import { SelectIoTDevice } from '../../dropdown/selectIoTDevice';
import DeviceConfigPanel from '../../cards/deviceConditionCard';

// Define the data options
const lightDataOptions = [20, 30, 40, 50, 60, 70, 80];
const airQualityDataOptions = [150, 200, 300, 500, 600, 700, 800, 900];
const temperatureDataOptions = [15, 20, 25, 30];
const humidityDataOptions = [20, 30, 40, 50, 60, 70, 80];

const Weather = ({ onChange }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [name, setName] = useState(null);
  // State for light
  const [lightValue, setLightValue] = useState();

  // State for fan
  const [fanTemp, setFanTemp] = useState();
  const [fanAqi, setFanAqi] = useState();
  const [fanHum, setFanHum] = useState();
  // State for pump
  const [pumpTemp, setPumpTemp] = useState();

  // State for heater
  const [heaterTemp, setHeaterTemp] = useState();

  // Event handlers

  const handleLightChange = (value) => setLightValue(value);
  const handleFanTempChange = (value) => setFanTemp(value);
  const handleFanAqiChange = (value) => setFanAqi(value);
  const handleFanHumChange = (value) => setFanHum(value);
  const handlePumpTempChange = (value) => setPumpTemp(value);
  const handleHeaterTempChange = (value) => setHeaterTemp(value);

  const handleChangeName = (event) => setName(event.target.value);

  const data = [
    { id: 1, title: 'Tên', component: <TextField fullWidth value={name ?? ''} placeholder="Nhập tên..." onChange={handleChangeName} /> },
    { id: 2, title: 'Chọn khu vực', component: <SelectArea fullWidth onChange={(area) => setSelectedArea(area)} /> },
    {
      id: 3,
      title: 'Chọn loại',
      component: <SelectIoTDevice areaId={selectedArea} onChange={(deviceObj) => setSelectedDevice(deviceObj)} />
    }
  ];

  useEffect(() => {
    const configData = {
      name: name,
      area: selectedArea?.name ?? '',
      device: selectedDevice?.name ?? '',
      conditions: {}
    };

    if (lightValue) {
      configData.conditions.light = lightValue;
    }

    if (fanTemp || fanAqi || fanHum) {
      configData.conditions.fan = {
        temperature: fanTemp,
        aqi: fanAqi,
        humidity: fanHum
      };
    }

    if (heaterTemp) {
      configData.conditions.heater = heaterTemp;
    }

    if (pumpTemp) {
      configData.conditions.pump = pumpTemp;
    }

    if (onChange) {
      onChange(configData);
    }
  }, [selectedArea, selectedDevice, name, lightValue, fanTemp, fanAqi, fanHum, heaterTemp, pumpTemp, onChange]);

  return (
    <Box sx={{ width: '100%', typography: 'body1', mt: 3 }}>
      {data.map((item) => (
        <Grid container margin={'16px 0px'} spacing={2} alignItems="center" key={item.id}>
          <Grid item size={2}>
            <Typography variant="subtitle1">{item.title}</Typography>
          </Grid>
          <Grid item size={10}>
            {item.component}
          </Grid>
        </Grid>
      ))}

      {selectedDevice && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Thông tin thiết bị:
          </Typography>
          <Typography>
            <strong>Tên:</strong> {selectedDevice.nameDevice}
          </Typography>
          <Typography>
            <strong>Model:</strong> {selectedDevice.name}
          </Typography>

          <DeviceConfigPanel
            selectedDevice={selectedDevice.details[0]}
            // Light
            lightValue={lightValue}
            handleLightChange={handleLightChange}
            // Fan
            fanTemp={fanTemp}
            handleFanTempChange={handleFanTempChange}
            fanAqi={fanAqi}
            handleFanAqiChange={handleFanAqiChange}
            fanHum={fanHum}
            handleFanHumChange={handleFanHumChange}
            //Pump
            pumpTemp={pumpTemp}
            handlePumpTempChange={handlePumpTempChange}
            // Heater
            heaterTemp={heaterTemp}
            handleHeaterTempChange={handleHeaterTempChange}
            // Options
            lightDataOptions={lightDataOptions}
            temperatureDataOptions={temperatureDataOptions}
            airQualityDataOptions={airQualityDataOptions}
            humidityDataOptions={humidityDataOptions}
          />

          <Typography mt={2}>
            <strong style={{ color: 'red' }}>Lưu ý: </strong> Ngưỡng thông số cần thiết để tự động bật thiết bị <br />{' '}
            <strong>Giá trị vượt quá ngược thiết lập sẽ tự động bật.</strong>
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Weather;
