import React, {  } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import AverageTimeToAccDelete from './AverageTimeToAccDelete';
import InvitesVsAccepting from './InvitesVsAccepting';
import NetworkBarCharItem from './NetworkBarChartItem';
import './styles.css'

const Network = () => {
  const groupsWithUsersData = [
    {
      users: '1 Us.',
      Groups: 380,
    },
    {
      users: '2 Us.',
      Groups: 710,
    },
    {
      users: '3 Us.',
      Groups: 555,
    },
    {
      users: '4 Us.',
      Groups: 485,
    },
    {
      users: '5 Us.',
      Groups: 379,
    },
    {
      users: '6 Us.',
      Groups: 300,
    },
    {
      users: '7 Us.',
      Groups: 242,
    },
    {
      users: '8 Us.',
      Groups: 242,
    },
    {
      users: '9 Us.',
      Groups: 183,
    },
    {
      users: '10+',
      Groups: 97,
    },
  ];

  const usersWithGroupsData = [
    {
      groups: '1 Gr.',
      Users: 380,
    },
    {
      groups: '2 Gr.',
      Users: 710,
    },
    {
      groups: '3 Gr.',
      Users: 555,
    },
    {
      groups: '4 Gr.',
      Users: 485,
    },
    {
      groups: '5 Gr.',
      Users: 379,
    },
    {
      groups: '6 Gr.',
      Users: 300,
    },
    {
      groups: '7 Gr.',
      Users: 242,
    },
    {
      groups: '8 Gr.',
      Users: 242,
    },
    {
      groups: '9 Gr.',
      Users: 183,
    },
    {
      groups: '10+',
      Users: 97,
    },
  ];

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
