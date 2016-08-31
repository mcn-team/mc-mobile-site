import 'whatwg-fetch';
import { HttpClient } from 'aurelia-fetch-client';
import _ from 'lodash';

import { Authentication } from '../../utils/authentication-helper';
import { Config } from '../../config/config';

export const FETCH_COLLECTIONS_START_TYPE = 'FETCH_COLLECTIONS_START';
export const FETCH_COLLECTIONS_SUCCESS_TYPE = 'FETCH_COLLECTIONS_SUCCESS';
export const FETCH_COLLECTIONS_FAIL_TYPE = 'FETCH_COLLECTIONS_FAIL';

export const DISPLAY_COLLECTION_TYPE = 'DISPLAY_COLLECTION';

const FETCH_COLLECTIONS_START = {
    type: FETCH_COLLECTIONS_START_TYPE
};

export const DISPLAY_COLLECTION = {
    type: DISPLAY_COLLECTION_TYPE
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

        return httpClient.fetch(Config.baseUrl + '/api/books/collections', options)
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

                        _.remove(parsedResponse, function (element) {
                            return element._id === null;
                        });

                        _.forEach(parsedResponse, (element) => {
                            const lastElement = _.find(element.data, { lastElement: true });
                            if (lastElement) {
                                element.isCompleted = true;
                            }

                            const boughtMedia = _.filter(element.data, { bought: true });
                            boughtMedia.sort((a, b) => {
                                return a.volume - b.volume;
                            });

                            if (boughtMedia.length === 0 || boughtMedia[boughtMedia.length - 1].volume > boughtMedia.length) {
                                element.isMissing = true;
                            }
                        });

                        dispatch(fetchCollectionsSuccessAction(parsedResponse.sort((a, b) => {
                            return a._id > b._id ? 1 : -1;
                        })));
                    });
                }
            });
    }
};
