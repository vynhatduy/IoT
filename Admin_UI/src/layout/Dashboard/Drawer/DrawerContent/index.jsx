import { useLocation } from 'react-router-dom';
// project imports
import Navigation from './Navigation';
import SimpleBar from '../../../../components/third-party/SimpleBar';

export default function DrawerContent() {
  const { pathname } = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
      <Navigation pathname={pathname} />
    </SimpleBar>
  );
}
