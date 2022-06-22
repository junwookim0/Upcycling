import { useNavigate } from 'react-router-dom';
import ReviewItem from './reviewItem';
import styles from './CSS/reviewPage.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import SubMainBanner from '../banner/SubMainBannerReviews';

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Search from './Search';


//🍎전체 Review를 보여주는 페이지

const ReviewPage = ({reviewRepository}) => {
    const [reviews, setReviews] = useState([])
    const { user } = useContext(AuthContext);
    const userId = user.uid

    const [keyword, setKeyword] = useState('')

    //🍎firebase에 저장된 review받아오기
    useEffect(()=> {
        const stopSync =  reviewRepository.syncReviews(reviews => {
            setReviews(reviews);
        })
        return () => stopSync();
    },[userId, reviewRepository])

    const navigator = useNavigate()
    const [onReviews,setOnReviews] = useState(Object.values(reviews))

    const [reviewsHashTags, setReviewsHashTags] = useState([])

    useEffect(()=> {
        setOnReviews(Object.values(reviews))
    },[reviews])

//🍎해시태그 검색
const onSearch = (text)=> {
    setKeyword(text)
    setReviewsHashTags(onReviews.map(review=>review.reviewHashtags))
    let hashTagArray = onReviews.map(review=>review.reviewHashtags)
    let array = (hashTagArray.map(hash => hash))
    // let filterd = array.filter(item => item===keyword)
    console.log(keyword)
    console.log(array)
    console.log(array.flat().map(item => {
        if(item === keyword) {
            console.log(item)
        }
    }))
}

// useEffect(()=> {
//     setReviewsHashTags(onReviews.map(review=>review.reviewHashtags))
//     let hashTagArray = onReviews.map(review=>review.reviewHashtags)
//     let array = (hashTagArray.map(hash => hash))
//     let filterd = array.filter(item => item===keyword)
//     console.log(filterd)

// },[onReviews,keyword])


    return (
        <div>
            <Nav/>
            <SubMainBanner/>
            <section className={styles.reviewPage}>
                <h1>Reviews</h1>
                <div className={styles.header}>
                    <div className={styles.search}>
                        <Search onSearch={onSearch}/>
                    </div>
                    <button className={styles.button_write}
                            onClick={()=>{
                                navigator('/reviews/write')
                            }}>글쓰기
                    </button>
                </div>

            <ul className={styles.list}>
                {
                    onReviews.map(review => (
                    <li key={review.id}
                    className={styles.list_item}
                    >
                        <ReviewItem review={review}/>
                    </li>))
                }
            </ul>
            </section>
        </div>
    );
};

export default ReviewPage;