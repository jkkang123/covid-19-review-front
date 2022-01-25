import './App.scss';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup.js';
import Login from './pages/Login/Login.js';
import Header from './pages/Header/Header.js';
import Profile from 'Molecules/Profile';
import Dialogs from 'Molecules/Dialogs';
import DoughnutChart from 'Molecules/DoughnutChart';
import BarLineChart from 'Molecules/BarLineChart';
import SelectBox from 'components/common/common-select';
import Drawer from 'components/common/Drawer';

function App() {

  return (
    <div className="App">
      {/* 헤더 */}
      <Header />

      <SelectBox vaccine={true}/>
      <SelectBox vaccine={false}/>

      <Drawer />

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
          path="/chart"
          element= {<BarLineChart/>}
        />
      </Routes>
    </div>
  );
}

export default App;
