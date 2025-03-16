// assets
import { DashboardOutlined } from '@ant-design/icons';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import InfoIcon from '@mui/icons-material/Info';
// iconsnpm
// const icons = {
//   DashboardOutlined,
//   DevicesOtherIcon,
//   ParkIcon,
//   PieChartOutlineIcon
// };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Điều hướng',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Bảng điều khiển',
      type: 'item',
      url: '/',
      icon: DashboardOutlined,
      breadcrumbs: false
    },
    
    {
      id: 'deviceManagement',
      title: 'Quản lý thiết bị',
      type: 'item',
      url: '/deviceManagement',
      icon: DevicesOtherIcon,
      breadcrumbs: false,
      children: [
        // {
          
            {
              component: '/',
              name: 'Quản lý thông số môi trường',
              to: './'
            },
            {
              component: '/',
              name: 'Quản lý thông báo & cảnh báo',
              to: './'
            },
            {
              component: '/',
              name: 'Quản lý quy trình hoạt động',
              to: './'
            }
          ]
        // }
      // ]
    },


    {
      id: 'Cấu hình thiết bị',
      title: 'Cấu hình thiết bị',
      type: 'item',
      url: '/.',
      icon: PieChartOutlineIcon,
      breadcrumbs: false
    },
    {
      id: 'Thống kê chi tiết',
      title: 'Thống kê chi tiết',
      type: 'item',
      url: '/.',
      icon: WaterfallChartIcon,
      breadcrumbs: false
    },
    {
      id: 'Giám sát Camera',
      title: 'Giám sát Camera',
      type: 'item',
      url: '/.',
      icon: CameraOutdoorIcon,
      breadcrumbs: false
    },
    {
      id: 'Liên hệ & Hỗ trợ',
      title: 'Liên hệ & Hỗ trợ',
      type: 'item',
      url: '/.',
      icon: InfoIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;