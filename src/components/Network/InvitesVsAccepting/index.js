import React from 'react';
import { Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InvitesVsAcceptingItem from './InvitesVsAcceptingItem';

const InvitesVsAccepting = () => {
  const data = [
    {
      title: 'Group Invites to MyIns Users',
      value: 23,
      percentage: 0,
      accepted: 10,
      percentageAccepted: 26.2
    },
    {
      title: 'Group Invites to Non-Users',
      value: 40,
      percentage: -27.4,
      accepted: 5,
      percentageAccepted: -36.2
    },
    {
      title: 'Group Invites to All Users',
      value: 63,
      percentage: 0.8,
      accepted: 15,
      percentageAccepted: 9.2
    }
  ]

  return (
    <div className='item_header_with_info'>
      <div className='title'>
        <Typography variant="body2">
          Invites vs. Accepting
        </Typography>
        <MoreHorizIcon />
      </div>
      <div className='invites_vs_accepting_body'>
        {data.map(item => (
          <>
            <InvitesVsAcceptingItem title={item.title} value={item.value} percentage={item.percentage} />
            <InvitesVsAcceptingItem title='Accepted' value={item.accepted} percentage={item.percentageAccepted} />
          </>
        ))}
      </div>
    </div>
  )
};

export default InvitesVsAccepting;
