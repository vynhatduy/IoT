import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from 'components/cards/AnalyticEcommerce';
import UniqueVisitorCard from '../components/contentDashboard/UniqueVisitorCard';
import mockData from '../../data/mockdata.json';


export default function DashboardDefault() {
  const { dataText } = mockData;
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Bảng điều khiển</Typography>
      </Grid>
      {dataText.map((item, ) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <AnalyticEcommerce 
          key={item.card} 
          title={item.title} 
          count={item.count} 
          percentage={item.percentage} 
          color={item.color} 
          extra={item.extra} />
        </Grid>
      ))};
      <Grid size={{ xs: 12, md: 7, lg: 12 }}> 
        <UniqueVisitorCard />
      </Grid>
    </Grid>
  );
}
