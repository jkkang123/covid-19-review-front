import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export const isLogined = () => {
  const token = window.localStorage.getItem('accessToken');
  if (token) {
    return true
  } else {
    removeCookies()
    localStorage.clear();
  }
}

export const removeCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('persist:root');
  Cookies.remove('persist:common');
  Cookies.remove('reduxPersistIndex');
}