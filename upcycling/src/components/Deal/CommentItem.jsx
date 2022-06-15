/* 06-15 댓글 가져오기, 수정, 삭제 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

import styles from './CSS/dealDetail.module.css'

const CommentItem = ({commentObj}) => {
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
        <section>
            <div key={commentObj.id}>
                {
                    editing ? (
                        <>
                            <form onSubmit={onSubmit}>
                                <textarea 
                                onChange={onChange}
                                value={newDComment} cols="80" rows="5"></textarea>
                                <input type="submit" value="댓글 수정"/>
                            </form>
                            <button onClick={toggleEditing}>취소</button>
                        </>
                    ) : (
                        <>
                            <span>user name</span>
                            <span>date</span>
                            <p>{commentObj.content}</p>
                            <button onClick={onDeleteClick}>삭제</button>
                            <button onClick={toggleEditing}>수정</button>
                        </>
                    )
                }
            </div>
        </section>
    ); 
};

export default CommentItem;