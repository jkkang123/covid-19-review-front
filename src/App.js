import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin/Signin.js';
import Login from './pages/Login/Login.js';

function App() {
  return (
    <div className="App">
      <h1>Covid-19-Review</h1>

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
