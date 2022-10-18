import { CircularProgress, useMediaQuery } from '@mui/material';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataCookie from '../../contexts/DataCookie';
import { usePeriodContext } from '../../contexts/PeriodContext';
import { getTotalPosts } from '../../services/postService';
import { convertDateToString } from '../../utils/date';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import ContentTotalPosts from './ContentTotalPosts';
import NotificationChart from './NotificationChart';
import './styles.css'

const Content = () => {
  const { period, range, loading, setLoading } = usePeriodContext()
  const { dataCookie, removeDataCookie } = useDataCookie();
  const navigate = useNavigate()
  const [posts, setPosts] = useState(null)
  const [waitingExportingReport, setWaitingExportingReport] = useState(!!dataCookie.isStartedFrom)
  
  const widthLessThan1000px = useMediaQuery('(max-width:1000px)');
  const widthLessThan650px = useMediaQuery('(max-width:650px)');
  const widthLessThan450px = useMediaQuery('(max-width:450px)');

  useEffect(() => {
    const getPDFImage = async () => {
      const input = document.getElementById('root');
      const canvas = await html2canvas(input)
      const imgData = canvas.toDataURL('image/png');

      const devideSize = widthLessThan450px ? 4 : widthLessThan650px ? 3 : widthLessThan1000px ? 2 : 1

      const pdf = new jsPDF();
      const imagesPDF = JSON.parse(localStorage.getItem('imagesPDF'))
      const imgFirstProperties = pdf.getImageProperties(imagesPDF[0]);
      const pdfWidthFirst = pdf.internal.pageSize.getWidth();
      const pdfHeightFirst =
        (imgFirstProperties.height * pdfWidthFirst) / imgFirstProperties.width;
      pdf.addImage(imagesPDF[0], 'JPEG', 0, 10, pdfWidthFirst / devideSize, pdfHeightFirst / devideSize);

      pdf.addPage()
      pdf.setPage(2)
      const imgSecondProperties = pdf.getImageProperties(imagesPDF[1]);
      const pdfWidthSecond = pdf.internal.pageSize.getWidth();
      const pdfHeightSecond =
        (imgSecondProperties.height * pdfWidthSecond) / imgSecondProperties.width;
      pdf.addImage(imagesPDF[1], 'JPEG', 0, 10, pdfWidthSecond / devideSize, pdfHeightSecond / devideSize);

      pdf.addPage()
      pdf.setPage(3)
      const imgThirdProperties = pdf.getImageProperties(imgData);
      const pdfWidthThird = pdf.internal.pageSize.getWidth();
      const pdfHeightThird =
        (imgThirdProperties.height * pdfWidthThird) / imgThirdProperties.width;
      pdf.addImage(imgData, 'JPEG', 0, 10, pdfWidthThird / devideSize, pdfHeightThird / devideSize);

      const currDate = format(new Date(), 'MM-dd-yyyy hh:mm a')
      pdf.save(`report ${currDate}.pdf`)
      const navigateTo = dataCookie.isStartedFrom
      removeDataCookie('isStartedFrom')
      localStorage.removeItem('imagesPDF')
      navigate(navigateTo)
    }

    if (!!dataCookie.isStartedFrom && !loading) {
      setTimeout(() => {
        setWaitingExportingReport(false)
      }, 7000)
      if (!waitingExportingReport) {
        setTimeout(() => {
          getPDFImage()
        }, 1000)
      }
    }
  }, [dataCookie.isStartedFrom, navigate, removeDataCookie, loading, waitingExportingReport, dataCookie, widthLessThan650px, widthLessThan1000px, widthLessThan450px])

  useEffect(() => {
    const getTotalPostsData = async () => {
      const totalPostsRes = await getTotalPosts(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setPosts(totalPostsRes.data)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    getTotalPostsData()
  }, [period, range, setLoading])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        {!widthLessThan450px && <WelcomeMetrics />}
        <HeaderBodyInfoComponent
          title='Total Posts'
          value={posts?.total}
          colorDot='#ff4d4f'
        />
      </div>
      <div className='grid_container content_body'>
        <NotificationChart />
        <ContentTotalPosts posts={posts} />
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

export default Content;
