import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

import styles from './ManageDoctor.module.scss';
import * as actions from '../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailDcotorByIdApi } from '../../services/userService';

const cx = classNames.bind(styles);

const mdParser = new MarkdownIt();

function ManageDoctor(props) {
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [descriptionDoctor, setDescriptionDoctor] = useState('');
    const [selecteDoctor, setSelectedDoctor] = useState(null);
    const [allDoctorArr, setAllDoctorArr] = useState([]);
    const [isData, setIsData] = useState(false);
    const [allRequiredDoctorInfoArr, setAllRequiredDoctorInfoArr] = useState([]);

    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);

    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [nameClinic, setNameClinic] = useState('');
    const [addressClinic, setAddressClinic] = useState('');
    const [not, setNote] = useState('');

    const { admin: adminState, app: appState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { language } = appState;
    const { allDoctors, allRequiredDoctorInfo } = adminState;

    useEffect(() => {
        dispatch(actions.fetchAllDoctorStart());
        dispatch(actions.getRequiredDoctorInfoStart());
    }, [dispatch]);

    useEffect(() => {
        let doctorSelect = buildDataInputSelect(allDoctors, 'USER');
        setAllDoctorArr(doctorSelect);

        setAllRequiredDoctorInfoArr(allRequiredDoctorInfo);
        let { resPrice, resPayment, resProvince } = allRequiredDoctorInfo;
        let priceSelect = buildDataInputSelect(resPrice);
        let paymentSelect = buildDataInputSelect(resPayment);
        let provinceSelect = buildDataInputSelect(resProvince);
        setListPrice(priceSelect);
        setListPayment(paymentSelect);
        setListProvince(provinceSelect);
    }, [allDoctors, language, allRequiredDoctorInfo]);

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSubmit = () => {
        if (!isData) {
            let infoData = {
                contentMarkdown: contentMarkdown,
                contentHTML: contentHTML,
                doctorId: selecteDoctor.value,
                description: descriptionDoctor,
            };
            dispatch(actions.saveInfoDoctorStart(infoData));
            setDescriptionDoctor('');
            setContentMarkdown('');
            setSelectedDoctor(null);
            setIsData(false);
        } else {
            let infoData = {
                contentMarkdown: contentMarkdown,
                contentHTML: contentHTML,
                doctorId: selecteDoctor.value,
                description: descriptionDoctor,
            };
            dispatch(actions.updateDetailDoctorStart(infoData));
            setDescriptionDoctor('');
            setContentMarkdown('');
            setSelectedDoctor(null);
            setIsData(false);
        }
    };

    const handleChangeSelectDoctor = async (data) => {
        setSelectedDoctor(data);
        let res = await getDetailDcotorByIdApi(data.value);
        let { Markdown } = res.data.data;
        if (
            res &&
            res.status === 200 &&
            res.data.data.Markdown.description &&
            res.data.data.Markdown.contentMarkdown
        ) {
            setDescriptionDoctor(Markdown.description);
            setContentMarkdown(Markdown.contentMarkdown);
            setIsData(true);
        } else {
            setDescriptionDoctor('');
            setContentMarkdown('');
            setIsData(false);
        }
    };

    const handleChangePrice = (e) => {
        setSelectedPrice(e);
        console.log('check change price: ', e);
    };

    const handleOnChangeDesc = (e) => {
        setDescriptionDoctor(e.target.value);
    };

    const buildDataInputSelect = (data, type) => {
        let res = [];
        if (data && data.length > 0) {
            data.forEach((item) => {
                let obj = {};
                let labelVi =
                    type === 'USER' ? `${item.lastName} ${item.firstName}` : `${item.valueVi}`;
                let labelEn =
                    type === 'USER' ? `${item.firstName} ${item.lastName}` : `${item.valueEn}`;
                let value = type === 'USER' ? item.id : item.keyMap;
                obj.label = language === 'vi' ? labelVi : labelEn;
                obj.value = value;
                res.push(obj);
            });
        }
        return res;
    };

    return (
        <div className={cx('manage-doctor-container')}>
            <div className={cx('manage-dcotor-title')}>
                <FormattedMessage id="admin.manage-doctor.title" />
            </div>
            <div className={cx('more-info row mb-3')}>
                <div className={cx('content-eight form-group col-3')}>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                    </label>
                    <Select
                        value={selecteDoctor}
                        onChange={(e) => handleChangeSelectDoctor(e)}
                        options={allDoctorArr}
                        placeholder=""
                    />
                </div>
                <div className={cx('content-left form-group col-9')}>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.introductory-information" />
                    </label>
                    <textarea
                        className={cx('form-control')}
                        rows="2"
                        value={descriptionDoctor}
                        onChange={(e) => handleOnChangeDesc(e)}
                    ></textarea>
                </div>
            </div>

            <div className={cx('more-info-extra row mb-3')}>
                <div className={cx('col-4 form-group')}>
                    <label>Chọn giá</label>
                    <Select
                        // value={selectedPrice}
                        // onChange={(e) => handleChangePrice(e)}
                        options={listPrice}
                        placeholder=""
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>Chọn tỉnh thành</label>
                    <Select
                        // value={selectedPrice}
                        // onChange={(e) => handleChangePrice(e)}
                        options={listProvince}
                        placeholder=""
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>Chọn phương thức thanh toán</label>
                    <Select
                        // value={selectedPrice}
                        // onChange={(e) => handleChangePrice(e)}
                        options={listPayment}
                        placeholder=""
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>Tên phòng khám</label>
                    <input className={cx('form-control')} />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>Địa chỉ phòng khám</label>
                    <input className={cx('form-control')} />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>Note</label>
                    <input className={cx('form-control')} />
                </div>
            </div>

            <div className={cx('manage-doctor-edit')}>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown ? contentMarkdown : ''}
                />
            </div>
            <button
                onClick={() => handleSubmit()}
                className={cx({ 'save-content-doctor': !isData, 'update-content-doctor': isData })}
            >
                {isData === true ? (
                    <FormattedMessage id="admin.manage-doctor.update-info" />
                ) : (
                    <FormattedMessage id="admin.manage-doctor.save-info" />
                )}
            </button>
        </div>
    );
}

export default ManageDoctor;
