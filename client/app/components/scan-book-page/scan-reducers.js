import { SCAN_COMPLETED_TYPE, SCAN_FAILED_TYPE } from './scan-actions';

const scan = (state = {}, action) => {
    switch (action.type) {
        case SCAN_COMPLETED_TYPE:
            return Object.assign({}, state, { code: action.code });
        case SCAN_FAILED_TYPE:
            return Object.assign({}, state, { code: null });
        default:
            return state;
    }
};

export default scan;
