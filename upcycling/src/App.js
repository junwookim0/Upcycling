import './App.css';
import { Route, Routes } from "react-router-dom";
import MyReview from './components/MyPage/MyReview';
import MyLike from './components/MyPage/MyLike';
import MySale from './components/MyPage/MySale';
import CategoryBanner from './components/banner/CategoryBanner';
import Nav from './components/context/Nav'
import Intro from './components/context/Intro';
import Event from './components/context/Event';
import Home from './components/Home/HomePage';
import FirstMain from './components/Home/FirstMain';
import Reviewlist from './components/Home/Reviewlist';
import Reviewdetail from './components/Home/Reviewdetail';

function App() {
  return (
    <div className="App">
      
        <Routes>
            <Route path="/" element={<Nav/>}>
              <Route path="/Home" element={<Home />}></Route>
              <Route path="/intro" element={<Intro />}></Route>
              <Route path="/event" element={<Event />}></Route>
              <Route path="/reviewlist" element={<Reviewlist/>}>
                <Route path=":id" element={<Reviewdetail/>}></Route>
              </Route>
              <Route path="/write" element={<ReviewWrite/>}></Route>
            </Route>
        </Routes>
      
      <body>
        
      <footer>푸터</footer>
      </body>
      

    </div>
  );
}

export default App;
