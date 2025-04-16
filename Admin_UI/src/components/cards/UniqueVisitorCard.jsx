import { useState } from 'react';

// Material UI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Project Imports
import MainCard from '../MainCard';
import IncomeAreaChart from '../contentDashboard/IncomeAreaChart';
import useDailyEnvironmentData from '../../service/useDailyEnvironmentData';
import SelectArea from '../../components/dropdown/selectArea';

export default function UniqueVisitorCard() {
  const [area, setArea] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const { data, loading, error } = useDailyEnvironmentData(area ? today : null, area);

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Thống kê</Typography>
          <SelectArea sx={{ margin: '10px 0px' }} onChange={(value) => setArea(value)} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MainCard content={true} sx={{ mt: 2 }}>
          <Box>{loading ? 'Đang tải dữ liệu...' : <IncomeAreaChart data={data || []} />}</Box>
        </MainCard>
      </Grid>
    </>
  );
}
