import { useRef, useState } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from '../../components/MainCard';
import IconButton from '../../components/@extended/IconButton';
import Transitions from '../../components/@extended/Transitions';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
// assets
import { BellOutlined, CheckCircleOutlined, MessageOutlined } from '@ant-design/icons';
import { Dialog } from '@mui/material';
import ViewAllNotification from './account/viewAllNotification';
import { useNotification } from '../../service/useNotification';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

export default function Notification() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openViewAll, setOpenViewAll] = useState(false);

  const { data } = useNotification();
  console.log('notification', data);
  // Mảng dữ liệu thông báo
  const dataNotification = (data ?? []).map((item) => ({
    time: new Date(item.createAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    avt: <MessageOutlined />,
    description: item.detail,
    timehistory: formatDistanceToNow(new Date(item.createAt), { addSuffix: true, locale: vi })
  }));
  // Calculate countNotifi after dataNotification is defined
  const countNotifi = dataNotification.length;

  // Now use countNotifi after it's defined
  const [read, setRead] = useState(countNotifi);

  const latestNotifications = dataNotification.slice(0, 3);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleOpenView = () => setOpenViewAll(true);
  const handleCloseView = () => setOpenViewAll(false);

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={(theme) => ({
          color: 'text.primary',
          bgcolor: open ? 'grey.100' : 'transparent',
          ...theme.applyStyles('dark', { bgcolor: open ? 'background.default' : 'transparent' })
        })}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={read} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={downMD ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [downMD ? -5 : 0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={downMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper sx={(theme) => ({ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 285, maxWidth: { xs: 285, md: 420 } })}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <>
                      {read > 0 && (
                        <Tooltip title="Mark as all read">
                          <IconButton color="success" size="small" onClick={() => setRead(0)}>
                            <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        px: 2,
                        '&.Mui-selected': { bgcolor: 'grey.50', color: 'text.primary' },
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {/* Hiển thị chỉ 3 thông báo mới nhất */}
                    {latestNotifications.map((item, index) => (
                      <ListItem
                        key={index}
                        component={ListItemButton}
                        divider={index < latestNotifications.length - 1}
                        selected={read > 0}
                        secondaryAction={
                          <Typography variant="caption" noWrap>
                            {item.time}
                          </Typography>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ color: 'success.main', bgcolor: 'success.lighter' }}>{item.avt}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography component="span" variant="subtitle1">
                              {item.description}
                            </Typography>
                          }
                          secondary={item.timehistory}
                        />
                      </ListItem>
                    ))}
                    <ListItemButton sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary" onClick={handleOpenView}>
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      {/* display all list notification */}
      <Dialog open={openViewAll} onClose={handleCloseView}>
        <ViewAllNotification dataNotification={dataNotification} read={read} />
      </Dialog>
    </Box>
  );
}
