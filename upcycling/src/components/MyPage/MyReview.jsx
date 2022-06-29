import { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// import required modules
import {EffectCoverflow, Pagination, Navigation , Autoplay} from "swiper";
import { useNavigate } from 'react-router-dom';
import CommentList from './CommentList';



const MyReview = ({reviewRepository}) => {
    const [setSwiperRef] = useState(null);
    const navigate = useNavigate()

    //🍎user정보
    const { user } = useContext(AuthContext);
    const userId = user.uid;

    //🍎전체리뷰
    const [reviews, setReviews] = useState([])
    const [onReviews, setOnReviews] = useState([])

    //🍎review /like
    const [myReviews, setMyReviews] = useState([])
    const [myLikes, setMyLikes] = useState([])
    const [myComments, setMyComments] = useState([])

    //🍎정렬까지 완료된 리뷰들
    const [onMyReviews,setOnMyReviews] = useState([])
    const [onMyLikes,setOnMyLikes] = useState([])
    const [onMyComments, setOnMyComments] = useState([])


    //🍎게시물 이동
    const goDetail = (review) => {
        navigate(`/reviews/${review.id}`, {state : {review}})
    }


    //🍎게시물 삭제유무를 확인하기위한 firebase전체 리뷰
    useEffect(()=> {
        const stopSync =  reviewRepository.syncReviews(reviews => {
            setReviews(reviews);
        })
        return () => stopSync();
        },[userId, reviewRepository])

    useEffect(()=> {
        let reviewArray = Object.values(reviews)
        let orderedReview =  reviewArray.slice().sort((a,b) => b.reviewDate.localeCompare(a.reviewDate))
        setOnReviews(orderedReview)
    },[reviews])
    
    // 🍎📃firebase에 저장된 myReview받아오기(내가 작성한 리뷰)
    useEffect(()=> {
        const stopSync =  reviewRepository.syncMyReviewsById(reviews => {
            setMyReviews(reviews);
        }, userId)
        return () => stopSync()
    },[userId, reviewRepository])

    // //🍎받아온 reviews를 value값만 가져오기 - 최신순 정렬
    useEffect(()=> {
        let reviewArray = Object.values(myReviews)
        let orderedReview =  reviewArray.slice().sort((a,b) => b.reviewDate.localeCompare(a.reviewDate))
        setOnMyReviews(orderedReview)
    },[myReviews])



    //🍎👍firebase에 저장된 myLikes받아오기(내가 좋아요한 리뷰들)
    useEffect(()=> {
        const stopSync =  reviewRepository.syncMyLikeById(reviews => {
            setMyLikes(reviews);
        },userId)
        return () => stopSync()
    },[userId, reviewRepository])

    //🍎받아온 Likes를 value값만 가져오기 - 최신순 정렬
    useEffect(()=> {
        let reviewArray = Object.values(myLikes)
        setOnMyLikes(reviewArray)
    },[myLikes])


    //🍎✏️firebase에 저장된 myComments받아오기(내가 작성한 리뷰들)
    useEffect(()=> {
        const stopSync =  reviewRepository.syncMyCommentsById(comments => {
            setMyComments(comments);
        },userId)
        return () => stopSync()
    },[userId, reviewRepository])

    //🍎받아온 Comments를 value값만 가져오기 - 최신순 정렬
    useEffect(()=> {
        let reviewArray = Object.values(myComments)
        let orderedReview =  reviewArray.slice().sort((a,b) => b.date.localeCompare(a.date))
        setOnMyComments(orderedReview)
    },[myComments])


    //🍎👍현재 존재하는 게시물에서 내가 좋아요를 누른 리뷰
    const filteredLikes = onMyLikes.map(like => (
        onReviews.map(review => {
            if(review.id === like.id) {
                return <SwiperSlide key={review.id}><img onClick={()=>goDetail(review)} src={review.reviewIMG} alt="" /></SwiperSlide>
            } 
        })
    ))

    console.log(filteredLikes)

    return (
        <>
        <h2 className="Carousel_text">내가 작성한 리뷰</h2>
        <div className="contents_swiper">
            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={3}
                centeredSlides={false}
                spaceBetween={30}
                pagination={{
                type: "fraction",
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {
                    onMyReviews && onMyReviews.map(review => {
                        return <SwiperSlide key={review.id}><img onClick={()=>goDetail(review)} src={review.reviewIMG} alt="" /></SwiperSlide>
                    })
                }
            </Swiper>
        </div>



        <h2 className="Carousel_text">내가 좋아요한 리뷰</h2>
        <div className="contents_swiper">
            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={3}
                centeredSlides={false}
                spaceBetween={30}
                pagination={{
                type: "fraction",
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {/* {
                    onMyLikes.map(review => {
                        return <SwiperSlide key={review.id}><img onClick={()=>goDetail(review)} src={review.reviewIMG} alt="" /></SwiperSlide>
                    })
                } */}
                {filteredLikes}

            </Swiper>
        </div>
        {onMyComments && (<CommentList onReviews={onReviews} onMyComments={onMyComments}/>)}
        </>
    );
}

export default MyReview;