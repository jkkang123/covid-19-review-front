import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { persistor, store } from './redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";

import Header from './pages/header/Header.js';
import News from './pages/news/News.js';
import Home from './pages/home/Home.js';
import Review from 'pages/board/Review';
import Post from 'pages/board/Post'
import Profile from 'pages/board/Profile';
import Dialogs from 'Molecules/Dialogs';
import './App.scss';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route 
            path="/" 
            element = {<Home />} 
          />

          <Route 
            path="/news" 
            element = {<News />} 
          />

          <Route
            path="/review"
            element= {<Review/>}
          />

          <Route
            path="/review/:id"
            element= {<Post/>}
          />

          <Route
            path="/profile"
            element= {<Profile/>}
          />
        </Routes>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
