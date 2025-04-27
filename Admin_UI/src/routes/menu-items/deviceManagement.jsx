import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import WebIcon from '@mui/icons-material/Web';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import InfoIcon from '@mui/icons-material/Info';

const deviceManagement = {
  id: 'deviceManagement',
  title: 'Quản lý',
  type: 'group',
  url: '/admin/manage',
  breadcrumbs: false,
  children: [
    {
      id: 'thietBi',
      title: 'Thiết bị',
      type: 'item',
      url: '/admin/manage/quan-ly-thiet-bi',
      icon: DevicesOtherIcon,
      breadcrumbs: false
    },
    {
      id: 'khuvuc',
      title: 'Khu vực',
      type: 'item',
      url: '/admin/manage/quan-ly-khu-vuc',
      icon: WebIcon,
      breadcrumbs: false
    },
    {
      id: 'giamSatCamera',
      title: 'Camera',
      type: 'item',
      url: '/admin/manage/giam-sat-camera',
      icon: CameraOutdoorIcon,
      breadcrumbs: false
    },
    {
      id: 'lienHeHoTro',
      title: 'Liên hệ & Hỗ trợ',
      type: 'item',
      url: '/admin/manage/lien-he-ho-tro',
      icon: InfoIcon,
      breadcrumbs: false
    }
    // {
    //   id: 'quanLyThongSoMoiTruong',
    //   title: 'Thông số môi trường',
    //   type: 'item',
    //   url: '/admin/manage/thong-so-moi-truong',
    //   icon: VrpanoIcon,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'quanLyThongBaoCanhBao',
    //   title: 'Thông báo & cảnh báo',
    //   type: 'item',
    //   url: '/admin/manage/thong-bao-canh-bao',
    //   icon: UpcomingIcon,
    //   breadcrumbs: false
    // }
    // {
    //   id: 'quanLyQuyTrinhHoatDong',
    //   title: 'Quy trình hoạt động',
    //   type: 'item',
    //   url: '/admin/manage/quy-trinh-hoat-dong',
    //   icon: MediationIcon,
    //   breadcrumbs: false
    // }
  ]
};
export default deviceManagement;
