import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.css";

// import required modules
import { Pagination, Navigation } from "swiper";

const Carousel = () => {
    const [setSwiperRef] = useState(null);
    return (
        <div>
            <div className="contents_swiper">
                <h2 className="Carousel_text">인기글</h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        type: "fraction",
                    }}
                    navigation={true}
                    modules={[ Pagination, Navigation ]}
                    className="mySwiper"
                >
                    <SwiperSlide><img src="../../images/frontImg1.jpg" alt="notice_board_img"/></SwiperSlide>
                    <SwiperSlide><img src="../../images/frontImg1.jpg" alt="notice_board_img"/></SwiperSlide>
                    <SwiperSlide><img src="../../images/frontImg1.jpg" alt="notice_board_img"/></SwiperSlide>
                    <SwiperSlide><img src="../../images/frontImg1.jpg" alt="notice_board_img"/></SwiperSlide>
                </Swiper>
            </div>
            <div className="contents_swiper">
                <h2 className="Carousel_text">신규글</h2>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={3}
                    
                    spaceBetween={30}
                    pagination={{
                    type: "fraction",
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    
                    <SwiperSlide><img src="../../images/frontImg1.jpg" alt="notice_board_img"/></SwiperSlide>
                    <SwiperSlide><img src="../../images/frontImg1.jpg" alt="notice_board_img"/></SwiperSlide>
                    <SwiperSlide><img src="../../images/frontImg1.jpg" alt="notice_board_img"/></SwiperSlide>
                    <SwiperSlide><img src="../../images/frontImg1.jpg" alt="notice_board_img"/></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Carousel;
