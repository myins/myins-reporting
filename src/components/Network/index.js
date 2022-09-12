import React, { useEffect, useState } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import AverageTimeToAccDelete from './AverageTimeToAccDelete';
import InvitesVsAccepting from './InvitesVsAccepting';
import NetworkBarCharItem from './NetworkBarChartItem';
import './styles.css'
import { getAvgGroupMembersPerGroup, getAvgGroupsPerUser, getGroupsWithUsersCount, getUsersWithGroupsCount } from '../../services/insService';

const Network = () => {
  const [avgGroupsPerUser, setAvgGroupsPerUser] = useState(null)
  const [avgGroupMembersPerGroup, setAvgGroupMembersPerGroup] = useState(null)
  const [groupsWithUsersData, setGroupsWithUsersData] = useState(null)
  const [usersWithGroupsData, setUsersWithGroupsData] = useState(null)

  useEffect(() => {
    const getAvgGroupMembersPerGroupData = async () => {
      const res = await getAvgGroupMembersPerGroup()
      setAvgGroupMembersPerGroup(res.data)
    }

    getAvgGroupMembersPerGroupData()
  }, [])

  useEffect(() => {
    const getAvgGroupsPerUserData = async () => {
      const res = await getAvgGroupsPerUser()
      setAvgGroupsPerUser(res.data)
    }

    getAvgGroupsPerUserData()
  }, [])

  useEffect(() => {
    const getGroupsWithUsersData = async () => {
      const res = await getGroupsWithUsersCount()
      setGroupsWithUsersData(res.data)
    }

    getGroupsWithUsersData()
  }, [])

  useEffect(() => {
    const getUsersWithGroupsData = async () => {
      const res = await getUsersWithGroupsCount()
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
            value={avgGroupsPerUser}
            colorDot='#ff4d4f'
          />
          <HeaderBodyInfoComponent
            title='Average Group members / Group'
            value={avgGroupMembersPerGroup}
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
