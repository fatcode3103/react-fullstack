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

const getAllCodeApi = (inputType) => {
    let res = axios.get(`http://localhost:8000/api/allcode?type=${inputType}`)
    return res
}

export { handleLoginApi, getAllUsersApi, createNewUserApi, deleteUserApi, editUserApi, getAllCodeApi };
