import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import Select from 'react-select';
import { firestoreDB } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const EditCell = (row) => {
    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });
    // const userId = row.original.id;
    // const user = row.original;
    const id = 'G8JzMcEWsjUNlDLHbacd'
    const user = ''

    const [nameValue, setNameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [sexValue, setSexValue] = useState('');
    const [birthDateValue, setBirthDateValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [periodValue, setPeriodValue] = useState('');
    const [purposeValue, setPurposeValue] = useState('');
    const [hoursUseValue, setHoursUseValue] = useState('');
    const [injuriesValue, setInjuriesValue] = useState('');
    const [injuriedPartValue, setInjuriedPartValue] = useState('');
    const [activeStatus, setActiveStatus] = useState('');
    const [audienceValue, setAudienceValue] = useState('');
    const [regionValue, setRegionValue] = useState('');

    const [isChecked, setChecked] = React.useState(true);
    const [isChecked2, setChecked2] = React.useState(true);

    function handleChange(event) {
        setChecked(event.target.checked);
    }
    function handleChange2(event) {
        setChecked2(event.target.checked);
    }

    const modifyingFirestoreMember = async () => {
        const memberRef = doc(firestoreDB, 'Users', email, 'Members', id);
        const editData = {
            // typeFormToken: '',
            // memberNumber: '',
            // createdDate: '',
            // createdTime: '',
            name: nameValue,
            phone: phoneValue,
            sex: sexValue,
            birthDate: birthDateValue,
            location: locationValue,
            region: regionValue,
            golfPeriod: periodValue,
            golfPurpose: purposeValue,
            hoursUse: hoursUseValue,
            injuries: injuriesValue,
            injuriedPart: injuriedPartValue,
            marketingRecieveAllow: isChecked,
            privateInfoAllow: isChecked2,
            amountPayments: '',
            lifetimeValue: '',
            audience: audienceValue,
            activation: activeStatus,
            // availableProducts: [
            //     {
            //         activateProduct: '레슨',
            //         startDate: '2023-05-24',
            //         endDate: '2023-05-30',
            //         dDays: '6',
            //     },
            // ],
            // unavailableProducts: [
            //     {
            //         inactiveProduct: '락커',
            //         startDate: '2023-02-19',
            //         endDate: '2023-02-19',
            //         dDays: 0,
            //     },
            // ],
        };

        await updateDoc(memberRef, editData);
    };

    const modifyMember = (e) => {
        e.preventDefault();
        modifyingFirestoreMember();
    };

    return (
        <>
            <tr>
                <td>
                    <button onClick={modifyMember}>수정</button>
                </td>
                <td>{user.createdDate}</td>
                <td>{user.createdTime}</td>
                <td>
                    <input
                        style={{ width: '42px' }}
                        className="editInput"
                        type="text"
                        name="placeholder"
                        placeholder={user.name}
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    />
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        onChange={(e) => setSexValue(e.value)}
                        options={[
                            { value: '남성', label: '남성' },
                            { value: '여성', label: '여성' },
                            { value: '기타', label: '기타' },
                        ]}></Select>
                </td>
                <td>
                    {' '}
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
                        style={{ width: '110px' }}
                        className="editInput"
                        type="tel"
                        pattern="[0-9]*"
                        name="placeholder"
                        placeholder={user.phone}
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                    />
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder={user.audience}
                        onChange={(e) => setAudienceValue(e.value)}
                        options={[
                            { value: '신규', label: '신규' },
                            { value: '재등록', label: '재등록' },
                        ]}></Select>
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder={user.location}
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
                        placeholder="지역"
                        value={regionValue}
                        onChange={(e) => setRegionValue(e.target.value)}
                    />
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder={user.golfPeriod}
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
                        placeholder={user.golfPurpose}
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
                        placeholder="관심상품"
                        options={[
                            { value: '타석권', label: '타석권' },
                            { value: '레슨', label: '레슨' },
                            { value: '레슨 + 타석권', label: '레슨 + 타석권' },
                        ]}></Select>
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder={user.hoursUse}
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
                        placeholder={user.injuries}
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
                            placeholder={user.injuriedPart}
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

                <td>
                    <Select
                        data-width="100%"
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="유입경로"
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
                <td className="text-center">
                    <input
                        type="checkbox"
                        checked={user.marketingRecieveAllow}
                        onChange={handleChange}
                        name="marketing"
                    />
                </td>
                <td className="text-center">
                    <input
                        type="checkbox"
                        checked={user.privateInfoAllow}
                        onChange={handleChange2}
                        name="privateInfo"
                    />
                </td>
                <td>{user.amountPayments}</td>
                <td>{user.lifetimeValue}</td>
                <td>{user.amountPaymentAverage}</td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder={user.activation}
                        onChange={(e) => setActiveStatus(e.value)}
                        options={[
                            { value: '활성', label: '활성' },
                            { value: '이탈', label: '이탈' },
                            { value: '일시중지', label: '일시중지' },
                        ]}></Select>
                </td>
            </tr>
        </>
    );
};

export default EditCell;
