import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { firestore ,SignOut } from "../../../firebase";
import { collection, onSnapshot, query} from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import "./MyProfileChange.css";
import { useState } from "react";
import { useEffect } from "react";
import Modalimg from '../../modal/modalimg';
import TestProfile from '../../login/TestProfile';


const MyProfileChange = () => {
    const { user } = useContext(AuthContext);
    const [userid, setUserId] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
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
    
    return(
        <div className="profileChange_box">
            <p className="userProfile_photo">{user.photoURL ? <img src={user.photoURL} alt="userphoto"/>  : <img src="../../../images/profile-picture.png" alt="userphoto2"/>}</p>
            <p className="userProfile_name">{user.displayName ? user.displayName : user.reloadUserInfo.screenName ? user.reloadUserInfo.screenName : `${userid.length}번째 손`}님</p> 
            <p className="userProfile_email">{user.email ?  user.email : '이메일이 없습니다'}</p>
            <button className="userProfile_logout" onClick={handleLogout}>Logout</button>
            <div className="userProfile_change" onClick={openModal}>
                <i className="fa-solid fa-gear" ></i>
            </div>
            <Modalimg open={modalOpen} close={closeModal} header="프로필설정">
                <TestProfile/>
            </Modalimg>
        </div>
    )
}
export default MyProfileChange;