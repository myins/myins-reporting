import React, {  } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import './styles.css'

const Network = () => {
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
    </div>
  )
};

export default Network;
