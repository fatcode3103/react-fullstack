import classNames from 'classnames/bind';
import styles from './ManageSchedule.module.scss';
import { FormattedMessage } from 'react-intl';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import * as actions from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ManageSchedule() {
    const [selectedOption, setSelectedOption] = useState();
    const [allDoctorArr, setAllDoctorArr] = useState([]);
    const [hoursAllCodeArr, setHoursAllCodeArr] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [activeBtnKeyMap, setActiveBtnKeyMap] = useState([]);

    const { admin: adminState, app: appState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { language } = appState;
    const { allDoctors, hoursAllCode } = adminState;

    useEffect(() => {
        dispatch(actions.fetchAllDoctorStart());
        dispatch(actions.fetchAllCodeHoursStart());
    }, [dispatch]);

    useEffect(() => {
        let data = buildDataInputSelect(allDoctors);
        setAllDoctorArr(data);
        setHoursAllCodeArr(hoursAllCode);
    }, [allDoctors]);

    const buildDataInputSelect = (data) => {
        let res = [];
        if (data && data.length > 0) {
            data.forEach((item) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                let value = item.id;
                obj.label = language === 'vi' ? labelVi : labelEn;
                obj.value = value;
                res.push(obj);
            });
        }
        return res;
    };

    const handleChangSelectDoctor = (e) => {
        setSelectedOption(e);
    };

    const handleChangeDate = (date) => {
        setStartDate(date);
    };

    const handleClickBtnTime = (itemInput) => {
        let btnClickedArr = [...activeBtnKeyMap];
        if (btnClickedArr.includes(itemInput)) {
            btnClickedArr = btnClickedArr.filter((item) => item.keyMap !== itemInput.keyMap);
        } else {
            btnClickedArr.push(itemInput);
        }
        setActiveBtnKeyMap(btnClickedArr);
    };

    const checkValidate = () => {
        if (!selectedOption || !startDate || activeBtnKeyMap.length === 0) {
            return false;
        }
        return true;
    };

    const handleSaveInfo = async () => {
        if (checkValidate()) {
            let date = JSON.stringify(startDate).slice(1, 11).replace(/-/g, '');
            let data = [];
            activeBtnKeyMap.map((item, index) => {
                let obj = {};
                obj.doctorId = selectedOption.value;
                obj.date = date;
                obj.timeType = item.keyMap;
                data.push(obj);
            });
            await dispatch(actions.postBulkCreateScheduleStart(data));
            toast.success('Save schedule successfully !');
            setActiveBtnKeyMap([]);
            setSelectedOption('');
            setStartDate('');
        } else {
            toast.error('Save schedule failed !');
            console.log('error');
        }
    };

    return (
        <div className={cx('manage-schedule-container')}>
            <div className={cx('manage-schedule-content')}>
                <div className={cx('title')}>
                    <FormattedMessage id="manage-schdule.title" />
                </div>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-6 form-group')}>
                            <label>
                                <FormattedMessage id="manage-schdule.choose-doctor" />
                            </label>
                            <Select
                                value={selectedOption}
                                onChange={(e) => handleChangSelectDoctor(e)}
                                options={allDoctorArr}
                            />
                        </div>
                        <div className={cx('col-6 form-group row')}>
                            <label className={cx('col-12')}>
                                <FormattedMessage id="manage-schdule.choose-date" />
                            </label>
                            <DatePicker
                                className={cx('form-control col-12')}
                                selected={startDate}
                                onChange={(date) => handleChangeDate(date)}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </div>
                    <div className={cx('pick-hour-container form-control mt-4 mb-3')}>
                        {hoursAllCodeArr &&
                            hoursAllCodeArr.length > 0 &&
                            hoursAllCodeArr.map((item, index) => {
                                let isActive = activeBtnKeyMap.includes(item);
                                return (
                                    <button
                                        className={cx('btn-time', {
                                            primary: isActive,
                                        })}
                                        key={index}
                                        onClick={() => handleClickBtnTime(item)}
                                    >
                                        {language === 'vi' ? item.valueVi : item.valueEn}
                                    </button>
                                );
                            })}
                    </div>
                    <button className={cx('btn-submit')} onClick={() => handleSaveInfo()}>
                        <FormattedMessage id="manage-schdule.save" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManageSchedule;
