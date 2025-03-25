import { lazy } from 'react';

// project imports
import Loadable from '../components/Loadable';
import DashboardLayout from '../layout/Dashboard/mainLayout';
import DashboardDefault from '../pages/bangDieuKhien';
import CauHinhThietBi from '../pages/cauHinhThietBi';
import GiamSatCamera from '../pages/giamSatCamera';
import LienHeHoTro from '../pages/lienHeVaHoTro';
import QuanLyThietBi from '../pages/quanLyThietBi';
import ThongKeChiTiet from '../pages/thongKeChiTiet';
import ThongSoMoiTruong from '../pages/thongSoMoiTruong';
import QuyTrinhHoatDong from '../pages/quyTrinhHoatDong';
import ThongBaoCanhBao from '../pages/thongBaoCanhBao';

// render- Dashboard
const DashboardDefaults = Loadable(lazy(() => import('../pages/bangDieuKhien')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefaults />
    },
    {
      path: '/navigation',
      children: [
        {
          path: 'cau-hinh-thiet-bi',
          element: <CauHinhThietBi />
        },
        {
          path: 'thong-ke-chi-tiet',
          element: <ThongKeChiTiet />
        },
        {
          path: 'giam-sat-camera',
          element: <GiamSatCamera />
        },
        {
          path: 'lien-he-ho-tro',
          element: <LienHeHoTro />
        }
      ]
    },
    {
      path: '/manage',
      children: [
        {
          path: 'quan-ly-thiet-bi',
          element: <QuanLyThietBi />
        },
        {
          path: 'thong-so-moi-truong',
          element: <ThongSoMoiTruong />
        },
        {
          path: 'thong-bao-canh-bao',
          element: <ThongBaoCanhBao />
        },
        {
          path: 'quy-trinh-hoat-dong',
          element: <QuyTrinhHoatDong />
        }
      ]
    }
  ]
};

export default MainRoutes;
