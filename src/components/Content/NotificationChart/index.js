import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/charts';
import CardItemBody2 from '../../CardItemBody2';
import { getNotifications } from '../../../services/notificationService';
import { usePeriodContext } from '../../../contexts/PeriodContext';
import { convertDateToString } from '../../../utils/range';

const NotificationChart = () => {
  const { period, range, loading, setLoading } = usePeriodContext()
  const [data, setData] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getNotificationsData = async () => {
      const res = await getNotifications(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setData(res.data)
      setTotal(res.data?.reduce((a, v) =>  a = a + v.value, 0 ))

      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    getNotificationsData()
  }, [period, range, setLoading])

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
          const value = data?.find(item => item.type === text).value
          return `${text}     ${value > 0 ? (value * 100 / total).toFixed(2) : 0}%     ${value}`
        }
      },
      maxItemWidth: 400
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
