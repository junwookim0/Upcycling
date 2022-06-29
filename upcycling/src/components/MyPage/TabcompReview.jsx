import React from 'react';
import MyReview from './myReview/MyReview'
import CommentList from './myReview/CommentList'

const TabcompReview = ({reviewRepository}) => {
    return (
        <div>
            <MyReview reviewRepository={reviewRepository}/>
        </div>
    );
};

export default TabcompReview;