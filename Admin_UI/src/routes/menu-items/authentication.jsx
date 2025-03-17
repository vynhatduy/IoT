// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Xác thực',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Đăng nhập',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'register1',
      title: 'Đăng ký',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};

export default pages;
