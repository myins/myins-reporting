import { Typography } from '@mui/material';
import React from 'react';
import CardItemCaption from '../../CardItemCaption';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { usePeriodContext } from '../../../contexts/PeriodContext';
import { PERIODS } from '../../../utils/enums';

const ContentTotalPosts = (props) => {
  const { posts } = props
  const { period } = usePeriodContext()

  const data = [
    {
      title: 'Posts in Home',
      value: posts?.home,
      thisWeekPercentage: posts?.homePercent
    },
    {
      title: 'Posts in INS',
      value: posts?.ins,
      thisWeekPercentage: posts?.insPercent
    },
    {
      title: 'Posts in Stories',
      value: posts?.story,
      thisWeekPercentage: posts?.storyPercent
    },
    {
      title: '% Display of all Posts',
      value: 22,
      thisWeekPercentage: -3
    },
    {
      title: 'Avg weekly stories / active user',
      value: 2100,
      thisWeekPercentage: 72
    },
    {
      title: 'Avg weekly posts / active user',
      value: 120,
      thisWeekPercentage: 0
    },
  ]
  return (
    <div className='content_total_posts'>
      {data.map((item, index) => (
        <div key={index} className='item_with_info'>
          <CardItemCaption title={item.title} value={item.value} />
          {period !== PERIODS.allTime &&
            <Typography className='this_week_percentage' variant="caption">
              This period {Math.abs(item.thisWeekPercentage)}%
              {item.thisWeekPercentage === 0 ? ' =' : 
                item.thisWeekPercentage > 0 ?
                  <ArrowDropUpIcon htmlColor='green' />
                :
                  <ArrowDropDownIcon htmlColor='red' />
              }
            </Typography>
          }
        </div>
      ))}
    </div>
  )
};

export default ContentTotalPosts;
