import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import className from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bootstrap from 'bootstrap';

import styles from './DoctorSection.module.scss';

const cx = className.bind(styles);

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick}></div>;
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
};

const DoctorSection = (props) => {
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
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768, /// co tac dung khi duoi 768
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div style={{ backgroundColor: color }} className={cx('doctor-section-container')}>
            <div className={cx('doctor-section-content')}>
                <div className={cx('doctor-section-header')}>
                    <h2 className={cx('doctor-section-title')}>{data[0].title}</h2>
                    <button className={cx('btn-see-more')}>TÌM KIẾM</button>
                </div>
                <div className={cx('doctor-section-body')}>
                    <Slider {...settings}>
                        {data.map((data, index) => {
                            return (
                                <div key={index} className={cx('doctor-section-tag')}>
                                    <div className={cx('doctor-section-img-wrapper')}>
                                        <img
                                            alt=""
                                            src={data.img}
                                            className={cx('doctor-section-img')}
                                        />
                                    </div>
                                    <p className={cx('doctor-section-description')}>
                                        <p>{data.rank}</p>
                                        <p>{data.fullName}</p>
                                        <p>{data.departmentOfWork}</p>
                                    </p>
                                </div>
                            );
                        })}
                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSection);
