import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import SelectArea from '../components/button/selectArea';
import DatePicker from '../components/date/datePicker';
import SelectWeather from '../components/button/selectWeather';
import { blue } from '@mui/material/colors';
import BtnDownload from '../components/button/download'

// import { color, height, margin, padding, positions, width } from '@mui/system';
const ThongKeChiTiet = () => {
  return (
    <Box sx={{}}>
      <Typography>THONG KE CHI TIET</Typography>
      <StyleBackground>
        <Box>
          <Typography variant="button">THỐNG KÊ THEO KHU VỰC</Typography>
          <Box sx={{ margin: '10px 0px' }}>
            <SelectArea />
          </Box>
          <Stack direction={'row'} spacing={1}>
            <DatePicker />
            <SelectWeather sx={{ padding: '20px' }} />
            <BtnDownload/>
          </Stack>
        </Box>
        <Box sx={{ width: '100%', height: '300px', backgroundColor: blue[300], marginTop: { xs: '10px', md: '10px' } }}></Box>

      </StyleBackground>
    </Box>
  );
};

export default ThongKeChiTiet;
