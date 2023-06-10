import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import className from 'classnames/bind';

import bootstrap from 'bootstrap';

import styles from './HomeFooter.module.scss';

const cx = className.bind(styles);

const HomeFooter = (props) => {
    return (
        <div className={cx('home-footer-container row')}>
            {/* <p>
                &copy; 2023 Code cung Fatcode.{' '}
                <a
                    className={cx('more-info')}
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.facebook.com/profile.php?id=100034110155872"
                >
                    More information
                </a>
            </p> */}
            <div className={cx('content-1 col-sm-4 col-xs-12')}>content 1</div>
            <div className={cx('content-1 col-sm-4 col-xs-12')}>content 2</div>
            <div className={cx('content-1 col-sm-4 col-xs-12')}>content 2</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
