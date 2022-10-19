import React from 'react';
import CardItemCaption from '../../CardItemCaption';

const AverageTimeToAccDelete = (props) => {
  const { avgTimeToAccDelete } = props

  return (
    <div className='item_with_info avg_time_item'>
      <CardItemCaption
        title='Avg. time to Acc. Delete'
        value={avgTimeToAccDelete}
        isString={true}
        infoText='Average amount of time since an account is created until it is deleted.'
      />
    </div>
  )
};

export default AverageTimeToAccDelete;
