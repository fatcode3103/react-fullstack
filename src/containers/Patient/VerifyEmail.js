import React from 'react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import queryString from 'query-string';

import HomePageHeader from '../HomePage/HomePageHeader';
import * as userService from '../../services/userService';
import styles from './VerifyEmail.module.scss';

const cx = classNames.bind(styles);

function VerifyEmail(props) {
    const [statusVerify, setStatusVerify] = useState(false);
    const [errorCode, setErrorCode] = useState(0);

    useEffect(() => {
        async function postVerifyEmail() {
            const { doctorId, token } = queryString.parse(props.location.search);
            console.log(doctorId, token);
            let res = await userService.postVerifyBookAppointment({ token, doctorId });
            setTimeout(() => {
                if (res && res.data.errorCode === 0) {
                    setStatusVerify(true);
                    setErrorCode(res.data.errorCode);
                } else {
                    setStatusVerify(true);
                    setErrorCode(res.data.errorCode);
                }
            }, 2000);
        }
        postVerifyEmail();
    }, [props.location.search]);

    return (
        <div>
            <HomePageHeader />
            {console.log('error: >>', errorCode)}
            {!statusVerify ? (
                <>
                    <div className={cx('loader')}></div>
                    <p className={cx('text-loading')}>Please wait ...</p>
                </>
            ) : (
                <div>
                    {errorCode === 0 ? (
                        <div className={cx('confirm-text')}>
                            Confirmation of successful appointment
                        </div>
                    ) : (
                        <div className={cx('confirm-text')}>
                            Appointment confirmation failed or exits
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default VerifyEmail;
