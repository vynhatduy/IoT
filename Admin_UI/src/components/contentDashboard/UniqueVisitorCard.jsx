import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import IncomeAreaChart from "./IncomeAreaChart";

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function UniqueVisitorCard() {
  const [view, setView] = useState('monthly'); // 'monthly' or 'weekly'

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <Typography variant="h5">Thống kê chung</Typography>
        </Grid>
        <Grid>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Button
              size="small"
              onClick={() => setView('monthly')}
              color={view === 'monthly' ? 'primary' : 'secondary'}
              variant={view === 'monthly' ? 'outlined' : 'text'}
            >
              Tháng
            </Button>
            <Button
              size="small"
              onClick={() => setView('weekly')}
              color={view === 'weekly' ? 'primary' : 'secondary'}
              variant={view === 'weekly' ? 'outlined' : 'text'}
            >
              Tuần
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid>
        <MainCard content={true} sx={{ mt: 2 }}>
          <Box >
            <IncomeAreaChart view={view} />
          </Box>
        </MainCard>
      </Grid>
    </>
  );
}
