import React from 'react';
import InvitesVsAcceptingItem from './InvitesVsAcceptingItem';
import CardItemBody2 from '../../CardItemBody2';
import { CircularProgress } from '@mui/material';

const InvitesVsAccepting = (props) => {
  const { invitesAndAccepting, isFetchedInvitesAndAccepting } = props

  const data = [
    {
      title: 'Group Invites to MyIns Users',
      value: invitesAndAccepting?.invitesMyInsUser,
      percentage: invitesAndAccepting?.invitesPercentMyInsUser,
      infoText: 'Number of join INS invites sent to users that already have a MyIns account within the unit of time and how many accepted. Percentage show the increase/decrease compared to the previous unit of time (equal in size to the selected one).'
    },
    {
      title: 'Accepted',
      value: invitesAndAccepting?.acceptedMyInsUser,
      percentage: invitesAndAccepting?.acceptedPercentMyInsUser,
    },
    {
      title: 'Group Invites to Non-Users',
      value: invitesAndAccepting?.invitesNonUser,
      percentage: invitesAndAccepting?.invitesPercentNonUser,
      infoText: 'Number of join INS invites sent to users that don’t already have a MyIns account within the unit of time and how many accepted. Percentage show the increase/decrease compared to the previous unit of time (equal in size to the selected one).'
    },
    {
      title: 'Accepted',
      value: invitesAndAccepting?.acceptedNonUser,
      percentage: invitesAndAccepting?.acceptedPercentNonUser,
    },
    {
      title: 'Group Invites to All Users',
      value: invitesAndAccepting?.invitesMyInsUser + invitesAndAccepting?.invitesNonUser,
      percentage: invitesAndAccepting?.totalInvitesPercent,
      infoText: 'The sum of the two above.'
    },
    {
      title: 'Accepted',
      value: invitesAndAccepting?.acceptedMyInsUser + invitesAndAccepting?.acceptedNonUser,
      percentage: invitesAndAccepting?.totalAcceptedPercent,
    }
  ]

  return (
    <div className='item_header_with_info'>
      <CardItemBody2 title='Invites vs. Accepting'/>
        {isFetchedInvitesAndAccepting ?
          <div className='invites_vs_accepting_body'>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <InvitesVsAcceptingItem
                  title={item.title}
                  value={item.value}
                  percentage={item.percentage}
                  infoText={item.infoText}
                  withoutIcon={index % 2 === 1}
                />
              </React.Fragment>
            ))}
          </div>
        :
          <div className='loading_container invites_accepting_loading'>
            <CircularProgress />
          </div>  
        }
    </div>
  )
};

export default InvitesVsAccepting;
