import { useContext} from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { SignOut } from "../../firebase";


const Profile = () => {
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
    console.log(user);
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
                <h1>{user.displayName} 님 Profile</h1> 
                <button onClick={handleLogout}>Logout</button>
            </div>
        )
    }
    
    
};
export default Profile;