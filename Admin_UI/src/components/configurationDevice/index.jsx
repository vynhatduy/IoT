import React, { useState } from 'react';
import { Button, Box, Stack, Typography, Container, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SelectArea from '../dropdown/selectArea';
import SelectDevice from '../dropdown/selectDevice';
import DatePicker from '../date/pickerDate';
import OnOffDropdown from '../dropdown/switchOnOff';
import { Refresh } from '../button/refresh';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomDatePicker from '../CustomDatePicker';

const Index = ({ onClose }) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = [
    { id: 1, title: 'Tên', component: <TextField fullWidth placeholder="Nhập tên..." /> },
    { id: 3, title: 'Chọn loại', component: <SelectDevice /> },
    {
      id: 4,
      title: 'Chọn khu vực',
      component: <SelectArea fullWidth onChange={(value) => console.log('Khu vực đã chọn:', value)} />
    },
    { id: 5, title: 'Chọn ngày', component: <DatePicker /> },
    { id: 6, title: 'Tình trạng', component: <OnOffDropdown /> }
  ];

  return (
    <Container sx={{margin: '16px 0px', width:1000}}>
      <Typography variant="h3" mb={2}>
        Cấu hình thiết bị mới
      </Typography>

      <Box sx={{ width: '100%', typography: 'body1', mt: 3 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Cấu hình chung" value="1" />
              <Tab label="Cấu hình riêng" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ flexGrow: 1 }}>
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
              <Grid mt={2}>
                <Refresh />
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="2">
            <Box sx={{ flexGrow: 1}}>
              <Grid mt={2}>
                <Refresh />
              </Grid>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>

      <Stack direction="row" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="warning" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="contained" color="success" onClick={onClose}>
          Hoàn thành
        </Button>
      </Stack>
    </Container>
  );
};

export default Index;
