import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from '../layout/Dashboard/mainLayout';
import cauHinhThietBi from '../pages/cauHinhThietBi';
import quanLyThietBi from '../pages/quanLyThietBi';
import path from 'path';
// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/bangDieuKhien')));

// render - color
// const Color = Loadable(lazy(() => import('pages/component-overview/color')));
// const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
// const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/deviceManagement',
      chidlren: [
        {
          path: 'deviceManagement',
          element: <quanLyThietBi /> 
        },
        {
          path: '.',
          element: <cauHinhThietBi />
        },
        {
          path: '.',
          element: <cauHinhThietBi />
        },
        {
          path: '.',
          element: <cauHinhThietBi />
        }
      ]
    },
    {
      // path: 'color',
      // element: <Color />
    },
    // {
    //   path: 'shadow',
    //   element: <Shadow />
    // },
    // {
    //   path: 'sample-page',
    //   element: <SamplePage />
    // }
  ]
};

export default MainRoutes;
