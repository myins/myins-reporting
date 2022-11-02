import React from 'react';
import { CircularProgress, Tooltip, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CardItemCaption = (props) => {
  const { title, value, withoutValue, isString, infoText, withoutIcon, isFetched } = props

  return (
    <>
      <div className='title'>
        <Typography variant="caption">
          {title}
        </Typography>
        {!withoutIcon &&
          <Tooltip title={infoText} arrow>
            <InfoOutlinedIcon />
          </Tooltip>
        }
      </div>
      {!withoutValue &&
        <>
          {(isString || !isNaN(value)) && isFetched ? 
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
