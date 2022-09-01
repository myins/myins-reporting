import React, {  } from 'react';
import './styles.css'
import AudiencesChartItem from './AudiencesChartItem';

const AudiencesCharts = () => {
  const data = [
    { date: '1991', value: 7 },
    { date: '1992', value: 4 },
    { date: '1993', value: 3.5 },
    { date: '1994', value: 0 },
    { date: '1995', value: 4.9 },
    { date: '1996', value: 2 },
    { date: '1997', value: 7 },
    { date: '1998', value: 9 },
    { date: '1999', value: 13 },
  ];

  const chartsData = [
    {
      title: 'Total Sessions',
      value: '8,846',
      data: data
    },
    {
      title: 'Active Users',
      value: '8,847',
      data: data
    },
    {
      title: 'Downloads',
      value: '8,848',
      data: data
    },
    {
      title: 'New Accounts',
      value: '8,849',
      data: data
    },
    {
      title: 'Inactive Users',
      value: '8,840',
      data: data
    },
    {
      title: 'Deleted Accounts',
      value: '8,841',
      data: data
    },
    {
      title: 'Uninstalls',
      value: '8,842',
      data: data
    }
  ]

  return (
    <div className='audiences_charts'>
      {chartsData.map(chartData => (
        <AudiencesChartItem {...chartData} />
      ))}
    </div>
  )
};

export default AudiencesCharts;
