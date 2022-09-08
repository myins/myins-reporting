import { Typography } from '@mui/material';
import React from 'react';
import CardItemCaption from '../../CardItemCaption';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ContentTotalPosts = (props) => {
  const { posts } = props

  const data = [
    {
      title: 'Posts in Home',
      value: posts?.home,
      thisWeekPercentage: -22
    },
    {
      title: 'Posts in INS',
      value: posts?.ins,
      thisWeekPercentage: 12
    },
    {
      title: 'Posts in Stories',
      value: posts?.story,
      thisWeekPercentage: 2
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
          <Typography className='this_week_percentage' variant="caption">
            This week {Math.abs(item.thisWeekPercentage)}%
            {item.thisWeekPercentage === 0 ? ' =' : 
              item.thisWeekPercentage > 0 ?
                <ArrowDropUpIcon htmlColor='green' />
              :
                <ArrowDropDownIcon htmlColor='red' />
            }
          </Typography>
        </div>
      ))}
    </div>
  )
};

export default ContentTotalPosts;
