import { DashboardOutlined } from '@ant-design/icons';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import InfoIcon from '@mui/icons-material/Info';

export default navigation = {
  id: 'navigation',
  title: 'Điều hướng',
  type: 'group',
  url: '/admin/navigation',
  icon: DevicesOtherIcon,
  breadcrumbs: false,
  children: [
    {
      id: 'cauHinhThietBi',
      title: 'Cấu hình thiết bị',
      type: 'item',
      url: '/admin/navigation/cau-hinh-thiet-bi',
      icon: PieChartOutlineIcon,
      breadcrumbs: false
    },
    {
      id: 'thongKeChiTiet',
      title: 'Thống kê chi tiết',
      type: 'item',
      url: '/admin/navigation/thong-ke-chi-tiet',
      icon: WaterfallChartIcon,
      breadcrumbs: false
    },
    {
      id: 'giamSatCamera',
      title: 'Giám sát Camera',
      type: 'item',
      url: '/admin/navigation/giam-sat-camera',
      icon: CameraOutdoorIcon,
      breadcrumbs: false
    },
    {
      id: 'lienHeHoTro',
      title: 'Liên hệ & Hỗ trợ',
      type: 'item',
      url: '/admin/navigation/lien-he-ho-tro',
      icon: InfoIcon,
      breadcrumbs: false
    }
  ]
};
