import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CommentList.module.css'

const CommentList = ({onReviews, onMyComments}) => {
    const navigate = useNavigate();

    const goDetail = (reviewId) => {
        console.log(reviewId)
        onReviews.map(review => {
            if(review.id === reviewId) {
                navigate(`/reviews/${review.id}`, {state : {review}})
            }
        })
    }
    

    const renderComments = onMyComments.map(comment => (
        onReviews.map(review => {
            if(review.id === comment.reviewId) {
                return (
                <section key={comment.id} onClick={()=>goDetail(comment.reviewId)} className={styles.commentList}>
                    <img className={styles.img} src={comment.reviewIMG} alt="" />
                    <div className={styles.comment_container}>
                        <p className={styles.comment}>{comment.comment}</p>
                        <div className={styles.commten_info}>
                            <p className={styles.date}>{comment.date}</p>
                            <p className={styles.reviewTitle}> 게시물 제목 : {comment.reviewTitle}</p>
                        </div>
                    </div>
                </section>
                )
            } 
        })
    ))

    return (
        <>
        <div className={styles.titleBox}>   
            <h2 className={styles.title}>내가 작성한 댓글</h2>
        </div>
        <p>현재 Review게시판에 존재하는 게시글의 댓글만 볼 수있습니다.</p>
        <p>클릭하면 해당 게시글로 이동합니다.</p>
        {renderComments}
        </>

    );
};

export default CommentList;