import React from 'react';
import './styles.css'
import { MenuItem, MenuList, Tab } from '@mui/material';
import { PERIODS } from '../../../utils/enums';
import DateRangeHeader from './DateRangeHeader';
import { usePeriodContext } from '../../../contexts/PeriodContext';

const NavigatorBody = () => {
  const { period, setPeriodLocal, range, setRangeLocal } = usePeriodContext()

  const setNoRangePeriod = (newPeriod) => {
    setPeriodLocal(newPeriod)
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
      <MenuItem className='margin_left_item' onClick={() => setPeriodLocal(PERIODS.range)}>
        <DateRangeHeader range={range} setRange={setRangeLocal} />
      </MenuItem>
    </MenuList>
  )
};

export default NavigatorBody;
