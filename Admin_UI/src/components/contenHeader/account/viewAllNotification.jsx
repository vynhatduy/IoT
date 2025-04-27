import { Container, Box } from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const ViewAllNotification = ({ dataNotification, read }) => {
  return (
    <Container>
      <Typography mt={2} variant="h5">
        Tất cả thông báo
      </Typography>

      <Box height={400} width={700} sx={{ overflowY: 'auto', mt: 2 }}>
        {dataNotification.map((item, index) => (
          <ListItem
            key={index}
            divider
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
      </Box>
    </Container>
  );
};

export default ViewAllNotification;
