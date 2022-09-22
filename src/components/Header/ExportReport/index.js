import React, {  } from 'react';
import './styles.css'
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useDataCookie from '../../../contexts/DataCookie';

const ExportReport = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { setDataCookie } = useDataCookie();

  const handleExportReport = () => {
    setDataCookie('isStartedFrom', location.pathname)
    if (location.pathname === '/') {
      window.location.reload()
    } else {
      navigate('/')
    }
  }

  return (
    <Button className='export_report_button' onClick={handleExportReport} variant='contained'>
        Export report
    </Button>
  )
};

export default ExportReport;
