import { useNavigate } from "react-router-dom";
import './Login.css'


function Login() {
    
    const navigate = useNavigate();

    function SignIn() {
            navigate("/SignIn");
        };

    function SignUp() {
        navigate("/SignUp");
    };

    return (
        <div className="App">
            <header className="Login_Container"> 
                <button onClick={SignIn}>로그인</button>
                <button onClick={SignUp}>회원가입</button>
            </header>
        </div>
    );
}

export default Login;