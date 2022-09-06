import { Dialog, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import './styles.css'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from 'date-fns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { initialNoRangeValue } from '../../../../contexts/PeriodContext';

const DateRangeHeader = (props) => {
  const { range, setRange } = props

  const [open, setOpen] = useState(false)

  return (
    <>
      <TextField
        value={
          `${range?.startDate ? format(range.startDate, 'MM/dd/yyyy') : 'Start date'} \u2192 ${range?.endDate ? format(range.endDate, 'MM/dd/yyyy') : 'End date'}`
        }
        readOnly
        className={`date_range_input ${range ? 'date_range_input_active' : ''}`}
        onClick={() => {
          setOpen(true)
          setRange(initialNoRangeValue)
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CalendarMonthIcon className='calendar_icon' />
            </InputAdornment>
          ),
        }}
      />

      {open &&
        <Dialog onClose={() => setOpen(false)} open={open}>
          <DateRange
            onChange={item => {
              setRange(item.selection)
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range ? [range] : [initialNoRangeValue]}
            months={1}
            direction="horizontal"
            maxDate={new Date()}
            className="calendarElement"
          />
        </Dialog>
      }
    </>
  )
};

export default DateRangeHeader;
