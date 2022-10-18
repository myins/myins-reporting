import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/charts';
import CardItemBody2 from '../../CardItemBody2';
import { getNotifications } from '../../../services/notificationService';
import { usePeriodContext } from '../../../contexts/PeriodContext';
import { convertDateToString } from '../../../utils/date';
import { useMediaQuery } from '@mui/material';

const NotificationChart = () => {
  const { period, range, loading, setLoading } = usePeriodContext()
  const [data, setData] = useState(null)
  const [total, setTotal] = useState(0)

  const widthLessThan650px = useMediaQuery('(max-width:650px)');
  const widthLessThan450px = useMediaQuery('(max-width:450px)');

  useEffect(() => {
    const getNotificationsData = async () => {
      const res = await getNotifications(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setData(res.data)
      setTotal(res.data?.reduce((a, v) =>  a = a + v.value, 0 ))

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    getNotificationsData()
  }, [period, range, setLoading])

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    appendPadding: 85,
    innerRadius: 0.77,
    padding: [0, widthLessThan450px ? -80 : widthLessThan650px ? -70 : -50, 0, widthLessThan450px ? 100 : widthLessThan650px ? 130 : 180],
    label: null,
    pieStyle: {
      lineWidth: 3
    },
    legend: {
      position: 'left',
      itemName: {
        formatter: (text) => {
          const value = data?.find(item => item.type === text).value
          return `${text}     ${value > 0 ? (value * 100 / total).toFixed(2) : 0}%     ${value}`
        }
      },
      maxItemWidth: widthLessThan450px ? 170 : widthLessThan650px ? 200 : 300
    },
    statistic: {
      title: {
        style: {
          fontSize: widthLessThan450px ? '15px' : '17px',
        },
        customHtml: () => {
          return '<div>Total</div>';
        },
      },
      content: {
        style: {
          fontSize: widthLessThan450px ? '18px' : '24px',
          marginTop: '5px',
          marginBottom: '5px'
        },
        customHtml: () => {
          return `<div>${total}</div>`;
        },
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div className='item_header_with_info notification_chart_body'>
      <CardItemBody2 title='Notification Type Open Rates' />
      {data && !loading &&
        <Pie className='chart' {...config} />
      }
    </div>
  )
};

export default NotificationChart;
