import 'whatwg-fetch';
import { HttpClient } from 'aurelia-fetch-client';

import { Authentication } from '../../utils/authentication-helper';
import { Config } from '../../config/config';

export const FETCH_COLLECTIONS_START_TYPE = 'FETCH_COLLECTIONS_START';
export const FETCH_COLLECTIONS_SUCCESS_TYPE = 'FETCH_COLLECTIONS_SUCCESS';
export const FETCH_COLLECTIONS_FAIL_TYPE = 'FETCH_COLLECTIONS_FAIL';

const FETCH_COLLECTIONS_START = {
    type: FETCH_COLLECTIONS_START_TYPE
};

const fetchCollectionsFailAction = (errorResponse) => {
    return {
        type: FETCH_COLLECTIONS_FAIL_TYPE,
        error: errorResponse
    };
};

const fetchCollectionsSuccessAction = (response) => {
    return {
        type: FETCH_COLLECTIONS_SUCCESS_TYPE,
        response: response
    };
};

export const fetchCollectionAction = () => {
    return (dispatch) => {
        let httpClient = new HttpClient();
        dispatch(FETCH_COLLECTIONS_START);

        const options = {
            method: 'GET',
            headers: {
                'auth-web-token': Authentication.getUserToken()
            }
        };

        return httpClient.fetch(Config.baseUrl + '/api/books/collections/names', options)
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
                        dispatch(fetchCollectionsFailAction(parsedResponse));
                    });
                } else {
                    response.data.then((parsedResponse) => {
                        dispatch(fetchCollectionsSuccessAction(parsedResponse));
                    });
                }

            });
    }
};
