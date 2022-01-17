import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import reducers from './reducers'
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

const loggerMiddleware = createLogger();

const env = process.env.NODE_ENV || 'development';

const composeEnhancers = (window && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let tempStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk, loggerMiddleware)));
if (env !== 'development') {
   tempStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
}
export const store = tempStore;

export const persistor = persistStore(store);

export default { store, persistor };