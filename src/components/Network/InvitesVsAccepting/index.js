import React from 'react';
import InvitesVsAcceptingItem from './InvitesVsAcceptingItem';
import CardItemBody2 from '../../CardItemBody2';

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
      <CardItemBody2 title='Invites vs. Accepting' />
      <div className='invites_vs_accepting_body'>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <InvitesVsAcceptingItem title={item.title} value={item.value} percentage={item.percentage} />
            <InvitesVsAcceptingItem title='Accepted' value={item.accepted} percentage={item.percentageAccepted} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
};

export default InvitesVsAccepting;
