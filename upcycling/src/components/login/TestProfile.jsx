import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { ProfileUpdate } from "../../firebase"
import { useNavigate } from "react-router-dom";
import "./TestProfile.css";
const TestProfile = () => {
    const { user } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [error, seterror] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisplayName("");
        setPhotoURL("");
        const res = await ProfileUpdate(displayName, photoURL);
        alert("프로필 변경 되었습니다");
        navigate("/mypage");
        if (res.error) seterror(res.error);
        console.log(user);
    };
    return (
        <div className="profile_box">
            <div className="div_profile">
                    <form onSubmit={handleSubmit} className="input_profile">
                    <h1>프로필 변경</h1>
                        <input
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="닉네임"
                            required
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <input
                            type="file"
                            name="photoURL"
                            value={photoURL}
                            placeholder="프로필 사진"
                            accept="image/png, image/jpeg"
                            onChange={(e) => setPhotoURL(e.target.value)}
                        />
                        <input className="profile_submit" type="submit" value="프로필변경"></input>
                    </form>
                    {error ? 
                    <div className="profile_error"> {error} </div> : null}
            </div>
        </div>
    );
};
export default TestProfile;