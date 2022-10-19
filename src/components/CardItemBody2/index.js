import React from 'react';
import { Typography } from '@mui/material';

const CardItemBody2 = (props) => {
  const { title } = props

  return (
    <div className='title'>
      <Typography variant="body2">
        {title}
      </Typography>
    </div>
  )
};

export default CardItemBody2;
