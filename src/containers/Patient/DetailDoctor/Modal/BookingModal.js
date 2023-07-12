import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
import DatePicker from 'react-multi-date-picker';
import transition from 'react-element-popper/animations/transition';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import moment, { lang } from 'moment';

import styles from './BookingModal.module.scss';
import * as actions from '../../../../store/actions';
import { Modal } from 'reactstrap';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import ProfileDoctor from '../ProfileDoctor';

const cx = classNames.bind(styles);

function BookingModal(props) {
    const { isOpen, handleCloseModal, dataScheduleTimeFromParent } = props;
    const { doctorId, timeType, timeData, date: dateSchedule } = dataScheduleTimeFromParent;
    const [genderArr, setGenderArr] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeSchedule, setTimeSchedule] = useState('');
    const [doctorName, setDoctorName] = useState('');

    const { app: appState, admin: adminState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { genders, detailDoctor } = adminState;
    const { language } = appState;

    useEffect(() => {
        dispatch(actions.fecthGenderStart());
    }, [dispatch]);

    useEffect(() => {
        setAppointmentDate(handleDate(dateSchedule));
        setTimeSchedule(handleTimeByLanguage(timeData));
        setDoctorName(handleDoctorName(detailDoctor));
        setGenderArr(handleGenderByLanguage(genders));
    }, [genders, language, detailDoctor, timeData, dateSchedule]);

    //custom hook
    const useForm = (initialState) => {
        const [form, setForm] = useState(initialState);

        const handleOnChangeInput = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        };

        return [form, setForm, handleOnChangeInput];
    };

    const initialState = {
        fullName: '',
        phoneNumber: '',
        email: '',
        contact: '',
        reason: '',
        gender: null,
        date: new Date(),
    };

    const [form, setForm, handleOnChangeInput] = useForm(initialState);

    const { fullName, phoneNumber, email, contact, reason, gender, date } = form;

    const handleOnChangeDate = () => {
        return (
            <DatePicker
                value={date}
                onChange={(e) =>
                    handleOnChangeInput({ target: { name: 'date', value: e.toDate() } })
                }
                // minDate={new Date()}
                format={language === 'vi' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'}
                animations={[transition()]}
            />
        );
    };

    const handleGenderByLanguage = (genders) => {
        let arr = [];
        genders &&
            genders.length > 0 &&
            genders.forEach((gender) => {
                let obj = {};
                obj.label = language === 'vi' ? gender.valueVi : gender.valueEn;
                obj.value = gender.keyMap;
                arr.push(obj);
            });
        return arr;
    };

    const handleBuildDateOfBirth = (date) => {
        let dateOfBirth = {};
        dateOfBirth.dateVi = moment(date).locale('vi').format('dddd-DD-MM-YYYY');
        dateOfBirth.dateEn = moment(date).locale('en').format('dddd-MM-DD-YYYY');
        return dateOfBirth;
    };

    const handleDate = (dateSchedule) => {
        const year = dateSchedule && dateSchedule.slice(0, 4);
        const month = dateSchedule && dateSchedule.slice(4, 6);
        const day = dateSchedule && dateSchedule.slice(6, 8);
        if (language === 'vi') {
            return `${day}/${month}/${year}`;
        } else {
            return `${month}/${day}/${year}`;
        }
    };

    const handleTimeByLanguage = (timeData) => {
        if (language === 'vi') {
            return timeData && timeData.valueVi;
        } else {
            return timeData && timeData.valueEn;
        }
    };

    const handleDoctorName = (doctor) => {
        const { firstName, lastName } = doctor;
        if (language === 'vi') {
            return `${lastName} ${firstName}`;
        } else {
            return `${firstName} ${lastName}`;
        }
    };

    const handleConfirm = async () => {
        let { dateEn } = handleBuildDateOfBirth(form.date);
        form.date = dateEn;
        const data = {
            ...form,
            doctorId,
            timeType,
            appointmentDate,
            timeSchedule,
            doctorName,
            language,
        };
        console.log('data: >>>', data);
        await dispatch(actions.postBookAppointmentStart(data));
        setForm(initialState);
        handleCloseModal();
    };

    return (
        <div>
            <Modal
                className={cx('booking-modal-container')}
                isOpen={isOpen}
                size="xl"
                centered
                toggle={(e) => handleCloseModal()}
            >
                <div className={cx('booking-modal-content')}>
                    <div className={cx('booking-modal-header')}>
                        <span className={cx('header-text')}>
                            <FormattedMessage id="patient.booking.appointment-notice" />
                        </span>
                        <span>
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className={cx('close-icon')}
                                onClick={handleCloseModal}
                            />
                        </span>
                    </div>
                    <div className={cx('booking-modal-body')}>
                        <div className={cx('doctor-info')}>
                            <ProfileDoctor
                                doctorId={doctorId}
                                dataScheduleTimeFromParent={dataScheduleTimeFromParent}
                            />
                        </div>
                        <div className={cx('booking-form')}>
                            <form>
                                <div className={cx('form-group row')}>
                                    <div className={cx('col-6  form-group')}>
                                        <label>
                                            <FormattedMessage id="patient.booking.full-name" />
                                        </label>
                                        <input
                                            name="fullName"
                                            value={fullName}
                                            className={cx('form-control')}
                                            onChange={(e) => handleOnChangeInput(e)}
                                        />
                                    </div>
                                    <div className={cx('col-3  form-group')}>
                                        <label>
                                            <FormattedMessage id="patient.booking.phone-number" />
                                        </label>
                                        <input
                                            name="phoneNumber"
                                            value={phoneNumber}
                                            className={cx('form-control')}
                                            onChange={(e) => handleOnChangeInput(e)}
                                        />
                                    </div>
                                    <div className={cx('col-3 form-group')}>
                                        <label>
                                            <FormattedMessage id="patient.booking.date-of-birth" />
                                        </label>
                                        <div>{handleOnChangeDate()}</div>
                                    </div>
                                </div>
                                <div className={cx('form-group row')}>
                                    <div className={cx('col-6  form-group')}>
                                        <label>
                                            <FormattedMessage id="patient.booking.email-address" />
                                        </label>
                                        <input
                                            name="email"
                                            value={email}
                                            className={cx('form-control')}
                                            onChange={(e) => handleOnChangeInput(e)}
                                        />
                                    </div>
                                    <div className={cx('col-6  form-group')}>
                                        <label>
                                            <FormattedMessage id="patient.booking.address" />
                                        </label>
                                        <input
                                            name="contact"
                                            value={contact}
                                            className={cx('form-control')}
                                            onChange={(e) => handleOnChangeInput(e)}
                                        />
                                    </div>
                                </div>
                                <div className={cx('form-group row')}>
                                    <div className={cx('col-1  form-group')}>
                                        <label>
                                            <FormattedMessage id="patient.booking.gender" />
                                        </label>
                                        <Select
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null,
                                            }}
                                            placeholder="Choose"
                                            isSearchable={false}
                                            options={genderArr}
                                            onChange={(e) =>
                                                handleOnChangeInput({
                                                    target: { name: 'gender', value: e },
                                                })
                                            }
                                        />
                                    </div>
                                    <div className={cx('col-11  form-group')}>
                                        <label>
                                            <FormattedMessage id="patient.booking.reason" />
                                        </label>
                                        <input
                                            name="reason"
                                            value={reason}
                                            className={cx('form-control')}
                                            onChange={(e) => handleOnChangeInput(e)}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={cx('booking-modal-footer')}>
                        <div className={cx('btn-booking-modal')}>
                            <button className={cx('btn-confirm')} onClick={() => handleConfirm()}>
                                Xác nhận
                            </button>
                            <button className={cx('btn-cancel')} onClick={handleCloseModal}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default BookingModal;
