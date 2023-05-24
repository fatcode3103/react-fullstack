import { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleLogin = () => {
        console.log(`user name: ${userName} | password: ${password}`);
    };

    const handlePassword = () => {
        setShowPass(!showPass);
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
                            onChange={(e) => setUserName(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
