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
import { convertDateToString } from '../../../utils/range';
import { getPercentDisplayOfAllPostsRes } from '../../../services/postService';

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
      value: percentDisplayOfAllPosts?.posts,
      thisWeekPercentage: percentDisplayOfAllPosts?.postsPercent
    },
    {
      title: 'Avg weekly posts / active user',
      value: avgWeeklyActiveUsers?.postsActiveUsers,
      thisWeekPercentage: avgWeeklyActiveUsers?.postsActiveUsersPercent
    },
    {
      title: 'Avg weekly stories / active user',
      value: avgWeeklyActiveUsers?.storiesActiveUsers,
      thisWeekPercentage: avgWeeklyActiveUsers?.storiesActiveUsersPercent
    },
  ]
  return (
    <div className='content_total_posts'>
      {data.map((item, index) => (
        <div key={index} className='item_with_info'>
          <CardItemCaption title={item.title} value={item.value} />
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
