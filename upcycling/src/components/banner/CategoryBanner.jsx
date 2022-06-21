import React from "react";
import { useParams } from "react-router-dom";


const Categorylink = [
  { id : "1",
    name : "contents",
    src : "../images/Category001.jpg" },
  { id : "2",
    name : "MySale",
    src : "../images/Category002.jpg" },
  { id : "3",
    name : "MyLike",
    src : "../images/Category003.jpg" },
]

const CategoryBanner = () => {

  const params = useParams();
  const category = Categorylink[params.name];
    return (
      // 카테고리 배너(슬라이드 X) > 카테고리별로 다른 이미지랑
      // 다른 문구로 배열에서 불러올 수 있나??
      //console.log(Categorylink[0].src)
      <div>
        <p>{category.name}</p>
      <img src={category.src}/>
      </div>
      
    )
  }
export default CategoryBanner;