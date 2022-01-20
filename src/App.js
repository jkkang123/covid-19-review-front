import './App.scss';
import { Link, Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin/Signin.js';
import Login from './pages/Login/Login.js';
import Header from './pages/Header/Header.js';

function App() {
  return (
    <div className="App">
      {/* 헤더 */}
      <Header />

      <Routes>
        {/* 회원가입 페이지 */}
        <Route 
          path="/signin" 
          element = {<Signin />} 
        />

        {/* 로그인 페이지 */}
        <Route 
          path="/login" 
          element = {<Login />} 
        />
      </Routes>
    </div>
  );
}

export default App;
