import React from 'react';
import { Column } from '@ant-design/charts';
import CardItemBody2 from '../../CardItemBody2';

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
      <CardItemBody2 title={title} />
      <div>
        <Column className='chart' {...config} />
      </div>
    </div>
  )
};

export default NetworkBarCharItem;
