import React from 'react';
import Grid from '@mui/material/Grid2';
import AnalyticEcommerce from 'components/cards/AnalyticEcommerce';
import UniqueVisitorCard from '../components/contentDashboard/UniqueVisitorCard';
import { Typography } from '@mui/material';
const quanLyThietBi = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Bảng điều khiển</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Nhiệt độ" count="..." percentage={59.3} color="warning" extra="..." />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Độ ẩm" count="..." percentage={70.5} color="warning" extra="..." />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Ánh sáng" count="..." percentage={27.4} isLoss extra="..." />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Không khí" count="..." percentage={27.4} color="warning" extra="..." />
      </Grid>
      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
      {/* row 2 */}
      <Grid size={{ xs: 12, md: 7, lg: 12 }}>
        <UniqueVisitorCard />
      </Grid>
    </Grid>
  );
};

export default quanLyThietBi;
