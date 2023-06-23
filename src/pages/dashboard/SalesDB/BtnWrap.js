import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BtnWrap = ({ setEditMode, setAddMode, editMode, addMode }) => {
    const [rectangleBox, setRectangleBox] = useState(false);
    const [rectangleBox2, setRectangleBox2] = useState(false);

    const btnClick1 = () => {
        setRectangleBox2((prev) => !prev)
        if (editMode) {
            setEditMode((prev) => !prev)
            setRectangleBox((prev) => !prev)
            setRectangleBox2((prev) => !prev)
            toast('저장되었습니다.');
        } else if (addMode) {
            setAddMode((prev) => !prev)
            setRectangleBox((prev) => !prev)
            setRectangleBox2((prev) => !prev)
            toast('저장되었습니다.');
        }
    }

    const onClickEdit = () => {
        if (!editMode) {
            setEditMode((prev) => !prev) // edit 모드로 변경
            setRectangleBox((prev) => !prev)
            setRectangleBox2((prev) => !prev)
            toast('회원 수정 화면으로 전환됩니다.');
        } 

    }
    const onClickAdd = () => {
        if (!addMode) {
            setAddMode((prev) => !prev) // add 모드로 변경
            setRectangleBox((prev) => !prev)
            setRectangleBox2((prev) => !prev)
            toast('회원 추가 화면으로 전환됩니다.');
        }
    }

    return (
        <>
            <div className="circle-btn shadow-lg" onClick={btnClick1}>
                <span className="avatar-title bg-primary text-white rounded-circle">
                    {rectangleBox 
                        ? <i className="mdi mdi-content-save" /> 
                        : <i className="mdi mdi-plus" />
                    }
                </span>
            </div>

            {rectangleBox2 === true && (
                <div className="rectangle-btn shadow-lg">
                    <span className="text-primary" onClick={onClickEdit}>
                        <i className="mdi mdi-account-edit" />
                    </span>
                    <span className="text-primary" onClick={onClickAdd}>
                        <i className="mdi mdi-plus" />
                    </span>
                </div>
            )}

            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default BtnWrap;
