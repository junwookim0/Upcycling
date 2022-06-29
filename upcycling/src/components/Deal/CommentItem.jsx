/* 🥑 06-15 댓글 가져오기, 수정, 삭제 */
// 06-20 사용자 정보
// 작성자 아이디 = 현재 아이디 같을 때 삭제 수정 버튼 보임

import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

import styles from "./CSS/commentReviseForm.module.css"

const CommentItem = ({ commentObj }) => {
    /* 사용자 정보 */
    const { user } = useContext(AuthContext);

    // editing 모드인지 아닌지
    const [editing, setEditing] = useState(false);
    // 업데이트
    const [newDComment, setNewDComment] = useState(commentObj.content);
    
    const location = useLocation();
    const dealState = location.state.deal;

    /* 사용 함수 */
    // editing 모드 끄고 켜기
    const toggleEditing = () => setEditing((prev) => !prev);

    // 업데이트
    const onSubmit = async (e) => {
        e.preventDefault();
        updateDoc(doc(firestore, `/dbDeals/${dealState.id}/dComments/${commentObj.id}`), {
            content: newDComment}
            );
            setEditing(false);
    };
    
    const onChange = (e) => {
        const {target: {value}} = e;
        setNewDComment(value);
    }

    // 댓글 삭제
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 이 댓글을 삭제하시겠습니까?");
            if (ok) {
                //해당하는 게시글 파이어스토어에서 삭제
                await deleteDoc(doc(firestore, `/dbDeals/${dealState.id}/dComments/${commentObj.id}`));
            }
        };

    return (
        <>
            {
                editing ? (
                    <div className={styles.container}>
                        <h3 className={styles.user}>{user.displayName}</h3>
                        <div className={styles.comment_form}>
                            <form onSubmit={onSubmit}>
                                <textarea 
                                onChange={onChange}
                                value={newDComment}
                                className={styles.textarea} />
                                <div>
                                    <input 
                                    type="submit" value="댓글 수정"
                                    className={styles.button_ok} />
                                    <button 
                                    onClick={toggleEditing}
                                    className={styles.button}>취소</button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                        <div className={styles.comments_item}>
                            <div className={styles.comment_userInfo}>
                                <img src={commentObj.creatorPhoto}
                                alt="현재 사용자의 프로필 사진입니다"
                                className={styles.comment_userPhoto} />
                                <div className={styles.comment_boxContainer}>
                                    <div className={styles.comment_userInfo_container}>
                                        <span className={styles.comments_name}>{commentObj.creatorName}</span>
                                    </div>
                                </div>
                            </div>
                            <span>{commentObj.date}</span>
                            <p>{commentObj.content}</p>
                            {
                                commentObj.creatorId == user.uid ? (
                                    <>
                                    {/* 버튼 누르면 삭제/수정 보이게 */}
                                        <button className={styles.comments_ellipsis}>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                    
                                        <div className={styles.comments_ellipsis_container}>
                                            <button onClick={onDeleteClick}>삭제</button>
                                            <button onClick={toggleEditing}>수정</button>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    )
                }
        </>
    ); 
};

export default CommentItem;