export const SCAN_COMPLETED_TYPE = 'SCAN_COMPLETED';
export const SCAN_FAILED_TYPE = 'SCAN_FAILED';
export const SCAN_RESET_TYPE = 'SCAN_RESET';

export const scanCompletedAction = (code) => {
    return {
        type: SCAN_COMPLETED_TYPE,
        code: code
    };
};

export const scanFailedAction = () => {
    return {
        type: SCAN_FAILED_TYPE
    };
};

export const scanResetAction = () => {
    return {
        type: SCAN_RESET_TYPE
    };
};
