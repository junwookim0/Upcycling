/* 🥑 deal 게시판 목록 */

import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import DealItem from "./DealItem";
import Nav from "../Nav/Nav";
import styles from './CSS/dealPage.module.css';
import SubMainBanner from "../banner/SubMainBannerDeal";
import { collection, getDocs, query, orderBy, endAt } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useEffect } from "react";
import { startAt } from "firebase/database";

const DealPage = ({deals}) => {
    // title 누르면 게시글 내용 볼 수 있도록
    const navigate = useNavigate();

    const onClick = () => {
        navigate('/deals/write');
    };

    /* 검색 */
    const [keyword, setKeyword] = useState('')
    const [onDeals, setOnDeals] = useState(Object.values(deals));

    useEffect(() => {
        setOnDeals(Object.values(deals))
    }, [deals])

    const onChange = (e) => {
        setKeyword(e.target.value)
    };

    const onSearch = () => {
        const dealsHashtags = [onDeals.map(deal => deal.hashtagArray)]
        const newDealArray = [...dealsHashtags]
        console.log(newDealArray)
        console.log(newDealArray.indexOf(keyword))
    } 

    return (
        <div>
            <Nav />
            <SubMainBanner/>
            <section className={styles.dealPage}>
                <h1>Deals</h1>
                
                <div className={styles.header}>
                    <div className={styles.search}>
                        <input type="text"
                        onChange={onChange} />
                        <button
                        onClick={onSearch}>Search</button>
                    </div>
                    <button
                    className={styles.button_write}
                    onClick={onClick}>글 작성</button>
                </div>

                <ul className={styles.list}>
                    {
                        deals.map(deal => (
                            <li key={deal.createdAt}>
                                <DealItem deal={deal} />
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    );
};

export default DealPage;