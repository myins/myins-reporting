import React, {  } from 'react';

const WordCloudComponent = (props) => {
  const { data } = props

  return (
    <div>
      {data.length ?
        <>
          {data.map((wordItem, index) => (
            <div key={index} className={`word_component_item ${index % 2 === 0 ? 'margin_right' : ''}`}>
              <div className='word_component_word'>
                <p className='word_component_index'>{index + 1}.</p>
                <p className='word_component_word'>{wordItem.word}</p>
              </div>
              <p className='word_component_value'>{wordItem.value}</p>
            </div>
          ))}
        </>
      :
        <div className='no_words'>No words</div>
      }
    </div>
  )
};

export default WordCloudComponent;
