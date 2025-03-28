import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './Nav';
import LoginRoutes from './LoginRoutes';

const router = createBrowserRouter([LoginRoutes, MainRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
