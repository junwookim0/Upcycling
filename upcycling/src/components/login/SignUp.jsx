import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { signUp } from "../../firebase";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, seterror] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            seterror("비밀번호가 일치하지 않습니다");
        } else {
            setEmail("");
            setPassword("");
            const res = await signUp(email, password);
            if (res.error) {
                switch (res.error) {
                    case 'auth/weak-password':
                        seterror('비밀번호는 6자리 이상이어야 합니다');
                        break;
                    case 'auth/invalid-email':
                        seterror('잘못된 이메일 주소입니다');
                        break;
                    case 'auth/email-already-in-use':
                        seterror('이미 가입되어 있는 계정입니다');
                        break;
                        default:
                }
            }
            else {
                navigate("/signin");
                alert("회원가입완료");
            }
    
            
        }
        
    };
    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                {error ? <div>{error}</div> : null}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Your Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Your Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        placeholder="Your Password"
                        required
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>already registered? <Link to="/signin">Login</Link></p>
            </div>
        </div>
    );
    };
export default Signup;