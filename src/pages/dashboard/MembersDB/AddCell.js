import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { firestoreDB } from '../../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const AddCell = forwardRef((props, ref) => {
    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });

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
    // const [inflowPathValue, setInflowPathValue] = useState(''); // 유입경로
    // 관심상품 추가

    const [isChecked, setChecked] = React.useState(true);
    const [isChecked2, setChecked2] = React.useState(true);

    function handleChange(event) {
        setChecked(event.target.checked);
    }
    function handleChange2(event) {
        setChecked2(event.target.checked);
    }

    const updateFirestoreAddMember = async () => {
        const memberRef = collection(firestoreDB, 'Users', email, 'Members');
        const newMemberData = {
            // typeFormToken: '',
            memberNumber: '',
            createdDate: moment().format('YYYY.MM.DD'),
            createdTime: moment().format('A hh:mm'),
            name: nameValue,
            phone: phoneValue,
            sex: sexValue,
            birthDate: birthDateValue,
            // ageGroup: '',연령대
            location: locationValue,
            region: regionValue,
            golfPeriod: periodValue,
            golfPurpose: purposeValue,
            hoursUse: hoursUseValue,
            injuries: injuriesValue,
            injuriedPart: injuriedPartValue,
            // inflowPathValue: inflowPathValue,  // 유입경로
            marketingRecieveAllow: isChecked,
            privateInfoAllow: isChecked2,
            amountPayments: '',
            lifetimeValue: '',
            amountPaymentAverage: '',
            audience: audienceValue,
            activation: activeStatus,
            availableProducts: [
                {
                    activateProduct: '',
                    startDate: '',
                    endDate: '',
                    dDays: '',
                },
                {
                    activateProduct: '',
                    startDate: '',
                    endDate: '',
                    dDays: '',
                },
            ],
            unavailableProducts: [
                {
                    inactiveProduct: '',
                    startDate: '',
                    endDate: '',
                    dDays: 0,
                    refund: false,
                },
            ],
        };
        await addDoc(memberRef, newMemberData);
    };

    // const updateAddMembers = () => {
    //     updateFirestoreAddMember();
    // };

    useImperativeHandle(ref, () => ({
        updateFirestoreAddMember: () => {
            updateFirestoreAddMember();
        }
    }));
    
    return (
        <>
            <tr>
                <td>
                    <input
                        className="editInput"
                        type="text"
                        name="name"
                        placeholder="성함"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                    />
                </td>
                <td>{/* <Button onClick={updateAddMembers}>Save</Button> */}</td>
                <td></td>
                <td></td>
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
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
                        name="phone"
                        placeholder="연락처"
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                    />
                </td>
                <td>
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
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
                        // onChange={(e) => inflowPathValue(e.value)}
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
                    <input type="checkbox" defaultChecked={true} onChange={handleChange} name="marketing" />
                </td>
                <td className="text-center">
                    <input type="checkbox" defaultChecked={true} onChange={handleChange2} name="privateInfo" />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-center">
                    <Select
                        className="react-select"
                        classNamePrefix="react-select"
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
});

export default AddCell;
