import React from 'react';
import { Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const InvitesVsAcceptingItem = (props) => {
  const { title, value, percentage } = props

  return (
    <div className='item_with_info'>
      <div className='title'>
        <Typography variant="caption">
          {title}
        </Typography>
        <InfoOutlinedIcon />
      </div>
      <div className='value_and_percentage'>
        <div className='value'>{value}</div>
        <div className='percentage'>
          {Math.abs(percentage)} %
          {percentage === 0 ? ' =' : 
            percentage > 0 ?
              <ArrowDropUpIcon htmlColor='green' />
            :
              <ArrowDropDownIcon htmlColor='red' />
          }
        </div>
      </div>
    </div>
  )
};

export default InvitesVsAcceptingItem;
