import React from 'react';
import CardItemCaption from '../../CardItemCaption';

const AverageTimeToAccDelete = (props) => {
  const { avgTimeToAccDelete } = props

  return (
    <div className='item_with_info avg_time_item'>
      <CardItemCaption title='Avg. time to Acc. Delete' value={avgTimeToAccDelete} isString={true} />
    </div>
  )
};

export default AverageTimeToAccDelete;
