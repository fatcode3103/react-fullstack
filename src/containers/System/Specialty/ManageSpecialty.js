import React from 'react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import * as userService from '../../../services/userService';
import styles from './ManageSpecialty.module.scss';
import UseForm from '../../../components/CustomHook/UserForm';

const cx = classNames.bind(styles);

const mdParser = new MarkdownIt();

function ManageSpecialty(props) {
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [previewImg, setPreviewImg] = useState([]);

    // const {admin:adminState, app:appState} = useSelector(state => state)
    // const dispatch = useDispatch()

    // const {allSpecialty} = adminState

    const initialState = {
        nameSpecialty: '',
        img: null,
        base64: '',
    };

    const [form, setForm, resetForm, handleOnChangeInput, handleOnChangeImg] =
        UseForm(initialState);

    const { nameSpecialty, img, base64 } = form;

    const handleEditorChange = ({ html, text }) => {
        setContentMarkdown(text);
        setContentHTML(html);
    };

    // useEffect(() => {
    //     dispatch(acitons.getAllSpecialtyStart());
    // }, [dispatch]);

    useEffect(() => {
        let data = [];
        // create the preview
        if (img) {
            data.push(img);
            setPreviewImg(data);
        }
    }, [img]);

    const handleSubmit = async () => {
        const data = { ...form, contentMarkdown, contentHTML };
        let res = await userService.createSpecialty(data);
        if (res && res.data.errorCode === 0) {
            toast.success('save success');
            resetForm();
        } else {
            toast.error('save failed');
        }
    };

    return (
        <div className={cx('manage-specialty-container')}>
            {console.log('img: >>', previewImg)}
            <div className={cx('manage-specialty-title')}>Quản lý chuyên khoa</div>
            <div className={cx('add-new-specialty row ')}>
                <div className={cx(' col-sm-6')}>
                    <label>Tên chuyên khoa</label>
                    <input
                        value={nameSpecialty}
                        name="nameSpecialty"
                        className={cx('form-control form-group')}
                        type="text"
                        onChange={(e) => handleOnChangeInput(e)}
                    />
                </div>
                <div className={cx(' col-sm-6 form-group')}>
                    <div>
                        <label className={cx('file-input')} for="file-input">
                            Chọn ảnh chuyên khoa
                        </label>
                    </div>
                    <input
                        id="file-input"
                        type="file"
                        onChange={(e) => handleOnChangeImg(e)}
                        hidden
                    />
                    {previewImg && (
                        <>
                            <span style={{ margin: '4px 0 0 0' }}>Preview click: </span>
                            <PhotoProvider>
                                <span>
                                    {previewImg.map((item, index) => (
                                        <PhotoView key={index} src={item}>
                                            <img src={item} alt="" className={cx('preview-img')} />
                                        </PhotoView>
                                    ))}
                                </span>
                            </PhotoProvider>
                        </>
                    )}
                </div>
                <MdEditor
                    className={cx('col-12')}
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown ? contentMarkdown : ''}
                />
            </div>
            <div className={cx('btn btn-primary pl-4 pr-4')} onClick={() => handleSubmit()}>
                Save
            </div>
        </div>
    );
}

export default ManageSpecialty;
