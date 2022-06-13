import './App.css';
import { Route, Routes } from "react-router-dom";
import IntroList from './components/Intro/IntroList';
import Home from './page/HomePage';
import FirstMain from './page/FirstMain/FirstMain';
import EventIntro from './components/Intro/EventIntro';
import ReviewWrite from './components/Review/reviewWrite';
import ReviewPage from './components/Review/reviewPage';
import ReviewDetail from './components/Review/reviewDetail';
import ReviewRevise from './components/Review/reviewRevise';
/* 🥑 박선주 import 시작 */
import DealWrite from './components/Deal/DealWrite';
import DealPage from './components/Deal/DealPage';
import DealDetail from './components/Deal/DealDetail';
import DealRevise from './components/Deal/DealRevise';
/* 🥑 박선주 import 끝 */
import NotFound from './page/NotFound';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

import { firestore } from './firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";


function App() {

  const [reviews, setReviews] = useState([
    { 
        id : 1,
        reviewIMG : 'https://dnvefa72aowie.cloudfront.net/origin/article/202206/d7f93156c8d106a5cd4952ee9308d9b0aec0a63a4653856a1a17e92ac49e8397.webp?q=82&s=300x300&t=crop',
        reviewTitle : '티티카카 자전거',
        nickname : 'Green1',
        reviewDescription : '오늘은 전국이 대체로 맑은 가운데 건조한 날씨가 이어지겠습니다.건조특보가 내려져 있는 영남 지방과 충북, 강원 남부 지역은 매우 건조한 날씨가 계속될 것으로 보입니다.내일 중부지방은 맑은 뒤 오후부터 구름이 많이 끼겠고, 남부지방은 대체로 맑은 날씨가 이어지겠습니다.내일 아침 기온은 서울 19도 등 전국이 14도에서 20도로 오늘보다 높겠습니다.낮 기온은 서울 32도 등 서쪽과 내륙 지역은 대부분 30도를 웃돌겠지만, 선선한 동풍의 영향을 받는 동해안 지역은 강릉이 23도에 머무는 등 오늘보다 5도 이상 낮겠습니다.바다의 물결은 모든 해상에서 1m 안팎으로 낮게 일겠지만, 서해와 남해 서부, 제주도 해상에는 짙은 안개가 끼는 곳이 있겠습니다.',
        reviewHashtags : ['#자전거', '#친환경', '#업사이클링'],
        profileIMG : 'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1677509740.jpg',
        reviewCategory : '말머리1',
        comments : [
          {
            id : 1,
            userName : 'green1',
            comment : '👍!!!',
            date : '2022.06.09'
          },
          {
            id : 2,
            userName : 'green1',
            comment : '💕',
            date : '2022.06.09'
          },
          {
            id : 3,
            userName : 'green1',
            comment : '😊!!!',
            date : '2022.06.09'
          }
        ],
        likes : ['호두','꾸꾸']
    },
    { 
        id : 2,
        reviewIMG : 'https://dnvefa72aowie.cloudfront.net/origin/article/202206/3B12310F78043BC83CCD41D0BB76AF3266894B2297AD7BA051A87EFD8564E172.jpg?q=82&s=300x300&t=crop',
        reviewTitle : '킥보드',
        nickname : 'Green2',
        reviewDescription : '오늘은 전국이 대체로 맑은 가운데 건조한 날씨가 이어지겠습니다.건조특보가 내려져 있는 영남 지방과 충북, 강원 남부 지역은 매우 건조한 날씨가 계속될 것으로 보입니다.내일 중부지방은 맑은 뒤 오후부터 구름이 많이 끼겠고, 남부지방은 대체로 맑은 날씨가 이어지겠습니다.내일 아침 기온은 서울 19도 등 전국이 14도에서 20도로 오늘보다 높겠습니다.낮 기온은 서울 32도 등 서쪽과 내륙 지역은 대부분 30도를 웃돌겠지만, 선선한 동풍의 영향을 받는 동해안 지역은 강릉이 23도에 머무는 등 오늘보다 5도 이상 낮겠습니다.바다의 물결은 모든 해상에서 1m 안팎으로 낮게 일겠지만, 서해와 남해 서부, 제주도 해상에는 짙은 안개가 끼는 곳이 있겠습니다.',
        reviewHashtags : ['#자전거', '#친환경', '#업사이클링'],
        profileIMG : 'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1677509740.jpg',
        reviewCategory : '말머리2',
        comments : [
          {
            id : 1,
            userName : 'green1',
            comment : '👍!!!',
            date : '2022.06.09'
          },
          {
            id : 2,
            userName : 'green1',
            comment : '💕',
            date : '2022.06.09'
          },
          {
            id : 3,
            userName : 'green1',
            comment : '😊!!!',
            date : '2022.06.09'
          }
        ],
        likes : ['호두','꾸꾸']
    },
    { 
        id : 3,
        reviewIMG : 'https://dnvefa72aowie.cloudfront.net/origin/article/202206/aab8f307bc7c31a2a6016cd1cec6f585cae06bfe99398f8fe26de5633f85a980.webp?q=82&s=300x300&t=crop',
        reviewTitle : '오메가 시계',
        nickname : 'Green3',
        reviewDescription : '오늘은 전국이 대체로 맑은 가운데 건조한 날씨가 이어지겠습니다.건조특보가 내려져 있는 영남 지방과 충북, 강원 남부 지역은 매우 건조한 날씨가 계속될 것으로 보입니다.내일 중부지방은 맑은 뒤 오후부터 구름이 많이 끼겠고, 남부지방은 대체로 맑은 날씨가 이어지겠습니다.내일 아침 기온은 서울 19도 등 전국이 14도에서 20도로 오늘보다 높겠습니다.낮 기온은 서울 32도 등 서쪽과 내륙 지역은 대부분 30도를 웃돌겠지만, 선선한 동풍의 영향을 받는 동해안 지역은 강릉이 23도에 머무는 등 오늘보다 5도 이상 낮겠습니다.바다의 물결은 모든 해상에서 1m 안팎으로 낮게 일겠지만, 서해와 남해 서부, 제주도 해상에는 짙은 안개가 끼는 곳이 있겠습니다.',
        reviewHashtags : ['#자전거', '#친환경', '#업사이클링'],
        profileIMG : 'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1677509740.jpg',
        reviewCategory : '말머리3',
        comments : [
          {
            id : 1,
            userName : 'green1',
            comment : '👍!!!',
            date : '2022.06.09'
          },
          {
            id : 2,
            userName : 'green1',
            comment : '💕',
            date : '2022.06.09'
          },
          {
            id : 3,
            userName : 'green1',
            comment : '😊!!!',
            date : '2022.06.09'
          }
        ],
        likes : ['호두','꾸꾸']
    },
]);

const navigator = useNavigate();

//🍎지은 : create review 
const createReview = review => {
  setReviews([...reviews, review]);
}


//🍎지은 : update Review, Comment
const updateReview =  (updatedReview)=> {
  
  const newReviews = reviews.map((review) => {
    if(review.id !== updatedReview.id) {
      return review
    } else {
      return updatedReview
    }
  }) 
  setReviews(newReviews)
  navigator('/reviews')
}

//🍎지은 : delete review 
const deleteReview = (deletedItem) => {

  if(window.confirm("게시글을 정말 삭제 하시겠습니까?")){
    const deleted = reviews.filter((review)=> review.id !== deletedItem.id);
    setReviews(deleted)
    alert('게시글을 삭제했습니다.');
    navigator('/reviews')
  }
}

//🍎지은 : AddComment
const addComment = (updatedReview) => {
  const newReviews = reviews.map((review) => {
    if(review.id !== updatedReview.id) {
      return review
    } else {
      return updatedReview
    }
  }) 
  setReviews(newReviews)
}

//🍎지은 : likes
const clickLike = (updatedReview) => {
  const newReviews = reviews.map((review) => {
    if(review.id !== updatedReview.id) {
      return review
    } else {
      return updatedReview
    }
  }) 
  console.log(newReviews)
  setReviews(newReviews)
}
  const [deals, setDeals] = useState([]);

  // 🥑 렌더링 시 콜백 함수 실행
  useEffect(() => {
    // dbDeals 콜렉션 레퍼런스 가져옴
    // 생성 일자 내림차순(최근 순서)으로 정렬
    const dq = query(
      collection(firestore, "dbDeals"),
      orderBy("createdAt", "desc")
    );
    // 수정, 삭제 실시간 반영
    // snapshot -> 각각의 docs에 접근하기 위해서 사용
    onSnapshot(dq, (snapshot) => {
      const dealArray = snapshot.docs.map(doc => ({
      // 각각의 객체에 고유 id를 만들어 할당
        id: doc.id, ...doc.data()
      }));
      // 거래글 객체 리스트를 setDeals에 할당
        setDeals(dealArray);
      })
  }, []);

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<FirstMain/>}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/intro" element={<IntroList />}></Route>
          <Route path="/event" element={<EventIntro />}></Route>
          <Route path='/reviews'  element={<ReviewPage reviews={reviews} />}/>
          <Route path='/reviews/:id' element={<ReviewDetail clickLike={clickLike} reviews={reviews} addComment={addComment} deleteReview={deleteReview}/>}/>
          <Route path='/reviews/write' element={<ReviewWrite addReview={createReview}/>}/>
          <Route path='/review/revise/:id' element={<ReviewRevise  updateReview={updateReview} />}/>
          {/* 🥑 박선주 route 시작 */}
          <Route path='/deals' element={<DealPage deals={deals}/>} />
          <Route path='/deals/:createdAt' element={<DealDetail />} />
          <Route path='/deals/write' element={<DealWrite />} />
          <Route path='/deals/revise/:id' element={<DealRevise />} />
          {/* 🥑 박선주 route 끝 */}
          <Route path="/not-found" element={<NotFound />}></Route>
        </Routes>
        
        <footer>푸터</footer>
    </div>
  );
}

export default App;
