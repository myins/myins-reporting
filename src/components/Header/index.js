import React, {  } from 'react';
import './styles.css'
import logo from '../../images/logo.png'
import Navigator from './Navigator';
import ExportReport from './ExportReport';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import useDataCookie from '../../contexts/DataCookie';
import { useMediaQuery } from '@mui/material';
import MenuSidebar from './MenuSidebar';

const Header = (props) => {
  const { setIsLogged } = props
  const { removeDataCookie } = useDataCookie();
  const navigate = useNavigate();
  
  const widthLessThan550px = useMediaQuery('(max-width:550px)');

  const handleLogout = () => {
    removeDataCookie('user')
    setIsLogged(false)
    navigate('/')
  }

  return (
    <div className='home_header'>
      {widthLessThan550px ? <MenuSidebar /> : <img alt="" src={logo} />}
      <div className='home_header_right'>
        {!widthLessThan550px ?
          <>
            <Navigator />
            <ExportReport />
          </>
        : <img className='img_absolute' alt="" src={logo} />}
        <LogoutIcon className='home_header_logout' onClick={handleLogout} />
      </div>
    </div>
  )
};

export default Header;
