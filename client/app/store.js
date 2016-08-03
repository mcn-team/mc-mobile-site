import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

/**
 * Actions type imports
 */

import { LOGIN_FAIL_TYPE, LOGIN_START_TYPE, LOGIN_SUCCESS_TYPE } from './components/login-page/actions';
import { FETCH_COLLECTIONS_FAIL_TYPE, FETCH_COLLECTIONS_START_TYPE, FETCH_COLLECTIONS_SUCCESS_TYPE } from './components/collections-list-page/actions';

const login = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_START_TYPE:
            return Object.assign({}, state, { fetching: true });
        case LOGIN_SUCCESS_TYPE:
            return Object.assign({}, state, { fetching: false, user: Object.assign({}, action.user), token: action.token, message: null });
        case LOGIN_FAIL_TYPE:
            return Object.assign({}, state, { fetching: false, status: action.status, message: action.message });
        default:
            return state;
    }
};

const defaultCollectionState = { response: [] };

const collections = (state = defaultCollectionState, action) => {
    switch (action.type) {
        case FETCH_COLLECTIONS_START_TYPE:
            return Object.assign({}, state, { fetching: true });
        case FETCH_COLLECTIONS_FAIL_TYPE:
            return Object.assign({}, state, { fetching: false, error: Object.assign({}, action.error) });
        case FETCH_COLLECTIONS_SUCCESS_TYPE:
            return Object.assign({}, state, { fetching: false, response: [].concat(action.response) });
        default:
            return state;
    }
};

const appReducers = combineReducers({
    login,
    collections
});

const Store = createStore(appReducers, applyMiddleware(thunkMiddleware));
export default Store;
