'use strict';

export const LOGIN_START_TYPE = 'LOGIN_START';
export const LOGIN_SUCCESS_TYPE = 'LOGIN_SUCCESS';
export const LOGIN_FAIL_TYPE = 'LOGIN_FAIL';

export const LOGIN_SUCCESS = {
    type: LOGIN_SUCCESS_TYPE,
    status: '',
    message: null

};

export const LOGIN_FAIL = {
    type: LOGIN_FAIL_TYPE,
    status: 'error',
    message: 'Wrong login'
};

export const LOGIN_START = {
    type: LOGIN_START_TYPE
};
