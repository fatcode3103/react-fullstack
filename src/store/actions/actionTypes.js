const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    SAVE_USER_START: 'SAVE_USER_START',
    SAVE_USER_SUCCESS: 'SAVE_USER_SUCCESS',
    SAVE_USER_FAILED: 'SAVE_USER_FAILED',

    FETCH_ALL_USER_START: 'FETCH_ALL_USER_START',
    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    DELETE_USER_START: 'DELETE_USER_START',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILEDD',

    UPDATE_USER_START: 'UPDATE_USER_START',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILED: 'UPDATE_USER_FAILEDD',

    GET_TOP_DOCTOR_START: 'GET_TOP_DOCTOR_START',
    GET_TOP_DOCTOR_SUCCESS: 'GET_TOP_DOCTOR_SUCCESS',
    GET_TOP_DOCTOR_FAILED: 'GET_TOP_DOCTOR_FAILED',

    GET_ALL_DOCTOR_START: 'GET_ALL_DOCTOR_START',
    GET_ALL_DOCTOR_SUCCESS: 'GET_ALL_DOCTOR_SUCCESS',
    GET_ALL_DOCTOR_FAILED: 'GET_ALL_DOCTOR_FAILED',

    POST_INFO_DOCTOR_START: 'POST_INFO_DOCTOR_START',
    POST_INFO_DOCTOR_SUCCESS: 'POST_INFO_DOCTOR_SUCCESS',
    POST_INFO_DOCTOR_FAILED: 'POST_INFO_DOCTOR_FAILED',

    GET_DETAIL_DOCTOR_START: 'GET_DETAIL_DOCTOR_START',
    GET_DETAIL_DOCTOR_SUCCESS: 'GET_DETAIL_DOCTOR_SUCCESS',
    GET_DETAIL_DOCTOR_FAILED: 'GET_DETAIL_DOCTOR_FAILED',

    UPDATE_DETAIL_DOCTOR_START: 'UPDATE_DETAIL_DOCTOR_START',
    UPDATE_DETAIL_DOCTOR_SUCCESS: 'UPDATE_DETAIL_DOCTOR_SUCCESS',
    UPDATE_DETAIL_DOCTOR_FAILED: 'UPDATE_DETAIL_DOCTOR_FAILED',

    FETCH_ALLCODE_SCHEDULE_HOURS_START: 'FETCH_ALLCODE_SCHEDULE_HOURS_START',
    FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_HOURS_FAILED: 'FETCH_ALLCODE_SCHEDULE_HOURS_FAILED',

    POST_BULK_CREATE_SCHEDULE_START: 'POST_BULK_CREATE_SCHEDULE_START',
    POST_BULK_CREATE_SCHEDULE_SUCCESS: 'POST_BULK_CREATE_SCHEDULE_SUCCESS',
    POST_BULK_CREATE_SCHEDULE_FAILED: 'POST_BULK_CREATE_SCHEDULE_FAILED',

    FETCH_SCHEDULE_DOCTOR_START: 'FETCH_SCHEDULE_DOCTOR_START',
    FETCH_SCHEDULE_DOCTOR_SUCCESS: 'FETCH_SCHEDULE_DOCTOR_SUCCESS',
    FETCH_SCHEDULE_DOCTOR_FAILED: 'FETCH_SCHEDULE_DOCTOR_FAILED',

    FETCH_REQUIRED_DOCTOR_INFO_START: 'FETCH_REQUIRED_DOCTOR_INFO_START',
    FETCH_REQUIRED_DOCTOR_INFO_SUCCESS: 'FETCH_REQUIRED_DOCTOR_INFO_SUCCESS',
    FETCH_REQUIRED_DOCTOR_INFO_FAILED: 'FETCH_REQUIRED_DOCTOR_INFO_FAILED',

    GET_EXTRA_INFO_BY_ID_START: 'GET_EXTRA_INFO_BY_ID_START',
    GET_EXTRA_INFO_BY_ID_SUCCESS: 'GET_EXTRA_INFO_BY_ID_SUCCESS',
    GET_EXTRA_INFO_BY_ID_FAILED: 'GET_EXTRA_INFO_BY_ID_FAILED',

    POST_BOOK_APPOINTMENT_START: 'POST_BOOK_APPOINTMENT_START',
    POST_BOOK_APPOINTMENT_SUCCESS: 'POST_BOOK_APPOINTMENT_SUCCESS',
    POST_BOOK_APPOINTMENT_FAILED: 'POST_BOOK_APPOINTMENT_FAILED',

    GET_ALL_SPECIALTY_START: 'GET_ALL_SPECIALTY_START',
    GET_ALL_SPECIALTY_SUCCESS: 'GET_ALL_SPECIALTY_SUCCESS',
    GET_ALL_SPECIALTY_FAILED: 'GET_ALL_SPECIALTY_FAILED',
});

export default actionTypes;
