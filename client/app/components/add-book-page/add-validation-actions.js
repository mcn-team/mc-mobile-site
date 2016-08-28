export const UPDATE_PICKED_DATA_TYPE = 'UPDATE_PICKED_DATA';

export const updatePickedData = (pickedData) => {
    return {
        type: UPDATE_PICKED_DATA_TYPE,
        data: pickedData
    };
};
