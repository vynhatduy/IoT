// Import icons
import { DashboardOutlined } from '@ant-design/icons';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import InfoIcon from '@mui/icons-material/Info';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Bảng điều khiển',
      type: 'item',
      url: '/admin/dashboard',
      icon: DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
