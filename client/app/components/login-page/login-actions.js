import 'whatwg-fetch';
import { HttpClient, json as Json } from 'aurelia-fetch-client';
import { Config } from '../../config/config';

export const LOGIN_START_TYPE = 'LOGIN_START';
export const LOGIN_SUCCESS_TYPE = 'LOGIN_SUCCESS';
export const LOGIN_FAIL_TYPE = 'LOGIN_FAIL';

const LOGIN_SUCCESS = {
    type: LOGIN_SUCCESS_TYPE
};

const LOGIN_FAIL = {
    type: LOGIN_FAIL_TYPE,
    status: 'error',
    message: 'Wrong login'
};

const LOGIN_START = {
    type: LOGIN_START_TYPE
};

const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS_TYPE,
        user: response.user,
        token: response.token
    };
};

const loginFailure = (response) => {
    return {
        type: LOGIN_FAIL_TYPE,
        status: 'error',
        message: response
    };
};

const loginCall = (dispatch, username, password, publicKey) => {
    const httpClient = new HttpClient();

    const hashedPassword = md5(password);
    var jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    const encryptedPassword = jsEncrypt.encrypt(hashedPassword);

    let options = {
        method: 'POST',
        body: Json({ username: username, password: encryptedPassword })
    };
    httpClient.fetch(Config.baseUrl + '/api/users/login', options)
        .then((response) => {
            if (response.ok) {
                return { data: response.json() };
            } else {
                return { error: { code: response.status, err: response.statusText }, data: response.json() };
            }
        })
        .then((response) => {
            if (response.error) {
                response.data
                    .then((json) => {
                        dispatch(loginFailure(json.message));
                    })
            } else {
                response.data.then((json) => {
                    dispatch(loginSuccess(json));
                });
            }
        });
};

export const loginAction = (username, password) => {
    return (dispatch) => {
        let httpClient = new HttpClient();
        dispatch(LOGIN_START);

        const options = { method: 'GET' };
        return httpClient.fetch(Config.baseUrl + '/api/auth/key', options)
            .then((response) => {
                if (response.ok) {
                    return { data: response.json() };
                } else {
                    return { error: { code: response.status, err: response.statusText }, data: response.json() };
                }
            })
            .then((response) => {
                if (response.error) {
                    response.data.then((json) => {
                        dispatch(loginFailure(json.message));
                    });
                } else {
                    response.data.then((json) => {
                        loginCall(dispatch, username, password, json.pub);
                    });
                }
            });
    };
};
