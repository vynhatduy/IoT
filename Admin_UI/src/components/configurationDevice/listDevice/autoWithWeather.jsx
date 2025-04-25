import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { useAllDeviceConfigWeather } from '../../../service/useDeviceConfigWeather';

const ListWeather = ({ refresh }) => {
  const { data, error, loading, refetchFetchData } = useAllDeviceConfigWeather();
  const headers = ['STT', 'TÊN', 'MODULE', 'KHU VỰC', 'THIẾT BỊ', 'TỪ NGÀY', 'ĐẾN NGÀY', 'TÌNH TRẠNG'];

  useEffect(() => {
    refetchFetchData();
  }, [refresh]);
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

              <TableCell>{renderEditableCell(row.deviceName, rowIndex, 'deviceName')}</TableCell>

              <TableCell>{renderEditableCell(row.area, rowIndex, 'area')}</TableCell>

              <TableCell>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {row.conditions.light !== undefined && <div>Đèn-LUX: {row.conditions.light}</div>}
                  {row.conditions.pump !== undefined && <div>Máy bơm: {row.conditions.pump}°C</div>}
                  {row.conditions.heater !== undefined && <div>Sưởi: {row.conditions.heater}°C</div>}
                  {row.conditions.fan && (
                    <>
                      {row.conditions.fan.temperature !== undefined && <div>Quạt - Nhiệt độ: {row.conditions.fan.temperature}°C</div>}
                      {row.conditions.fan.humidity !== undefined && <div>Quạt - Độ ẩm: {row.conditions.fan.humidity}%</div>}
                      {row.conditions.fan.aqi !== undefined && <div>Quạt - AQI: {row.conditions.fan.aqi}</div>}
                    </>
                  )}
                </div>
              </TableCell>

              <TableCell align="center">
                {renderEditableCell(new Date(row.createAt).toLocaleString('vi-VN'), rowIndex, 'createAt')}
              </TableCell>

              <TableCell align="center">
                {renderEditableCell(new Date(row.updateAt).toLocaleString('vi-VN'), rowIndex, 'updateAt')}
              </TableCell>

              <TableCell align="center">{renderEditableCell(row.status ? 'Hoạt động' : 'Tắt', rowIndex, 'status')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListWeather;
