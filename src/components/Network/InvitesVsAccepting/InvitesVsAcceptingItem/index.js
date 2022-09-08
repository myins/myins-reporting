import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CardItemCaption from '../../../CardItemCaption';
import { usePeriodContext } from '../../../../contexts/PeriodContext';
import { PERIODS } from '../../../../utils/enums';

const InvitesVsAcceptingItem = (props) => {
  const { period } = usePeriodContext()
  const { title, value, percentage } = props

  return (
    <div className='item_with_info'>
      <CardItemCaption title={title} withoutValue={true} />
      <div className='value_and_percentage'>
        <div className='value'>{value}</div>
        {period !== PERIODS.allTime &&
          <div className='percentage'>
            {Math.abs(percentage)}%
            {percentage === 0 ? ' =' : 
              percentage > 0 ?
                <ArrowDropUpIcon htmlColor='green' />
              :
                <ArrowDropDownIcon htmlColor='red' />
            }
          </div>
        }
      </div>
    </div>
  )
};

export default InvitesVsAcceptingItem;
