import React, { useEffect, useState } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import './styles.css'
import AudiencesCharts from './AudiencesCharts';
import { allTimeUsersCount } from '../../services/userService';
import useUserDataCookie from '../../contexts/UserDataCookie';

const Audiences = () => {
  const { userDataCookie } = useUserDataCookie()
  const [totalUsers, setTotalUsers] = useState(null)

  useEffect(() => {
    const getTotalUsers = async () => {
      const totalUsersRes = await allTimeUsersCount(userDataCookie.user)
      setTotalUsers(totalUsersRes.data)
    }

    if (!totalUsers) {
      getTotalUsers()
    }
  }, [totalUsers, userDataCookie])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        <WelcomeMetrics />
        <HeaderBodyInfoComponent
          title='Total Users'
          value={totalUsers}
          colorDot='#ff4d4f'
        />
      </div>
      <AudiencesCharts />
    </div>
  )
};

export default Audiences;
