import { lazy } from 'react';

// project imports
import AuthLayout from '../layout/Auth';
import Loadable from '../components/Loadable';

// jwt auth
const LoginPage = Loadable(lazy(() => import('../components/auth-accout/Login')));
const RegisterPage = Loadable(lazy(() => import('../components/auth-accout/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/register',
          element: <RegisterPage />
        }
      ]
    }
  ]
};

export default LoginRoutes;
