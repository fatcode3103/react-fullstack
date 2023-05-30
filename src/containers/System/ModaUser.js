import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import * as ModalUserConstain from './ModalUserConstain';
import './ModalUser.scss';

const ModalUser = (props) => {
    let { toggleModalUser, createNewUser, isOpenModalUser } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleChangeInput = (e, id) => {
        switch (id) {
            case ModalUserConstain.EMAIL:
                setEmail(e.target.value);
                return;
            case ModalUserConstain.PASSWORD:
                setPassword(e.target.value);
                return;
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

    const toggle = () => toggleModalUser();

    const checkValideInput = () => {
        let isValid = true;
        if (!(email && password && firstName && lastName && address && phoneNumber)) {
            alert('Missing parameters');
            isValid = false;
        }
        return isValid;
    };

    const handleAddNewUser = () => {
        if (checkValideInput()) {
            let dataNewUser = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phoneNumber: phoneNumber,
            };
            createNewUser(dataNewUser);
            handleResetForm();
        }
    };

    const handleResetForm = () => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setAddress('');
        setPhoneNumber('');
    };

    return (
        <Modal
            isOpen={isOpenModalUser}
            toggle={toggle}
            size="lg"
            centered
            className="modal-container"
        >
            <ModalHeader toggle={toggle}>Add new user</ModalHeader>
            <ModalBody>
                <form className="col-md-12">
                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input
                                value={email}
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => handleChangeInput(e, 'Email')}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Password</label>
                            <input
                                value={password}
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => handleChangeInput(e, 'Password')}
                            />
                        </div>
                    </div>

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
                    onClick={() => handleAddNewUser()}
                >
                    Add
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
