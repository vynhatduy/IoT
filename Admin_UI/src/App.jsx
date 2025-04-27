import { RouterProvider } from 'react-router-dom';

// project imports
import router from '../src/routes/index';
import ThemeCustomization from '../src/themes/index';

import ScrollTop from '../src/components/ScrollTop';
import DashboardLayout from './layout/Dashboard/mainLayout';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <RouterProvider router={router} />
      </ScrollTop>
    </ThemeCustomization>
  );
}
