import React from 'react';
import MyReview from './myReview/MyReview'

const TabcompReview = ({reviewRepository}) => {
    return (
        <div>
            <MyReview reviewRepository={reviewRepository}/>
        </div>
    );
};

export default TabcompReview;