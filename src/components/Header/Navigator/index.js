import React, {  } from 'react';
import './styles.css'
import { MenuItem, MenuList, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigator = (props) => {
  const { close } = props
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MenuList className='home_menu'>
      <MenuItem
        className={`${location.pathname === '/' ? 'active_menu_item' : ''}`}
        onClick={() => {
          if (close) {
            close()
          }
          navigate('/')
        }}
      >
        <Tab label="Audiences" />
      </MenuItem>
      <MenuItem
        className={`${location.pathname === '/network' ? 'active_menu_item' : ''}`}
        onClick={() => {
          if (close) {
            close()
          }
          navigate('/network')
        }}
      >
        <Tab label="Network" />
      </MenuItem>
      <MenuItem
        className={`${location.pathname === '/content' ? 'active_menu_item' : ''}`}
        onClick={() => {
          if (close) {
            close()
          }
          navigate('/content')
        }}
      >
        <Tab label="Content" />
      </MenuItem>
    </MenuList>
  )
};

export default Navigator;
