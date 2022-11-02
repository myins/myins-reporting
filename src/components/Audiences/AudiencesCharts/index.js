import React, {  } from 'react';
import './styles.css'
import AudiencesChartItem from './AudiencesChartItem';

const AudiencesCharts = (props) => {
  const { newAccountsData, deletedAccountsData, sessionDetails, downloadsUninstalls, fetched } = props

  const chartsData = [
    {
      title: 'Total Sessions',
      value: sessionDetails?.totalSessions?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: sessionDetails?.totalSessions,
      isFetched: fetched.sessionDetails,
      infoText : 'Number of sessions within the selected unit of time. A session is counted each time a user has opened the app.'
    },
    {
      title: 'Active Users',
      value: sessionDetails?.activeUsers,
      data: {
        noData: true
      },
      isFetched: fetched.sessionDetails,
      infoText: 'Number of users that had at least one session within the selected unit of time.'
    },
    {
      title: 'Downloads',
      value: downloadsUninstalls?.downloads?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: downloadsUninstalls?.downloads,
      isFetched: fetched.downloadsAndUninstalls,
      infoText: 'Number of app downloads within the selected unit of time.'
    },
    {
      title: 'New Accounts',
      value: newAccountsData?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: newAccountsData,
      isFetched: fetched.newAccounts,
      infoText: 'Number of new accounts created within the unit a time. An account is considered created after it has been sms validated.'
    },
    {
      title: 'Inactive Users',
      value: sessionDetails?.inactiveUsers,
      data: {
        noData: true
      },
      isFetched: fetched.sessionDetails,
      infoText: 'Number of registered users that didn’t open the app within the selected unit of time.'
    },
    {
      title: 'Deleted Accounts',
      value: deletedAccountsData?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: deletedAccountsData,
      isFetched: fetched.deletedAccounts,
      infoText: 'Number of accounts deleted within the selected unit of time.'
    },
    {
      title: 'Uninstalls',
      value: downloadsUninstalls?.uninstalls?.reduce((a, v) =>  a = a + v.value, 0 ),
      data: downloadsUninstalls?.uninstalls,
      isFetched: fetched.downloadsAndUninstalls,
      infoText: 'Number of app uninstalls within the selected unit of time.'
    }
  ]

  return (
    <div className='audiences_charts'>
      {chartsData.map((chartData, index) => (
        <React.Fragment key={index}>
          <AudiencesChartItem {...chartData} />
        </React.Fragment>
      ))}
    </div>
  )
};

export default AudiencesCharts;
