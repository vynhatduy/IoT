import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from 'components/cards/AnalyticEcommerce';
import UniqueVisitorCard from '../components/contentDashboard/UniqueVisitorCard';
import mockData from '../../data/mockdata.json';
// avatar style
// const avatarSX = {
//     width: 80,
//     height: 36,
//     fontSize: '4rem'
//   };

//   // action style
//   const actionSX = {
//     mt: 0.75,
//     ml: 1,
//     top: 'auto',
//     right: 'auto',
//     alignSelf: 'flex-start',
//     transform: 'none'
//   };

export default function DashboardDefault() {
  const { dataText } = mockData;
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Bảng điều khiển</Typography>
      </Grid>
      {dataText.map((item, key) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <AnalyticEcommerce 
          key={item.card} 
          title={item.title} 
          count={item.count} 
          percentage={item.percentage} 
          color={item.color} 
          extra={item.extra} />
        </Grid>
      ))}
      ;
      {/* <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
}
