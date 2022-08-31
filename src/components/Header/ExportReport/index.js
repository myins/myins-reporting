import React, {  } from 'react';
import './styles.css'
import { Button } from '@mui/material';

const ExportReport = () => {
  const handleExportReport = () => {
    console.log('export report here')
  }

  return (
    <Button className='export_report_button' onClick={handleExportReport} variant='contained'>
        Export report
    </Button>
  )
};

export default ExportReport;
