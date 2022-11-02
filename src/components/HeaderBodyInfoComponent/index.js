import { CircularProgress } from '@mui/material';
import React, {  } from 'react';
import './styles.css'

const HeaderBodyInfoComponent = (props) => {
  const { title, value, colorDot, isFetched } = props

  return (
    <div className='info_component'>
      <div className='container'>
        <span className='dot' style={{ color: colorDot }}>{'\u2022'}</span> <span className='text'>{title}</span>
      </div>
      <div className='value'>
        {(!value && value !== 0) || isNaN(value) || !isFetched ?
          <CircularProgress size={20} /> :
          value
        }
      </div>
    </div>
  )
};

export default HeaderBodyInfoComponent;
