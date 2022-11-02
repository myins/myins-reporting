import { Typography } from '@mui/material';
import React from 'react';
import CardItemCaption from '../../CardItemCaption';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { usePeriodContext } from '../../../contexts/PeriodContext';
import { PERIODS } from '../../../utils/enums';

const ContentTotalPosts = (props) => {
  const { posts, percentDisplayOfAllPosts, avgWeeklyActiveUsers, fetched } = props
  const { period } = usePeriodContext()

  const data = [
    {
      title: 'Posts in Home',
      value: posts?.home,
      thisWeekPercentage: posts?.homePercent,
      infoText: 'Number of posts created from homefeed within the unit of time.',
      isFetched: fetched.posts
    },
    {
      title: 'Posts in INS',
      value: posts?.ins,
      thisWeekPercentage: posts?.insPercent,
      infoText: 'Number of posts created from INS within the unit of time.',
      isFetched: fetched.posts
    },
    {
      title: 'Posts in Stories',
      value: posts?.story,
      thisWeekPercentage: posts?.storyPercent,
      infoText: 'Number of stories posted within the unit of time.',
      isFetched: fetched.posts
    },
    {
      title: '% Display of all Posts',
      value: `${percentDisplayOfAllPosts?.displayPosts}%`,
      thisWeekPercentage: percentDisplayOfAllPosts?.displayPostsPercent,
      isString: true,
      infoText: 'Percentage of posts within the selected unit of time out of all time posts.',
      isFetched: fetched.displayPosts
    },
    {
      title: 'Avg weekly posts/active user',
      value: avgWeeklyActiveUsers?.postsActiveUsers,
      thisWeekPercentage: avgWeeklyActiveUsers?.postsActiveUsersPercent,
      infoText: 'Total posts divided to number of active users from the selected unit of time.',
      isFetched: fetched.avgWeekly
    },
    {
      title: 'Avg weekly stories/active user',
      value: avgWeeklyActiveUsers?.storiesActiveUsers,
      thisWeekPercentage: avgWeeklyActiveUsers?.storiesActiveUsersPercent,
      infoText: 'Total number of stories divided to number of active users from the selected unit of time.',
      isFetched: fetched.avgWeekly
    },
  ]
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className='item_with_info'>
          <CardItemCaption
            title={item.title}
            value={item.value}
            isString={item.isString}
            infoText={item.infoText}
            isFetched={item.isFetched}
          />
          {period !== PERIODS.allTime && item.isFetched &&
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
    </>
  )
};

export default ContentTotalPosts;
