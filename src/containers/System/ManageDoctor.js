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
    const [selecteDoctor, setSelectedDoctor] = useState({ label: '', value: '' });
    const [allDoctorArr, setAllDoctorArr] = useState([]);
    const [isData, setIsData] = useState(false);

    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [listClinic, setListClinic] = useState([]);
    const [listSpecialty, setListSpecialty] = useState([]);

    const useForm = (initialState) => {
        const [form, setForm] = useState(initialState);

        const handleOnChangeInput = (e, type) => {
            if (type) {
                setForm({
                    ...form,
                    [type]: e, /// []: su dung gia tri 1 bien lam ten 1 thuoc tinh trong obj
                });
            } else {
                setForm({
                    ...form,
                    [e.target.name]: e.target.value, /// []: su dung gia tri 1 bien lam ten 1 thuoc tinh trong obj
                });
            }
        };

        const resetForm = () => {
            setForm(initialState);
        };

        return [form, setForm, handleOnChangeInput, resetForm];
    };

    const [form, setForm, handleOnChangeInput, resetForm] = useForm({
        selectedPrice: { label: '', value: '' },
        selectedPayment: { label: '', value: '' },
        selectedProvince: { label: '', value: '' },
        nameClinic: '',
        addressClinic: '',
        note: '',
        selectedSpecialty: '',
        // clinicId: '',
    });

    const {
        selectedPrice,
        selectedPayment,
        selectedProvince,
        nameClinic,
        addressClinic,
        note,
        selectedSpecialty,
        // clinicId,
    } = form;

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

        let { resPrice, resPayment, resProvince, resSpecialty } = allRequiredDoctorInfo;
        let priceSelect = buildDataInputSelect(resPrice);
        let paymentSelect = buildDataInputSelect(resPayment);
        let provinceSelect = buildDataInputSelect(resProvince);
        let specialtySelect = buildDataInputSelect(resSpecialty, 'SPECIALTY');
        setListPrice(priceSelect);
        setListPayment(paymentSelect);
        setListProvince(provinceSelect);
        setListSpecialty(specialtySelect);
    }, [allDoctors, language, allRequiredDoctorInfo]);

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSubmit = async () => {
        if (!isData) {
            let infoData = {
                contentMarkdown: contentMarkdown,
                contentHTML: contentHTML,
                doctorId: selecteDoctor.value,
                description: descriptionDoctor,
                selectedPrice: selectedPrice.value,
                selectedPayment: selectedPayment.value,
                selectedProvince: selectedProvince.value,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                // clinicId: clinicId,
                specialtyId: selectedSpecialty.value,
            };
            await dispatch(actions.saveInfoDoctorStart(infoData));
            setDescriptionDoctor('');
            setContentMarkdown('');
            setSelectedDoctor({ label: '', value: '' });
            setIsData(false);
            resetForm();
        } else {
            let infoData = {
                contentMarkdown: contentMarkdown,
                contentHTML: contentHTML,
                doctorId: selecteDoctor.value,
                description: descriptionDoctor,
                selectedPrice: selectedPrice.value,
                selectedPayment: selectedPayment.value,
                selectedProvince: selectedProvince.value,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                // clinicId: clinicId,
                specialtyId: selectedSpecialty.value,
            };
            await dispatch(actions.updateDetailDoctorStart(infoData));
            setDescriptionDoctor('');
            setContentMarkdown('');
            setSelectedDoctor({ label: '', value: '' });
            setIsData(false);
            resetForm();
        }
    };

    const handleChangeSelectDoctor = async (data) => {
        setDescriptionDoctor('');
        setContentMarkdown('');
        setSelectedDoctor({ label: '', value: '' });
        setIsData(false);
        resetForm();
        setSelectedDoctor(data);
        let res = await getDetailDcotorByIdApi(data.value);

        console.log('on change data doctor:>>>', res);
        let { Markdown, Doctor_Info } = res.data.data;
        let {
            priceIdData,
            paymentIdData,
            provinceIdData,
            nameClinic,
            addressClinic,
            note,
            priceId,
            paymentId,
            provinceId,
            clinicId,
            specialtyId,
        } = Doctor_Info;
        if (
            res &&
            res.data.errorCode === 0 &&
            Markdown.description &&
            Markdown.contentMarkdown &&
            selectedPrice &&
            selectedPayment &&
            selectedProvince &&
            nameClinic &&
            addressClinic &&
            note &&
            specialtyId
        ) {
            setDescriptionDoctor(Markdown.description);
            setContentMarkdown(Markdown.contentMarkdown);
            setForm({
                selectedPrice: {
                    value: priceId,
                    label: language === 'vi' ? priceIdData.valueVi : priceIdData.valueEn,
                },
                selectedPayment: {
                    value: paymentId,
                    label: language === 'vi' ? paymentIdData.valueVi : paymentIdData.valueEn,
                },
                selectedProvince: {
                    value: provinceId,
                    label: language === 'vi' ? provinceIdData.valueVi : provinceIdData.valueEn,
                },
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                // clinicId: clinicId,
                selectedSpecialty: specialtyId.label,
            });
            setIsData(true);
        } else {
            setIsData(false);
        }
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
                let label;
                let value;
                if (type === 'USER') {
                    value = item.id ? item.id : '';
                } else if (type === 'SPECIALTY') {
                    value = item.id ? item.id : '';
                    label = item.name ? item.name : '';
                } else {
                    value = item.keyMap ? item.keyMap : '';
                }
                obj.label = language === 'vi' ? labelVi : labelEn;
                if (type === 'SPECIALTY') {
                    obj.label = label;
                }

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
                        value={selecteDoctor ? selecteDoctor : ''}
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
                        value={descriptionDoctor ? descriptionDoctor : ''}
                        onChange={(e) => handleOnChangeDesc(e)}
                    ></textarea>
                </div>
            </div>

            <div className={cx('more-info-extra row mb-3')}>
                <div className={cx('col-4 form-group')}>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.price" />
                    </label>
                    <Select
                        value={selectedPrice ? selectedPrice : ''}
                        onChange={(e) => handleOnChangeInput(e, 'selectedPrice')}
                        options={listPrice}
                        placeholder=""
                        name="select price name"
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.payment" />
                    </label>
                    <Select
                        value={selectedPayment ? selectedPayment : ''}
                        onChange={(e) => handleOnChangeInput(e, 'selectedPayment')}
                        options={listPayment}
                        placeholder=""
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.province" />
                    </label>
                    <Select
                        value={selectedProvince ? selectedProvince : ''}
                        onChange={(e) => handleOnChangeInput(e, 'selectedProvince')}
                        options={listProvince}
                        placeholder=""
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.clinic-name" />
                    </label>
                    <input
                        name="nameClinic"
                        className={cx('form-control')}
                        value={nameClinic ? nameClinic : ''}
                        onChange={(e) => handleOnChangeInput(e)}
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.clinic-address" />
                    </label>
                    <input
                        name="addressClinic"
                        className={cx('form-control')}
                        value={addressClinic ? addressClinic : ''}
                        onChange={(e) => handleOnChangeInput(e)}
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.note" />
                    </label>
                    <input
                        name="note"
                        className={cx('form-control')}
                        value={note ? note : ''}
                        onChange={(e) => handleOnChangeInput(e)}
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>
                        Chọn chuyên khoa
                        {/* <FormattedMessage id="admin.manage-doctor.note" /> */}
                    </label>
                    <Select
                        value={selectedSpecialty ? selectedSpecialty : ''}
                        onChange={(e) => handleOnChangeInput(e, 'specialtyId')}
                        options={listSpecialty}
                        placeholder=""
                    />
                </div>
                <div className={cx('col-4 form-group')}>
                    <label>
                        Chọn phòng khám
                        {/* <FormattedMessage id="admin.manage-doctor.note" /> */}
                    </label>
                    {/* <input
                        name="clinicId"
                        className={cx('form-control')}
                        value={clinicId ? clinicId : ''}
                        onChange={(e) => handleOnChangeInput(e)}
                    /> */}
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
