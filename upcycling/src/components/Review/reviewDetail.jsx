import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CSS/reviewDetail.module.css'
import Like from './like';

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Nav from '../Nav/Nav';
import SubMainBannerReviews from '../banner/SubMainBannerReviews';
import Search from './Search';
import CommentForm from './commentForm';
import CommentReviseForm from './commentReviseForm';
import WriteButton from './writeButton';



//🍎 reviewPage에서 item의 이미지를 클릭했을 때 이동하는 컴포넌트
//Reivew의 전체적인 내용을 출력

const ReviewDetail = ({ deleteReview, reviewRepository, createAndUpdateComment, deleteComment, clickLike, removeLike}) => {
    const location = useLocation();
    const navigation = useNavigate();
    const { user } = useContext(AuthContext);
    //🍎user정보
    const userId = user.uid;

    //현재 review관련 useState
    const [reviewId] = useState(location.state.review.id)
    const [reviewState] = useState(location.state.review)
    const [reviews, setReviews] = useState([])

    //🍎firebase에 저장된 코멘트 받아오기
    const [currentReview, setCurrentReview] = useState()
    const [comments,setComments] = useState([])
    const [currentComment, setCurrentComment] = useState()

    const [show, setShow] = useState(false)
    const [showCommentForm, setShowCommentForm] = useState(false);


    //🍎firebase에 저장된 review받아오기
    useEffect(()=> {
    const stopSync =  reviewRepository.syncReviews(reviews => {
        setReviews(reviews);
    })
    return () => stopSync();
    },[userId, reviewRepository])


    //🍎현재 review를 담는 useEffect ->코드가 이상..?
    useEffect(()=> {
        let reviewArray = Object.entries(reviews)
        reviewArray.map(item => {
            if(item[0]===reviewId) {
                setCurrentReview(item)
            }
            return console.log('')
        })
    },[reviews,reviewId])

    
    
    //🍎현재 comment담는 useEffect
    useEffect(()=>{
        if(currentReview !== undefined) {
            if(currentReview[1].comment !== undefined) {
                let commentArray = Object.values(currentReview[1].comment)
            setComments(commentArray)
            }
            
        }
    },[reviews,currentReview])
    
    //🍎Reivew수정하기
    const goRevise = (review) =>{
        navigation(`/review/revise/${review.id}`, {state : {review}})
    }

    // //🍎Delete Review
    // const onDeleteReview = () => {
        
    // }


    //🍎코멘트 ADD
    const getComment = (newComment) => {
        const review = {...reviewState}
        createAndUpdateComment(newComment,review.id,userId)
    }

    //🍎Comment Delete
    const onDeleteComment = (comment) => {
        deleteComment(comment,reviewState.id, userId)
    }

    //🍎 elli어쩌구 버튼 누르면 menu 보이게 하기
    // const [openMenu, setOpenMenu] = useState(false)

<<<<<<< HEAD
    const viewMenu = () => {
        return  comments.map((item)=>{
            return <comments_list item={item}/>;
        });
=======
    const viewMenu = (event,index)=> {
        setShow(!show)
        // event.target.classList.add()
        console.dir(event)
>>>>>>> 30b7a8782f7ebbd1bde0809861f892048abb12dc
    }

    //🍎comment 수정누르면 코멘트 보내기
    const onReviseComment = (comment) => {
        setCurrentComment(comment)
    }

    //🍎코멘트 작성창 클릭하면 보여주는 함수
    const onShowCommentWriteForm = () => {
        setShowCommentForm(!showCommentForm)
    }

    return (
        <section >
            <Nav/>
            <SubMainBannerReviews/>
            <div className={styles.container}>
                    <div className={styles.header}> 
                    <div className={styles.userInfo}>
                        <img className={styles.userPhoto} src={reviewState.profileIMG} alt="profile" />
                        <div className={styles.userInfo_innerContainer}>
                            <h3 className={styles.useName}>{reviewState.nickname}</h3>
                            <p className={styles.userEmail}>({reviewState.email && reviewState.email})</p>
                        </div>
                    </div>
                    <div className={styles.container_inner}>
                    <Search/>
                    <WriteButton/>
                    </div>
                </div>
                
                <div className={styles.content}>
                    <img src={reviewState.reviewIMG} alt="review" />
                    <div className={styles.content_container}>
                        <div className={styles.title}>
                            <div className={styles.container_title}>
                                <span className={styles.reviewTitle}>{reviewState.reviewTitle}</span> 
                                <span className={styles.date}>{reviewState.reviewDate}</span>
                            </div>
                            <div className={styles.tags}>
                                {reviewState.reviewHashtags[0] && <span className={styles.hashtags}># {reviewState.reviewHashtags[0]}</span> }
                                {reviewState.reviewHashtags[1] && <span className={styles.hashtags}># {reviewState.reviewHashtags[1]}</span> }
                                {reviewState.reviewHashtags[2] && <span className={styles.hashtags}># {reviewState.reviewHashtags[2]}</span> }
                            </div>

                        </div>
                        <p className={styles.description}>{reviewState.reviewDescription}</p>
                    </div>
                </div>

                <div className={styles.icon_container}>
                    <div className={styles.icon_container_left}>
                    <Like reviewRepository={reviewRepository} review={reviewState} userId={user} clickLike={clickLike} removeLike={removeLike}/>
                        <button onClick={()=>onShowCommentWriteForm()} className={styles.comment_button}><i className="fa-solid fa-comment-dots"></i></button>
                    </div>
                    { userId === reviewState.userId && (<div className={styles.icon_container_right}>
                        <button onClick={()=>goRevise(reviewState)}>글 수정</button>
                        <button onClick={()=>deleteReview(reviewState)}>글 삭제</button>
                    </div>)}
                </div>
                <div className={styles.comments_container}>
                    <h2>댓글</h2>
                    <div className={styles.comments_list}>
                        { comments && (
                            comments.map((item,index)=> (
                                <div key={item.id} className={styles.comments_item}>
                                    <div className={styles.comment_userInfo}>
                                    <img className={styles.comment_userPhoto} src={item.userPhoto} alt="user" />
                                        <div className={styles.comment_boxContainer}>
                                            <div className={styles.comment_userInfo_container}>
                                                <span className={styles.comments_name}>{item.userName}</span>
                                                <span className={styles.comments_email}>({item.userEmail})</span>
                                            </div>
<<<<<<< HEAD
                                            <button onClick={()=>viewMenu(item.id)} className={styles.comments_ellipsis}>
=======
                                            <button onClick={(event)=>viewMenu(event,index)} className={styles.comments_ellipsis}>
>>>>>>> 30b7a8782f7ebbd1bde0809861f892048abb12dc
                                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                            {show && <div id={index} className={styles.comments_ellipsis_container}>
                                                <button onClick={()=>onReviseComment(item)}>수정</button>
                                                <button onClick={()=>onDeleteComment(item)}>삭제</button>
                                            </div>}
                                        </div>
                                    </div>
                                    
                                    <p className={styles.comments_text}>{item.comment}</p>
                                    <span className={styles.comments_date}>{item.date}</span>
                                    <CommentReviseForm review={reviewState} getComment={getComment} currentComment={currentComment}/>
                                </div>
                                )
                            ))
                        }
                    </div>
                </div>  
                
                { showCommentForm && <CommentForm review={reviewState}  getComment={getComment}/>}
            </div>
        </section>
    );
};

export default ReviewDetail;