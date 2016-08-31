import { UPDATE_PICKED_DATA_TYPE, SEND_BOOK_FAIL_TYPE, SEND_BOOK_START_TYPE, SEND_BOOK_SUCCESS_TYPE, PICKED_DATA_RESET_TYPE }
    from './add-validation-actions';

const pickedData = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PICKED_DATA_TYPE:
            return Object.assign({}, state, { data: action.data });
        case SEND_BOOK_FAIL_TYPE:
            return Object.assign({}, state, { error: action.error });
        case SEND_BOOK_START_TYPE:
            return Object.assign({}, state);
        case SEND_BOOK_SUCCESS_TYPE:
            return Object.assign({}, state, { data: { success: true } });
        case PICKED_DATA_RESET_TYPE:
            return Object.assign({}, {});
        default:
            return state;
    }
};

export default pickedData;
