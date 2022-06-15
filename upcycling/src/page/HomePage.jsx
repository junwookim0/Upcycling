import Nav from '../components/Nav/Nav';
import Carousel from '../components/banner/Carousel';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HomePage = ({getUserId}) => {
/*
    //🍎home으로 navigate통해서 이동 할 때 useData같이 가져옴
    const location = useLocation();
    const locationData = location?.state;
    const [userId, setUserId] = useState(locationData.id)

    // console.log(locationData.id)

    useEffect(()=>{
        setUserId(locationData.id)
        getUserId(locationData.id)
    },[userId])
    
    console.log(userId)
    */
    return (
        <div>
            <Nav/>
            <Carousel/>
        </div>
    )
};

export default HomePage;