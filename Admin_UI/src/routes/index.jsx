import { createBrowserRouter } from 'react-router-dom';

// project imports
import MainRoutes from './nav';
import LoginRoutes from './loginRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes, LoginRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
