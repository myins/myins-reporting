import React, { useEffect, useState } from 'react';
import { usePeriodContext } from '../../contexts/PeriodContext';
import { getTotalPosts } from '../../services/postService';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import ContentTotalPosts from './ContentTotalPosts';
import NotificationChart from './NotificationChart';
import './styles.css'

const Content = () => {
  const { period, range, setLoading } = usePeriodContext()
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const getTotalPostsData = async () => {
      const totalPostsRes = await getTotalPosts(period, range?.startDate, range?.endDate)
      setPosts(totalPostsRes.data)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    getTotalPostsData()
  }, [period, range, setLoading])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        <WelcomeMetrics />
        <HeaderBodyInfoComponent
          title='Total Posts'
          value={posts?.total}
          colorDot='#ff4d4f'
          shouldRecalculate={true}
        />
      </div>
      <div className='grid_container'>
        <NotificationChart />
        <ContentTotalPosts posts={posts} />
      </div>
    </div>
  )
};

export default Content;
