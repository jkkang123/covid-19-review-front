import './App.scss';
import { Link, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup.js';
import Login from './pages/Login/Login.js';
import Header from './pages/Header/Header.js';
import Profile from 'Molecules/Profile';
import Dialogs from 'Molecules/Dialogs';
import { useState } from 'react';
import CommomMenu from 'components/common/commom-menu.js';

function App() {

  return (
    <div className="App">
      {/* 헤더 */}
      <Header />

      {/* 프로필 모듈 실험 */}
      <Profile nickName={ true } big={ false }/>

      {/* Dialogs 실험 */}
      <Dialogs />

      <Routes>
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
          path="/menu"
          element = {<CommomMenu/>}
        />
      </Routes>
    </div>
  );
}

export default App;
