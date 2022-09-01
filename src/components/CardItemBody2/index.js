import React from 'react';
import { Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CardItemBody2 = (props) => {
  const { title } = props

  return (
    <div className='title'>
      <Typography variant="body2">
        {title}
      </Typography>
      <MoreHorizIcon />
    </div>
  )
};

export default CardItemBody2;
