import Nav from '../components/Nav/Nav';
import Carousel from '../components/banner/Carousel';
//datacontext test
import DataContext from "../components/context/DataContext";
import { useContext } from "react";
import './test.css';

const HomePage = () => {
    const data = useContext(DataContext);
    return (
        <div>
            <Nav/>
            <div className='test'>
                {data.state.user.map((user)=>(
                    <li key={user.id}>
                        {user.displayName}
                        {user.email}
                    </li>
                    )
                )}
                ddd
            </div>
            <Carousel/>
        </div>
    )
};

export default HomePage;