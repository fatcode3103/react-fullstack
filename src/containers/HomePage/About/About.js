import bootstrap from 'bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import className from 'classnames/bind';

import styles from './About.module.scss';

const cx = className.bind(styles);

const About = (props) => {
    const { backgroundStyle } = props;

    const color = backgroundStyle ? backgroundStyle : 'white';

    return (
        <div style={{ backgroundColor: color }} className={cx('about-container')}>
            <div className={cx('about-content')}>
                <div className={cx('about-header')}>More about BookingCare</div>
                <div className={cx('about-wrapper row')}>
                    <div className={cx('content-left col-6')}>
                        <iframe
                            className={cx('about-video')}
                            width="942"
                            height="530"
                            src="https://www.youtube.com/embed/OASGscJQXp0"
                            title="BookingCare: Hệ thống đặt khám trực tuyến"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div className={cx('content-right col-6')}>
                        <p className={cx('text-info')}>
                            BookingCare là nền tảng Đặt Lịch Khám giúp bệnh nhân dễ dàng lựa chọn
                            đúng bác sĩ từ mạng lưới bác sĩ chuyên khoa giỏi, với thông tin đã xác
                            thực và đặt lịch nhanh chóng.
                        </p>
                    </div>
                </div>
            </div>
        </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
