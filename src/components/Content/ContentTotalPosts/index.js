import { Typography } from '@mui/material';
import React from 'react';
import CardItemCaption from '../../CardItemCaption';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { usePeriodContext } from '../../../contexts/PeriodContext';
import { PERIODS } from '../../../utils/enums';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAvgWeeklyActiveUsers } from '../../../services/sessionService';
import { getPercentDisplayOfAllPostsRes } from '../../../services/postService';
import { convertDateToString } from '../../../utils/date';

const ContentTotalPosts = (props) => {
  const { posts } = props
  const { period, range, loading, setLoading } = usePeriodContext()
  const [avgWeeklyActiveUsers, setAvgWeeklyActiveUsers] = useState(null)
  const [percentDisplayOfAllPosts, setPercentDisplayOfAllPosts] = useState(null)

  useEffect(() => {
    const getAvgWeeklyActiveUsersData = async () => {
      const avgWeeklyActiveUsersRes = await getAvgWeeklyActiveUsers(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setAvgWeeklyActiveUsers(avgWeeklyActiveUsersRes.data)
      
      const percentDisplayOfAllPostsRes = await getPercentDisplayOfAllPostsRes(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setPercentDisplayOfAllPosts(percentDisplayOfAllPostsRes.data)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    getAvgWeeklyActiveUsersData()
  }, [period, range, setLoading])

  const data = [
    {
      title: 'Posts in Home',
      value: posts?.home,
      thisWeekPercentage: posts?.homePercent,
      infoText: 'Number of posts created from homefeed within the unit of time.'
    },
    {
      title: 'Posts in INS',
      value: posts?.ins,
      thisWeekPercentage: posts?.insPercent,
      infoText: 'Number of posts created from INS within the unit of time.'
    },
    {
      title: 'Posts in Stories',
      value: posts?.story,
      thisWeekPercentage: posts?.storyPercent,
      infoText: 'Number of stories posted within the unit of time.'
    },
    {
      title: '% Display of all Posts',
      value: percentDisplayOfAllPosts?.posts ? `${percentDisplayOfAllPosts?.posts}%` : null,
      thisWeekPercentage: percentDisplayOfAllPosts?.postsPercent,
      isString: true,
      infoText: 'Percentage of posts within the selected unit of time out of all time posts.'
    },
    {
      title: 'Avg weekly posts/active user',
      value: avgWeeklyActiveUsers?.postsActiveUsers,
      thisWeekPercentage: avgWeeklyActiveUsers?.postsActiveUsersPercent,
      infoText: 'Total posts divided to number of active users from the selected unit of time.'
    },
    {
      title: 'Avg weekly stories/active user',
      value: avgWeeklyActiveUsers?.storiesActiveUsers,
      thisWeekPercentage: avgWeeklyActiveUsers?.storiesActiveUsersPercent,
      infoText: 'Total number of stories divided to number of active users from the selected unit of time.'
    },
  ]
  return (
    <div className='content_total_posts'>
      {data.map((item, index) => (
        <div key={index} className='item_with_info'>
          <CardItemCaption
            title={item.title}
            value={item.value}
            isString={item.isString}
            infoText={item.infoText}
          />
          {period !== PERIODS.allTime && !loading &&
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
