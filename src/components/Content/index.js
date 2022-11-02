import { CircularProgress, useMediaQuery } from '@mui/material';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataCookie from '../../contexts/DataCookie';
import { usePeriodContext } from '../../contexts/PeriodContext';
import { getMostUsedWordsInChats, getMostUsedWordsInInsesName } from '../../services/insService';
import { getNotifications } from '../../services/notificationService';
import { getMostUsedWordsInPostCommentsContent, getPercentDisplayOfAllPostsRes, getTotalPosts } from '../../services/postService';
import { getAvgWeeklyActiveUsers } from '../../services/sessionService';
import { convertDateToString } from '../../utils/date';
import HeaderBodyInfoComponent from '../HeaderBodyInfoComponent';
import WelcomeMetrics from '../WelcomeMetrics';
import ContentTotalPosts from './ContentTotalPosts';
import NotificationChart from './NotificationChart';
import './styles.css'
import WordCloud from './WordCloud';

const Content = () => {
  const { period, range } = usePeriodContext()
  const { dataCookie, removeDataCookie } = useDataCookie();
  const navigate = useNavigate()

  const [posts, setPosts] = useState(null)
  const [percentDisplayOfAllPosts, setPercentDisplayOfAllPosts] = useState(null)
  const [avgWeeklyActiveUsers, setAvgWeeklyActiveUsers] = useState(null)
  const [fetched, setFetched] = useState({
    posts: false,
    displayPosts: false,
    avgWeekly: false,
  })
  const [dataNotifs, setDataNotifs] = useState(null)
  const [totalNotifs, setTotalNotifs] = useState(0)
  const [isFetchedNotifications, setIsFetchedNotifications] = useState(false)
  const [dataWords, setDataWords] = useState({
    a: {
      name: 'Most used 20 words in inses name',
    },
    b: {
      name: 'Most used 20 words in posts & comments',
    },
    c: {
      name: 'Most used 20 words in chat',
    }
  })
  const [fetchedWords, setFetchedWords] = useState({
    a: false,
    b: false,
    c: false,
  })
  const [waitingExportingReport, setWaitingExportingReport] = useState(!!dataCookie.isStartedFrom)
  
  const widthLessThan900px = useMediaQuery('(max-width:900px)');
  const widthLessThan800px = useMediaQuery('(max-width:800px)');
  const widthLessThan650px = useMediaQuery('(max-width:650px)');
  const widthLessThan450px = useMediaQuery('(max-width:450px)');
  const widthLessThan410px = useMediaQuery('(max-width:410px)');

  useEffect(() => {
    const getPDFImage = async () => {
      const input = document.getElementById('root');
      const canvas = await html2canvas(input)
      const imgData = canvas.toDataURL('image/png');

      const devideSize = widthLessThan410px ? 3.5 : widthLessThan650px ? 3 : widthLessThan800px ? 2 : 1

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

      pdf.addPage()
      pdf.setPage(4)
      pdf.addImage(imgData, 'JPEG', 0, -287, pdfWidthThird / devideSize, pdfHeightThird / devideSize);

      if (widthLessThan900px) {
        pdf.addPage()
        pdf.setPage(5)
        pdf.addImage(imgData, 'JPEG', 0, (-287 * 2) - 10, pdfWidthThird / devideSize, pdfHeightThird / devideSize);
      }

      const currDate = format(new Date(), 'MM-dd-yyyy hh:mm a')
      pdf.save(`report ${currDate}.pdf`)
      const navigateTo = dataCookie.isStartedFrom
      removeDataCookie('isStartedFrom')
      localStorage.removeItem('imagesPDF')
      navigate(navigateTo)
    }

    if (!!dataCookie.isStartedFrom) {
      const allFetched = 
        !Object.keys(fetched).find((item) => !fetched[item]) &&
        isFetchedNotifications &&
        !Object.keys(fetchedWords).find((item) => !fetchedWords[item])
      if (allFetched) {
        setWaitingExportingReport(false)
      }
      if (!waitingExportingReport) {
        setTimeout(() => {
          getPDFImage()
        }, 1000)
      }
    }
  }, [dataCookie.isStartedFrom, navigate, removeDataCookie, waitingExportingReport, dataCookie, widthLessThan650px, widthLessThan800px, widthLessThan450px, widthLessThan900px, widthLessThan410px, fetched, isFetchedNotifications, fetchedWords])

  useEffect(() => {
    const getData = async () => {
      setFetched(oldChecks => {
        return {
          ...oldChecks,
          posts: false
        }
      })

      const totalPostsRes = await getTotalPosts(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setPosts(totalPostsRes.data)

      setFetched(oldChecks => {
        return {
          ...oldChecks,
          posts: true
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
          displayPosts: false
        }
      })

      const percentDisplayOfAllPostsRes = await getPercentDisplayOfAllPostsRes(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setPercentDisplayOfAllPosts(percentDisplayOfAllPostsRes.data)
      
      setFetched(oldChecks => {
        return {
          ...oldChecks,
          displayPosts: true
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
          avgWeekly: false
        }
      })

      const avgWeeklyActiveUsersRes = await getAvgWeeklyActiveUsers(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setAvgWeeklyActiveUsers(avgWeeklyActiveUsersRes.data)
      
      setFetched(oldChecks => {
        return {
          ...oldChecks,
          avgWeekly: true
        }
      })
    }

    getData()
  }, [period, range])

  useEffect(() => {
    const getNotificationsData = async () => {
      setIsFetchedNotifications(false)
      const res = await getNotifications(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setDataNotifs(res.data)
      setTotalNotifs(res.data?.reduce((a, v) =>  a = a + v.value, 0 ))
      setIsFetchedNotifications(true)
    }

    getNotificationsData()
  }, [period, range])

  useEffect(() => {
    const getWordsCloudData = async () => {
      setFetchedWords(oldChecks => {
        return {
          ...oldChecks,
          a: false
        }
      })

      const resInsesName = await getMostUsedWordsInInsesName(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setDataWords(oldData => {
        return {
          ...oldData,
          a: {
            ...oldData.a,
            data: resInsesName.data
          }
        }
      })

      setFetchedWords(oldChecks => {
        return {
          ...oldChecks,
          a: true
        }
      })
    }

    getWordsCloudData()
  }, [period, range])

  useEffect(() => {
    const getWordsCloudData = async () => {
      setFetchedWords(oldChecks => {
        return {
          ...oldChecks,
          b: false
        }
      })

      const resPostCommentsContent = await getMostUsedWordsInPostCommentsContent(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setDataWords(oldData => {
        return {
          ...oldData,
          b: {
            ...oldData.b,
            data: resPostCommentsContent.data
          }
        }
      })

      setFetchedWords(oldChecks => {
        return {
          ...oldChecks,
          b: true
        }
      })
    }

    getWordsCloudData()
  }, [period, range])

  useEffect(() => {
    const getWordsCloudData = async () => {
      setFetchedWords(oldChecks => {
        return {
          ...oldChecks,
          c: false
        }
      })

      const resChatsMessages = await getMostUsedWordsInChats(period, convertDateToString(range?.startDate), convertDateToString(range?.endDate))
      setDataWords(oldData => {
        return {
          ...oldData,
          c: {
            ...oldData.c,
            data: resChatsMessages.data
          }
        }
      })

      setFetchedWords(oldChecks => {
        return {
          ...oldChecks,
          c: true
        }
      })
    }

    getWordsCloudData()
  }, [period, range])

  return (
    <div className='app_body'>
      <div className='app_body_header'>
        {!widthLessThan450px && <WelcomeMetrics />}
        <HeaderBodyInfoComponent
          title='Total Posts'
          value={posts?.total}
          colorDot='#ff4d4f'
          isFetched={fetched.posts}
        />
      </div>
      <div className='grid_container content_body'>
        <NotificationChart data={dataNotifs} total={totalNotifs} isFetched={isFetchedNotifications} />
        <ContentTotalPosts
          posts={posts}
          percentDisplayOfAllPosts={percentDisplayOfAllPosts}
          avgWeeklyActiveUsers={avgWeeklyActiveUsers}
          fetched={fetched}
        />
      </div>
      <WordCloud data={dataWords} fetched={fetchedWords} />
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
