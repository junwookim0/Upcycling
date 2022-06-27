/* 🥑 거래글 자세히! */
// 게시글(댓글(해야 됨), 파일(했음)) 삭제, 수정(revise 페이지로 이동)
// commentWrite 연결
// dealLike 연결
// 댓글 개수 세기 해야 됨
// 06-20 로그인 된 사람 = 작성자일 경우에만 삭제, 수정 버튼 보이도록
// 06-27 내가 쓴 글은 좋아요 클릭할 수 없게 해야 함

import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "@firebase/storage";
import { firestore, storage } from "../../firebase";

import styles from './CSS/dealDetail.module.css'

import CommentWrite from "./CommentWrite";
import DealLike from "./DealLike";

const DealDetail = () => {
    /* 사용자 정보 */
    const { user } = useContext(AuthContext);

    const location = useLocation();
    const dealState = location.state.deal;
    const navigate = useNavigate();

    // 글 삭제
    const deserRef = ref(storage, dealState.attachmentUrl);

    const onDeleteClick = async() => {
        const ok = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
            if (ok) {
                    await deleteDoc(doc(firestore, `/dbDeals/${dealState.id}`));
                    // 삭제 버튼 누르면 /거래(테이블게시판)로 넘어감
                    deleteObject(deserRef).then(() => {
                        console.log('파일 삭제 완');
                    }).catch((err) => {
                        console.log('파일 삭제 안 됨')
                    })
                    navigate('/deals');
                }
            };
    
    // 글 수정
    const onReviseClick = (deal) => {
        navigate(`/deals/revise/${deal.createdAt}`, {state: {deal}})
    }

    // 댓글 개수 가져오기
    const commentCnt = () => {
        firestore.collection('dbDeals')
        .doc(`${dealState.id}`)
        .collection('dComments')
        .get();
    };

    // price 천 단위
    let dealPrice = Number(dealState.price).toLocaleString('ko-KR');

    return (
        <section>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <img src={dealState.creatorPhoto}/>
                    <h3>{dealState.creatorName}</h3>
                </div>

                <div className={styles.searchInput}>
                    <input type="text" />
                    <button>Search</button>
                </div>
            </div>

            <div className={styles.content}>
            <img src={dealState.attachmentUrl} alt="deal" />
                <div className={styles.container}>
                    <select className="" id="">
                        <option value="">숨기기</option>
                        <option value="">신고하기</option>
                        <option value="">삭제</option>
                        <option value="">수정</option>
                    </select>
                    
                    {/* 정보 */}
                    <div className={styles.title}>
                        <h3>{dealState.title}</h3>
                        {dealState.hashtagArray[0]&& <span>#{dealState.hashtagArray[0]} </span>}
                        {dealState.hashtagArray[1]&& <span>#{dealState.hashtagArray[1]} </span>}
                        {dealState.hashtagArray[2]&& <span>#{dealState.hashtagArray[2]} </span>}
                        {
                            dealState.price == '' ? (
                                <p>나눔🧡</p>
                            ) : (
                                <p>{dealPrice} 원</p>
                            )
                        }
                    </div>
                    <p className={styles.description}>{dealState.content}</p>
                </div>
            </div>

            <hr />
            <div className={styles.icon_container}>
                <div className={styles.icon_container_left}>
                    {/* 좋아요 */}
                    <DealLike 
                    isMyLike={dealState.likeUser.includes(user.uid)}
                    dealState={dealState} />
                    <p className={styles.comment}>💌댓글개수</p>
                </div>
                {
                    dealState.creatorId == user.uid ? (
                        <div className={styles.icon_container_right}>
                            <button onClick={() => onReviseClick(dealState)}>수정</button>
                            <button onClick={onDeleteClick}>삭제</button>
                        </div>    
                    ) : (
                        <>
                        </>
                    )
                }
            </div>
            {/* 댓글 작성 */}
            <div className={styles.comments_container}>
                <CommentWrite />
            </div>
            
        </section>
    );

};

export default DealDetail;