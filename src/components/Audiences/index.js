import React, {  } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import './styles.css'

const Audiences = () => {
  return (
    <div className='app_body'>
      <div className='app_body_header'>
        <WelcomeMetrics />
        <HeaderBodyInfoComponent
          title='Total Users'
          value='24,856'
          colorDot='#ff4d4f'
        />
      </div>
    </div>
  )
};

export default Audiences;
