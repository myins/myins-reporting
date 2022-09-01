import React from 'react';
import { Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const AverageTimeToAccDelete = () => {
  return (
    <div className='item_with_info avg_time_item'>
      <div className='title'>
        <Typography variant="caption">
          Avg. time to Acc. Delete
        </Typography>
        <InfoOutlinedIcon />
      </div>
      <div className='value'>N/A</div>
    </div>
  )
};

export default AverageTimeToAccDelete;
