import { combineReducers } from 'redux'
import reducer from './commonReducer'

import Cookies from 'js-cookie';
import { persistReducer } from "redux-persist";
import {removeCookies} from "components/core/util"
import { transformCircular } from './ref/transformCircular'
import { CookieStorage } from 'redux-persist-cookie-storage'

const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies),
  transform: [transformCircular],
  blacklist: ['common'],
  timeout: null
};

const commonPersistConfig = {
  key: "common",
  storage: new CookieStorage(Cookies),
  transform: [transformCircular],
  timeout: null
};

const reducers = combineReducers({
  common: persistReducer(commonPersistConfig, reducer)
})

const commonReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    window.localStorage.clear();
    removeCookies()
    return reducers(undefined, action)
  }
  return reducers(state, action)
}

export default persistReducer(persistConfig, commonReducer)