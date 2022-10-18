import React from 'react';
import './styles.css'
import { Typography, useMediaQuery } from '@mui/material';
import welcome from '../../images/welcome.png'

const WelcomeMetrics = () => {
  const widthLessThan650px = useMediaQuery('(max-width:650px)');

  return (
    <div className='welcome_metrics'>
      <img alt="" src={welcome} />
      <div className='welcome_metrics_text'>
        <Typography variant="subtitle1">
          Good Morning! {!widthLessThan650px && 'Here are your metrics'}
        </Typography>
        <Typography className='welcome_metrics_subtitle' variant="caption">
          {widthLessThan650px ? 'Here are your metrics' : 'User interaction expert | Clear advice to follow.'}
        </Typography>
      </div>
    </div>
  )
};

export default WelcomeMetrics;
