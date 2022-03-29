import axios from 'axios'

const DEV_URL = 'http://ec2-3-36-239-6.ap-northeast-2.compute.amazonaws.com';

let BASE_URL = DEV_URL;
if (process.env.NODE_ENV === 'development') {
  BASE_URL = DEV_URL;
} else {
  BASE_URL = 'http://ec2-3-36-239-6.ap-northeast-2.compute.amazonaws.com:8080';
}

const DEFAULT_ACCEPT_TYPE = 'application/json';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.headers['Content-Type'] = DEFAULT_ACCEPT_TYPE;

axiosInstance.interceptors.request.use((config) => {
  if (window.localStorage.getItem('accessToken')) {
    config.headers.Authorization = window.localStorage.getItem('accessToken');
  }

  return config
}, error => {
  return Promise.reject(error);
})


export default axiosInstance;