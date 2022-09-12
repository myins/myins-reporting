import React, { useEffect, useState } from 'react';
import InvitesVsAcceptingItem from './InvitesVsAcceptingItem';
import CardItemBody2 from '../../CardItemBody2';
import { getInvitesAndAccepting } from '../../../services/userService';
import { usePeriodContext } from '../../../contexts/PeriodContext';
import { convertDateToString } from '../../../utils/range';

const InvitesVsAccepting = () => {
  const { period, range, setLoading } = usePeriodContext()
  const [invitesAndAccepting, setInvitesAndAccepting] = useState(null)

  useEffect(() => {
    const getInvitesAndAcceptingData = async () => {
      const res = await getInvitesAndAccepting(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setInvitesAndAccepting(res.data)

      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    getInvitesAndAcceptingData()
  }, [period, range, setLoading])

  const data = [
    {
      title: 'Group Invites to MyIns Users',
      value: invitesAndAccepting?.invitesMyInsUser,
      percentage: invitesAndAccepting?.invitesPercentMyInsUser,
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
    },
    {
      title: 'Accepted',
      value: invitesAndAccepting?.acceptedMyInsUser + invitesAndAccepting?.acceptedNonUser,
      percentage: invitesAndAccepting?.totalAcceptedPercent,
    }
  ]

  return (
    <div className='item_header_with_info'>
      <CardItemBody2 title='Invites vs. Accepting' />
      <div className='invites_vs_accepting_body'>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <InvitesVsAcceptingItem title={item.title} value={item.value} percentage={item.percentage} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
};

export default InvitesVsAccepting;
