import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { firestore ,SignOut } from "../../../firebase";
import { collection, onSnapshot, query} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import "./MyProfileChange.css";
import { useState } from "react";
import { useEffect } from "react";


const MyProfileChange = () => {
    const { user } = useContext(AuthContext);
    const [userid, setUserId] = useState([]);
    // 🥑 렌더링 시 콜백 함수 실행
    useEffect(() => {
        const q = query(
        collection(firestore, "users"),
        );
        onSnapshot(q, (snapshot) => {
        const userArray = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }));
            setUserId(userArray);
        })
    }, []);
    const navigate = useNavigate();
    const handleLogout = async () => {
        await SignOut();
        alert("로그아웃");
        navigate("/");
    };
    const changeProfile = () => {
        navigate("/up");
    }
    return(
        <div className="profileChange_box">
            <p className="userProfile_photo">{user.photoURL ? <img src={user.photoURL} alt="userphoto"/>  : <img src="../../../images/profile-picture.png" alt="userphoto2"/>}</p>
            <p className="userProfile_name">{user.displayName ? user.displayName : user.reloadUserInfo.screenName ? user.reloadUserInfo.screenName : `${userid.length}번째 손`}님</p> 
            <p className="userProfile_email">{user.email ?  user.email : null}</p>
            <button className="userProfile_logout" onClick={handleLogout}>Logout</button>
            <div className="userProfile_change" onClick={changeProfile }>
                <i className="fa-solid fa-gear" ></i>
            </div>
        </div>
    )
}
export default MyProfileChange;