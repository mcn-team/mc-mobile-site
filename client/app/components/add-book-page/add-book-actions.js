import 'whatwg-fetch';
import { HttpClient } from 'aurelia-fetch-client';

import { Authentication } from '../../utils/authentication-helper';
import { Config } from '../../config/config';

export const FETCH_BOOK_DATA_START_TYPE = 'FETCH_BOOK_DATA_START';
export const FETCH_BOOK_DATA_SUCCESS_TYPE = 'FETCH_BOOK_DATA_SUCCESS';
export const FETCH_BOOK_DATA_FAIL_TYPE = 'FETCH_BOOK_DATA_FAIL';

const FETCH_BOOK_DATA_START = {
    type: FETCH_BOOK_DATA_START_TYPE
};

const fetchBookDataFailAction = (errorResponse) => {
    return {
        type: FETCH_BOOK_DATA_FAIL_TYPE,
        error: errorResponse
    };
};

const fetchBookDataSuccessAction = (response) => {
    return {
        type: FETCH_BOOK_DATA_SUCCESS_TYPE,
        response: response
    };
};

export const fetchBookDataAction = (code) => {
    return (dispatch) => {
        let httpClient = new HttpClient();
        dispatch(FETCH_BOOK_DATA_START);

        const options = {
            method: 'GET',
            headers: {
                'auth-web-token': Authentication.getUserToken()
            }
        };

        return httpClient.fetch(Config.baseUrl + '/api/amazon/' + code, options)
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
                        dispatch(fetchBookDataFailAction(parsedResponse));
                    });
                } else {
                    response.data.then((parsedResponse) => {
                        dispatch(fetchBookDataSuccessAction(parsedResponse));
                    });
                }
            });
    }
};
