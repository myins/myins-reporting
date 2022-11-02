import React, {  } from 'react';
import CardItemBody2 from '../../CardItemBody2';
import WordCloudComponent from './WordCloudComponent';
import { CircularProgress } from '@mui/material';

const WordCloud = (props) => {
  const { data, fetched } = props

  return (
    <div className='word_cloud_container'>
      {Object.keys(data).sort((a, b) => a - b).map((item, index) => (
        <div key={index} className={`item_header_with_info ${index === Object.keys(data).length - 1 ? 'last_item' : ''}`}>
          <CardItemBody2 title={data[item].name} />
          {data[item].data && fetched[item] ?
            <WordCloudComponent data={data[item].data} />
          :
            <div className='loading_container word_loading'>
              <CircularProgress />
            </div>
          }
        </div>
      ))}
    </div>
  )
};

export default WordCloud;
