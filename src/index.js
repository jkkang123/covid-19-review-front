import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './redux/Reducers'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signup from './pages/Signup/Signup.js';
import Login from './pages/Login/Login.js';
import Header from './pages/Header/Header.js';
import News from './pages/News/News.js';
import Profile from 'Molecules/Profile';
import Dialogs from 'Molecules/Dialogs';
import DoughnutChart from 'Molecules/DoughnutChart';
import BarLineChart from 'Molecules/BarLineChart';
import SelectBox from 'components/common/common-select';
import './App.scss';


const store = createStore(rootReducer);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      {/* 셀렉트 박스 
      <SelectBox vaccine={true}/>
      <SelectBox vaccine={false}/>
      */}

      <Routes>
        <Route 
          path="/news" 
          element = {<News />} 
        />

        {/* 회원가입 페이지 */}
        <Route 
          path="/signup" 
          element = {<Signup />} 
        />

        {/* 로그인 페이지 */}
        <Route 
          path="/login" 
          element = {<Login />} 
        />
        <Route 
          path="/chart"
          element= {<BarLineChart/>}
        />
      </Routes>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
