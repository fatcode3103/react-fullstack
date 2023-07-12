import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';

import styles from './ProfileDoctor.module.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { faA, faLocation, faTShirt } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProfileDoctor(props) {
    const { doctorId, dataScheduleTimeFromParent } = props;

    const [dataProfile, setDataProfile] = useState({});

    const { app: appState, admin: adminState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { detailDoctor } = adminState;
    const { language } = appState;
    const { Markdown, Doctor_Info, positionData } = dataProfile;

    useEffect(() => {
        async function fecthProfileDoctor() {
            let res = await getProfileDoctorById(doctorId);
            if (res && res.data.errorCode === 0) {
                let name = handleNameDoctorByLanguage(res.data.data);
                let price = handlePriceByLanguage(res.data.data);
                let time = handleTimeByLanguage(dataScheduleTimeFromParent);
                let province = handleProvinceByLanguage(res.data.data);
                let date = handleDate(dataScheduleTimeFromParent);
                let obj = { ...res.data.data, name, price, time, province, date };
                setDataProfile(obj);
            }
        }

        fecthProfileDoctor();
    }, [doctorId]);

    const handleNameDoctorByLanguage = (doctor) => {
        if (language === 'vi') {
            return `${doctor.lastName} ${doctor.firstName}`;
        } else {
            return `${doctor.firstName} ${doctor.lastName}`;
        }
    };

    const handlePriceByLanguage = (doctor) => {
        if (language === 'vi') {
            return `${doctor.Doctor_Info.priceIdData.valueVi}`;
        } else {
            return `${doctor.Doctor_Info.priceIdData.valueEn}`;
        }
    };

    const handleTimeByLanguage = (time) => {
        if (language === 'vi') {
            return `${time.timeData.valueVi}`;
        } else {
            return `${time.timeData.valueEn}`;
        }
    };

    const handleProvinceByLanguage = (doctor) => {
        if (language === 'vi') {
            return `${doctor.Doctor_Info.provinceIdData.valueVi}`;
        } else {
            return `${doctor.Doctor_Info.provinceIdData.valueEn}`;
        }
    };

    const handleDate = (val) => {
        const year = val.date.substring(0, 4);
        const month = val.date.substring(4, 6);
        const day = val.date.substring(6, 8);
        if (language === 'vi') {
            return `${day}/${month}/${year}`;
        } else {
            return `${month}/${day}/${year}`;
        }
    };

    return (
        <div>
            <div className={cx('profile-container')}>
                <div className={cx('profile-content')}>
                    <div className={cx('info')}>
                        <img
                            className={cx('info-avatar')}
                            alt={`avatar ${
                                dataProfile && dataProfile.name ? dataProfile.name : ''
                            }`}
                            src={dataProfile && dataProfile.image ? dataProfile.image : ''}
                        />
                        <div className={cx('info-detail')}>
                            <p className={cx('info-detail-title')}>
                                <FormattedMessage id="patient.detail-doctor.book" />
                            </p>
                            <a className={cx('info-detail-position')} href="/">
                                {dataProfile && positionData ? positionData.valueVi : ''}
                                {' | '}
                                {dataProfile && dataProfile.name ? dataProfile.name : ''}
                            </a>
                            <p className={cx('info-detail-description')}>
                                {Markdown && Markdown.description ? Markdown.description : ''}
                            </p>
                            <p className={cx('info-detail-schedule')}>
                                {dataProfile && dataProfile.time ? dataProfile.time : ''} {', '}
                                {dataProfile && dataProfile.date ? dataProfile.date : ''}
                            </p>
                            <p className={cx('info-detail-province')}>
                                <i
                                    className={cx('fa-solid fa-location-dot ')}
                                    style={{ color: '#F03030', marginRight: '3px' }}
                                ></i>
                                {dataProfile && dataProfile.province ? dataProfile.province : ''}
                            </p>
                        </div>
                    </div>
                    <div className={cx('profile-price')}>
                        <span>
                            <FormattedMessage id="patient.detail-doctor.price-clinic" />:{' '}
                        </span>
                        {dataProfile && dataProfile.price ? (
                            <NumericFormat
                                value={dataProfile.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={language === 'vi' ? 'VND' : '$'}
                                renderText={(value, props) => {
                                    return <span {...props}>{value}</span>;
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDoctor;
