// 이벤트 소개 페이지
import Nav from '../Nav/Nav';
import './EventIntro.css';
import SubMainBanner from '../banner/SubMainBannerEvent';
import Modal from '../modal/modal';
import { useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

const EventIntro = () => {
    const [setSwiperRef] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Nav/>
            <SubMainBanner/>
            <div className="post">
                <h1>Upcycling EVENT</h1>
                <div>
                    <img src='../../../images/event1.PNG' className='eventpost' alt='eventIMG' onClick={openModal}/>
                    <img src='../../../images/event2.PNG' className='eventpost' alt='eventIMG'></img>
                    <img src='../../../images/event3.PNG' className='eventpost' alt='eventIMG'></img>
                    <img src='../../../images/event4.PNG' className='eventpost' alt='eventIMG'></img>
                </div>
                <Modal open={modalOpen} close={closeModal} header="EVENT 보기">
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={3}
                        centeredSlides={true}
                        pagination={{
                            type: "fraction",
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide><img src='../../../images/event1.PNG'className='eventModal'  alt='eventIMG'/></SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                    </Swiper>
                </Modal>
            </div>


        </div>
    );
};
export default EventIntro;
