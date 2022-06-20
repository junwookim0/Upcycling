/* 🥑 deal 목록의 개체 */
// 06-20 사용자 정보

import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DealItem = ({deal}) => {
    /* 사용자 정보 */
    const { user } = useContext(AuthContext);

    // title 누르면 게시글 내용 볼 수 있도록
    const navigate = useNavigate();

    // dealDetail로 이동
    const onClick = () => {
        navigate(`/deals/${deal.createdAt}`, {state: {deal}})
    };

    return (
        <div>
            <img
            width="150px"
            src={deal.attachmentUrl}
            onClick={onClick} />
            <h3>{deal.title}</h3>
            <p>{deal.price}</p>
            <p>{user.displayName}</p>
        </div>
    );
};

export default DealItem;