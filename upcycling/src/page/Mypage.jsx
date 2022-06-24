import { useContext } from "react";
import AuthContext from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SignOut } from "../firebase";
import Nav from '../components/Nav/Nav';
import SubMainBanner from "../components/banner/SubMainBannerMypage"
import CarouselMypage from "../components/banner/CarouselMypage";

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
                <h1>{user.displayName ? user.displayName : user.reloadUserInfo.screenName ? user.reloadUserInfo.screenName : "손님"}님의 페이지</h1> 
                <button onClick={handleLogout}>Logout</button>
                <CarouselMypage/>
                

            </div>
        )
    }
    
    
};
export default Mypage;