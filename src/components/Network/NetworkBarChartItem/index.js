import React from 'react';
import { Column } from '@ant-design/charts';
import { Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const NetworkBarCharItem = (props) => {
  const { title, data, xField, yField } = props

  const config = {
    data,
    xField,
    yField,
    columnStyle: {
      fill: '#ECAB14'
    },
    tooltip: {
      customItems: (originalItems) => {
        const newItems = originalItems.map(item => {
          return {
            ...item,
            color: '#ECAB14'
          }
        })
        return newItems
      }
    }
  };

  return (
    <div className='item_header_with_info'>
      <div className='title'>
        <Typography variant="body2">
          {title}
        </Typography>
        <MoreHorizIcon />
      </div>
      <div>
        <Column className='chart' {...config} />
      </div>
    </div>
  )
};

export default NetworkBarCharItem;
