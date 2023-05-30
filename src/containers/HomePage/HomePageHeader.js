import { connect } from 'react-redux';
import TippyHeadless from '@tippyjs/react/headless';

import './HomePageHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEarthAmerica, faQuestion, faSearch } from '@fortawesome/free-solid-svg-icons';
import googleImage from '../../assets/images/google-play-badge.svg';
import appStoreImage from '../../assets/images/app-store-badge-black.svg';

const HomePageHeader = () => {
    return (
        <>
            <div className="home-page-header-container">
                <div className="home-page-header-content">
                    <div className="left-content">
                        <FontAwesomeIcon icon={faBars} className="icon-bars" />
                        <div className="header-logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <p>Chuyên khoa</p>
                            <span>Tìm bác sĩ theo chuyên khoa</span>
                        </div>
                        <div className="child-content">
                            <p>Cơ sở y tế</p>
                            <span>Chọn bệnh viện phòng khám</span>
                        </div>
                        <div className="child-content">
                            <p>Bác sĩ</p>
                            <span>Chọn bác sĩ giỏi</span>
                        </div>
                        <div className="child-content">
                            <p>Gói khám</p>
                            <span>Khám sức khỏe tổng quát</span>
                        </div>
                    </div>
                    <div className="right-content">
                        <span>
                            <FontAwesomeIcon icon={faQuestion} className="icon-help" />
                            <span>Hỗ trợ</span>
                        </span>
                        <p>024-7301-2468</p>
                    </div>
                    <div className="language">
                        <TippyHeadless
                            inertia
                            delay={[0, 400]}
                            interactive
                            render={(attrs) => (
                                <div className="my-language" tabIndex="-1" {...attrs}>
                                    <p className="language-vi">VI</p>
                                    <p className="language-en">EN</p>
                                </div>
                            )}
                        >
                            <FontAwesomeIcon icon={faEarthAmerica} className="icon-language" />
                        </TippyHeadless>
                    </div>
                </div>
            </div>
            <div className="home-header-banner">
                <div className="content-up">
                    <div className="title1">NỀN TẢNG Y TẾ</div>
                    <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                    <div className="search">
                        <FontAwesomeIcon icon={faSearch} className="icon-search" />
                        <input type="text" className="search-box" placeholder="Enter..." />
                    </div>
                    <div className="download">
                        <a
                            href="https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare&hl=en_US"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={googleImage} alt="google play" className="google-badge" />
                        </a>
                        <a
                            href="https://apps.apple.com/vn/app/bookingcare/id1347700144"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={appStoreImage} alt="app store" className="app-store-badge" />
                        </a>
                    </div>
                </div>
                <div className="content-down">
                    <div className="options">
                        <a href="/" className="option-child">
                            <div>
                                <div className="test">
                                    <img
                                        src="https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png"
                                        alt=""
                                        className="icon-child"
                                    />
                                </div>
                                <div className="text-child">Khám Chuyên Khoa</div>
                            </div>
                        </a>
                        <a href="/" className="option-child">
                            <div>
                                <img
                                    src="https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png"
                                    alt=""
                                    className="icon-child"
                                />
                                <div className="text-child">Khám Từ Xa</div>
                            </div>
                        </a>
                        <a href="/" className="option-child">
                            <div>
                                <img
                                    src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png"
                                    alt=""
                                    className="icon-child"
                                />
                                <div className="text-child">Khám Tổng Quát</div>
                            </div>
                        </a>
                        <a href="/" className="option-child">
                            <div>
                                <img
                                    src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png"
                                    alt=""
                                    className="icon-child"
                                />
                                <div className="text-child">Xét Nghiệm Y Học</div>
                            </div>
                        </a>
                        <a href="/" className="option-child">
                            <div>
                                <img
                                    src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png"
                                    alt=""
                                    className="icon-child"
                                />
                                <div className="text-child">Sức Khỏe Tinh Thần</div>
                            </div>
                        </a>
                        <a href="/" className="option-child">
                            <div>
                                <img
                                    src="https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png"
                                    alt=""
                                    className="icon-child"
                                />
                                <div className="text-child">Khám Nha Khoa</div>
                            </div>
                        </a>
                        <a href="/" className="option-child">
                            <div>
                                <img
                                    src="https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg"
                                    alt=""
                                    className="icon-child"
                                />
                                <div className="text-child">Gói Phẫu Thuật</div>
                            </div>
                        </a>
                        <a href="/" className="option-child">
                            <div>
                                <img
                                    src="https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png"
                                    alt=""
                                    className="icon-child"
                                />
                                <div className="text-child">Sản Phẩm Y Tế</div>
                            </div>
                        </a>
                        <a href="/" className="option-child">
                            <div>
                                <img
                                    src="https://cdn.bookingcare.vn/fo/2023/04/12/160542-icon-bai-test-suc-khoe.png"
                                    alt=""
                                    className="icon-child"
                                />
                                <div className="text-child">Bài Test Sức Khỏe</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHeader);
