import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect, useState } from 'react';
import * as ModalUserConstain from './ModalUserConstain';
import './ModalUser.scss';

const ModalUser = (props) => {
    let { toggleModalEditUser, isOpenModalEditUser, dataEditUser, updateUser } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        setFirstName(dataEditUser.firstName);
        setLastName(dataEditUser.lastName);
        setAddress(dataEditUser.address);
        setPhoneNumber(dataEditUser.phoneNumber);
    }, []);

    const handleChangeInput = (e, id) => {
        switch (id) {
            case ModalUserConstain.FIRSTNAME:
                setFirstName(e.target.value);
                return;
            case ModalUserConstain.LASTNAME:
                setLastName(e.target.value);
                return;
            case ModalUserConstain.ADDRESS:
                setAddress(e.target.value);
                return;
            case ModalUserConstain.PHONENUMBER:
                setPhoneNumber(e.target.value);
                return;
            default:
                return;
        }
    };

    const toggle = () => toggleModalEditUser();

    const checkValideInput = () => {
        let isValid = true;
        if (!(firstName && lastName && address && phoneNumber)) {
            alert('Missing parameters');
            isValid = false;
        }
        return isValid;
    };

    const handleSaveUser = () => {
        if (checkValideInput()) {
            let dataNewUser = {
                id: dataEditUser.id,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
            };
            updateUser(dataNewUser);
        }
    };

    const handleResetForm = () => {
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhoneNumber('');
    };

    return (
        <Modal
            isOpen={isOpenModalEditUser}
            toggle={toggle}
            size="lg"
            centered
            className="modal-container"
        >
            <ModalHeader toggle={toggle}>Edit user</ModalHeader>
            <ModalBody>
                <form className="col-md-12">
                    <div className="form-row row mt-3">
                        <div className="form-group col-md-6 col-sm-12">
                            <label htmlFor="">First Name</label>
                            <input
                                value={firstName}
                                type="text"
                                className="form-control"
                                name="firstName"
                                placeholder="First Name"
                                onChange={(e) => handleChangeInput(e, 'FirstName')}
                            />
                        </div>
                        <div className="form-group col-md-6 col-sm-12">
                            <label htmlFor="i">Last Name</label>
                            <input
                                value={lastName}
                                type="text"
                                className="form-control"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={(e) => handleChangeInput(e, 'LastName')}
                            />
                        </div>
                    </div>

                    <div className="form-group col-12">
                        <label htmlFor="inputAddress">Address</label>
                        <input
                            value={address}
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder=""
                            onChange={(e) => handleChangeInput(e, 'Address')}
                        />
                    </div>
                    <div className="form-row row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputCity">Phone Number</label>
                            <input
                                value={phoneNumber}
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                onChange={(e) => handleChangeInput(e, 'PhoneNumber')}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">Gender</label>
                            <select name="gender" className="form-control">
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">RoleId</label>
                            <select name="roleId" className="form-control">
                                <option value="R1">Admin</option>
                                <option value="R2">Doctor</option>
                                <option value="R3">Patient</option>
                            </select>
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="px-4"
                    type="submit"
                    color="primary"
                    onClick={() => handleSaveUser()}
                >
                    Save changes
                </Button>{' '}
                <Button
                    className="px-3"
                    type="submit"
                    color="primary"
                    onClick={() => handleResetForm()}
                >
                    Reset
                </Button>{' '}
                <Button className="px-3" color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
