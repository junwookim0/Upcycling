import { auth } from '../../firebase';
import { signOut,onAuthStateChanged } from 'firebase/auth';
import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css'


function Login() {
    
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    function SignIn() {
            navigate("/SignIn");
        };

    function SignUp() {
        navigate("/SignUp");
    };

    function Logout() {
        signOut(auth).then(() => {
            setUser(null);
            navigate("/");
        }).catch((err) => {
            console.log(err);
        });
    }
    

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user) {
                setUser(user);
            }
            });
        }, [user]);
        
    return (
        <div className="App">
        <header className="Login_Container">
            
        <p>
            {user ? user.displayName : null}
        </p>
        <p>
            {user ? user.email : null}
        </p>
        <p>
            {user ? <img src={user.photoURL} alt="userphoto"/>  : null}
        </p>

        
        <button className="Logout" onClick={Logout}>Logout</button>
        <button onClick={SignIn}>로그인</button>
        <button onClick={SignUp}>회원가입</button>
        </header>
        </div>
    );
}

export default Login;