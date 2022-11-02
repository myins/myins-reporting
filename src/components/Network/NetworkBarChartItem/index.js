import React from 'react';
import { Column } from '@ant-design/charts';
import CardItemBody2 from '../../CardItemBody2';
import { CircularProgress } from '@mui/material';

const NetworkBarCharItem = (props) => {
  const { title, data, xField, yField, isFetched } = props

  const config = {
    data: data ?? [],
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
      <CardItemBody2 title={title} />
      {isFetched ?
        <Column className='chart' {...config} />
      :
      <div className='loading_container network_chart_loading'>
        <CircularProgress />
      </div>
      }
    </div>
  )
};

export default NetworkBarCharItem;
