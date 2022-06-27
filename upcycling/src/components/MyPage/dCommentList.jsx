import { useContext, useState, useEffect } from 'react';
import { query, where, orderBy, onSnapshot, collectionGroup } from 'firebase/firestore';
import { firestore } from '../../firebase';
import AuthContext from '../context/AuthContext';
import styles from './CommentList.module.css'


const DCommentList = () => {
    // user 정보
    const { user } = useContext(AuthContext);
    const goDetail = () => {

    }

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

    const renderDComments = myDComments.map(mydc => (
        <section key={mydc.id} onClick={()=>goDetail()} className={styles.commentList}>
            <img className={styles.img} src={mydc.creatorPhoto} alt="" />
            
            <div className={styles.comment_container}>
                <p className={styles.comment}>{mydc.content}</p>
                <div className={styles.commten_info}>
                    <p className={styles.date}>{mydc.date}</p>
                    <p className={styles.reviewTitle}> 게시물 제목 : {mydc.reviewTitle}</p>
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