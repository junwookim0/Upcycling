import { Outlet, useNavigate } from "react-router-dom";
// $router.push()

//nav바 

const Nav = () => {
  // useNavigate를 사용하여 원하는 주소로 이동할수 있다.
    const navigate = useNavigate();

    //navicate를 사용하여 mypage로 이동하세요
    const goHome = () => {
        navigate("/");
    };

    return (
        <div>
            <header style={{ background: "lightgray", padding: 16 }}>
                <nav>
                    <ul>
                        <li>index</li>
                        <li>event</li>
                        <li>리뷰</li>
                        <li>거래</li>
                            {/* 클릭했을 때 홈으로 이동 */}
                            <li onClick={goHome}>로고</li>
                        
                            {/* 팝업 */}
                            <li>마이페이지</li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet></Outlet>
            </main>
            
            <footer>푸터</footer>
    </div>
    );
};

export default Nav;
