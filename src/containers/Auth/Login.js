import { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { handleLoginApi } from '../../services/userService';

const Login = ({ userLoginSuccess }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    /// login
    const handleLogin = async () => {
        setErrMessage('');
        try {
            let res = await handleLoginApi(userName, password);
            if (res.data && res.data.errorCode !== 0) {
                setErrMessage(res.data.errorMessage);
            }
            if (res.data && res.data.errorCode === 0) {
                let data = res.data.user;
                userLoginSuccess(data);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    setErrMessage(e.response.data.errorMessage);
                }
            }
        }
    };

    /// input
    const handlePassword = () => {
        setShowPass(!showPass);
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        setErrMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrMessage('');
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-center text-login">Login</div>
                    <div className="col-12 form-group login-input">
                        <label>Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => handleUserNameChange(e)}
                        />
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Password:</label>
                        <div className="custom-input-password">
                            <input
                                type={showPass ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => handlePasswordChange(e)}
                            />
                            <span className="custom-pass" onClick={() => handlePassword()}>
                                {showPass ? (
                                    <FontAwesomeIcon className="show-pass" icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon className="hide-pass" icon={faEyeSlash} />
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="col-12" style={{ color: '#ff1313' }}>
                        {errMessage}
                    </div>
                    <button className="btn-login" onClick={() => handleLogin()}>
                        Login
                    </button>
                    <div className="col-12 sp">
                        <span className="forgot-password">
                            <span>Forgot your password</span>
                        </span>
                        <span className="help">
                            <span>Help</span>
                        </span>
                    </div>
                    <div className="col-12 text-center">
                        <span>Or Login With:</span>
                    </div>
                    <div className="col-12 social-login">
                        <FontAwesomeIcon className="icon-facebook" icon={faFacebook} />
                        <FontAwesomeIcon className="icon-google" icon={faGoogle} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
