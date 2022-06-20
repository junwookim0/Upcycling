import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CSS/reviewItem.module.css'

//🍎 ReviewPage에서 map으로 사용되는 item 컴포넌트

const ReviewItem = ({review}) => {
    const navigate = useNavigate()

    if(review.likes !==undefined) {

        console.log(Object.keys(review.likes))
    }
    

    return (
        <section className={styles.container}>
            <img className={styles.reviewImg} src={review.reviewIMG} alt="review"
                onClick={()=>{
                    navigate(`/reviews/${review.id}`, {state : {review}})
                }}
            />
            <h3>{review.reviewTitle}</h3>
            <p>{review.nickname}</p>
            <div>
                <span>👍</span>
                {/* {Object.keys(review.likes)===undefined? (<p>0</p>):
                (<p>ㅠㅠ</p>)} */}
                {/* <p>{review.likes.length}</p> */}
            </div>
        </section>
    );
};

export default ReviewItem;