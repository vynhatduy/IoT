import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import AddArea from '../components/button/addArea';
import ListArea from '../components/containerArea/listArea';
import DeleteArea from '../components/button/deleteArea';

const KhuVuc = () => {
  const [refreshKey, setRefreshKey] = useState(0); // trigger để reload

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // mỗi lần gọi sẽ khiến component ListArea re-render
  };

  return (
    <Box>
      <Typography variant="subtitle1">QUẢN LÝ KHU VỰC</Typography>
      <StyleBackground>
        <Stack direction={'row'} spacing={2}>
          <AddArea onRefresh={handleRefresh} />
          <DeleteArea onRefresh={handleRefresh} />
        </Stack>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          Danh sách khu vực
        </Typography>
        <ListArea key={refreshKey} />
      </StyleBackground>
    </Box>
  );
};

export default KhuVuc;
