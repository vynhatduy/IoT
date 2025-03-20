import { DashboardOutlined } from '@ant-design/icons';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import VrpanoIcon from '@mui/icons-material/Vrpano';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import MediationIcon from '@mui/icons-material/Mediation';
const deviceManagement={
    id: 'deviceManagement',
    title: 'Quản lý',
    type: 'group',
    url:'/manage',
    breadcrumbs: false,
    children: [
        {
            id: 'thietBi',
            title: 'Thiết bị',
            type: 'item',
            url: '/manage/quan-ly-thiet-bi',
            icon: DevicesOtherIcon,
            breadcrumbs: false
          },
      {
        id: 'quanLyThongSoMoiTruong',
        title: 'Thông số môi trường',
        type: 'item',
        url: '/manage/thong-so-moi-truong',
        icon: VrpanoIcon,
        breadcrumbs: false
      },
      {
        id: 'quanLyThongBaoCanhBao',
        title: 'Thông báo & cảnh báo',
        type: 'item',
        url: '/manage/thong-bao-canh-bao',
        icon: UpcomingIcon,
        breadcrumbs: false
      },
      {
        id: 'quanLyQuyTrinhHoatDong',
        title: 'Quy trình hoạt động',
        type: 'item',
        url: '/manage/quy-trinh-hoat-dong',
        icon: MediationIcon,
        breadcrumbs: false
      }
    ]
}
export default deviceManagement;