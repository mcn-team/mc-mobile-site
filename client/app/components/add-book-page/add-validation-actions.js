import 'whatwg-fetch';
import { HttpClient, json } from 'aurelia-fetch-client';

import { Authentication } from '../../utils/authentication-helper';
import { Config } from '../../config/config';

export const UPDATE_PICKED_DATA_TYPE = 'UPDATE_PICKED_DATA';

export const SEND_BOOK_START_TYPE = 'SEND_BOOK_START';
export const SEND_BOOK_SUCCESS_TYPE = 'SEND_BOOK_SUCCESS';
export const SEND_BOOK_FAIL_TYPE = 'SEND_BOOK_FAIL';

export const PICKED_DATA_RESET_TYPE = 'PICKED_DATA_RESET';

export const PICKED_DATA_RESET = {
    type: PICKED_DATA_RESET_TYPE
};

export const updatePickedData = (pickedData) => {
    return {
        type: UPDATE_PICKED_DATA_TYPE,
        data: pickedData
    };
};

const SEND_BOOK_START = {
    type: SEND_BOOK_START_TYPE
};

const sendBookFailAction = (errorResponse) => {
    return {
        type: SEND_BOOK_FAIL_TYPE,
        error: errorResponse
    };
};

const sendBookSuccessAction = (response) => {
    return {
        type: SEND_BOOK_SUCCESS_TYPE,
        response: response
    };
};

export const sendBookAction = (newBook) => {
    return (dispatch) => {
        let httpClient = new HttpClient();
        dispatch(SEND_BOOK_START);

        const options = {
            method: 'POST',
            body: json(newBook),
            headers: {
                'auth-web-token': Authentication.getUserToken()
            }
        };

        return httpClient.fetch(Config.baseUrl + '/api/books', options)
            .then((response) => {
                if (response.ok) {
                    return { data: response.json() };
                } else {
                    return { error: { code: response.status, err: response.statusText }, data: response.json() };
                }
            })
            .then((response) => {
                if (response.error) {
                    response.data.then((parsedResponse) => {
                        dispatch(sendBookFailAction(parsedResponse));
                    });
                } else {
                    response.data.then((parsedResponse) => {
                        dispatch(sendBookSuccessAction(parsedResponse));
                    });
                }
            });
    };
};
