import React from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import CreateConfig from '../components/configurationBoard/createConfiguration';
import TableComponent from '../components/configurationBoard/tableData';
import { CreateButtons } from '../components/button/download';
const cauHinhThietBi = () => {
  return (
    <Box>
      <Typography>CAU HINH THIET BI</Typography>
      <StyleBackground>
        {/* <CreateConfig> */}
        <CreateButtons />
        <TableComponent />
        {/* </CreateConfig> */}
      </StyleBackground>
    </Box>
  );
};

export default cauHinhThietBi;
