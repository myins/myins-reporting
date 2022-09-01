import React, {  } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import ContentTotalPosts from './ContentTotalPosts';
import NotificationChart from './NotificationChart';
import './styles.css'

const Content = () => {
  return (
    <div className='app_body'>
      <div className='app_body_header'>
        <WelcomeMetrics />
        <HeaderBodyInfoComponent
          title='Total Posts'
          value='24,3k'
          colorDot='#ff4d4f'
        />
      </div>
      <div className='grid_container'>
        <NotificationChart />
        <ContentTotalPosts />
      </div>
    </div>
  )
};

export default Content;
