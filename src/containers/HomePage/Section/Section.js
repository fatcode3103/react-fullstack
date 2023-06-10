import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import className from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Slick.scss';
import styles from './Section.module.scss';

const cx = className.bind(styles);

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick}></div>;
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
};

const Section = (props) => {
    const { data, backgroundStyle } = props;

    const color = backgroundStyle ? backgroundStyle : 'white';

    const settings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 8000,
        cssEase: 'ease-in-out',
        dots: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
        nextArrow: <SampleNextArrow className="slick-next" />,
        prevArrow: <SamplePrevArrow className="slick-prev" />,
    };

    return (
        <div style={{ backgroundColor: color }} className={cx('section-container')}>
            <div className={cx('section-content')}>
                <div className={cx('section-wapper')}>
                    <div className={cx('section-header')}>
                        <h2 className={cx('section-title')}>{data[0].title}</h2>
                        <button className={cx('btn-see-more')}>XEM THÊM</button>
                    </div>
                    <div className={cx('section-body')}>
                        <Slider {...settings}>
                            {data.map((data, index) => {
                                return (
                                    <div key={index} className={cx('section-tag')}>
                                        <div className={cx('section-img-wrapper')}>
                                            <img
                                                alt=""
                                                src={data.img}
                                                className={cx('section-img')}
                                            />
                                        </div>
                                        <p className={cx('section-description')}>
                                            {data.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Section);
