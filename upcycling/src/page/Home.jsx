import Nav from '../components/Nav/Nav';
import SubMainBannerHome from '../components/banner/SubMainBannerHome';
import CarouselMypage from '../components/banner/CarouselMypage';
import CarouselReview from '../components/banner/CarouselReview';


const Contents = ( {reviewRepository}) => {

    return (
        <div>
            <Nav/>
            <SubMainBannerHome/>

            {/* <CarouselMypage/> */}

            {/* <Carousel/> */}
            <CarouselReview reviewRepository={reviewRepository}/>

        </div>
    )
};

export default Contents;