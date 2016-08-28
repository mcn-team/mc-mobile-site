import { UPDATE_PICKED_DATA_TYPE } from './add-validation-actions';

const pickedData = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PICKED_DATA_TYPE:
            return Object.assign({}, state, { data: action.data });
        default:
            return state;
    }
};

export default pickedData;
