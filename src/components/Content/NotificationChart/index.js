import React, {  } from 'react';
import { Pie } from '@ant-design/charts';
import CardItemBody2 from '../../CardItemBody2';

const NotificationChart = () => {
  const total = 182
  const data = [
    {
      type: 'POST',
      value: 15,
    },
    {
      type: 'LIKE_POST',
      value: 27,
    },
    {
      type: 'DELETED_POST_BY_ADMIN',
      value: 5,
    },
    {
      type: 'COMMENT',
      value: 25,
    },
    {
      type: 'LIKE_COMMENT',
      value: 5,
    },
    {
      type: 'STORY',
      value: 10,
    },
    {
      type: 'LIKE_STORY',
      value: 5,
    },
    {
      type: 'JOINED_INS',
      value: 15,
    },
    {
      type: 'PENDING_INS',
      value: 18,
    },
    {
      type: 'JOIN_INS_REJECTED',
      value: 15,
    },
    {
      type: 'DELETED_INS',
      value: 10,
    },
    {
      type: 'CHANGE_ADMIN',
      value: 15,
    },
    {
      type: 'MESSAGE',
      value: 17,
    },
  ];

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    appendPadding: 77,
    innerRadius: 0.77,
    padding: [0, 0, 0, 200],
    label: null,
    pieStyle: {
      lineWidth: 3
    },
    legend: {
      position: 'left',
      itemName: {
        formatter: (text) => {
          const value = data.find(item => item.type === text).value
          return `${text}    ${(value * 100 / total).toFixed(2)}%  ${value}`
        }
      },
      maxItemWidth: 400
    }
  };

  return (
    <div className='item_header_with_info notification_chart_body'>
      <CardItemBody2 title='Notification Type Open Rates' />
      <div>
        <Pie className='chart' {...config} />
      </div>
    </div>
  )
};

export default NotificationChart;
