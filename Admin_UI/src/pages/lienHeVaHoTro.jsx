import React from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import Infor from '../components/contactSupport/container';
const lienHeHoTro = () => {
  return (
    <Box>
      <StyleBackground>
        <Typography variant="subtitle1">LIEN HE HO TRO</Typography>
        <Infor></Infor>
      </StyleBackground>
    </Box>
  );
};

export default lienHeHoTro;
