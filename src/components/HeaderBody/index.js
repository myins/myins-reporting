import React from 'react';
import './styles.css'
import { Typography, useMediaQuery } from '@mui/material';
import NavigatorBody from './NavigatorBody';
import NavigatorSelectBody from './NavigatorSelectBody';

const HeaderBody = () => {
  const widthLessThan1000px = useMediaQuery('(max-width:1000px)');
  const widthLessThan550px = useMediaQuery('(max-width:550px)');

  return (
    <div className='header_body'>
      {!widthLessThan1000px &&
        <Typography className='bold_string' variant="body1">
          User Segments
        </Typography>
      }
      {widthLessThan550px ? <NavigatorSelectBody /> : <NavigatorBody />}
    </div>
  )
};

export default HeaderBody;
