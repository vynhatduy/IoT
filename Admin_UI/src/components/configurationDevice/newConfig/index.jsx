import React, { useState } from 'react';
import { Button, Box, Stack, Typography, Container, TextField } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Calender from './calender';
import Weather from './weather';

const Index = ({ onClose }) => {
    const [value, setValue] = useState('thoitiet');
   
     const handleChange = (event, newValue) => {
       setValue(newValue);
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
          <Box sx={{ flexGrow: 1 }}><Weather/></Box>
          </TabPanel>

          <TabPanel value="lich">
          <Box sx={{ flexGrow: 1 }}><Calender/></Box>
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
