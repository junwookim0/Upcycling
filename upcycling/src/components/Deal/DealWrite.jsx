/* 🥑 거래글 작성! */
// 06-20 사용자 정보
// css 파일 버튼만 수정하면 됨

import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { firestore, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid"; // 사진 랜덤 아이디
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import styles from "./CSS/dealWrite.module.css";

import Nav from "../Nav/Nav";
import SubMainBannerDeal from "../banner/SubMainBannerDeal";

const DealWrite = () => {

    /* 사용자 정보 */
    const { user } = useContext(AuthContext);

    /* 작성한 제목, 가격, 내용 firestore에 저장 */
    const [dTitle, setDTitle] = useState(''); // 제목
    const [dHashtag1, setDHashtag1] = useState(''); // 해시태그
    const [dHashtag2, setDHashtag2] = useState(''); // 해시태그
    const [dHashtag3, setDHashtag3] = useState(''); // 해시태그
    const [dPrice, setDPrice] = useState(''); // 가격
    const [dContent, setDContent] = useState(''); // 내용
    
    /* 사진은 storage */
    const [attachment, setAttachment] = useState('');

    const navigate = useNavigate();

    /* 사용 함수 */

    const onChange = (e) => {
        const {target: {name, value}} = e;
        
        if(name === 'title') {
            setDTitle(value);
        } else if(name === 'hashtag1') {
            setDHashtag1(value);
        } else if(name === 'hashtag2') {
            setDHashtag2(value);
        }else if(name === 'hashtag3') {
            setDHashtag3(value);
        }else if(name === 'price') {
            setDPrice(value);
        } else if(name === 'content') {
            setDContent(value);
        };
    };

    const onFileChange = (e) => {
        const {target: {files}} = e;
        const theFile = files[0];
        // 파일 이름 읽기
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile); // 데이터 인코딩
    };

    // 이미지 첨부 취소
    const onClearAttatchment = () => setAttachment('');

    // submit
    const onSubmit = async (e) => {
        e.preventDefault();
    
        let attachmentUrl = '';
        if (attachment !== '') {
            // 참조 경로 생성
            const attachmentRef = ref(storage, `images/${user.uid}/${uuidv4()}`); // 사용자 아이디 들어오면 중간에 넣을 거
            // 참조 경로로 파일 업로드
            // uploadiString 써야지 똑바로 들어감
            const response = await uploadString(attachmentRef, attachment, "data_url");
            console.log(response);
            attachmentUrl = await getDownloadURL(response.ref);    
        };
    
        let date = new Date();
        // submit하면 추가할 데이터
        const dealObj = {
            title: dTitle, // 제목 
            hashtagArray: [dHashtag1, dHashtag2, dHashtag3],
            price: dPrice, // 가격
            content: dContent, // 내용
            createdAt: Date.now(), // 생성날짜
            date : format(date, "yyyy.MM.dd HH:mm"),
            creatorId: user.uid,
            creatorName: user.displayName,
            creatorPhoto: user.photoURL,
            attachmentUrl: attachmentUrl,
            // 06-21 좋아요
            likeCount: 0,
            likeUser: []
        };
    
        await addDoc(collection(firestore, "dbDeals"), dealObj);
    
        // state를 비워서 form 비우기
        setDTitle("");
        setDHashtag1("");
        setDHashtag2("");
        setDHashtag3("");
        setDPrice("");
        setDContent("");
    
        // state를 비워서 파일 미리보기 img src 비우기
        setAttachment("");
    
        navigate('/deals', {dealObj})
    }; // 파이어베이스 저장 완
    

    return (
        <>
            <Nav />
            <SubMainBannerDeal />
            <div className={styles.dealWrite}>
                <div className={styles.titleBox}>
                    <h2>마켓 글쓰기</h2>
                </div>
                <form
                onSubmit={onSubmit}
                className={styles.form}>
                    {/* 제목 작성 */}
                    <input
                    name="title"
                    onChange={onChange}
                    value={dTitle}
                    type="text" 
                    placeholder="제목을 입력해 주세요"
                    className={styles.input_title} /> <br />

                    {/* 가격 작성 */}
                    <input
                    name="price"
                    onChange={onChange}
                    value={dPrice}
                    type="number"
                    placeholder="가격을 입력해 주세요"
                    className={styles.input_price} /> <br />

                    {/* 글 작성 */}
                    <textarea
                    name="content"
                    onChange={onChange}
                    value={dContent}
                    className={styles.textarea} /> <br />

                    <div className={styles.last_container}>
                        <div className={styles.inner}>
                            <div className={styles.input_container}>
                                {/* 업로드할 사진 미리 보기 */}
                                {attachment != '' ? (
                                    <div>
                                        <img 
                                        src={attachment} 
                                        alt="업로드한 이미지"
                                        className={styles.fileInput_img} />
                                    </div>
                                ) : (
                                    <div className={styles.before_uploadedImg}>
                                        <p>이미지를 <br />첨부해 주세요</p>
                                    </div>
                                )}
                                <input 
                                onChange={onFileChange}
                                type="file" 
                                accept="image/*"
                                className={styles.input_button} />
                            </div>

                            <div className={styles.hash_container}>
                                <p>#태그를 입력해 주세요 (최대 3개)</p>
                                {/* 해시태그1 작성 */}
                                <input
                                name="hashtag1"
                                onChange={onChange}
                                value={dHashtag1}
                                type="text" 
                                placeholder="해시태그 1"
                                className={styles.hashtags} /> <br />
                                
                                {/* 해시태그2 작성 */}
                                <input
                                name="hashtag2"
                                onChange={onChange}
                                value={dHashtag2}
                                type="text" 
                                placeholder="해시태그 2"
                                className={styles.hashtags} /> <br />

                                {/* 해시태그3 작성 */}
                                <input
                                name="hashtag3"
                                onChange={onChange}
                                value={dHashtag3}
                                type="text" 
                                placeholder="해시태그 3"
                                className={styles.hashtags} /> <br />
                            </div>
                        </div>
                        
                        <div className={styles.submit_buttons}>
                            <button
                            className={styles.button}>
                                취소
                            </button>
                            {/* 게시글 업로드 */}
                            <input 
                            type="submit" 
                            value="작성"
                            className={styles.button_ok} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default DealWrite;