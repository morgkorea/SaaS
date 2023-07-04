import { doc, updateDoc } from 'firebase/firestore';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Select from 'react-select';
import { firestoreDB } from '../../../firebase/firebase';

const EditTable = forwardRef(({ member, email, id }, ref) => {
    const [nameValue, setNameValue] = useState(member.name);
    const [phoneValue, setPhoneValue] = useState(member.phone);
    const [birthDateValue, setBirthDateValue] = useState(member.birthDate);
    const [locationValue, setLocationValue] = useState(member.location);
    const [periodValue, setPeriodValue] = useState(member.golfPeriod);
    const [hoursUseValue, setHoursUseValue] = useState(member.hoursUse);
    const [injuriesValue, setInjuriesValue] = useState(member.injuries);
    const [injuriedPartValue, setInjuriedPartValue] = useState(member.injuriedPart);
    const [audienceValue, setAudienceValue] = useState(member.audience);
    const [regionValue, setRegionValue] = useState(member.region);
    const [privateInfoChecked, setPrivateInfoChecked] = useState(member.privateInfoAllow);
    const [marketingChecked, setMarketingChecked] = useState(member.marketingRecieveAllow);

    function privateInfoChange(event) {
        setPrivateInfoChecked(event.target.checked);
    }
    function marketingChange(event) {
        setMarketingChecked(event.target.checked);
    }

    const editUser = async () => {
        const memberRef = doc(firestoreDB, 'Users', email, 'Members', id);

        const editData = {
            name: nameValue,
            birthDate: birthDateValue,
            phone: phoneValue,
            location: locationValue,
            region: regionValue,
            golfPeriod: periodValue,
            audience: audienceValue,
            // 관심품목
            hoursUse: hoursUseValue,
            injuries: injuriesValue,
            injuriedPart: injuriedPartValue,
            // 유입경로
            privateInfoAllow: privateInfoChecked,
            marketingRecieveAllow: marketingChecked,
        };

        await updateDoc(memberRef, editData);
    };

    useImperativeHandle(ref, () => ({
        modifyMember() {
            editUser();
        },
    }));

    return (
        <>
            <table className="basic-table mt-3">
                <tbody>
                    <tr>
                        <th>성함</th>
                        <td>
                            <input
                                style={{ width: '110px' }}
                                className="editInput"
                                type="text"
                                value={nameValue}
                                onChange={(e) => setNameValue(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td>
                            <input
                                className="editInput"
                                type="date"
                                value={birthDateValue}
                                onChange={(e) => setBirthDateValue(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>휴대전화</th>
                        <td>
                            <input
                                style={{ width: '130px' }}
                                className="editInput"
                                type="tel"
                                pattern="[0-9]*"
                                value={phoneValue}
                                onChange={(e) => setPhoneValue(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>위치</th>
                        <td className="me-2">
                            <input
                                style={{ width: '80px' }}
                                className="editInput"
                                type="text"
                                placeholder="지역"
                                value={regionValue}
                                onChange={(e) => setRegionValue(e.target.value)}
                            />
                        </td>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.location}
                                onChange={(e) => setLocationValue(e.value)}
                                options={[
                                    { value: '자택', label: '자택' },
                                    { value: '직장', label: '직장' },
                                    { value: '기타', label: '기타' },
                                ]}></Select>
                        </td>
                    </tr>
                    <tr>
                        <th>회원번호</th>
                        <td>{member.memberNumber}</td>
                    </tr>
                    <tr>
                        <th>생성일자</th>
                        <td>
                            {member?.createdDate} / {member?.createdTime}
                        </td>
                    </tr>
                    <tr>
                        <th>골프 경력</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.golfPeriod}
                                onChange={(e) => setPeriodValue(e.value)}
                                options={[
                                    { value: '비기너', label: '비기너' },
                                    { value: '1~3년', label: '1~3년' },
                                    { value: '3~5년', label: '3~5년' },
                                    { value: '5년 이상', label: '5년 이상' },
                                ]}></Select>
                        </td>
                    </tr>
                    <tr>
                        <th>상담 유형</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.audience}
                                onChange={(e) => setAudienceValue(e.value)}
                                options={[
                                    { value: '신규', label: '신규' },
                                    { value: '재등록', label: '재등록' },
                                ]}></Select>
                        </td>
                    </tr>
                    <tr>
                        <th>관심 품목</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder="관심상품"
                                options={[
                                    { value: '타석권', label: '타석권' },
                                    { value: '레슨', label: '레슨' },
                                    { value: '레슨 + 타석권', label: '레슨+타석권' },
                                ]}></Select>
                        </td>
                    </tr>
                    <tr>
                        <th>이용시간</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.hoursUse}
                                onChange={(e) => setHoursUseValue(e.value)}
                                options={[
                                    { value: '오전', label: '오전' },
                                    { value: '낮', label: '낮' },
                                    { value: '저녁', label: '저녁' },
                                    { value: '밤', label: '밤' },
                                ]}></Select>
                        </td>
                    </tr>
                    <tr>
                        <th>부상 전적</th>
                        <td className="me-2">
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.injuries}
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
                                    placeholder={member.injuriedPart}
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
                    </tr>
                    <tr>
                        <th>유입 경로</th>
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
                    </tr>
                    <tr>
                        <th>개인정보수집동의</th>
                        <td>
                            <input
                                type="checkbox"
                                checked={privateInfoChecked}
                                onChange={privateInfoChange}
                                name="privateInfo"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>마케팅수집동의</th>
                        <td>
                            <input
                                type="checkbox"
                                checked={marketingChecked}
                                onChange={marketingChange}
                                name="marketing"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
});

export default EditTable;
