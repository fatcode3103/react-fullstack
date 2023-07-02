import { connect } from 'react-redux';
import TippyHeadless from '@tippyjs/react/headless';
import { FormattedMessage } from 'react-intl';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faCheck,
    faChevronCircleDown,
    faQuestion,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

import styles from './HomePageHeader.module.scss';
import options from './Options/Option';
import googleImage from '../../assets/images/google-play-badge.svg';
import appStoreImage from '../../assets/images/app-store-badge-black.svg';
import { languages } from '../../utils/constant';
import { changeLanguage } from '../../store/actions';
import { useHistory } from 'react-router-dom';

const cx = className.bind(styles);

const HomePageHeader = (props) => {
    let history = useHistory();

    const handleChangeLanguage = (language) => {
        props.changeLanguage(language);
    };

    const { language, isShowBanner } = props;

    const returnToHome = () => {
        return history.push('/home');
    };

    return (
        <>
            <div className={cx('home-page-header-container')}>
                <div className={cx('home-page-header-content')}>
                    <div className={cx('left-content')}>
                        <FontAwesomeIcon icon={faBars} className={cx('icon-bars')} />
                        <div className={cx('header-logo')} onClick={() => returnToHome()}>
                            <div />
                        </div>
                        <div className={cx('center-content')}>
                            <div className={cx('child-content')}>
                                <p>
                                    <FormattedMessage id="home-header.speciality" />
                                </p>
                                <span>
                                    <FormattedMessage id="home-header.search-doctor" />
                                </span>
                            </div>
                            <div className={cx('child-content')}>
                                <p>
                                    <FormattedMessage id="home-header.medical-facility" />
                                </p>
                                <span>
                                    <FormattedMessage id="home-header.choose-hospital-clinic" />
                                </span>
                            </div>
                            <div className={cx('child-content')}>
                                <p>
                                    <FormattedMessage id="home-header.doctor" />
                                </p>
                                <span>
                                    <FormattedMessage id="home-header.good-doctor" />
                                </span>
                            </div>
                            <div className={cx('child-content')}>
                                <p>
                                    <FormattedMessage id="home-header.examination-package" />
                                </p>
                                <span>
                                    <FormattedMessage id="home-header.general-health-check" />
                                </span>
                            </div>
                        </div>
                        <div className={cx('right-content')}>
                            <span>
                                <FontAwesomeIcon icon={faQuestion} className={cx('icon-help')} />
                                <span>
                                    <FormattedMessage id="home-header.help" />
                                </span>
                            </span>
                            <p>024-7301-2468</p>
                        </div>
                        <div className={cx('language')}>
                            <TippyHeadless
                                inertia
                                delay={[0, 400]}
                                interactive
                                render={(attrs) => (
                                    <div className={cx('my-language')} tabIndex="-1" {...attrs}>
                                        <div>
                                            {language === 'vi' && (
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className={cx('icon-check')}
                                                />
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
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className={cx('icon-check')}
                                                />
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
                                    <FontAwesomeIcon
                                        icon={faChevronCircleDown}
                                        className={cx('icon-more')}
                                    />
                                </div>
                            </TippyHeadless>
                        </div>
                    </div>
                </div>
            </div>
            {isShowBanner === true && (
                <div className={cx('home-header-banner')}>
                    <div className={cx('content-up')}>
                        <div className={cx('title1')}>
                            <FormattedMessage id="banner.title1" />
                        </div>
                        <div className={cx('title2')}>
                            <FormattedMessage id="banner.title2" />
                        </div>
                        <div className={cx('search')}>
                            <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
                            <input
                                type="text"
                                className={cx('search-box')}
                                placeholder="Enter something..."
                            />
                        </div>
                        <div className={cx('download')}>
                            <a
                                href="https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare&hl=en_US"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={googleImage}
                                    alt="google play"
                                    className={cx('google-badge')}
                                />
                            </a>
                            <a
                                href="https://apps.apple.com/vn/app/bookingcare/id1347700144"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={appStoreImage}
                                    alt="app store"
                                    className={cx('app-store-badge')}
                                />
                            </a>
                        </div>
                    </div>
                    <div className={cx('content-down')}>
                        <div className={cx('options')}>
                            {options.map((option, index) => {
                                return (
                                    <a href="/" className={cx('option-child')} key={index}>
                                        <div>
                                            <div>
                                                <img
                                                    src={option.img}
                                                    alt=""
                                                    className={cx('icon-child')}
                                                />
                                            </div>
                                            <div className={cx('text-child')}>
                                                <FormattedMessage
                                                    id={`banner.option${index + 1}`}
                                                />
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    /// map state cua Redux tiem vao React
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (language) => dispatch(changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHeader);
