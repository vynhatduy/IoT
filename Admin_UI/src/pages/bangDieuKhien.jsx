
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from 'components/cards/AnalyticEcommerce';
import UniqueVisitorCard from '../components/cards/UniqueVisitorCard';
import mockData from "../data/mockdata.json"


// ==============================|| DASHBOARD - DEFAULT ||============================== //
const {dataText} = mockData;

export default function dashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid  sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Bảng điều khiển</Typography>
      </Grid>
      {dataText.map((item) => {
        const isLoss = item.count < item.previousValue;
        const color = isLoss ? "warning" : "primary";

        return (
          <Grid  size={{ xs: 12, sm:6,md: 4, lg: 3 }}>
            <AnalyticEcommerce
            key={item.card}
              title={item.title}
              count={item.count.toString()}
              percentage={item.percentage}
              color={color}
              extra={item.extra}
              isLoss={isLoss}

            />
          </Grid>
        );
      })}

      <Grid size={{ xs: 12, md: 7, lg: 12 }}>
        <UniqueVisitorCard />
      </Grid>
     
    </Grid>
    
  );
}