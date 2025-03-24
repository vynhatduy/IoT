import { Box } from '@mui/material';
import React from 'react';
import { grey } from '@mui/material/colors';
const CreateConfig = ({children}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        backgroundColor: grey[100],
        borderRadius: 2,
        padding:'10px',
        margin:'20px 0px'
      }}
    >{children}</Box>
  );
};

export default CreateConfig;
