import React, { useState } from 'react';
import './styles.css'
import { MenuItem, MenuList, Tab } from '@mui/material';
import { PERIODS } from '../../../utils/enums';
import DateRangeHeader from './DateRangeHeader';

const NavigatorBody = () => {
  const [period, setPeriod] = useState(PERIODS.past24h)
  const [range, setRange] = useState(null)

  const setNoRangePeriod = (newPeriod) => {
    setPeriod(newPeriod)
    setRange(null)
  }

  return (
    <MenuList className='home_menu header_body_menu'>
      <MenuItem className={`${period === PERIODS.past24h ? 'active_menu_item' : ''}`}>
        <Tab
          label="Past 24 hours"
          onClick={() => setNoRangePeriod(PERIODS.past24h)}
        />
      </MenuItem>
      <MenuItem className={`${period === PERIODS.past7d ? 'active_menu_item' : ''}`}>
        <Tab
          label="Past 7 days"
          onClick={() => setNoRangePeriod(PERIODS.past7d)}
        />
      </MenuItem>
      <MenuItem className={`${period === PERIODS.past30d ? 'active_menu_item' : ''}`}>
        <Tab
          label="Past 30 days"
          onClick={() => setNoRangePeriod(PERIODS.past30d)}
        />
      </MenuItem>
      <MenuItem className={`${period === PERIODS.allTime ? 'active_menu_item' : ''}`}>
        <Tab
          label="All Time"
          onClick={() => setNoRangePeriod(PERIODS.allTime)}
        />
      </MenuItem>
      <MenuItem className='margin_left_item' onClick={() => setPeriod(PERIODS.range)}>
        <DateRangeHeader range={range} setRange={setRange} />
      </MenuItem>
    </MenuList>
  )
};

export default NavigatorBody;
