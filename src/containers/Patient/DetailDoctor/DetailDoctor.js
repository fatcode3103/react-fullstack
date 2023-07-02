import classNames from 'classnames/bind';
import styles from './DetailDoctor.module.scss';
import { useEffect, useState } from 'react';

import HomePageHeader from '../../HomePage/HomePageHeader';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import DoctorSchedule from './DoctorSchedule';

const cx = classNames.bind(styles);

function DetailDoctor(props) {
    const [detailOneDoctor, setDetailOneDoctor] = useState({});

    const { admin: adminState, user: userState, app: appState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { detailDoctor } = adminState;
    const { language } = appState;

    const { id } = props.match.params;

    let nameVi = '',
        nameEn = '';

    if (detailOneDoctor && detailOneDoctor.positionData) {
        nameVi = `${detailOneDoctor.positionData.valueVi} ${detailOneDoctor.lastName} ${detailOneDoctor.firstName}`;
        nameEn = `${detailOneDoctor.positionData.valueEn} ${detailOneDoctor.firstName}${detailOneDoctor.lastName}`;
    }

    useEffect(() => {
        dispatch(actions.getDetailDoctorStart(id));
    }, [dispatch, id]);

    useEffect(() => {
        setDetailOneDoctor(detailDoctor);
    }, [detailDoctor]);

    return (
        <div>
            <HomePageHeader idShowBanner={false} />
            <div className={cx('detail-doctor-container')}>
                <div className={cx('detail-doctor-content')}>
                    <div className={cx('block-1')}>
                        <div className={cx('info-doctor')}>
                            <div className={cx('avatar-doctor')}>
                                <img
                                    src={`${
                                        detailOneDoctor && detailOneDoctor.image
                                            ? detailOneDoctor.image
                                            : ''
                                    }`}
                                    alt="Doctor Avatar"
                                />
                            </div>
                            <div className={cx('brief-info')}>
                                <p className={cx('main-info')}>
                                    {language === 'vi' ? nameVi : nameEn}
                                </p>
                                <p className={cx('secondary-info')}>
                                    {detailOneDoctor &&
                                        detailOneDoctor.Markdown &&
                                        detailOneDoctor.Markdown.description && (
                                            <p>{detailOneDoctor.Markdown.description}</p>
                                        )}
                                </p>
                            </div>
                        </div>
                        <div className={cx('schedule-doctor row')}>
                            <div
                                className={cx('content-left col-7')}
                                style={{ borderRight: '1px solid #b8b8b8' }}
                            >
                                <DoctorSchedule />
                            </div>
                            <div className={cx('content-right col-5')}>Content right</div>
                        </div>
                    </div>
                    <div className={cx('detail-info-doctor')}>
                        {detailOneDoctor &&
                        detailOneDoctor.Markdown &&
                        detailOneDoctor.Markdown.contentHTML ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detailOneDoctor.Markdown.contentHTML,
                                }}
                            ></div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={cx('patient-feedback')}>Patient feedback</div>
                </div>
            </div>
        </div>
    );
}

export default DetailDoctor;
