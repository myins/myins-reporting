import React, { useEffect, useState } from 'react';
import { groupsWithUsersCount, usersWithGroupsCount } from '../../services/insService';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import AverageTimeToAccDelete from './AverageTimeToAccDelete';
import InvitesVsAccepting from './InvitesVsAccepting';
import NetworkBarCharItem from './NetworkBarChartItem';
import './styles.css'

const Network = () => {
  const [groupsWithUsersData, setGroupsWithUsersData] = useState(null)
  const [usersWithGroupsData, setUsersWithGroupsData] = useState(null)

  useEffect(() => {
    const getGroupsWithUsersData = async () => {
      const res = await groupsWithUsersCount()
      setGroupsWithUsersData(res.data)
    }

    getGroupsWithUsersData()
  }, [])

  useEffect(() => {
    const getUsersWithGroupsData = async () => {
      const res = await usersWithGroupsCount()
      setUsersWithGroupsData(res.data)
    }

    getUsersWithGroupsData()
  }, [])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        <WelcomeMetrics />
        <div className='header_right'>
          <HeaderBodyInfoComponent
            title='Average Groups / User'
            value='56'
            colorDot='#ff4d4f'
          />
          <HeaderBodyInfoComponent
            title='Average Group members / Group'
            value='24'
            colorDot='#52c41a'
          />
        </div>
      </div>
      <div className='grid_container network_body'>
        <NetworkBarCharItem
          title='Groups with one or more users'
          data={groupsWithUsersData}
          xField='users'
          yField='Groups'
        />
        <NetworkBarCharItem
          title='Users that are part of multiple groups'
          data={usersWithGroupsData}
          xField='groups'
          yField='Users'
        />
        <InvitesVsAccepting />
        <AverageTimeToAccDelete />
      </div>
    </div>
  )
};

export default Network;
