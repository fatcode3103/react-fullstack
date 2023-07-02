import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    positions: [],
    roles: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    detailDoctor: {},
    hoursAllCode: [],
    scheduleDoctor: [],
    allRequiredDoctorInfo: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // gender
        case actionTypes.FETCH_GENDER_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            let coppyGenderState = { ...state };
            coppyGenderState.isLoading = false;
            coppyGenderState.genders = action.payload;
            return {
                ...coppyGenderState,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        //position
        case actionTypes.FETCH_POSITION_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            let coppyPositionState = { ...state };
            coppyPositionState.isLoading = false;
            coppyPositionState.positions = action.payload;
            return {
                ...coppyPositionState,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        //roleID
        case actionTypes.FETCH_ROLE_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            let coppyRoleState = { ...state };
            coppyRoleState.isLoading = false;
            coppyRoleState.roles = action.payload;
            return {
                ...coppyRoleState,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        /// get all users
        case actionTypes.FETCH_ALL_USER_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            let coppyUserState = { ...state };
            coppyUserState.isLoading = false;
            coppyUserState.users = action.payload;
            return {
                ...coppyUserState,
            };
        case actionTypes.FFETCH_ALL_USER_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        // get top doctor
        case actionTypes.GET_TOP_DOCTOR_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            let coppyTopDoctorState = { ...state };
            coppyTopDoctorState.isLoading = false;
            coppyTopDoctorState.topDoctors = action.payload;
            return {
                ...coppyTopDoctorState,
            };
        case actionTypes.GET_TOP_DOCTOR_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        //get all doctor
        case actionTypes.GET_ALL_DOCTOR_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            let coppyAllDoctorState = { ...state };
            coppyAllDoctorState.isLoading = false;
            coppyAllDoctorState.allDoctors = action.payload;
            return {
                ...coppyAllDoctorState,
            };
        case actionTypes.GET_ALL_DOCTOR_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        //get detail doctor
        case actionTypes.GET_DETAIL_DOCTOR_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            let coppyDetailDoctorState = { ...state };
            coppyDetailDoctorState.isLoading = false;
            coppyDetailDoctorState.detailDoctor = action.payload;
            return {
                ...coppyDetailDoctorState,
            };
        case actionTypes.GET_DETAIL_DOCTOR_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        //get allcode hours
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
            let coppyHoursAllCodeState = { ...state };
            coppyHoursAllCodeState.isLoading = false;
            coppyHoursAllCodeState.hoursAllCode = action.payload;
            return {
                ...coppyHoursAllCodeState,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        //get schedule doctor
        case actionTypes.FETCH_SCHEDULE_DOCTOR_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS:
            let coppyScheduleDoctorState = { ...state };
            coppyScheduleDoctorState.isLoading = false;
            coppyScheduleDoctorState.scheduleDoctor = action.payload;
            return {
                ...coppyScheduleDoctorState,
            };
        case actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        //get required doctor info
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            let coppyAllRequiredDoctorInfoState = { ...state };
            coppyAllRequiredDoctorInfoState.isLoading = false;
            coppyAllRequiredDoctorInfoState.allRequiredDoctorInfo = action.payload;
            return {
                ...coppyAllRequiredDoctorInfoState,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.isLoading = false;
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
