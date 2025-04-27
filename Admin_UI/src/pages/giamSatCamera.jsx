import React from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import ContainerCamera from '../components/containerCamera/container';

const giamSatCamera = () => {
  return (
    <Box>
      <Typography>GIÁM SÁT CAMERA</Typography>
      <StyleBackground>
        <ContainerCamera />
      </StyleBackground>
    </Box>
  );
};

export default giamSatCamera;
