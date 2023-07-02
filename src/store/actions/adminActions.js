import actionTypes from './actionTypes';
import {
    getAllCodeApi,
    createNewUserApi,
    getAllUsersApi,
    deleteUserApi,
    editUserApi,
    getTopDoctorApi,
    getAllDoctorApi,
    postInfoDoctorApi,
    getDetailDcotorByIdApi,
    updateDetailDoctorApi,
    getAllCodeHoursApi,
    postBulkCreateSchedule,
    getScheduleDoctorByDate,
} from '../../services/userService';
import { toast } from 'react-toastify';

//fetch gender
export const fecthGenderStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_GENDER_START });
        try {
            let res = await getAllCodeApi('GENDER');
            if (res && res.status === 200) {
                dispatch(fecthGenderSuccess(res.data.data));
            } else {
                dispatch(fecthGenderFailed());
            }
        } catch (e) {
            console.log('Fecth Gender Start Error: ', e);
            dispatch(fecthGenderFailed());
        }
    };
};

export const fecthGenderSuccess = (genderData) => {
    return {
        type: actionTypes.FETCH_GENDER_SUCCESS,
        payload: genderData,
    };
};

export const fecthGenderFailed = () => {
    return {
        type: actionTypes.FETCH_GENDER_FAILED,
    };
};

// fetch position
export const fetchPositionStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_POSITION_START });
        try {
            let res = await getAllCodeApi('POSITION');
            if (res && res.status === 200) {
                dispatch(fetchPositionSuccess(res.data.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            console.log('Fecth Position Start Error: ', e);
            dispatch(fetchPositionFailed());
        }
    };
};

export const fetchPositionSuccess = (positionData) => {
    return {
        type: actionTypes.FETCH_POSITION_SUCCESS,
        payload: positionData,
    };
};

export const fetchPositionFailed = () => {
    return {
        type: actionTypes.FETCH_POSITION_FAILED,
    };
};

// fetch role
export const fetchRoleStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ROLE_START });
        try {
            let res = await getAllCodeApi('ROLE');
            if (res && res.status === 200) {
                dispatch(fetchRoleSuccess(res.data.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            console.log('Fecth Role Start Error: ', e);
            dispatch(fetchRoleFailed());
        }
    };
};

export const fetchRoleSuccess = (roleData) => {
    return {
        type: actionTypes.FETCH_ROLE_SUCCESS,
        payload: roleData,
    };
};

export const fetchRoleFailed = () => {
    return {
        type: actionTypes.FETCH_ROLE_FAILED,
    };
};

// save user

export const saveUserStart = (data) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.SAVE_USER_START });
        try {
            let res = await createNewUserApi(data);
            if (res && res.status === 200) {
                toast.success('Save user successfully !');
                dispatch(saveUserSuccess());
            } else {
                toast.error('Save user failed !');
                dispatch(saveUserFailed());
            }
        } catch (e) {
            console.log('Save User Failed Error: ', e);
            toast.error('Save user failed !');
            dispatch(saveUserFailed());
        }
    };
};

export const saveUserSuccess = () => {
    return {
        type: actionTypes.SAVE_USER_SUCCESS,
    };
};

export const saveUserFailed = () => {
    return {
        type: actionTypes.SAVE_USER_FAILED,
    };
};

//get all user

export const fetchAllUserStart = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ALL_USER_START });
        try {
            let res = await getAllUsersApi(id);
            if (res && res.status === 200) {
                dispatch(fetchAllUserSuccess(res.data.users.reverse()));
            } else {
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            console.log('Fetch All User Error: ', e);
            dispatch(fetchAllUserFailed());
        }
    };
};

export const fetchAllUserSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_USER_SUCCESS,
        payload: data,
    };
};

export const fetchAllUserFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_USER_FAILED,
    };
};

//delete user

export const deleteUserStart = (userId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.DELETE_USER_START });
        try {
            let res = await deleteUserApi(userId);
            if (res && res.status === 200) {
                dispatch(deleteUserSuccess());
                toast.success('Delete user successfully !');
            } else {
                dispatch(deleteUserFailed());
                toast.error('Save user failed !');
            }
        } catch (e) {
            console.log('Delete User Failed Error: ', e);
            dispatch(deleteUserFailed());
            toast.error('Save user failed !');
        }
    };
};

export const deleteUserSuccess = () => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
    };
};

export const deleteUserFailed = () => {
    return {
        type: actionTypes.DELETE_USER_FAILED,
    };
};

// update user

export const updateUserStart = (userEdit) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPDATE_USER_START });
        try {
            let res = editUserApi(userEdit);
            if (res && res.status === 200) {
                dispatch(updateUserSuccess());
                toast.success('Update user successfully !');
            } else {
                dispatch(updateUserFailed());
                toast.error('Save user failed !');
            }
        } catch (e) {
            console.log(e);
            dispatch(updateUserFailed());
            toast.error('Save user failed !');
        }
    };
};

export const updateUserSuccess = () => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
    };
};

export const updateUserFailed = () => {
    return {
        type: actionTypes.UPDATE_USER_FAILED,
    };
};

// get top doctor
export const fetchTopDoctorStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_TOP_DOCTOR_START });
        try {
            let res = await getTopDoctorApi('');
            if (res && res.status === 200) {
                dispatch(fetchTopDoctorSuccess(res.data.data));
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorFailed());
            console.log(e);
        }
    };
};

export const fetchTopDoctorSuccess = (data) => {
    return {
        type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
        payload: data,
    };
};

export const fetchTopDoctorFailed = () => {
    return {
        type: actionTypes.GET_TOP_DOCTOR_FAILED,
    };
};

