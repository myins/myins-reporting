import React from 'react';
import './styles.css'
import { FormControl, MenuItem, MenuList, Select } from '@mui/material';
import { PERIODS } from '../../../utils/enums';
import DateRangeHeader from '../DateRangeHeader';
import { usePeriodContext } from '../../../contexts/PeriodContext';

const NavigatorSelectBody = () => {
  const { period, setPeriodLocal, setNoRangePeriod, range, setRangeLocal } = usePeriodContext()

  const handleChange = (e) => {
    if (e.target.value === PERIODS.range) {
      setPeriodLocal(e.target.value)
    } else {
      setNoRangePeriod(e.target.value)
    }
  };

  return (
    <MenuList className='home_menu header_body_menu'>
      <FormControl fullWidth>
        <Select
          value={period}
          onChange={handleChange}
        >
          <MenuItem value={PERIODS.past24h}>Past 24 hours</MenuItem>
          <MenuItem value={PERIODS.past7d}>Past 7 days</MenuItem>
          <MenuItem value={PERIODS.past30d}>Past 30 days</MenuItem>
          <MenuItem value={PERIODS.allTime}>All Time</MenuItem>
        </Select>
      </FormControl>
      <MenuItem className="menu_item_center"><DateRangeHeader range={range} setRange={setRangeLocal} /></MenuItem>
    </MenuList>
  )
};

export default NavigatorSelectBody;
