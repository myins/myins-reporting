import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CardItemCaption = (props) => {
  const { title, value } = props

  return (
    <>
      <div className='title'>
        <Typography variant="caption">
          {title}
        </Typography>
        <InfoOutlinedIcon />
      </div>
      {!isNaN(value) ? 
        <div className='value'>{value}</div>
      :
        <div className='loading'>
          <CircularProgress size={20} />
        </div>
      }
    </>
  )
};

export default CardItemCaption;
