import React from 'react';
import './styles.css'
import { Typography } from '@mui/material';
import NavigatorBody from './NavigatorBody';

const HeaderBody = () => {
  return (
    <div className='header_body'>
      <Typography className='bold_string' variant="body1">
        User Segments
      </Typography>
      <NavigatorBody />
    </div>
  )
};

export default HeaderBody;
