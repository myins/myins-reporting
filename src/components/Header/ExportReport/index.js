import React, {  } from 'react';
import './styles.css'
import { Button, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useDataCookie from '../../../contexts/DataCookie';

const ExportReport = (props) => {
  const { close } = props
  const navigate = useNavigate()
  const location = useLocation();
  const { setDataCookie } = useDataCookie();
  
  const widthLessThan750px = useMediaQuery('(max-width:750px)');
  const widthLessThan550px = useMediaQuery('(max-width:550px)');

  const handleExportReport = () => {
    if (close) {
      close()
    }
    setDataCookie('isStartedFrom', location.pathname)
    if (location.pathname === '/') {
      window.location.reload()
    } else {
      navigate('/')
    }
  }

  return (
    <Button className='export_report_button' onClick={handleExportReport} variant='contained'>
        {widthLessThan750px && !widthLessThan550px ? 'Export' : 'Export report'}
    </Button>
  )
};

export default ExportReport;
