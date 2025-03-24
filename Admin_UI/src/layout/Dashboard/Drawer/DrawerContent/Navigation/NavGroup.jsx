import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from '../../../../../api/menu';

// ==============================|| DRAWER CONTENT - NAVIGATION GROUP ||============================== //
export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  if (!Array.isArray(item.children) || item.children.length === 0) {
    console.warn(`NavGroup: item "${item.title}" has no valid children.`);
    return null;
  }

  // Hàm đệ quy để hiển thị toàn bộ menu
  const renderMenuItems = (menuItems, level = 1) => {
    return menuItems.map((menuItem) => {
      console.log('menu item: ', menuItem);

      switch (menuItem.type) {
        case 'collapse':
        case 'group':
          return (
            <Box key={menuItem.id} sx={{ pl: level * 1 }}>
              <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                {menuItem.title}
              </Typography>
              <List sx={{ pl: 1 }}>{renderMenuItems(menuItem.children || [], level + 1)}</List>
            </Box>
          );
        case 'item':
          return <NavItem key={menuItem.id} item={menuItem} level={level} />;
        default:
          console.warn(`Unknown menu type "${menuItem.type}" for item "${menuItem.title}"`);
          return (
            <Typography key={menuItem.id} variant="h6" color="error" align="center">
              Unknown menu type - Fix me!
            </Typography>
          );
      }
    });
  };

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {renderMenuItems(item.children)}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };
