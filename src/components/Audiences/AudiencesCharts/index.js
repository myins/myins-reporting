import React, { useEffect, useState } from 'react';
import './styles.css'
import AudiencesChartItem from './AudiencesChartItem';
import { getDeletedAccounts, getNewAccounts } from '../../../services/userService';
import { CircularProgress } from '@mui/material';
import { usePeriodContext } from '../../../contexts/PeriodContext';
import { getSessionDetails } from '../../../services/sessionService';

const AudiencesCharts = () => {
  const { period, range, loading, setLoading } = usePeriodContext()
  const [newAccountsData, setNewAccountsData] = useState(null)
  const [deletedAccountsData, setDeletedAccountsData] = useState(null)
  const [sessionDetails, setSessionDetails] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const resNewAccounts = await getNewAccounts(period, range?.startDate, range?.endDate)
      setNewAccountsData(resNewAccounts.data)

      const resDeletedAccounts = await getDeletedAccounts(period, range?.startDate, range?.endDate)
      setDeletedAccountsData(resDeletedAccounts.data)
      
      const resSessionDetails = await getSessionDetails(period, range?.startDate, range?.endDate)
      setSessionDetails(resSessionDetails.data)

      setLoading(false)
    }

    getData()
  }, [period, range, setLoading])

  const chartsData = [
    {
      title: 'Total Sessions',
      value: sessionDetails?.totalSessions?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: sessionDetails?.totalSessions
    },
    {
      title: 'Active Users',
      value: sessionDetails?.activeUsers,
      data: {
        noData: true
      }
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
      value: sessionDetails?.inactiveUsers,
      data: {
        noData: true
      }
    },
    {
      title: 'Deleted Accounts',
      value: deletedAccountsData?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: deletedAccountsData
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
          {chartData.data && !loading ? 
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
