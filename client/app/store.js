import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import login from './components/login-page/login-reducers';
import collections from './components/collections-list-page/collections-reducers';
import details from './components/details-page/details-reducers';
import scan from './components/scan-book-page/scan-reducers';
import bookData from './components/add-book-page/add-book-reducers';
import pickedData from './components/add-book-page/add-validation-reducers';

/**
 * Actions type imports
 */

const appReducers = combineReducers({
    login,
    collections,
    details,
    scan,
    bookData,
    pickedData
});

const Store = createStore(appReducers, applyMiddleware(thunkMiddleware));
export default Store;
