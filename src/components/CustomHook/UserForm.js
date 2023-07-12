import { useState } from 'react';
import FileToBase64 from '../../utils/FileToBase64';

const UseForm = (initialState) => {
    const [form, setForm] = useState(initialState);

    const handleOnChangeInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value, /// []: su dung gia tri 1 bien lam ten 1 thuoc tinh trong obj
        });
    };

    const handleOnChangeImg = async (e) => {
        let files = e.target.files;
        let file = files[0];
        if (file) {
            let base64 = await FileToBase64(file);
            let objUrl = URL.createObjectURL(file);
            setForm({
                ...form,
                img: objUrl,
                base64: base64,
            });
            return () => URL.revokeObjectURL(objUrl);
        }
    };

    const resetForm = () => {
        setForm(initialState);
    };
    return [form, setForm, resetForm, handleOnChangeInput, handleOnChangeImg];
};

export default UseForm;
