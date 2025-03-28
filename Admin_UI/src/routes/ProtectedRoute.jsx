import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ requiredRole }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    console.error('Invalid token', error);
    localStorage.removeItem('accessToken');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
