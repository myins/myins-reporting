import React, { useEffect, useState } from 'react';
import './styles.css'
import AudiencesChartItem from './AudiencesChartItem';
import { getNewAccounts } from '../../../services/userService';
import { CircularProgress } from '@mui/material';
import { usePeriodContext } from '../../../contexts/PeriodContext';

const AudiencesCharts = () => {
  const { period, range } = usePeriodContext()
  const [newAccountsData, setNewAccountsData] = useState(null)

  useEffect(() => {
    const getNewAccountsData = async () => {
      const res = await getNewAccounts(period, range?.startDate, range?.endDate)
      setNewAccountsData(res.data)
    }

    getNewAccountsData()
  }, [period, range])

  const chartsData = [
    {
      title: 'Total Sessions',
      value: 8846,
      data: newAccountsData
    },
    {
      title: 'Active Users',
      value: 8847,
      data: newAccountsData
    },
    {
      title: 'Downloads',
      value: 8848,
      data: newAccountsData
    },
    {
      title: 'New Accounts',
      value: newAccountsData?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: newAccountsData
    },
    {
      title: 'Inactive Users',
      value: 8840,
      data: newAccountsData
    },
    {
      title: 'Deleted Accounts',
      value: 8841,
      data: newAccountsData
    },
    {
      title: 'Uninstalls',
      value: 8842,
      data: newAccountsData
    }
  ]

  return (
    <div className='audiences_charts'>
      {chartsData.map((chartData, index) => (
        <React.Fragment key={index}>
          {chartData.data ? 
            <AudiencesChartItem {...chartData} />
          :
            <div className='loading_container'>
              <CircularProgress />
            </div>
          }
        </React.Fragment>
      ))}
    </div>
  )
};

export default AudiencesCharts;
