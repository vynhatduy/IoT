import { DashboardOutlined } from '@ant-design/icons';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import InfoIcon from '@mui/icons-material/Info';
const deviceManagement={
    id: 'deviceManagement',
    title: 'Quản lý',
    type: 'group',
    url:'/manage',
    icon: DevicesOtherIcon,
    breadcrumbs: false,
    children: [
        {
            id: 'thietBi',
            title: 'Thiết bị',
            type: 'item',
            url: '/manage/quan-ly-thiet-bi',
            icon: PieChartOutlineIcon,
            breadcrumbs: false
          },
      {
        id: 'quanLyThongSoMoiTruong',
        title: 'Thông số môi trường',
        type: 'item',
        url: '/manage/thong-so-moi-truong',
        icon: PieChartOutlineIcon,
        breadcrumbs: false
      },
      {
        id: 'quanLyThongBaoCanhBao',
        title: 'Thông báo & cảnh báo',
        type: 'item',
        url: '/manage/thong-bao-canh-bao',
        icon: WaterfallChartIcon,
        breadcrumbs: false
      },
      {
        id: 'quanLyQuyTrinhHoatDong',
        title: 'Quy trình hoạt động',
        type: 'item',
        url: '/manage/quy-trinh-hoat-dong',
        icon: CameraOutdoorIcon,
        breadcrumbs: false
      }
    ]
}
export default deviceManagement;