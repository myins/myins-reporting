import React, { useEffect, useState } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import './styles.css'
import AudiencesCharts from './AudiencesCharts';
import { getAllTimeUsersCount, getDeletedAccounts, getNewAccounts } from '../../services/userService';
import useDataCookie from '../../contexts/DataCookie';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, useMediaQuery } from '@mui/material';
import { usePeriodContext } from '../../contexts/PeriodContext';
import { convertDateToString } from '../../utils/date';
import { getDownloadsAndUninstalls, getSessionDetails } from '../../services/sessionService';

const Audiences = () => {
  const { dataCookie } = useDataCookie();
  const { period, range } = usePeriodContext()
  const navigate = useNavigate()
  const [totalUsers, setTotalUsers] = useState(null)
  const [isFetchedtotalUsers, setIsFetchedTotalUsers] = useState(false)
  const [newAccountsData, setNewAccountsData] = useState(null)
  const [deletedAccountsData, setDeletedAccountsData] = useState(null)
  const [sessionDetails, setSessionDetails] = useState(null)
  const [downloadsUninstalls, setDownloadsUninstalls] = useState(null)
  const [fetched, setFetched] = useState({
    newAccounts: false,
    deletedAccounts: false,
    sessionDetails: false,
    downloadsAndUninstalls: false
  })
  const [waitingExportingReport, setWaitingExportingReport] = useState(!!dataCookie.isStartedFrom)

  const widthLessThan450px = useMediaQuery('(max-width:450px)');

  useEffect(() => {
    const getPDFImage = async () => {
      const input = document.getElementById('root');
      const canvas = await html2canvas(input)
      const imgData = canvas.toDataURL('image/png');
      localStorage.setItem('imagesPDF', JSON.stringify([imgData]))
      navigate('/network')
    }

    if (!!dataCookie.isStartedFrom) {
      const allFetched = !Object.keys(fetched).find((item) => !fetched[item]) && isFetchedtotalUsers
      if (allFetched) {
        setWaitingExportingReport(false)
      }
      if (!waitingExportingReport) {
        setTimeout(() => {
          getPDFImage()
        }, 1000)
      }
    }
  }, [dataCookie.isStartedFrom, fetched, isFetchedtotalUsers, navigate, waitingExportingReport])

  useEffect(() => {
    const getTotalUsers = async () => {
      setIsFetchedTotalUsers(false)
      const totalUsersRes = await getAllTimeUsersCount()
      setTotalUsers(totalUsersRes.data)
      setIsFetchedTotalUsers(true)
    }

    getTotalUsers()
  }, [])

  useEffect(() => {
    const getData = async () => {
      setFetched(oldChecks => {
        return {
          ...oldChecks,
          newAccounts: false
        }
      })

      const resNewAccounts = await getNewAccounts(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setNewAccountsData(resNewAccounts.data)

      setFetched(oldChecks => {
        return {
          ...oldChecks,
          newAccounts: true
        }
      })
    }

    getData()
  }, [period, range])

  useEffect(() => {
    const getData = async () => {
      setFetched(oldChecks => {
        return {
          ...oldChecks,
          deletedAccounts: false
        }
      })

      const resDeletedAccounts = await getDeletedAccounts(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setDeletedAccountsData(resDeletedAccounts.data)

      setFetched(oldChecks => {
        return {
          ...oldChecks,
          deletedAccounts: true
        }
      })
    }

    getData()
  }, [period, range])

  useEffect(() => {
    const getData = async () => {
      setFetched(oldChecks => {
        return {
          ...oldChecks,
          sessionDetails: false
        }
      })

      const resSessionDetails = await getSessionDetails(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setSessionDetails(resSessionDetails.data)

      setFetched(oldChecks => {
        return {
          ...oldChecks,
          sessionDetails: true
        }
      })
    }

    getData()
  }, [period, range])

  useEffect(() => {
    const getData = async () => {
      setFetched(oldChecks => {
        return {
          ...oldChecks,
          downloadsAndUninstalls: false
        }
      })

      const resDownloadsUninstalls = await getDownloadsAndUninstalls(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setDownloadsUninstalls(resDownloadsUninstalls.data)

      setFetched(oldChecks => {
        return {
          ...oldChecks,
          downloadsAndUninstalls: true
        }
      })
    }

    getData()
  }, [period, range])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        {!widthLessThan450px && <WelcomeMetrics />}
        <HeaderBodyInfoComponent
          title='Total Users'
          value={totalUsers}
          colorDot='#ff4d4f'
          isFetched={isFetchedtotalUsers}
        />
      </div>
      <AudiencesCharts
        newAccountsData={newAccountsData}
        deletedAccountsData={deletedAccountsData}
        sessionDetails={sessionDetails}
        downloadsUninstalls={downloadsUninstalls}
        fetched={fetched}
      />
      {waitingExportingReport &&
        <div className='loading_when_exporting_pdf'>
          <CircularProgress />
          <span>Waiting for exporting report ...</span>
        </div>
      }
    </div>
  )
};

export default Audiences;
