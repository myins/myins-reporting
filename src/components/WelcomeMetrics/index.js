import React from 'react';
import './styles.css'
import { Typography } from '@mui/material';
import welcome from '../../images/welcome.jpeg'

const WelcomeMetrics = () => {
  return (
    <div className='welcome_metrics'>
      <img alt="" src={welcome} />
      <div className='welcome_metrics_text'>
        <Typography variant="subtitle1">
          Good Morning! Here are your metrics
        </Typography>
        <Typography className='welcome_metrics_subtitle' variant="caption">
          User interaction expert | Clear advice to follow.
        </Typography>
      </div>
    </div>
  )
};

export default WelcomeMetrics;
