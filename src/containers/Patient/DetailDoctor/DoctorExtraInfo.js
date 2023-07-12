import React from 'react';
import classNames from 'classnames/bind';
import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import styles from './DoctorExtraInfo.module.scss';

const cx = classNames.bind(styles);

function DoctorExtraInfo(props) {
    const { doctorIdFromParent } = props;
    const [isShowPrice, setIsShowPrice] = useState(false);
    const [price, setPrice] = useState('');
    const [payment, setPayment] = useState('');
    const [province, setProvince] = useState('');

    const { app: appState, admin: adminState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { language } = appState;
    const { extraInfoDoctor } = adminState;
    const { priceIdData, paymentIdData, provinceIdData, nameClinic, addressClinic, note } =
        extraInfoDoctor;

    useEffect(() => {
        dispatch(actions.getExtraInfoByIdStart(doctorIdFromParent));
    }, [dispatch, doctorIdFromParent]);

    useEffect(() => {
        if (language === 'vi') {
            setPrice(priceIdData && priceIdData.valueVi ? priceIdData.valueVi : '');
            setPayment(paymentIdData && paymentIdData.valueVi ? paymentIdData.valueVi : '');
            setProvince(provinceIdData && provinceIdData.valueVi ? provinceIdData.valueVi : '');
        } else if (language === 'en') {
            setPrice(priceIdData && priceIdData.valueEn ? priceIdData.valueEn : '');
            setPayment(paymentIdData && paymentIdData.valueEn ? paymentIdData.valueEn : '');
            setProvince(provinceIdData && provinceIdData.valueEn ? provinceIdData.valueEn : '');
        }
    }, [language, priceIdData, paymentIdData, provinceIdData]);

    const handleClickDetailPrice = () => {
        setIsShowPrice(!isShowPrice);
    };

    return (
        <div className={cx('doctor-extra-info-container')}>
            <div className={cx('doctor-extar-info-content')}>
                <div className={cx('clinic-address')}>
                    <div className={cx('text-address')}>
                        <FormattedMessage id="patient.detail-doctor.address-clinic" />
                    </div>
                    <div className={cx('name-clinic')}>
                        {extraInfoDoctor && nameClinic ? nameClinic : ''}
                    </div>
                    <div className={cx('detail-address')}>
                        {extraInfoDoctor && addressClinic ? addressClinic : ''}
                    </div>
                </div>
                <div className={cx('clinic-price')}>
                    <div>
                        <FormattedMessage id="patient.detail-doctor.price-clinic" />:
                        {!isShowPrice && (
                            <>
                                <span style={{ marginLeft: '4px' }}>
                                    <NumericFormat
                                        value={price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={language === 'vi' ? 'VND' : '$'}
                                        renderText={(value, props) => {
                                            return <span {...props}>{value}</span>;
                                        }}
                                    />
                                </span>
                                <span
                                    className={cx('clinic-price-detail-open')}
                                    onClick={() => handleClickDetailPrice()}
                                >
                                    <FormattedMessage id="patient.detail-doctor.view-details" />
                                </span>
                            </>
                        )}
                    </div>
                    {/* detail price */}
                    {isShowPrice && (
                        <>
                            <div className={cx('detail-price')}>
                                <div className={cx('detail-price-text')}>
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.price-clinic" />
                                    </span>
                                    <NumericFormat
                                        value={price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={language === 'vi' ? 'VND' : '$'}
                                        renderText={(value, props) => <div {...props}>{value}</div>}
                                    />
                                </div>
                                <div className={cx('detail-price-note')}>
                                    <FormattedMessage id="patient.detail-doctor.note" />: {note}
                                </div>
                                <div className={cx('payment')}>
                                    <FormattedMessage id="patient.detail-doctor.payment-note" />:{' '}
                                    {payment}
                                </div>
                            </div>
                            <span
                                className={cx('clinic-price-detail-close')}
                                onClick={() => handleClickDetailPrice()}
                            >
                                <FormattedMessage id="patient.detail-doctor.hide-details" />
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorExtraInfo;
