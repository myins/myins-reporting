import React, { useEffect, useState } from 'react';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import './styles.css'
import AudiencesCharts from './AudiencesCharts';
import { getAllTimeUsersCount } from '../../services/userService';
import useDataCookie from '../../contexts/DataCookie';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { usePeriodContext } from '../../contexts/PeriodContext';
import { CircularProgress } from '@mui/material';

const Audiences = () => {
  const { loading } = usePeriodContext()
  const { dataCookie } = useDataCookie();
  const navigate = useNavigate()
  const [totalUsers, setTotalUsers] = useState(null)
  const [waitingExportingReport, setWaitingExportingReport] = useState(!!dataCookie.isStartedFrom)

  useEffect(() => {
    const getPDFImage = async () => {
      const input = document.getElementById('root');
      const canvas = await html2canvas(input)
      const imgData = canvas.toDataURL('image/png');
      localStorage.setItem('imagesPDF', JSON.stringify([imgData]))
      navigate('/network')
    }

    if (!!dataCookie.isStartedFrom && !loading) {
      setTimeout(() => {
        setWaitingExportingReport(false)
      }, 5000)
      if (!waitingExportingReport) {
        setTimeout(() => {
          getPDFImage()
        }, 500)
      }
    }
  }, [dataCookie.isStartedFrom, loading, navigate, waitingExportingReport])

  useEffect(() => {
    const getTotalUsers = async () => {
      const totalUsersRes = await getAllTimeUsersCount()
      setTotalUsers(totalUsersRes.data)
    }

    getTotalUsers()
  }, [])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        <WelcomeMetrics />
        <HeaderBodyInfoComponent
          title='Total Users'
          value={totalUsers}
          colorDot='#ff4d4f'
        />
      </div>
      <AudiencesCharts />
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
