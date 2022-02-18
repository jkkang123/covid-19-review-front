import { combineReducers } from 'redux'
import reducer from './commonReducer'

import Cookies from 'js-cookie';
import { persistReducer } from "redux-persist";
import { transformCircular } from './ref/transformCircular'
import { CookieStorage } from 'redux-persist-cookie-storage'

const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies),
  transform: [transformCircular],
  blacklist: ['common']
};

const commonPersistConfig = {
  key: "common",
  storage: new CookieStorage(Cookies),
  transform: [transformCircular]
};

const reducers = combineReducers({
  common: persistReducer(commonPersistConfig, reducer)
})

const commonReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    window.localStorage.clear();
    Cookies.remove('persist:root');
    Cookies.remove('persist:common');
    Cookies.remove('reduxPersistIndex');
    return reducers(undefined, action)
  }
  return reducers(state, action)
}

export default persistReducer(persistConfig, commonReducer)