import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import className from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import bootstrap from 'bootstrap';
import * as actions from '../../../store/actions';
import styles from './DoctorSection.module.scss';
import { useEffect, useState } from 'react';

const cx = className.bind(styles);

const SampleNextArrow = (props) => {
    const { className, style, onClick, indexAfterChange } = props;
    return <div className={className} style={{ ...style }} onClick={onClick}></div>;
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick, indexAfterChange } = props;
    // if(indexAfterChange === 0) {
    //     return <div></div>
    // }
    return <div className={className} style={{ ...style }} onClick={onClick} />;
};

const DoctorSection = (props) => {
    const [topDoctorArr, setTopDoctorArr] = useState([]);
    const [indexAfterChange, setIndexAfterChange] = useState({ activeSlide: 0 });
    // console.log(indexAfterChange)

    const { data, backgroundStyle } = props;
    const color = backgroundStyle ? backgroundStyle : 'white';
    const settings = {
        autoplay: true,
        infinite: false,
        autoplaySpeed: 8000,
        cssEase: 'ease-in-out',
        dots: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
        nextArrow: <SampleNextArrow className="slick-next" indexAfterChange={indexAfterChange} />,
        prevArrow: <SamplePrevArrow className="slick-prev" indexAfterChange={indexAfterChange} />,
        afterChange: (current) => setIndexAfterChange({ activeSlide: current }),
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

    const {
        app: appState,
        admin: adminState,
        user: userState,
    } = useSelector((state) => {
        return state;
    });

    const dispatch = useDispatch();

    const { topDoctors } = adminState;
    const { language } = appState;

    useEffect(() => {
        setTopDoctorArr(topDoctors);
    }, [topDoctors]);

    useEffect(() => {
        dispatch(actions.fetchTopDoctorStart());
    }, [dispatch]);

    return (
        <div style={{ backgroundColor: color }} className={cx('doctor-section-container')}>
            <div className={cx('doctor-section-content')}>
                <div className={cx('doctor-section-header')}>
                    <h2 className={cx('doctor-section-title')}>
                        <FormattedMessage id="home-page.top-doctor" />
                    </h2>
                    <button className={cx('btn-see-more')}>
                        <FormattedMessage id="home-page.more" />
                    </button>
                </div>
                <div className={cx('doctor-section-body')}>
                    <Slider {...settings}>
                        {topDoctorArr &&
                            topDoctorArr.length > 0 &&
                            topDoctorArr.map((topDoctor, index) => {
                                let imageBase64 = '';
                                if (topDoctor.image) {
                                    imageBase64 = new Buffer(topDoctor.image, 'base64').toString(
                                        'binary',
                                    );
                                }

                                let positonVi = topDoctor.positionData.valueVi;
                                let positonEn = topDoctor.positionData.valueEn;

                                return (
                                    <div key={index} className={cx('doctor-section-tag')}>
                                        <div className={cx('doctor-section-img-wrapper')}>
                                            <div
                                                className={cx('doctor-section-img')}
                                                style={{
                                                    backgroundImage: `url(${imageBase64})`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'top',
                                                }}
                                            ></div>
                                        </div>
                                        <p className={cx('doctor-section-description')}>
                                            <p>{language === 'vi' ? positonVi : positonEn}</p>
                                            {language === 'vi' ? (
                                                <p>
                                                    {topDoctor.lastName} {topDoctor.firstName}
                                                </p>
                                            ) : (
                                                <p>
                                                    {topDoctor.firstName} {topDoctor.lastName}
                                                </p>
                                            )}
                                            <p>Cơ xương khớp</p>
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
