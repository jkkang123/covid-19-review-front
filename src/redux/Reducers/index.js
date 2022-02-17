import { combineReducers } from 'redux'
import reducer from './commonReducer'

import Cookies from 'js-cookie';
import { persistReducer } from "redux-persist";
import { CookieStorage } from 'redux-persist-cookie-storage'

const persistConfig = {
  key: "common",
  storage: new CookieStorage(Cookies)
};

const reducers = combineReducers({
  common: persistReducer(persistConfig, reducer),
})

const commonReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    window.localStorage.clear();
    Cookies.remove('persist:common');
    Cookies.remove('reduxPersistIndex');
    return reducers(undefined, action)
  }
  return reducers(state, action)
}

export default persistReducer(persistConfig, commonReducer)