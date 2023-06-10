import React, { Component } from 'react';
import { connect } from 'react-redux';
import TippyHeadless from '@tippyjs/react/headless';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { languages } from '../../utils';

const cx = classNames.bind(styles);

const Header = (props) => {
    const handleChangeLanguage = (language) => {
        props.changeLanguage(language);
    };

    const language = props.language;
    return (
        <div className={cx('header-container')}>
            {/* thanh navigator */}
            <div className={cx('header-tabs-container')}>
                <Navigator menus={adminMenu} />
            </div>

            {/* nút logout && language */}
            <div className={cx('language')}>
                <TippyHeadless
                    inertia
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
            </div>
            <div className={cx('btn btn-logout')} onClick={props.processLogout}>
                <FontAwesomeIcon icon={faSignOut} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
