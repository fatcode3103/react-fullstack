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
};
