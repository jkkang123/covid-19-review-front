import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './redux/Reducers'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './pages/Header/Header.js';
import News from './pages/News/News.js';
import Home from './pages/Home/Home.js';
import Profile from 'Molecules/Profile';
import Dialogs from 'Molecules/Dialogs';
import Select from 'components/common/common-practice';
import './App.scss';


const store = createStore(rootReducer);
ReactDOM.render(
  <Provider store={store}>
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
