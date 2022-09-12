import { CircularProgress } from '@mui/material';
import React, {  } from 'react';
import { usePeriodContext } from '../../contexts/PeriodContext';
import './styles.css'

const HeaderBodyInfoComponent = (props) => {
  const { loading } = usePeriodContext()
  const { title, value, colorDot } = props

  return (
    <div className='info_component'>
      <div className='container'>
        <span className='dot' style={{ color: colorDot }}>{'\u2022'}</span> <span className='text'>{title}</span>
      </div>
      <div className='value'>{!isNaN(value) && !loading ? value : <CircularProgress size={20} />}</div>
    </div>
  )
};

export default HeaderBodyInfoComponent;
