import React, { useEffect, useState } from 'react';
import './styles.css'
import AudiencesChartItem from './AudiencesChartItem';
import { getDeletedAccounts, getNewAccounts } from '../../../services/userService';
import { CircularProgress } from '@mui/material';
import { usePeriodContext } from '../../../contexts/PeriodContext';
import { getDownloadsAndUninstalls, getSessionDetails } from '../../../services/sessionService';
import { convertDateToString } from '../../../utils/date';

const AudiencesCharts = () => {
  const { period, range, loading, setLoading } = usePeriodContext()
  const [newAccountsData, setNewAccountsData] = useState(null)
  const [deletedAccountsData, setDeletedAccountsData] = useState(null)
  const [sessionDetails, setSessionDetails] = useState(null)
  const [downloadsUninstalls, setDownloadsUninstalls] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const resNewAccounts = await getNewAccounts(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setNewAccountsData(resNewAccounts.data)

      const resDeletedAccounts = await getDeletedAccounts(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setDeletedAccountsData(resDeletedAccounts.data)
      
      const resSessionDetails = await getSessionDetails(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setSessionDetails(resSessionDetails.data)
      
      const resDownloadsUninstalls = await getDownloadsAndUninstalls(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setDownloadsUninstalls(resDownloadsUninstalls.data)

      setLoading(false)
    }

    getData()
  }, [period, range, setLoading])

  const chartsData = [
    {
      title: 'Total Sessions',
      value: sessionDetails?.totalSessions?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: sessionDetails?.totalSessions,
      infoText : 'Number of sessions within the selected unit of time. A session is counted each time a user has opened the app.'
    },
    {
      title: 'Active Users',
      value: sessionDetails?.activeUsers,
      data: {
        noData: true
      },
      infoText: 'Number of users that had at least one session within the selected unit of time.'
    },
    {
      title: 'Downloads',
      value: downloadsUninstalls?.downloads?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: downloadsUninstalls?.downloads,
      infoText: 'Number of app downloads within the selected unit of time.'
    },
    {
      title: 'New Accounts',
      value: newAccountsData?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: newAccountsData,
      infoText: 'Number of new accounts created within the unit a time. An account is considered created after it has been sms validated.'
    },
    {
      title: 'Inactive Users',
      value: sessionDetails?.inactiveUsers,
      data: {
        noData: true
      },
      infoText: 'Number of registered users that didn’t open the app within the selected unit of time.'
    },
    {
      title: 'Deleted Accounts',
      value: deletedAccountsData?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: deletedAccountsData,
      infoText: 'Number of accounts deleted within the selected unit of time.'
    },
    {
      title: 'Uninstalls',
      value: downloadsUninstalls?.uninstalls?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: downloadsUninstalls?.uninstalls,
      infoText: 'Number of app uninstalls within the selected unit of time.'
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
