/* 🥑 06-17 좋아요 */
// 06-21 dbDeals에 좋아요 수/ 좋아요 누른 유저 값 업데이트

import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { firestore } from "../../firebase";
import { doc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";

const DealLike = ({dealState, isMyLike}) => {

    /* 사용자 정보 */
    const { user } = useContext(AuthContext);

    // like 버튼이 눌렸는지 안 눌렸는지
    const [likeAction, setLikeAction] = useState(isMyLike);

    useEffect(() => {
        console.log(isMyLike);
        isMyLike ? setLikeAction(true) : setLikeAction(false)
    }, [setLikeAction])

    /* 사용 함수 */
    const toggleLike = async () => {
        const dLikeRef = doc(firestore, "dbDeals", dealState.id);

        if(likeAction === false) {
            await updateDoc(dLikeRef, {
                likeCount: increment(1),
                likeUser: arrayUnion(`${user.uid}`)
            });
            setLikeAction(true);
        } else {
            await updateDoc(dLikeRef, {
                likeCount: increment(-1),
                likeUser: arrayRemove(`${user.uid}`)
            });
            setLikeAction(false);
            window.alert('좋아요를 취소하셨습니다.')
        };        
    };


    return(
        likeAction ? (
            <>
                <span
                onClick={toggleLike}>
                    💖
                </span>
                <span>
                    {dealState.likeCount}
                </span>
            </>
        ) : (
            <>
                <span
                onClick={toggleLike}>
                    🤍
                </span>
                <span>
                    {dealState.likeCount}
                </span>
            </>
        )
    );
};

export default DealLike;