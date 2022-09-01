import React, { useState } from 'react';
import { Area } from '@ant-design/charts';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const AudiencesChartItem = (props) => {
  const { title, value, data } = props

  const [open, setOpen] = useState(false)

  const mainConfig = {
    data,
    xField: 'date',
    yField: 'value',
    smooth: true,
    areaStyle: {
      stroke: '#975fe4',
      strokeOpacity: 1,
      fill: '#975fe4',
      fillOpacity: 1
    },
    line: {
      size: 0
    },
    tooltip: {
      customItems: (originalItems) => {
        const newItems = originalItems.map(item => {
          return {
            ...item,
            color: '#975fe4'
          }
        })
        return newItems
      },
      showMarkers: false
    }
  };

  const config = {
    ...mainConfig,
    padding: 0,
    xAxis: {
      line: null
    },
    yAxis: {
      grid: null
    }
  };

  const dialogConfig = {
    ...mainConfig,
    slider: {
      start: 0,
      end: 1,
    }
  };

  return (
    <>
      <div className='item_with_info'>
        <div className='title'>
          <Typography variant="caption">
            {title}
          </Typography>
          <InfoOutlinedIcon />
        </div>
        <div className='value'>{value}</div>
        <div onClick={() => setOpen(true)}>
          <Area className='chart' {...config} />
        </div>
      </div>

      {open &&
        <Dialog className='audiences_chart_dialog' open={open} onClose={() => setOpen(false)}>
          <DialogTitle className='title'>
            <div>{title}</div>
            <div className='value'>{value}</div>
          </DialogTitle>
          <DialogContent>
            <Area className='chart' {...dialogConfig} />
          </DialogContent>
        </Dialog>
      }
    </>
  )
};

export default AudiencesChartItem;
