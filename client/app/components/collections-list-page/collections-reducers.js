import { FETCH_COLLECTIONS_FAIL_TYPE, FETCH_COLLECTIONS_START_TYPE, FETCH_COLLECTIONS_SUCCESS_TYPE }
    from './collections-list-actions';

const defaultCollectionState = { response: [] };

const collections = (state = defaultCollectionState, action) => {
    switch (action.type) {
        case FETCH_COLLECTIONS_START_TYPE:
            return Object.assign({}, state, { fetching: true });
        case FETCH_COLLECTIONS_FAIL_TYPE:
            return Object.assign({}, state, { fetching: false, error: Object.assign({}, action.error) });
        case FETCH_COLLECTIONS_SUCCESS_TYPE:
            return Object.assign({}, state, { fetching: false, response: [].concat(action.response) });
        default:
            return state;
    }
};

export default collections;
