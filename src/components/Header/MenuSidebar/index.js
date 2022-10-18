import React, { useState } from 'react';
import './styles.css'
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navigator from '../Navigator';
import logo from '../../../images/logo.png'
import ExportReport from '../ExportReport';

const MenuSidebar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(open => !open);
  };

  return (
    <>
      <IconButton
        className='menu_icon'
        color="inherit"
        onClick={handleDrawer}
      >
          <MenuIcon />
      </IconButton>
      <Drawer
        className='drawer_menu'
        anchor='left'
        open={open}
        onClose={handleDrawer}
      >
        <div className='sidebar_items'>
          <div>
            <div className='icon_container'>
              <img alt="" src={logo} />
            </div>
            <Navigator close={() => setOpen(false)} />
          </div>
          <ExportReport close={() => setOpen(false)} />
        </div>
      </Drawer>
    </>
  )
};

export default MenuSidebar;
