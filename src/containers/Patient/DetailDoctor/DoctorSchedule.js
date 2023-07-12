import classNames from 'classnames/bind';
import styles from './DoctorSchedule.module.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowAltCircleDown,
    faArrowAltCircleUp,
    faArrowCircleUp,
    faArrowUp,
    faCalendarDays,
    faHand,
} from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

const cx = classNames.bind(styles);

function DoctorSchedule(props) {
    const [allDates, setAllDates] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataScheduleTimeFromParent, setDataScheduleTimeFromParent] = useState({});

    const { app: appState, admin: adminState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { language } = appState;
    const { detailDoctor, scheduleDoctor } = adminState;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        async function fetchScheduleDoctor() {
            let arrDate = [];
            for (let i = 0; i < 7; i++) {
                let obj = {};
                if (language === 'vi') {
                    obj.label = capitalizeFirstLetter(
                        moment(new Date()).add(i, 'days').format('dddd - DD/MM'),
                    );
                } else {
                    obj.label = moment(new Date())
                        .add(i, 'days')
                        .locale('en')
                        .format('ddd - DD/MM');
                }
                obj.value = moment(new Date()).add(i, 'day').format('YYYY/MM/DD');
                obj.value = JSON.stringify(obj.value).slice(1, 11).replace(/\//g, '');
                arrDate.push(obj);
            }
            setAllDates(arrDate);
        }
        fetchScheduleDoctor();
    }, [language]);

    const handleChangeSelectDate = async (e) => {
        await dispatch(actions.fetchScheduleDoctorStart(detailDoctor.id, e.target.value));
    };

    const handleClickTimeBtn = (time) => {
        setDataScheduleTimeFromParent(time);
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    return (
        <>
            <div className={cx('doctor-schedule-container')}>
                <div className={cx('select')}>
                    <select
                        onChange={(e) => handleChangeSelectDate(e)}
                        className={cx('schedule-select')}
                    >
                        <option selected>dd/mm</option>
                        {allDates &&
                            allDates.length > 0 &&
                            allDates.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                        className={cx('schedule-option')}
                                    >
                                        {item.label}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <div className={cx('schedule-title')}>
                    <FontAwesomeIcon icon={faCalendarDays} className={cx('schedule-icon')} />
                    <span className={cx('schedule-text')}>
                        <FormattedMessage id="patient.detail-doctor.schedule" />
                    </span>
                </div>
                <div className={cx('schedule')}>
                    {scheduleDoctor &&
                    scheduleDoctor.length > 0 &&
                    scheduleDoctor[0].doctorId === detailDoctor.id ? (
                        scheduleDoctor.map((item, index) => {
                            const { valueVi: timeVi, valueEn: timeEn } = item.timeData;
                            const time = language === 'vi' ? timeVi : timeEn;
                            return (
                                <button
                                    className={cx('time-btn')}
                                    key={index}
                                    onClick={() => handleClickTimeBtn(item)}
                                >
                                    {time}
                                </button>
                            );
                        })
                    ) : (
                        <span>
                            <FormattedMessage id="patient.detail-doctor.choose-date" />
                        </span>
                    )}
                </div>
            </div>
            <BookingModal
                isOpen={isShowModal}
                handleCloseModal={handleCloseModal}
                dataScheduleTimeFromParent={dataScheduleTimeFromParent}
            />
        </>
    );
}

export default DoctorSchedule;
