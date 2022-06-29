import Nav from '../components/Nav/Nav';
import Carousel from '../components/banner/Carousel';
import SubMainBannerHome from '../components/banner/SubMainBannerHome';
import CarouselReview from '../components/banner/CarouselReview';

const Contents = ( {reviewRepository}) => {
    return (
        <div>
            <Nav/>
            <SubMainBannerHome/>
            {/* <Carousel/> */}
            <CarouselReview reviewRepository={reviewRepository}/>
        </div>
    )
};

export default Contents;