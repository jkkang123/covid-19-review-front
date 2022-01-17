import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './redux/Reducers'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComponentSample } from 'pages';

const store = createStore(rootReducer);

ReactDOM.render(
  
  <Provider store={store}>
    <BrowserRouter>
      <h1>Covid-19-Review</h1>
      <Routes>
        <Route path={"/sample"} element={ComponentSample}/>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
