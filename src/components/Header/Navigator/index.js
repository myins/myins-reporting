import React, {  } from 'react';
import './styles.css'
import { MenuItem, MenuList, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MenuList className='home_menu'>
      <MenuItem className={`${location.pathname === '/' ? 'active_menu_item' : ''}`}>
        <Tab
          label="Audiences"
          onClick={() => navigate('/')}
        />
      </MenuItem>
      <MenuItem className={`${location.pathname === '/network' ? 'active_menu_item' : ''}`}>
        <Tab
          label="Network"
          onClick={() => navigate('/network')}
        />
      </MenuItem>
      <MenuItem className={`${location.pathname === '/content' ? 'active_menu_item' : ''}`}>
        <Tab
          label="Content"
          onClick={() => navigate('/content')}
        />
      </MenuItem>
    </MenuList>
  )
};

export default Navigator;
