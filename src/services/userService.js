import axios from 'axios';

const handleLoginApi = (email, password) => {
    const url = 'http://localhost:8000/api/login';
    // axios.post('/user', {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone',
    // });
    const res = axios.post(url, { email, password });
    return res;
};

const getAllUsersApi = async (inputId) => {
    let res = await axios.get(`http://localhost:8000/api/get-all-users?id=${inputId}`);
    return res;
};

const createNewUserApi = async (data) => {
    return axios.post(`http://localhost:8000/api/create-new-user`, data);
};

const deleteUserApi = async (userId) => {
    let res = await axios.delete(`http://localhost:8000/api/delete-user`, {
        data: {
            id: userId,
        },
    });
    return res;
};

const editUserApi = async (data) => {
    let res = axios.put(`http://localhost:8000/api/edit-user`, data);
    return res;
};

const getAllCodeApi = async (inputType) => {
    let res = await axios.get(`http://localhost:8000/api/allcode?type=${inputType}`);
    return res;
};

const getTopDoctorApi = async (limit) => {
    let res = await axios.get(`http://localhost:8000/api/get-top-doctor-home?limit=${limit}`);
    return res;
};

const getAllDoctorApi = async () => {
    let res = await axios.get(`http://localhost:8000/api/get-all-doctor`);
    return res;
};

const postInfoDoctorApi = async (infoDoctor) => {
    let res = await axios.post(`http://localhost:8000/api/post-info-doctor`, infoDoctor);
    return res;
};

const getDetailDcotorByIdApi = async (id) => {
    let res = await axios.get(`http://localhost:8000/api/get-detail-doctor-by-id?id=${id}`);
    return res;
};
const updateDetailDoctorApi = async (data) => {
    let res = await axios.put(`http://localhost:8000/api/edit-detail-doctor`, data);
    return res;
};

const getAllCodeHoursApi = async (input) => {
    let res = await axios.get(`http://localhost:8000/api/get-allcode-hours?type=${input}`);
    return res;
};

const postBulkCreateSchedule = async (data) => {
    let res = await axios.post(`http://localhost:8000/api/bulk-create-schedule`, data);
    return res;
};

const getScheduleDoctorByDate = async (id, date) => {
    let res = await axios.get(
        `http://localhost:8000/api/get-schedule-doctor-by-date?doctorId=${id}&date=${date}`, ///param
    );
    return res;
};

const getExtraInfoById = async (id) => {
    let res = await axios.get(`http://localhost:8000/api/get-extra-info-by-id?doctorId=${id}`);
    return res;
};

const getProfileDoctorById = async (id) => {
    let res = await axios.get(`http://localhost:8000/api/get-profile-doctor-by-id?doctorId=${id}`);
    return res;
};
// /api/post-book-appointment
const postBookAppointment = async (data) => {
    let res = await axios.post(`http://localhost:8000/api/post-book-appointment`, data);
    return res;
};

const postVerifyBookAppointment = async (data) => {
    let res = await axios.post(
        `http://localhost:8000/api/verify-book-appointment?token=${data.token}&doctorId=${data.doctorId}`,
    );
    return res;
};

const createSpecialty = async (data) => {
    let res = await axios.post(`http://localhost:8000/api/create-specialty`, data);
    return res;
};

const getAllSpecialtyApi = async () => {
    let res = await axios.get(`http://localhost:8000/api/get-all-specialty`);
    return res;
};

export {
    handleLoginApi,
    getAllUsersApi,
    createNewUserApi,
    deleteUserApi,
    editUserApi,
    getAllCodeApi,
    getTopDoctorApi,
    getAllDoctorApi,
    postInfoDoctorApi,
    getDetailDcotorByIdApi,
    updateDetailDoctorApi,
    getAllCodeHoursApi,
    postBulkCreateSchedule,
    getScheduleDoctorByDate,
    getExtraInfoById,
    getProfileDoctorById,
    postBookAppointment,
    postVerifyBookAppointment,
    createSpecialty,
    getAllSpecialtyApi,
};
