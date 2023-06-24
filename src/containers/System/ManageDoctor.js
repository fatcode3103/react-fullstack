import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

import styles from './ManageDoctor.module.scss';
import * as actions from '../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const cx = classNames.bind(styles);

const mdParser = new MarkdownIt();

function ManageDoctor(props) {
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [descriptionDoctor, setDescriptionDoctor] = useState('');
    const [selecteDoctor, setSelectedDoctor] = useState(null);
    const [allDoctorArr, setAllDoctorArr] = useState([]);

    const { admin: adminState, app: appState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { language } = appState;
    const { allDoctors } = adminState;

    useEffect(() => {
        dispatch(actions.fetchAllDoctorStart());
    }, [dispatch]);

    useEffect(() => {
        let dataSelect = buildDataInputSelect(allDoctors);
        setAllDoctorArr(dataSelect);
    }, [allDoctors, language]);

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    const handleSaveContentMarkdown = async () => {
        let infoData = { contentMarkdown, contentHTML, doctorId: selecteDoctor.value };
        await dispatch(actions.saveInfoDoctorStart(infoData));
        // setContentMarkdown('');
        // setContentHTML('');
        // setDescriptionDoctor('');
        // setSelectedDoctor(null);
    };

    const handleChangeDoctor = (e) => {
        setSelectedDoctor(e);
    };

    const handleOnChangeDesc = (e) => {
        setDescriptionDoctor(e.target.value);
    };

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

    return (
        <div className={cx('manage-doctor-container')}>
            <div className={cx('manage-dcotor-title')}>quản lý bác sĩ</div>
            <div className={cx('more-info row mb-3')}>
                <div className={cx('content-eight form-group col-3')}>
                    <label>Chọn bác sĩ</label>
                    <Select
                        value={selecteDoctor}
                        onChange={(e) => handleChangeDoctor(e)}
                        options={allDoctorArr}
                    />
                </div>
                <div className={cx('content-left form-group col-9')}>
                    <label>Thông tin giới thiệu</label>
                    <textarea
                        className={cx('form-control')}
                        rows="4"
                        value={descriptionDoctor}
                        onChange={(e) => handleOnChangeDesc(e)}
                    ></textarea>
                </div>
            </div>
            <div className={cx('manage-doctor-edit')}>
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </div>
            <button
                onClick={() => handleSaveContentMarkdown()}
                className={cx('save-content-doctor')}
            >
                Lưu thông tin bác sĩ
            </button>
        </div>
    );
}

export default ManageDoctor;
