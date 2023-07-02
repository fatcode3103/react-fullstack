import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import TippyHeadless from '@tippyjs/react/headless';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { languages, UserRole } from '../../utils';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Header = (props) => {
    const [menuApp, setMenuApp] = useState([]);

    const handleChangeLanguage = (language) => {
        props.changeLanguage(language);
    };
    const { firstName, lastName } = props.userInfo.user;

    const language = props.language;

    useEffect(() => {
        let { userInfo } = props;
        let menu = [];
        if (userInfo && userInfo.user && Object.keys(userInfo).length !== 0) {
            let role = userInfo.user.roleId;
            if (role === UserRole.ADMIN) {
                menu = adminMenu;
            } else if (role === UserRole.DOCTOR) {
                menu = doctorMenu;
            }
        }
        setMenuApp(menu);
    }, []);

    return (
        <div className={cx('header-container')}>
            {/* thanh navigator */}
            <div className={cx('header-tabs-container')}>
                <Navigator menus={menuApp} />
            </div>

            <span className={cx('welcome')}>
                <FormattedMessage id="home-header.welcome" />, {firstName + ' ' + lastName} !
            </span>

            {/* nút logout && language */}
            <div className={cx('content-header-right')}>
                {/* language */}
                <TippyHeadless
                    delay={[0, 400]}
                    interactive
                    render={(attrs) => (
                        <div className={cx('my-language')} tabIndex="-1" {...attrs}>
                            <div>
                                {language === 'vi' && (
                                    <FontAwesomeIcon icon={faCheck} className={cx('icon-check')} />
                                )}
                                <p
                                    className={cx('language-vi', {
                                        active: language === 'vi',
                                    })}
                                    onClick={() => handleChangeLanguage(languages.VI)}
                                >
                                    VI
                                </p>
                            </div>
                            <div>
                                {language === 'en' && (
                                    <FontAwesomeIcon icon={faCheck} className={cx('icon-check')} />
                                )}
                                <p
                                    className={cx('language-en', {
                                        active: language === 'en',
                                    })}
                                    onClick={() => handleChangeLanguage(languages.EN)}
                                >
                                    EN
                                </p>
                            </div>
                        </div>
                    )}
                >
                    <div>
                        <input
                            type="text"
                            value={language}
                            className={cx('input-language')}
                            disabled
                        />
                        <FontAwesomeIcon icon={faChevronCircleDown} className={cx('icon-more')} />
                    </div>
                </TippyHeadless>
                <div className={cx('btn btn-logout')} onClick={props.processLogout}>
                    <FontAwesomeIcon icon={faSignOut} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
