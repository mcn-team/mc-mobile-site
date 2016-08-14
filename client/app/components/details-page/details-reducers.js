import { FETCH_DETAILS_FAIL_TYPE, FETCH_DETAILS_START_TYPE, FETCH_DETAILS_SUCCESS_TYPE }
    from './details-actions';

const defaultDetailsState = { response: [] };

const details = (state = defaultDetailsState, action) => {
    switch (action.type) {
        case FETCH_DETAILS_START_TYPE:
            return Object.assign({}, state, { fetching: true });
        case FETCH_DETAILS_FAIL_TYPE:
            return Object.assign({}, state, { fetching: false, error: Object.assign({}, action.error) });
        case FETCH_DETAILS_SUCCESS_TYPE:
            return Object.assign({}, state, { fetching: false, response: [].concat(action.response) });
        default:
            return state;
    }
};

export default details;
