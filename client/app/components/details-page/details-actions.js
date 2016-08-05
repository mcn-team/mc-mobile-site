import 'whatwg-fetch';
import { HttpClient } from 'aurelia-fetch-client';

import { Authentication } from '../../utils/authentication-helper';
import { Config } from '../../config/config';

export const FETCH_DETAILS_START_TYPE = 'FETCH_DETAILS_START';
export const FETCH_DETAILS_SUCCESS_TYPE = 'FETCH_DETAILS_SUCCESS';
export const FETCH_DETAILS_FAIL_TYPE = 'FETCH_DETAILS_FAIL';

const FETCH_DETAILS_START = { type: FETCH_DETAILS_START_TYPE };

const fetchDetailsSuccessAction = (response) => {
    return {
        type: FETCH_DETAILS_SUCCESS_TYPE,
        response: response
    };
};

const fetchDetailsFailAction = (errorResponse) => {
    return {
        type: FETCH_DETAILS_FAIL_TYPE,
        error: errorResponse
    };
};

export const fetchDetailsAction = (collectionName) => {
    return (dispatch) => {
        const httpClient = new HttpClient();
        dispatch(FETCH_DETAILS_START);

        const options = {
            method: 'GET',
            headers: {
                'auth-web-token': Authentication.getUserToken()
            }
        };

        return httpClient.fetch(Config.baseUrl + '/api/books/collections/' + collectionName + '/list', options)
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
                        dispatch(fetchDetailsFailAction(parsedResponse));
                    });
                } else {
                    response.data.then((parsedResponse) => {
                        dispatch(fetchDetailsSuccessAction(parsedResponse.sort((a, b) => {
                            return a.volume - b.volume;
                        })));
                    });
                }

            });
    };
};
