import React, {  } from 'react';
import './styles.css'
import logo from '../../images/logo.png'
import Navigator from './Navigator';
import ExportReport from './ExportReport';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import useUserDataCookie from '../../contexts/UserDataCookie';

const Header = (props) => {
  const { setIsLogged } = props
  const { removeUserDataCookie } = useUserDataCookie();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUserDataCookie('user')
    setIsLogged(false)
    navigate('/')
  }

  return (
    <div className='home_header'>
      <img alt="" src={logo} />
      <div className='home_header_right'>
        <Navigator />
        <ExportReport />
        <LogoutIcon className='home_header_logout' onClick={handleLogout} />
      </div>
    </div>
  )
};

export default Header;
