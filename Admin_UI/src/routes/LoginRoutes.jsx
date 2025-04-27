import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Import layout dành cho authentication (nếu có)
import Loadable from '../components/Loadable';

// Lazy load pages
const LoginPage = Loadable(lazy(() => import('../components/auth-accout/Login')));
const RegisterPage = Loadable(lazy(() => import('../components/auth-accout/Register')));

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />
    }
  ]
};

export default LoginRoutes;
