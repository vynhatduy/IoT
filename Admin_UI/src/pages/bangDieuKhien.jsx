// material-ui
// import Avatar from '@mui/material/Avatar';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';

// project imports
// import MainCard from 'components/MainCard';
// import MonthlyBarChart from 'common/contentNavbar/MonthlyBarChart';
// import ReportAreaChart from 'common/contentNavbar/ReportAreaChart';
// import SaleReportCard from "common/contentNavbar/SaleReportCard";
// import OrdersTable from "../common/contentNavbar/OrdersTable";
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import AnalyticEcommerce from 'components/cards/AnalyticEcommerce';
import UniqueVisitorCard from '../components/contentDashboard/UniqueVisitorCard';
import mockData from "../data/mockdata.json"
// assets
// import GiftOutlined from '@ant-design/icons/GiftOutlined';
// import MessageOutlined from '@ant-design/icons/MessageOutlined';
// import SettingOutlined from '@ant-design/icons/SettingOutlined';

// import avatar1 from 'assets/images/users/avatar-1.png';
// import avatar2 from 'assets/images/users/avatar-2.png';
// import avatar3 from 'assets/images/users/avatar-3.png';
// import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
// const avatarSX = {
//   width: 80,
//   height: 36,
//   fontSize: '4rem'
// };

// // action style
// const actionSX = {
//   mt: 0.75,
//   ml: 1,
//   top: 'auto',
//   right: 'auto',
//   alignSelf: 'flex-start',
//   transform: 'none'
// };


// ==============================|| DASHBOARD - DEFAULT ||============================== //
const {dataText} = mockData;

export default function DashboardDefault() {
  return (

    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Bảng điều khiển</Typography>
      </Grid>
      {dataText.map((item, key) => {
        const isLoss = item.count < item.previousValue;
        const color = isLoss? "warning":"primary";

        return(
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <AnalyticEcommerce
          key={item.card}
          title={item.title}
          count={item.count}
          percentage={item.percentage}
          color={color}
          extra={item.extra}
          isLoss={isLoss}
          />
        </Grid>
        )
      })}
      {/* row 2 */}
      <Grid size={{ xs: 12, md: 7, lg: 12 }}>
        <UniqueVisitorCard />
      </Grid>
     
    </Grid>
  );
}
