import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from '../components/Loadable';
import DashboardLayout from '../layout/Dashboard/mainLayout';
import ProtectedRoute from './ProtectedRoute'; // Kiểm tra token trước khi vào admin

// Lazy load pages
const Dashboard = Loadable(lazy(() => import('../pages/bangDieuKhien')));
const CauHinhThietBi = Loadable(lazy(() => import('../pages/cauHinhThietBi')));
const GiamSatCamera = Loadable(lazy(() => import('../pages/giamSatCamera')));
const LienHeHoTro = Loadable(lazy(() => import('../pages/lienHeVaHoTro')));
const QuanLyThietBi = Loadable(lazy(() => import('../pages/quanLyThietBi')));
const ThongKeChiTiet = Loadable(lazy(() => import('../pages/thongKeChiTiet')));
const ThongSoMoiTruong = Loadable(lazy(() => import('../pages/thongSoMoiTruong')));
const QuyTrinhHoatDong = Loadable(lazy(() => import('../pages/quyTrinhHoatDong')));
const ThongBaoCanhBao = Loadable(lazy(() => import('../pages/thongBaoCanhBao')));
const KhuVuc = Loadable(lazy(() => import('../pages/quanLyKhuVuc')));
const MainRoutes = {
  path: '/admin',
  element: <ProtectedRoute />, // Chỉ kiểm tra token cho Admin
  children: [
    {
      path: '',
      element: <DashboardLayout requiredRole="Admin" />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        {
          path: 'navigation',
          children: [
            { path: 'cau-hinh-thiet-bi', element: <CauHinhThietBi /> },
            { path: 'thong-ke-chi-tiet', element: <ThongKeChiTiet /> }
            // { path: 'giam-sat-camera', element: <GiamSatCamera /> },
          ]
        },
        {
          path: 'manage',
          children: [
            { path: 'quan-ly-thiet-bi', element: <QuanLyThietBi /> },
            { path: 'quan-ly-khu-vuc', element: <KhuVuc /> },
            { path: 'thong-so-moi-truong', element: <ThongSoMoiTruong /> },
            { path: 'giam-sat-camera', element: <GiamSatCamera /> },
            { path: 'lien-he-ho-tro', element: <LienHeHoTro /> }
            // { path: 'thong-bao-canh-bao', element: <ThongBaoCanhBao /> }
            // { path: 'quy-trinh-hoat-dong', element: <QuyTrinhHoatDong /> }
          ]
        }
      ]
    },
    { path: '*', element: <Navigate to="/admin/dashboard" replace /> }
  ]
};

export default MainRoutes;
