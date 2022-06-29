import Nav from '../components/Nav/Nav';
import SubMainBannerHome from '../components/banner/SubMainBannerHome';
import CarouselReview from '../components/banner/CarouselReview';
import CarouselDealList from '../components/banner/CarouselDealList';

const Contents = ({reviewRepository, deals}) => {

    return (
        <div>
            <Nav/>
            <SubMainBannerHome/>
            <CarouselReview reviewRepository={reviewRepository}/>
            <CarouselDealList deals={deals} />
        </div>
    )
};

export default Contents;