import { HttpClient, json as Json } from 'aurelia-fetch-client';

export const LOGIN_START_TYPE = 'LOGIN_START';
export const LOGIN_SUCCESS_TYPE = 'LOGIN_SUCCESS';
export const LOGIN_FAIL_TYPE = 'LOGIN_FAIL';

/**
 * Message is mocked until Media Collection gets a fix in v0.2.2
 */
const MOCKED_ERROR_MESSAGE = 'Wrong credentials';

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
        response: response
    };
};

const loginFailure = (response) => {
    return {
        type: LOGIN_FAIL_TYPE,
        status: 'error',
        message: MOCKED_ERROR_MESSAGE,
        response: response
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
    httpClient.fetch('http://dev.kaze-d.fr/api/users/login', options)
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
        return httpClient.fetch('http://dev.kaze-d.fr/api/auth/key', options)
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
