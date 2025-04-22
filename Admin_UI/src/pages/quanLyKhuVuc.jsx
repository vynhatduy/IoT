import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import StyleBackground from '../themes/stylePage/backgroundPage';
import AddArea from '../components/button/addArea';
import ListArea from '../components/containerArea/listArea';

const KhuVuc = () => {
  const [refreshKey, setRefreshKey] = useState(0); // trigger để reload

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // mỗi lần gọi sẽ khiến component ListArea re-render
  };

  return (
    <Box>
      <Typography variant="subtitle1">Quản lý khu vực</Typography>
      <StyleBackground>
        <AddArea onRefresh={handleRefresh} />
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          Danh sách khu vực
        </Typography>
        <ListArea key={refreshKey} />
      </StyleBackground>
    </Box>
  );
};

export default KhuVuc;
