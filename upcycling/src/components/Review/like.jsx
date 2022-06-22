import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './CSS/like.modules.css'

import { useContext } from "react";
import AuthContext from "../context/AuthContext";


function Like({reviewRepository, review, clickLike, removeLike}) {

        const [reviews, setReviews] = useState([])
        const [currentReview, setCurrentReview] = useState([])
        const [likeState, setLikeState] =useState('🤍')

        const { user } = useContext(AuthContext);
        const userId = user.uid

        let currentReviewId = review.id

        // console.log(currentReview)
        useEffect(()=> {
            const stopSync = reviewRepository.syncReviews(reviews => {
            setReviews(reviews);
        })
            return () => stopSync();
        },[userId, reviewRepository])
        
        useEffect(()=> {
            let reviewArray = Object.keys(reviews)
            reviewArray.map(item=> {
                if(item === currentReviewId) {
                    setCurrentReview(reviews[item])
                    
                }
            })
        })

        useEffect(()=>{
            setLikeState('🤍')
            if(currentReview.likes !== undefined) {
                let likesArray = Object.keys(currentReview.likes)

                likesArray.map(item=>{
                    if(item ===userId) {
                        setLikeState('💖')
                    }
                })
            }
        })

        //🍎like 누르기
        const onClickLike = () => {
            // clickLike(userId, review)
            
            if(currentReview.likes === undefined) {
                clickLike(userId, currentReview)
                // console.log('좋아요 저장성공')
                // console.log(review.likes)
                setLikeState('💖')
                
            } else if (currentReview.likes !== undefined) {
                let likesArray = Object.keys(currentReview.likes)
                likesArray.map(item=>{
                    if(item !==userId) {
                        clickLike(userId, currentReview)
                        // console.log('좋아요 저장')
                        // console.log(review.likes)
                        setLikeState('💖')
                    } else {
                        removeLike(userId, currentReview)
                        // console.log('아이디동일 삭제하기')
                        // console.log(review.likes)
                        setLikeState('🤍')
                    }
                })
            }
        }




    return (
            <button 
            className={styles.like}
            onClick={onClickLike}
            >{likeState}</button>)
}

export default Like
