import { useContext } from "react";
import AuthContext from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

import Nav from '../components/Nav/Nav';
import SubMainBanner from "../components/banner/SubMainBannerMypage"
import CarouselMypage from "../components/banner/CarouselMypage";
import MyProfileChange from "../components/MyPage/myProfile/MyProfileChange";

const Mypage = ({reviewRepository}) => {
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const goSignIn = () => {
        navigate("/signin");
    }
    
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
                <MyProfileChange/>
                
                <CarouselMypage reviewRepository={reviewRepository}/>
            </div>
        )
    }
    
    
};
export default Mypage;