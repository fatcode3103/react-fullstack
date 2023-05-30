import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
    getAllUsersApi,
    createNewUserApi,
    deleteUserApi,
    editUserApi,
} from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModaUser from './ModaUser';
import ModalEditUser from './ModalEditUser';

const UserManage = () => {
    let [arrUsers, setArrUsers] = useState([]);
    let [isOpenModalUser, setIsOpenModalUser] = useState(false);
    let [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
    let [refreshApi, setRefreshApi] = useState(true);
    let [dataEditUser, setDataEditUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let res = await getAllUsersApi('all');
            if (res && res.status === 200) {
                setArrUsers(res.data.users);
            }
        };
        fetchData();
    }, [refreshApi]);

    const toggleModalUser = () => {
        setIsOpenModalUser(!isOpenModalUser);
    };

    const toggleModalEditUser = () => {
        setIsOpenModalEditUser(!isOpenModalEditUser);
    };

    const createNewUser = async (dataNewUser) => {
        try {
            let res = await createNewUserApi(dataNewUser);
            if (res && res.data.errCode !== 0) {
                alert(res.data.errorMessage);
            } else {
                setRefreshApi(!refreshApi);
                toggleModalUser();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteUser = async (e, data) => {
        try {
            e.target.classList.add('shaking-animation');
            setTimeout(async () => {
                e.target.classList.remove('shaking-animation');
                let res = await deleteUserApi(data.id);
                if (res && res.data.errCode === 0) {
                    setRefreshApi(!refreshApi);
                }
            }, 300);
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditUser = (data) => {
        setDataEditUser(data);
        toggleModalEditUser();
    };

    const updateUser = async (newData) => {
        try {
            let res = await editUserApi(newData);
            if (res && res.data.errCode === 0) {
                setRefreshApi(!refreshApi);
                toggleModalEditUser();
            } else {
                alert(res.data.errorMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="users-container">
            <ModaUser
                isOpenModalUser={isOpenModalUser}
                toggleModalUser={toggleModalUser}
                createNewUser={createNewUser}
            />
            {isOpenModalEditUser && (
                <ModalEditUser
                    isOpenModalEditUser={isOpenModalEditUser}
                    toggleModalEditUser={toggleModalEditUser}
                    dataEditUser={dataEditUser}
                    updateUser={updateUser}
                />
            )}
            <div className="title text-center">Manager</div>
            <div className="users-table">
                <table className="col-12" id="customers">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers ? (
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td className="actions">
                                            <button className="icon-edit">
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    onClick={() => handleEditUser(item)}
                                                />
                                            </button>
                                            <button
                                                className="icon-delete"
                                                onClick={(e) => handleDeleteUser(e, item)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <h4 className="text-center" style={{ color: '#333' }}>
                                Data Available
                            </h4>
                        )}
                    </tbody>
                </table>
                <div className="mx-2 mt-2">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => setIsOpenModalUser(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add new user
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
