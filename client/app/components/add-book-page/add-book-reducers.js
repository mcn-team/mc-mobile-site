import { FETCH_BOOK_DATA_FAIL_TYPE, FETCH_BOOK_DATA_START_TYPE, FETCH_BOOK_DATA_SUCCESS_TYPE }
    from './add-book-actions';

const bookData = (state = {}, action) => {
    switch (action.type) {
        case FETCH_BOOK_DATA_START_TYPE:
            return Object.assign({}, state, { fetching: true });
        case FETCH_BOOK_DATA_FAIL_TYPE:
            return Object.assign({}, state, { fetching: false, error: Object.assign({}, action.error) });
        case FETCH_BOOK_DATA_SUCCESS_TYPE:
            return Object.assign({}, state, { fetching: false, response: Object.assign({}, action.response) });
        default:
            return state;
    }
};

export default bookData;
