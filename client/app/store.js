import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import login from './components/login-page/login-reducers';
import collections from './components/collections-list-page/collections-reducers';
import details from './components/details-page/details-reducers';

/**
 * Actions type imports
 */


const appReducers = combineReducers({
    login,
    collections,
    details
});

const Store = createStore(appReducers, applyMiddleware(thunkMiddleware));
export default Store;
