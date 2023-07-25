import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { firestoreDB } from '../../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCell = forwardRef((props, ref) => {
    const notify = () => toast('저장되었습니다.');
    const email = useSelector((state) => state.Auth?.user.email);
    const [nameValue, setNameValue] = useState('');
    const [sexValue, setSexValue] = useState('');
    const [birthDateValue, setBirthDateValue] = useState('1980-01-01');
    const [phoneValue, setPhoneValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [regionValue, setRegionValue] = useState('');
    const [periodValue, setPeriodValue] = useState('');
    const [purposeValue, setPurposeValue] = useState('');
    const [productValue, setProductValue] = useState('');
    const [hoursUseValue, setHoursUseValue] = useState('');
    const [injuriesValue, setInjuriesValue] = useState('');
    const [injuriedPartValue, setInjuriedPartValue] = useState('');
    const [inflowPathValue, setInflowPathValue] = useState('');
    const audienceValue = '잠재';
    const taSeokActive = false;
    const lessonActive = false;
    const lockerActive = false;

    const [isChecked, setChecked] = React.useState(true);
    const [isChecked2, setChecked2] = React.useState(true);

    const handleFocus = (e) => {
        const { value } = e.target;
        if (!value) {
            e.target.placeholder = '';
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (!value) {
            if (name === 'name') {
                e.target.placeholder = '성함';
            } else if (name === 'phone') {
                e.target.placeholder = '연락처';
            } else if (name === 'region') {
                e.target.placeholder = '지역';
            }
        }
    };

    function handleChange(event) {
        setChecked(event.target.checked);
    }
    function handleChange2(event) {
        setChecked2(event.target.checked);
    }

    const updateFirestoreAddMember = async () => {
        if (!nameValue || !phoneValue) {
            alert(!nameValue ? '이름을 입력해주세요.' : '연락처를 입력해주세요.');
            return;
        }

        const memberRef = collection(firestoreDB, 'Users', email, 'Members');
        const newMemberData = {
            name: nameValue,
            createdDate: moment().format('YYYY-MM-DD'),
            createdTime: moment().format('A hh:mm'),
            sex: sexValue,
            birthDate: birthDateValue,
            phone: phoneValue,
            audience: audienceValue,
            location: locationValue,
            region: regionValue,
            golfPeriod: periodValue,
            golfPurpose: purposeValue,
            product: productValue,
            hoursUse: hoursUseValue,
            injuries: injuriesValue,
            injuriedPart: injuriedPartValue,
            inflowPath: inflowPathValue,
            marketingRecieveAllow: isChecked,
            privateInfoAllow: isChecked2,
            taSeokActive: taSeokActive,
            lessonActive: lessonActive,
            lockerActive: lockerActive,
        };

        await addDoc(memberRef, newMemberData);

        notify();
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    useImperativeHandle(ref, () => ({
        updateFirestoreAddMember: () => {
            updateFirestoreAddMember();
        },
    }));

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                closeButton={false}
                theme="light"
                limit={1}
            />
            <tr>
                <td>
                    <input
                        className="editInput"
                        type="text"
                        name="name"
                        placeholder="성함"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </td>
                <td></td>
                <td></td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        onChange={(e) => setSexValue(e.value)}
                        placeholder="선택"
                        options={[
                            { value: '남성', label: '남성' },
                            { value: '여성', label: '여성' },
                            { value: '기타', label: '기타' },
                        ]}></Select>
                </td>
                <td>
                    <input
                        className="editInput"
                        type="date"
                        name="name"
                        placeholder="생년월일"
                        value={birthDateValue}
                        onChange={(e) => setBirthDateValue(e.target.value)}
                    />
                </td>
                <td></td>
                <td>
                    <input
                        className="editInput"
                        style={{ minWidth: '110px'}}
                        type="text"
                        name="phone"
                        placeholder="연락처"
                        value={phoneValue}
                        onInput={(e) => {
                            const onlyNumbersAndHyphen = e.target.value.replace(/[^0-9-]/g, '');
                            setPhoneValue(onlyNumbersAndHyphen);
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </td>
                <td></td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="선택"
                        onChange={(e) => setLocationValue(e.value)}
                        options={[
                            { value: '자택', label: '자택' },
                            { value: '직장', label: '직장' },
                            { value: '기타', label: '기타' },
                        ]}></Select>
                </td>
                <td>
                    <input
                        className="editInput"
                        type="text"
                        name="region"
                        style={{ minWidth: '60px' }}
                        placeholder="지역"
                        value={regionValue}
                        onChange={(e) => setRegionValue(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="선택"
                        onChange={(e) => setPeriodValue(e.value)}
                        options={[
                            { value: '비기너', label: '비기너' },
                            { value: '1~3년', label: '1~3년' },
                            { value: '3~5년', label: '3~5년' },
                            { value: '5년 이상', label: '5년 이상' },
                        ]}></Select>
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="선택"
                        onChange={(e) => setPurposeValue(e.value)}
                        options={[
                            { value: '골프 입문', label: '골프 입문' },
                            { value: '스윙 교정', label: '스윙 교정' },
                            { value: '비거리 향상', label: '비거리 향상' },
                            { value: '스코어', label: '스코어' },
                            { value: '숏게임', label: '숏게임' },
                            { value: '퍼팅', label: '퍼팅' },
                            { value: '필드', label: '필드' },
                            { value: '백돌이 탈출', label: '백돌이 탈출' },
                            { value: '기타', label: '기타' },
                        ]}></Select>
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="선택"
                        onChange={(e) => setProductValue(e.value)}
                        options={[
                            { value: '타석', label: '타석' },
                            { value: '레슨', label: '레슨' },
                            { value: '기타', label: '기타' },
                        ]}></Select>
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="선택"
                        onChange={(e) => setInflowPathValue(e.value)}
                        options={[
                            { value: '네이버', label: '네이버' },
                            { value: '지인추천', label: '지인추천' },
                            { value: '인스타그램', label: '인스타그램' },
                            { value: '입주사', label: '입주사' },
                            { value: '제휴사', label: '제휴사' },
                            { value: '카카오톡 채널', label: '카카오톡 채널' },
                            { value: '당근마켓', label: '당근마켓' },
                            { value: '전단지', label: '전단지' },
                            { value: '외부간판 및 현수막', label: '외부간판 및 현수막' },
                            { value: '기타', label: '기타' },
                        ]}></Select>
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="선택"
                        onChange={(e) => setHoursUseValue(e.value)}
                        options={[
                            { value: '오전', label: '오전' },
                            { value: '낮', label: '낮' },
                            { value: '저녁', label: '저녁' },
                            { value: '밤', label: '밤' },
                        ]}></Select>
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="선택"
                        onChange={(e) => setInjuriesValue(e.value)}
                        options={[
                            { value: '유', label: '유' },
                            { value: '무', label: '무' },
                        ]}></Select>
                </td>
                <td>
                    {injuriesValue === '무' ? null : (
                        <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder="선택"
                            onChange={(e) => setInjuriedPartValue(e.value)}
                            options={[
                                { value: '팔꿈치', label: '팔꿈치' },
                                { value: '허리', label: '허리' },
                                { value: '무릎', label: '무릎' },
                                { value: '손목', label: '손목' },
                                { value: '어깨', label: '어깨' },
                                { value: '등', label: '등' },
                                { value: '손가락', label: '손가락' },
                                { value: '기타', label: '기타' },
                            ]}></Select>
                    )}
                </td>
                <td className="text-center">
                    <input type="checkbox" defaultChecked={true} onChange={handleChange} name="marketing" />
                </td>
                <td className="text-center">
                    <input type="checkbox" defaultChecked={true} onChange={handleChange2} name="privateInfo" />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </>
    );
});

export default AddCell;
