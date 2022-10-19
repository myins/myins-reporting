import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CardItemCaption from '../../../CardItemCaption';
import { usePeriodContext } from '../../../../contexts/PeriodContext';
import { PERIODS } from '../../../../utils/enums';
import { CircularProgress } from '@mui/material';

const InvitesVsAcceptingItem = (props) => {
  const { period, loading } = usePeriodContext()
  const { title, value, percentage, infoText, withoutIcon } = props

  return (
    <div className='item_with_info'>
      <CardItemCaption
        title={title}
        withoutValue={true}
        withoutIcon={withoutIcon}
        infoText={infoText}
      />
      <div className='value_and_percentage'>
        {!isNaN(value) && !loading ?
          <>
            <div className='value'>{value}</div>
            {period !== PERIODS.allTime && percentage &&
              <div className='percentage'>
                {percentage}%
                {percentage === 0 ? ' =' : 
                  percentage > 0 ?
                    <ArrowDropUpIcon htmlColor='green' />
                  :
                    <ArrowDropDownIcon htmlColor='red' />
                }
              </div>
            }
          </>
        :
          <CircularProgress style={{ marginTop: 12, marginBottom: 2 }} size={20} />
        }
      </div>
    </div>
  )
};

export default InvitesVsAcceptingItem;
