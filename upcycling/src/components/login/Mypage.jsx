import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SignOut } from "../../firebase";
import Nav from '../Nav/Nav';
import SubMainBanner from "../banner/SubMainBannerMypage"
import Carousel_mypage from "../banner/Carousel_mypage";
const Mypage = () => {
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const goSignIn = () => {
        navigate("/signin");
    }
    const handleLogout = async () => {
        await SignOut();
        alert("로그아웃");
        navigate("/");
    };
    
    if(!user){
        return (
            <div>
                <h1>로그인 해주세요</h1>
                <p onClick={goSignIn}>로그인 하기 click</p>
            </div>
        )
    }else {
        return(
            <div>
                <Nav/>
                <SubMainBanner/>
                <Carousel_mypage/>
                <h1>{user.displayName ? user.displayName : 'github유저'? user.reloadUserInfo.screenName : "손님"}님의 페이지</h1> 
                <button onClick={handleLogout}>Logout</button>
                <div></div>
                <div></div>
                <div></div>

            </div>
        )
    }
    
    
};
export default Mypage;