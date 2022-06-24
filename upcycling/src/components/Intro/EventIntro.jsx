// 이벤트 소개 페이지
import Nav from '../Nav/Nav';
import './EventIntro.css';
import Modalimg from '../modal/modalimg';
import { useState } from 'react';
import SubMainBanner from '../banner/SubMainBannerEvent';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventIntro = () => {
    const [modalOpen, setModalOpen] = useState(false);
    
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div>
            <Nav/>
            <SubMainBanner/>
            <div className="post">
                <h1>Upcycling EVENT</h1>
                <div>
                    <img src='../../../images/event1.PNG' className='eventpost' alt='eventIMG' onClick={openModal}/>
                    <img src='../../../images/event2.PNG' className='eventpost' alt='eventIMG' onClick={openModal}></img>
                    <img src='../../../images/event3.PNG' className='eventpost' alt='eventIMG' onClick={openModal}></img>
                    <img src='../../../images/event4.PNG' className='eventpost' alt='eventIMG' onClick={openModal}></img>
                </div>
                <Modalimg open={modalOpen} close={closeModal} header="EVENT 보기">
                    <Slider {...settings}>
                        <div>
                            <img src='../../../images/event1.PNG'className='eventModal'  alt='eventIMG'/>
                        </div>
                        <div>
                            <img src='../../../images/event2.PNG' className='eventModal' alt='eventIMG'/>              
                        </div>
                        <div>
                            <img src='../../../images/event3.PNG' className='eventModal' alt='eventIMG'/>
                        </div>
                        <div>
                            <img src='../../../images/event4.PNG' className='eventModal' alt='eventIMG'/>
                        </div>
                    </Slider>
                </Modalimg>
            </div>


        </div>
    );
};
export default EventIntro;
