import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import className from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './HandlBook.module.scss';

const cx = className.bind(styles);

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick}></div>;
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
};

const HandlBook = (props) => {
    const { data, sliderNumber, backgroundStyle } = props;

    const color = backgroundStyle ? backgroundStyle : 'white';

    const settings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 8000,
        cssEase: 'ease-in-out',
        dots: true,
        speed: 500,
        slidesToShow: sliderNumber,
        slidesToScroll: 1,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
        nextArrow: <SampleNextArrow className="slick-next" />,
        prevArrow: <SamplePrevArrow className="slick-prev" />,
    };

    return (
        <div style={{ backgroundColor: color }} className={cx('handl-book-container')}>
            <div className={cx('handl-book-content')}>
                <div className={cx('handl-book-header')}>
                    <h2 className={cx('handl-book-title')}>{data[0].title}</h2>
                    <button className={cx('btn-see-more')}>TẤT CẢ BÀI VIẾT</button>
                </div>
                <div className={cx('handl-book-body')}>
                    <Slider {...settings}>
                        {data.map((data, index) => {
                            return (
                                <div key={index} className={cx('handl-book-tag')}>
                                    <div className={cx('handl-book-img-wrapper')}>
                                        <img
                                            alt=""
                                            src={data.img}
                                            className={cx('handl-book-img')}
                                        />
                                    </div>
                                    <p className={cx('handl-book-description')}>
                                        {data.description}
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

export default connect(mapStateToProps, mapDispatchToProps)(HandlBook);
