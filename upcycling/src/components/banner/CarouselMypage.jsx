import MyReview from '../MyPage/MyReview';
// 🥑 선주 import 
import MyDeal from '../MyPage/MyDeal';

const Carousel_mypage = ({reviewRepository, deals}) => {

    return (
        <div>
            <MyReview reviewRepository={reviewRepository} />
            {/* 🥑 선주 */}
            <MyDeal deals={deals} />
        </div>
    );
}

export default Carousel_mypage;
