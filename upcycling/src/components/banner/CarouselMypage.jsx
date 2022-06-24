import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";
import DealItem from "../Deal/DealItem";
// import required modules
import {EffectCoverflow, Pagination, Navigation , Autoplay} from "swiper";

import { useNavigate } from "react-router-dom";

const Carousel_mypage = ({deals}) => {
    const [setSwiperRef] = useState(null);


    return (
        <div>
        <h2 className="Carousel_text">내 리뷰</h2>
        <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
            type: "fraction",
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper"
        >
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
        <h2 className="Carousel_text">내 판매글</h2>
        <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
            type: "fraction",
            }}
            autoplay={{
                delay: 3600,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
        >
                <ul>
                    {
                        deals.map(deal => (
                            <li key={deal.createdAt}>
                                <DealItem deal={deal} />
                            </li>
                        ))
                    }
                </ul>
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
        <h2 className="Carousel_text">좋아요</h2>
        <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{
            type: "fraction",
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
        >
            
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
        </div>
    );
}

export default Carousel_mypage;
