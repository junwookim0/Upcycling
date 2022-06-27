/* 🥑 deal 게시판 목록 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DealItem from "./DealItem";
import Nav from "../Nav/Nav";
import styles from './CSS/dealPage.module.css';
import SubMainBanner from "../banner/SubMainBannerDeal";
import { useState } from "react";
import { firestore } from "../../firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";

const DealPage = ({deals}) => {

    const [searchDeals, setSearchDeals] = useState([]);

    const navigate = useNavigate();

    const onClick = () => {
        navigate('/deals/write');
    };

    const [keyword, setKeyword] = useState('');

    const onChange = (e) => {
        setKeyword(e.target.value);
    };

    /* 해시태그 검색 */
    const onSearchClick = async () => {
        const q = query(
            collection(firestore, 'dbDeals'),
            where('hashtagArray', 'array-contains', keyword),
        );
        
        onSnapshot(q, (snapshot) => {
            const searchArray = snapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            setSearchDeals(searchArray);
            console.log(searchDeals);
        })
    };

    return (
        <div>
            <Nav />
            <SubMainBanner/>
            <section className={styles.dealPage}>
                <h1>Deals</h1>
                <div className={styles.header}>
                    <div className={styles.search}>
                        <input 
                        onChange={onChange}
                        type="text" placeholder="관심 있는 해시태그로 검색해보세요"/>
                        <button onClick={onSearchClick}>검색하기</button>
                        <hr />
                    </div>
                    <button
                    className={styles.button_write}
                    onClick={onClick}>글 작성하기</button>
                </div>

                <ul className={styles.list}>
                    {
                        !keyword ? (
                            deals.map(deal => (
                                <li key={deal.createdAt}>
                                    <DealItem deal={deal} />
                                </li>
                            ))
                        ) : (
                            searchDeals.map(search => (
                                <li key={search.createdAt}>
                                    <DealItem deal={search} />
                                </li>
                            ))
                        )
                    }
                </ul>
            </section>
        </div>
    );
};

export default DealPage;