import { useSelector, useDispatch } from "react-redux";
import {useEffect, useState} from "react"
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from "./UserManageTable.module.scss"
import * as actions from "../../../../src/store/actions"

const cx = classNames.bind(styles)

function UserManageTable(props) {

    const {handleEditUserFromParent} = props

    const {admin:adminState} = useSelector(state => state)
    const dispatch = useDispatch()

    const {users} = adminState

    useEffect(() => {
        dispatch(actions.fetchAllUserStart('all'))
    }, [dispatch])

    const handleDeleteUser = async (e, data) => {
        e.target.classList.add('shaking-animation');
        setTimeout(async () => {
            e.target.classList.remove('shaking-animation');
            await dispatch(actions.deleteUserStart(data.id))
            dispatch(actions.fetchAllUserStart('all'))
        }, 300);
    };

    const handleEditUser = (data) => {
        // dispatch(actions.getUserStart(data))
        // getUserEdit(data)
        handleEditUserFromParent(data)
    };

    return (
        <table className={cx('customers')}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users && users.length > 0 && users.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
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
                    )
                })}
            </tbody>
        </table>
    )
}

export default UserManageTable;