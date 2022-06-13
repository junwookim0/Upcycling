import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup,
            FacebookAuthProvider,signOut
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    function handleGoogleLogin() {
        const gprovider = new GoogleAuthProvider(); // provider를 구글로 설정
        signInWithPopup(auth, gprovider) // popup을 이용한 signup
        .then((data) => {
            setUserData(data.user); // user data 설정
            //🍎지은 : 콘솔창에 이중으로 떠서 잠시막아놓을게요!!
            //console.log(data.user) // console로 들어온 데이터 표시
            navigate("/Home",{state : { id : data.user.uid}});
            console.log(data.user)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    function handleFacebookLogin(){
        const fprovider =new FacebookAuthProvider();
        signInWithPopup(auth, fprovider) // popup을 이용한 signup
        .then((data) => {
            setUserData(data.user); // user data 설정
            navigate("/Home");
            console.log(data) // console로 들어온 데이터 표시
        })
        .catch((err) => {
            console.log(err);
        });
    }
    function Logout() {
        signOut(auth).then(() => {
            setUserData(null);
            navigate("/");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="App">
        <header className="App-header">
            
        <button onClick={handleGoogleLogin}>구글 Login</button>
        <p>
            {userData ? userData.displayName : null}
        </p>
        <p>
            {userData ? userData.email : null}
        </p>
        <p>
            {userData ? <img src={userData.photoURL} alt="userphoto"/>  : null}
        </p>

        
        <button onClick={handleFacebookLogin}>facebook Login</button>
        <button onClick={Logout}>Logout</button>
        </header>
        </div>
    );
}

export default Login;
