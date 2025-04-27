import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import CreateButtonCamera from '../button/createCamera';
import ListCamera from './listCamera';
const ContainerCamera = () => {
  const [refreshKey, setRefreshKey] = useState(0); // trigger để reload

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // mỗi lần gọi sẽ khiến component ListArea re-render
  };
  return (
    <Box>
      <Typography mb={2}>Danh sách Camera</Typography>
      <CreateButtonCamera refresh={refreshKey} onRefresh={handleRefresh} />
      <Box>
        <Typography variant="subtitle1" mt={2}>
          Danh sách Camera
        </Typography>
        <ListCamera refresh={refreshKey} onRefresh={handleRefresh} />
      </Box>
    </Box>
  );
};

export default ContainerCamera;
