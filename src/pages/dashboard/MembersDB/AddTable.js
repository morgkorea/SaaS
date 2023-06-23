import React, { useState } from 'react';
import Select from 'react-select';
import { firestoreDB } from '../../../firebase/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';

const AddTable = ({ currentMembers, email }) => {
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

    const [isChecked, setChecked] = React.useState(true);
    const [isChecked2, setChecked2] = React.useState(true);

    function handleChange(event) {
        setChecked(event.target.checked);
    }
    function handleChange2(event) {
        setChecked2(event.target.checked);
    }

    const updateFirestoreAddMember = async () => {
        const washingtonRef = doc(firestoreDB, 'Users', email);
        const newMember = {
            typeFormToken: '',
            memberNumber: '',
            createdDate: moment().format('YYYY.MM.DD'), // 2023-04-23
            createdTime: moment().format('A hh:mm'), // 04:10:42
            name: nameValue,
            phone: phoneValue,
            sex: sexValue,
            birthDate: birthDateValue,
            ageGroup: '', //연령대
            location: locationValue,
            golfPeriod: periodValue, //골프경력
            golfPurpose: purposeValue, //골프목적
            hoursUse: hoursUseValue, //이용시간
            injuries: injuriesValue, //부상전적
            injuriedPart: injuriedPartValue, //부상부위
            marketingRecieveAllow: isChecked, //마케팅수신동의
            privateInfoAllow: isChecked2, //개인정보수집동의
            amountPayments: '', //누적결제수
            lifetimeValue: '', //LTV - 누적결제금액
            amountPaymentAverage: '', //평균결제금액
            audience: audienceValue, //오디언스
            activation: activeStatus, //활성여부 false || true
            availableProducts: [
                {
                    activateProduct: '', //활성상품
                    startDate: '', //시작일
                    endDate: '', //종료일
                    dDays: '', //남은일수 endDate - startDate
                },
                {
                    activateProduct: '', //활성상품
                    startDate: '', //시작일
                    endDate: '', //종료일
                    dDays: '', //남은일수
                },
            ],
            unavailableProducts: [
                {
                    inactiveProduct: '', //종료상품
                    startDate: '', //시작일
                    endDate: '', //종료일
                    dDays: 0, //남은일수
                    refund: false,
                },
            ],
        };

        if (currentMembers.length) {
            try {
                await updateDoc(washingtonRef, {
                    members: [...currentMembers, newMember],
                });
                console.log('update member succeed');
            } catch (error) {
                console.log('update member error', error);
            }
        }
    };

    const updateAddMembers = () => {
        updateFirestoreAddMember();
    };

    // delete btn
    const handleDelete = async (val) => {
        const washingtonRef = doc(firestoreDB, 'Users', email);

        if (currentMembers.length) {
            const modifyingMembers = [...currentMembers].map((member, idx) => {
                if (idx === 0) {
                    const memberData = { ...member };
                    return memberData;
                } else {
                    return member;
                }
            });
            try {
                await deleteDoc(washingtonRef, {
                    members: [...modifyingMembers],
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <tr>
                <td><button onClick={updateAddMembers}>Update Member</button></td>
                <td></td>
                <td></td>
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
                        onChange={(e) => setLocationValue(e.value)}
                        options={[
                            { value: '자택', label: '자택' },
                            { value: '직장', label: '직장' },
                            { value: '기타', label: '기타' },
                        ]}></Select>
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
};

export default AddTable;
