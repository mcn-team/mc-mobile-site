import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

/**
 * Actions type imports
 */

import { LOGIN_FAIL_TYPE, LOGIN_START_TYPE, LOGIN_SUCCESS_TYPE } from './components/login/actions';

const login = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_START_TYPE:
            return Object.assign({}, state, { fetching: true });
        case LOGIN_SUCCESS_TYPE:
            return Object.assign({}, state, {});
        case LOGIN_FAIL_TYPE:
            return Object.assign({}, state, {});
        default:
            return state;
    }
};

const appReducers = combineReducers({
    login
});

const Store = createStore(appReducers, applyMiddleware(thunkMiddleware));
export default Store;
