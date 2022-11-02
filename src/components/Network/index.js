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
import { getAvgTimeToAccDelete, getInvitesAndAccepting } from '../../services/userService';
import html2canvas from 'html2canvas';
import useDataCookie from '../../contexts/DataCookie';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, useMediaQuery } from '@mui/material';

const Network = () => {
  const { period, range } = usePeriodContext()
  const { dataCookie } = useDataCookie();
  const navigate = useNavigate()
  const [avgGroupsPerUser, setAvgGroupsPerUser] = useState(null)
  const [isFetchedAvgGroupsPerUser, setIsFetchedAvgGroupsPerUser] = useState(false)
  const [avgGroupMembersPerGroup, setAvgGroupMembersPerGroup] = useState(null)
  const [isFetchedAvgGroupMembersPerGroup, setIsFetchedAvgGroupMembersPerGroup] = useState(false)
  const [groupsWithUsersData, setGroupsWithUsersData] = useState(null)
  const [isFetchedGroupsWithUsersData, setIsFetchedGroupsWithUsersData] = useState(false)
  const [usersWithGroupsData, setUsersWithGroupsData] = useState(null)
  const [isFetchedUsersWithGroupsData, setIsFetchedUsersWithGroupsData] = useState(false)
  const [invitesAndAccepting, setInvitesAndAccepting] = useState(null)
  const [isFetchedInvitesAndAccepting, setIsFetchedInvitesAndAccepting] = useState(false)
  const [avgTimeToAccDelete, setAvgTimeToAccDelete] = useState(null)
  const [isFetchedAvgTimeToAccDelete, setIsFetchedAvgTimeToAccDelete] = useState(false)
  const [waitingExportingReport, setWaitingExportingReport] = useState(!!dataCookie.isStartedFrom)

  const widthLessThan900px = useMediaQuery('(max-width:900px)');
  const widthLessThan450px = useMediaQuery('(max-width:450px)');

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

    if (!!dataCookie.isStartedFrom) {
      const allFetched = 
        isFetchedAvgGroupsPerUser &&
        isFetchedAvgGroupMembersPerGroup &&
        isFetchedGroupsWithUsersData &&
        isFetchedUsersWithGroupsData &&
        isFetchedInvitesAndAccepting &&
        isFetchedAvgTimeToAccDelete
      if (allFetched) {
        setWaitingExportingReport(false)
      }
      if (!waitingExportingReport) {
        setTimeout(() => {
          getPDFImage()
        }, 1000)
      }
    }
  }, [dataCookie.isStartedFrom, isFetchedAvgGroupMembersPerGroup, isFetchedAvgGroupsPerUser, isFetchedAvgTimeToAccDelete, isFetchedGroupsWithUsersData, isFetchedInvitesAndAccepting, isFetchedUsersWithGroupsData, navigate, waitingExportingReport])

  useEffect(() => {
    const getData = async () => {
      setIsFetchedAvgGroupsPerUser(false)
      const resAvgGroupsPerUser = await getAvgGroupsPerUser()
      setAvgGroupsPerUser(resAvgGroupsPerUser.data)
      setIsFetchedAvgGroupsPerUser(true)
    }

    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      setIsFetchedAvgGroupMembersPerGroup(false)
      const resAvgGroupMembersPerGroup = await getAvgGroupMembersPerGroup()
      setAvgGroupMembersPerGroup(resAvgGroupMembersPerGroup.data)
      setIsFetchedAvgGroupMembersPerGroup(true)
    }

    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      setIsFetchedGroupsWithUsersData(false)
      const resGroupsWithUsersData = await getGroupsWithUsersCount()
      setGroupsWithUsersData(resGroupsWithUsersData.data)
      setIsFetchedGroupsWithUsersData(true)
    }

    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      setIsFetchedUsersWithGroupsData(false)
      const resUsersWithGroupsData = await getUsersWithGroupsCount()
      setUsersWithGroupsData(resUsersWithGroupsData.data)
      setIsFetchedUsersWithGroupsData(true)
    }

    getData()
  }, [])

  useEffect(() => {
    const getInvitesAndAcceptingData = async () => {
      setIsFetchedInvitesAndAccepting(false)
      const res = await getInvitesAndAccepting(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setInvitesAndAccepting(res.data)
      setIsFetchedInvitesAndAccepting(true)
    }

    getInvitesAndAcceptingData()
  }, [period, range])

  useEffect(() => {
    const getData = async () => {
      setIsFetchedAvgTimeToAccDelete(false)
      const resAvgTimeToAccDelete = await getAvgTimeToAccDelete(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setAvgTimeToAccDelete(convertMilliecondToPrettyTime(resAvgTimeToAccDelete.data))
      setIsFetchedAvgTimeToAccDelete(true)
    }

    getData()
  }, [period, range])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        {!widthLessThan450px && <WelcomeMetrics />}
        <div className='header_right'>
          <HeaderBodyInfoComponent
            title={`${widthLessThan900px ? 'Avg.' : 'Average'} Groups/User`}
            value={avgGroupsPerUser}
            colorDot='#ff4d4f'
            isFetched={isFetchedAvgGroupsPerUser}
          />
          <HeaderBodyInfoComponent
            title={`${widthLessThan900px ? 'Avg. Members' : 'Average Group members'}/Group`}
            value={avgGroupMembersPerGroup}
            colorDot='#52c41a'
            isFetched={isFetchedAvgGroupMembersPerGroup}
          />
        </div>
      </div>
      <div className='grid_container network_body'>
        <NetworkBarCharItem
          title='Groups with one or more users'
          data={groupsWithUsersData}
          xField='users'
          yField='Groups'
          isFetched={isFetchedGroupsWithUsersData}
        />
        <NetworkBarCharItem
          title='Users that are part of multiple groups'
          data={usersWithGroupsData}
          xField='groups'
          yField='Users'
          isFetched={isFetchedUsersWithGroupsData}
        />
        <InvitesVsAccepting invitesAndAccepting={invitesAndAccepting} isFetchedInvitesAndAccepting={isFetchedInvitesAndAccepting} />
        <AverageTimeToAccDelete avgTimeToAccDelete={avgTimeToAccDelete} isFetchedAvgTimeToAccDelete={isFetchedAvgTimeToAccDelete} />
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
