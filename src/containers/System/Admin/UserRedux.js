import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import FileToBase64 from '../../../utils/FileToBase64';
import UserManageTable from './UserManageTable';
import styles from './UserRedux.module.scss';
import * as actions from '../../../../src/store/actions';

const cx = classNames.bind(styles);

const UserRedux = () => {
    const [genderArr, setGenderArr] = useState([]);
    const [positionArr, setPositionArr] = useState([]);
    const [roleArr, setRoleArr] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const [actionEdit, setActionEdit] = useState(false);
    const [idUserEdit, setIdUserEdit] = useState('');

    //custom hook
    const useForm = (initialState) => {
        const [form, setForm] = useState(initialState);

        const handleOnChangeInput = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value, /// []: su dung gia tri 1 bien lam ten 1 thuoc tinh trong obj
            });
        };

        const handleChangeImg = async (e) => {
            let files = e.target.files;
            let file = files[0];

            if (file) {
                let base64 = await FileToBase64(file);
                // console.log(base64)
                let objUrl = URL.createObjectURL(file);
                setPreviewUrl(objUrl);
                setForm({
                    ...form,
                    avatar: base64,
                });
            }
        };

        const resetForm = () => {
            setForm(initialState);
        };

        return [form, setForm, handleOnChangeInput, resetForm, handleChangeImg];
    };

    const [form, setForm, handleOnChangeInput, resetForm, handleChangeImg] = useForm({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        gender: '',
        position: '',
        role: '',
        avatar: '',
    });

    const {
        email,
        password,
        firstName,
        lastName,
        address,
        phoneNumber,
        gender,
        position,
        role,
        avatar,
    } = form;

    /// get state redux
    const { app: appState, admin: adminState, user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLoading, genders, positions, roles } = adminState;
    const { language } = appState;

    useEffect(() => {
        dispatch(actions.fetchPositionStart());
        dispatch(actions.fecthGenderStart());
        dispatch(actions.fetchRoleStart());
    }, [dispatch]);

    useEffect(() => {
        setPositionArr(positions);
        setGenderArr(genders);
        setRoleArr(roles);
    }, [genders, positions, roles]);

    const checkValidate = () => {
        let check = true;
        for (const property in form) {
            if (typeof form[property] === 'string' && form[property].trim() === '') {
                alert(`Missing param: ${property}`);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleResetForm = () => {
        resetForm();
        setPreviewUrl('');
    };

    const handleSubmit = async () => {
        let isValid = checkValidate();
        if (!isValid) return;

        if (!actionEdit) {
            /// save action
            await dispatch(
                actions.saveUserStart({
                    email: form.email,
                    password: form.password,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    address: form.address,
                    gender: form.gender,
                    roleId: form.role,
                    phoneNumber: form.phoneNumber,
                    positionId: form.position,
                    image: form.avatar,
                }),
            );
        } else {
            // update action
            await dispatch(
                actions.updateUserStart({
                    id: idUserEdit,
                    email: form.email,
                    password: form.password,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    address: form.address,
                    gender: form.gender,
                    roleId: form.role,
                    phoneNumber: form.phoneNumber,
                    positionId: form.position,
                    image: form.avatar,
                }),
            );
        }
        dispatch(actions.fetchAllUserStart('all'));
        handleResetForm();
        setActionEdit(false);
    };

    const handleEditUserFromParent = (userEdit) => {
        let imageBase64 = '';
        if (userEdit.image) {
            imageBase64 = new Buffer(userEdit.image, 'base64').toString('binary');
        }
        setForm({
            ...userEdit,
            avatar: imageBase64,
            position: userEdit.positionId,
            role: userEdit.roleId,
        });
        setPreviewUrl(imageBase64);
        setIdUserEdit(userEdit.id);
        setActionEdit(true);
    };

    return (
        <div className="user-redux-container">
            {isLoading && <span className={cx('loader')}></span>}
            <div className="title">User Redux</div>
            <div className={cx('user-redux-content')}>
                <form>
                    <div className="form-row row my-4">
                        <div className="form-group col-md-3">
                            <label for="inputEmail4">
                                <FormattedMessage id="manage-user.email" />
                            </label>
                            <input
                                disabled={actionEdit}
                                name="email"
                                value={email}
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputPassword4">
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input
                                disabled={actionEdit}
                                name="password"
                                value={password}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputAddress">
                                <FormattedMessage id="manage-user.first-name" />
                            </label>
                            <input
                                name="firstName"
                                value={firstName}
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>

                        <div className="form-group col-md-3">
                            <label>
                                <FormattedMessage id="manage-user.last-name" />
                            </label>
                            <input
                                name="lastName"
                                value={lastName}
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-row row mb-4">
                        <div className="form-group col-md-9">
                            <label>
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input
                                name="address"
                                value={address}
                                type="text"
                                className="form-control"
                                placeholder="1234 Main St"
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <label>
                                <FormattedMessage id="manage-user.phone-number" />
                            </label>
                            <input
                                name="phoneNumber"
                                value={phoneNumber}
                                type="text"
                                className="form-control"
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-row row mb-3">
                        <div className="form-group col-md-3">
                            <label for="inputState">
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select
                                value={gender}
                                name="gender"
                                id="inputState"
                                className="form-control"
                                onChange={(e) => handleOnChangeInput(e)}
                            >
                                <option selected>Choose...</option>
                                {genderArr &&
                                    genderArr.length > 0 &&
                                    genderArr.map((item, index) => {
                                        return (
                                            <option value={item.keyMap} key={index}>
                                                {language === 'vi' ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState">
                                <FormattedMessage id="manage-user.role-id" />
                            </label>
                            <select
                                value={role}
                                name="role"
                                id="inputState"
                                className="form-control"
                                onChange={(e) => handleOnChangeInput(e)}
                            >
                                <option selected>Choose...</option>
                                {roleArr &&
                                    roleArr.length > 0 &&
                                    roleArr.map((item, index) => {
                                        return (
                                            <option value={item.keyMap} key={index}>
                                                {language === 'vi' ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState">
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select
                                name="position"
                                value={position}
                                id="inputState"
                                className="form-control"
                                onChange={(e) => handleOnChangeInput(e)}
                            >
                                <option selected>Choose...</option>
                                {positionArr &&
                                    positionArr.length > 0 &&
                                    positionArr.map((item, index) => {
                                        return (
                                            <option value={item.keyMap} key={index}>
                                                {language === 'vi' ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label>
                                <FormattedMessage id="manage-user.image" />
                            </label>
                            <div className={cx('preview-img-container')}>
                                <input
                                    id="previewImg"
                                    type="file"
                                    hidden
                                    onChange={(e) => handleChangeImg(e)}
                                />
                                <label className={cx('upload-img')} htmlFor="previewImg">
                                    <span className={cx('upload-img-text')}>Upload IMG</span>
                                    <FontAwesomeIcon
                                        icon={faUpload}
                                        className={cx('upload-img-icon')}
                                    />
                                </label>
                                {previewUrl === '' ? (
                                    <span>NULL</span>
                                ) : (
                                    <div
                                        className={cx('preview-img')}
                                        style={{
                                            backgroundImage: `url(${previewUrl})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        style={{ lineHeight: '0' }}
                        type="button"
                        onClick={() => handleSubmit()}
                        className={cx('btn p-2', {
                            'btn-primary': !actionEdit,
                            'btn-warning': actionEdit,
                        })}
                    >
                        {actionEdit ? (
                            <FormattedMessage id="manage-user.update" />
                        ) : (
                            <FormattedMessage id="manage-user.save" />
                        )}
                    </button>
                </form>
                <div className="row">
                    <UserManageTable handleEditUserFromParent={handleEditUserFromParent} />
                </div>
            </div>
        </div>
    );
};

// const mapStateToProps = (state) => {
//     return {};
// };

// const mapDispatchToProps = (dispatch) => {
//     return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

export default UserRedux;
