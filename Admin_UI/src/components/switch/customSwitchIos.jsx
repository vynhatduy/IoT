import React from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#4CAF50',
        opacity: 1,
        border: 0
      }
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.5
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 13,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));

const CustomSwitchIos = (props) => {
  return <IOSSwitch {...props} />;
};

export default CustomSwitchIos;
