import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollRestoration";


import ReviewRepository from './Service/review_repository'


const reviewRepository = new ReviewRepository();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <ScrollToTop/>
      <App reviewRepository={reviewRepository} />
    </BrowserRouter>
);

