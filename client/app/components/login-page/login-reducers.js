import { LOGIN_FAIL_TYPE, LOGIN_START_TYPE, LOGIN_SUCCESS_TYPE }
    from './login-actions';

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

export default login;
