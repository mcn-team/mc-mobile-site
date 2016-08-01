import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const login = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return Object.assign({}, state, { fetching: true });
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, { fetching: true });
        case 'LOGIN_FAILURE':
            return Object.assign({}, state, { fetching: true });
        default:
            return state;
    }
};

const appReducers = combineReducers({
    login
});

const Store = createStore(appReducers, applyMiddleware(thunkMiddleware));
export default Store;
