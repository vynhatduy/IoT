import { Box } from '@mui/material';
import React from 'react';
import { grey } from '@mui/material/colors';
const BackgroundPage = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: grey[200],
        borderRadius: 2,
        padding:'10px 20px 10px 20px'
      }}
    >{children}</Box>
  );
};

export default BackgroundPage;