// get all doctor
export const fetchAllDoctorStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_ALL_DOCTOR_START });
        try {
            let res = await getAllDoctorApi();
            if (res && res.status === 200) {
                dispatch(fetchAllDoctorSuccess(res.data.data));
            } else {
                dispatch(fetchAllDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchAllDoctorFailed());
            console.log(e);
        }
    };
};

export const fetchAllDoctorSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
        payload: data,
    };
};

export const fetchAllDoctorFailed = () => {
    return {
        type: actionTypes.GET_ALL_DOCTOR_FAILED,
    };
};

// post info doctor
export const saveInfoDoctorStart = (infoDoctor) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.POST_INFO_DOCTOR_START });
        try {
            let res = await postInfoDoctorApi(infoDoctor);
            if (res && res.status === 200) {
                dispatch(saveInfoDoctorSuccess());
                toast.success('Save information doctor successfully !');
            } else {
                dispatch(saveInfoDoctorFailed());
                toast.error('Save information doctor failed !');
            }
        } catch (e) {
            dispatch(saveInfoDoctorFailed());
            toast.error('Save information doctor failed !');
            console.log(e);
        }
    };
};

export const saveInfoDoctorSuccess = () => {
    return {
        type: actionTypes.POST_INFO_DOCTOR_SUCCESS,
    };
};

export const saveInfoDoctorFailed = () => {
    return {
        type: actionTypes.POST_INFO_DOCTOR_FAILED,
    };
};

// get detail doctor
export const getDetailDoctorStart = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_DETAIL_DOCTOR_START });
        try {
            let res = await getDetailDcotorByIdApi(id);
            if (res && res.status === 200) {
                dispatch(getDetailDoctorSuccess(res.data.data));
            } else {
                dispatch(getDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(getDetailDoctorFailed());
            console.log(e);
        }
    };
};

export const getDetailDoctorSuccess = (data) => {
    return {
        type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
        payload: data,
    };
};

export const getDetailDoctorFailed = () => {
    return {
        type: actionTypes.GET_DETAIL_DOCTOR_FAILED,
    };
};

// update detail doctor
export const updateDetailDoctorStart = (data) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPDATE_DETAIL_DOCTOR_START });
        try {
            let res = await updateDetailDoctorApi(data);
            if (res && res.status === 200) {
                dispatch(updateDetailDoctorSuccess());
            } else {
                dispatch(updateDetailDoctorFailed());
            }
        } catch (e) {
            dispatch(updateDetailDoctorFailed());
            console.log(e);
        }
    };
};

export const updateDetailDoctorSuccess = () => {
    return {
        type: actionTypes.UPDATE_DETAIL_DOCTOR_SUCCESS,
    };
};

export const updateDetailDoctorFailed = () => {
    return {
        type: actionTypes.UPDATE_DETAIL_DOCTOR_FAILED,
    };
};

// fetch allcode hours
export const fetchAllCodeHoursStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_START });
        try {
            let res = await getAllCodeHoursApi('TIME');
            if (res && res.status === 200) {
                dispatch(fetchAllCodeHoursSuccess(res.data.data));
            } else {
                dispatch(fetchAllCodeHoursFailed());
            }
        } catch (e) {
            dispatch(fetchAllCodeHoursFailed());
            console.log(e);
        }
    };
};

export const fetchAllCodeHoursSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
        payload: data,
    };
};

export const fetchAllCodeHoursFailed = () => {
    return {
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED,
    };
};

// post bulk create schedule
export const postBulkCreateScheduleStart = (data) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_START });
        try {
            let res = await postBulkCreateSchedule(data);
            if (res && res.status === 200) {
                dispatch(postBulkCreateScheduleSuccess());
            } else {
                dispatch(postBulkCreateScheduleFailed());
            }
        } catch (e) {
            dispatch(postBulkCreateScheduleFailed());
            console.log(e);
        }
    };
};

export const postBulkCreateScheduleSuccess = () => {
    return {
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
    };
};

export const postBulkCreateScheduleFailed = () => {
    return {
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED,
    };
};

// post bulk create schedule
export const fetchScheduleDoctorStart = (id, date) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_SCHEDULE_DOCTOR_START });
        try {
            let res = await getScheduleDoctorByDate(id, date);
            if (res && res.status === 200) {
                dispatch(fetchScheduleDoctorSuccess(res.data.data));
            } else {
                dispatch(fetchScheduleDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchScheduleDoctorFailed());
            console.log(e);
        }
    };
};

export const fetchScheduleDoctorSuccess = (data) => {
    return {
        type: actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS,
        payload: data,
    };
};

export const fetchScheduleDoctorFailed = () => {
    return {
        type: actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED,
    };
};

//fetch doctor info
export const getRequiredDoctorInfoStart = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
        try {
            let resPrice = await getAllCodeApi('PRICE');
            let resPayment = await getAllCodeApi('PAYMENT');
            let resProvince = await getAllCodeApi('PROVINCE');
            if (
                resPrice &&
                resPrice.status === 200 &&
                resPayment &&
                resPayment.status === 200 &&
                resPayment &&
                resProvince.status === 200
            ) {
                let data = {
                    resPrice: resPrice.data.data,
                    resPayment: resPayment.data.data,
                    resProvince: resProvince.data.data,
                };
                dispatch(getRequiredDoctorInfoSuccess(data));
            } else {
                dispatch(getRequiredDoctorInfoFailed());
            }
        } catch (e) {
            console.log(e);
            dispatch(getRequiredDoctorInfoFailed());
        }
    };
};

export const getRequiredDoctorInfoSuccess = (data) => {
    return {
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
        payload: data,
    };
};

export const getRequiredDoctorInfoFailed = () => {
    return {
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
    };
};
