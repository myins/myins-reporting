import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { usePeriodContext } from '../../contexts/PeriodContext';

const CardItemCaption = (props) => {
  const { loading } = usePeriodContext()
  const { title, value, withoutValue, isString } = props

  return (
    <>
      <div className='title'>
        <Typography variant="caption">
          {title}
        </Typography>
        <InfoOutlinedIcon />
      </div>
      {!withoutValue &&
        <>
          {(isString || !isNaN(value)) && !loading ? 
            <div className='value'>{value}</div>
          :
            <div className='loading'>
              <CircularProgress size={20} />
            </div>
          }
        </>
      }
    </>
  )
};

export default CardItemCaption;
