// 리뷰 게시판
import { Link, Outlet, NavLink } from "react-router-dom";

const Reviewlist = () => {
    
    return (
        <div>
        <h1>Reviewlist</h1>
        
        <ul>
        {numlist.map((num, index) => (
            <li key={index}>
                <NavLink
                to={`/boardlist/${num}`}
                >
                게시글 {num}
                </NavLink>
            </li>
            ))}
        </ul>
        <Outlet />
        </div>
    );
};
export default Reviewlist;
