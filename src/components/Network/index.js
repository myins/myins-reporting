import React, { useEffect, useState } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import AverageTimeToAccDelete from './AverageTimeToAccDelete';
import InvitesVsAccepting from './InvitesVsAccepting';
import NetworkBarCharItem from './NetworkBarChartItem';
import './styles.css'
import { getAvgGroupMembersPerGroup, getAvgGroupsPerUser, getGroupsWithUsersCount, getUsersWithGroupsCount } from '../../services/insService';
import { usePeriodContext } from '../../contexts/PeriodContext';
import { convertDateToString, convertMilliecondToPrettyTime } from '../../utils/date';
import { getAvgTimeToAccDelete } from '../../services/userService';
import html2canvas from 'html2canvas';
import useDataCookie from '../../contexts/DataCookie';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Network = () => {
  const { period, range, loading, setLoading } = usePeriodContext()
  const { dataCookie } = useDataCookie();
  const navigate = useNavigate()
  const [avgGroupsPerUser, setAvgGroupsPerUser] = useState(null)
  const [avgGroupMembersPerGroup, setAvgGroupMembersPerGroup] = useState(null)
  const [groupsWithUsersData, setGroupsWithUsersData] = useState(null)
  const [usersWithGroupsData, setUsersWithGroupsData] = useState(null)
  const [avgTimeToAccDelete, setAvgTimeToAccDelete] = useState(null)
  const [waitingExportingReport, setWaitingExportingReport] = useState(!!dataCookie.isStartedFrom)

  useEffect(() => {
    const getPDFImage = async () => {
      const input = document.getElementById('root');
      const canvas = await html2canvas(input)
      const imgData = canvas.toDataURL('image/png');
      const imagesPDF = JSON.parse(localStorage.getItem('imagesPDF'))
      imagesPDF.push(imgData)
      localStorage.setItem('imagesPDF', JSON.stringify(imagesPDF))
      navigate('/content')
    }

    if (!!dataCookie.isStartedFrom && !loading) {
      setTimeout(() => {
        setWaitingExportingReport(false)
      }, 3000)
      if (!waitingExportingReport) {
        setTimeout(() => {
          getPDFImage()
        }, 500)
      }
    }
  }, [dataCookie.isStartedFrom, navigate, loading, waitingExportingReport])

  useEffect(() => {
    const getData = async () => {
      const resAvgGroupMembersPerGroup = await getAvgGroupMembersPerGroup()
      setAvgGroupMembersPerGroup(resAvgGroupMembersPerGroup.data)
      
      const resAvgGroupsPerUser = await getAvgGroupsPerUser()
      setAvgGroupsPerUser(resAvgGroupsPerUser.data)
      
      const resGroupsWithUsersData = await getGroupsWithUsersCount()
      setGroupsWithUsersData(resGroupsWithUsersData.data)
      
      const resUsersWithGroupsData = await getUsersWithGroupsCount()
      setUsersWithGroupsData(resUsersWithGroupsData.data)
      
      const resAvgTimeToAccDelete = await getAvgTimeToAccDelete(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setAvgTimeToAccDelete(convertMilliecondToPrettyTime(resAvgTimeToAccDelete.data))

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    getData()
  }, [period, range, setLoading])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        <WelcomeMetrics />
        <div className='header_right'>
          <HeaderBodyInfoComponent
            title='Average Groups / User'
            value={avgGroupsPerUser}
            colorDot='#ff4d4f'
          />
          <HeaderBodyInfoComponent
            title='Average Group members / Group'
            value={avgGroupMembersPerGroup}
            colorDot='#52c41a'
          />
        </div>
      </div>
      <div className='grid_container network_body'>
        <NetworkBarCharItem
          title='Groups with one or more users'
          data={groupsWithUsersData}
          xField='users'
          yField='Groups'
        />
        <NetworkBarCharItem
          title='Users that are part of multiple groups'
          data={usersWithGroupsData}
          xField='groups'
          yField='Users'
        />
        <InvitesVsAccepting />
        <AverageTimeToAccDelete avgTimeToAccDelete={avgTimeToAccDelete} />
      </div>
      {waitingExportingReport &&
        <div className='loading_when_exporting_pdf'>
          <CircularProgress />
          <span>Waiting for exporting report ...</span>
        </div>
      }
    </div>
  )
};

export default Network;
