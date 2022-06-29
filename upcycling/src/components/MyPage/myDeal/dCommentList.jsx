import { useContext, useState, useEffect } from 'react';
import { query, where, orderBy, onSnapshot, collectionGroup } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import AuthContext from '../../context/AuthContext';
import styles from './dCommentList.module.css'
import { useNavigate } from "react-router-dom";

const DCommentList = (del) => {

    // user 정보
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [myDComments, setMyDComments] = useState([]);

    useEffect(() => {
        const mydc = query(
            collectionGroup(firestore, "dComments"),
            where("creatorId", "==", user.uid),
            orderBy("createdAt", "desc")
        );

        onSnapshot(mydc, (snapshot) => {
            const myDealCommentArray = snapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            setMyDComments(myDealCommentArray);
        });
    }, []);

    /* 사용 함수 */
    const onClick = (deal)=> {
        navigate(`/deals/${deal.createdAt}`,{state : {deal}})
    }

    const renderDComments = myDComments.map(mydc => (
        <section key={mydc.id} onClick={onClick} className={styles.commentList}>
            <div> {/* 이미지 없을 때 공간 이상해져서 추가했어요 */}
                <img className={styles.img} src={mydc.creatorPhoto} alt="" />
            </div>
            
            <div className={styles.comment_container}>
                <p className={styles.comment}>{mydc.content}</p>
                <div className={styles.commten_info}>
                    <p className={styles.date}>{mydc.date}</p>
                    <p className={styles.reviewTitle}> 게시물 제목 : {mydc.dealTitle}</p>
                </div>
            </div>
        </section>
    ))

    return (
        <>
        <div className={styles.titleBox}>   
            <h2 className={styles.title}>내가 작성한 댓글</h2>
        </div>
        {/* 06-27 🥑 선주 */}
        {renderDComments}
        </>

    );
};

export default DCommentList;