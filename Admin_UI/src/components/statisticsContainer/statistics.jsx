import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import DatePickeronly from '../date/pickerDate';
import { DownloadButtons } from '../button/download';
import SelectWeather from '../dropdown/selectWeather';
import SelectArea from '../dropdown/selectArea';
import mainStatis from './mainGraph';
const Statisticss = () => {
  return (
    <Box>
      {/* <Typography mt={1} mb={1}>
        Tìm kiếm dữ liệu theo
      </Typography>
      <Stack justifyContent={'center'} alignItems={'center'} direction={'row'}>
        <DatePickeronly />
        <SelectWeather />
        <Box ml={2}>
          <SelectArea />
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <DownloadButtons />
        </Box>
      </Stack>
      <Container sx={{ mt: 2 }}>
        <Typography>Biểu đồ</Typography>
      </Container> */}

      <mainStatis />
    </Box>
  );
};

export default Statisticss;
