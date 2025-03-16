// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project imports
import Search from '../components/contenHeader/search';
import Profile from '../components/contenHeader/account';
import Notification from '../components/contenHeader/notification';

// project import
// import { GithubOutlined } from '@ant-design/icons';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && <Search />}
      {/* {downLG && <Box sx={{ width: '100%', ml: 1 }} />} */}

      {/* add icon here */}

      <Notification />
      {!downLG && <Profile />}
      {downLG}
    </>
  );
}
