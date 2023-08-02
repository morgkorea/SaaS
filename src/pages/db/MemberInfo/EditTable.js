import { doc, updateDoc } from 'firebase/firestore';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Select from 'react-select';
import { firestoreDB } from '../../../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getAudienceValue = (member) => {
    const availableProducts = member.availableProducts || [];
    const unavailableProducts = member.unavailableProducts || [];
    const allProducts = availableProducts.concat(unavailableProducts);
  
    if (allProducts.length === 0) {
      return '잠재';
    } else if (allProducts.length === 1) {
      return '신규';
    } else {
      return '재등록';
    }
};


const EditTable = forwardRef(({ member, email, id }, ref) => {
    const notify = () => toast('개인정보가 수정되었습니다.');

    const [nameValue, setNameValue] = useState(member.name);
    const [sexValue, setSexValue] = useState('');
    const [birthDateValue, setBirthDateValue] = useState(member.birthDate);
    const [phoneValue, setPhoneValue] = useState(member.phone);
    const [locationValue, setLocationValue] = useState(member.location);
    const [regionValue, setRegionValue] = useState(member.region);
    const [periodValue, setPeriodValue] = useState(member.golfPeriod);
    const [purposeValue, setPurposeValue] = useState(member.golfPurpose);
    const [productValue, setProductValue] = useState(member.product);
    const [hoursUseValue, setHoursUseValue] = useState(member.hoursUse);
    const [injuriesValue, setInjuriesValue] = useState(member.injuries);
    const [injuriedPartValue, setInjuriedPartValue] = useState(member.injuriedPart);
    const [inflowPathValue, setInflowPathValue] = useState(member.inflowPath);
    const [privateInfoChecked, setPrivateInfoChecked] = useState(member.privateInfoAllow);
    const [marketingChecked, setMarketingChecked] = useState(member.marketingRecieveAllow);
    const audienceValue = getAudienceValue(member);

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
            sex: sexValue,
            birthDate: birthDateValue,
            phone: phoneValue,
            location: locationValue,
            region: regionValue,
            golfPeriod: periodValue,
            golfPurpose: purposeValue,
            product: productValue,
            hoursUse: hoursUseValue,
            injuries: injuriesValue,
            injuriedPart: injuriedPartValue,
            inflowPath: inflowPathValue,
            privateInfoAllow: privateInfoChecked,
            marketingRecieveAllow: marketingChecked,
        };

        await updateDoc(memberRef, editData);

        notify();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
                                style={{ width: '75px', marginRight: '10px' }}
                                className="editInput"
                                type="text"
                                value={nameValue}
                                onChange={(e) => setNameValue(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            회원님
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.sex ? member.sex : '선택'}
                                onChange={(e) => setSexValue(e.value)}
                                options={[
                                    { value: '남성', label: '남성' },
                                    { value: '여성', label: '여성' },
                                ]}></Select>
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
                        <th>전화번호</th>
                        <td>
                            <input
                                style={{ width: '120px' }}
                                className="editInput"
                                type="tel"
                                pattern="[0-9]*"
                                value={phoneValue}
                                onChange={(e) => setPhoneValue(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>지역</th>
                        <td className="me-2">
                            <input
                                style={{ width: '120px' }}
                                className="editInput"
                                type="text"
                                placeholder="지역"
                                value={regionValue}
                                onChange={(e) => setRegionValue(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>위치</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.location ? member.location : '선택'}
                                onChange={(e) => setLocationValue(e.value)}
                                options={[
                                    { value: '자택', label: '자택' },
                                    { value: '직장', label: '직장' },
                                    { value: '기타', label: '기타' },
                                ]}></Select>
                        </td>
                    </tr>
                    <tr>
                        <th>생성일자</th>
                        <td>
                            {member?.createdDate} {member?.createdTime}
                        </td>
                    </tr>
                    <tr>
                        <th>유형</th>
                        <td>
                            {audienceValue}
                        </td>
                    </tr>
                    <tr>
                        <th>골프 경력</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.golfPeriod ? member.golfPeriod : '선택'}
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
                                placeholder={member.golfPurpose ? member.golfPurpose : '선택'}
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
                                ]}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>관심 상품</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.product ? member.product : '선택'}
                                onChange={(e) => setProductValue(e.value)}
                                options={[
                                    { value: '타석', label: '타석' },
                                    { value: '레슨', label: '레슨' },
                                    { value: '기타', label: '기타' },
                                ]}></Select>
                        </td>
                    </tr>
                    <tr>
                        <th>유입 경로</th>
                        <td>
                            <Select
                                data-width="100%"
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.inflowPath ? member.inflowPath : '선택'}
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
                    </tr>
                    <tr>
                        <th>이용 시간대</th>
                        <td>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder={member.hoursUse ? member.hoursUse : '선택'}
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
                                placeholder={member.injuries ? member.injuries : '선택'}
                                onChange={(e) => setInjuriesValue(e.value)}
                                options={[
                                    { value: '유', label: '유' },
                                    { value: '무', label: '무' },
                                ]}></Select>
                        </td>
                    </tr>
                    <tr>
                        <th>부상 부위</th>
                        <td>
                            {injuriesValue === '무' ? null : (
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    placeholder={member.injuriedPart ? member.injuriedPart : '선택'}
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
                        <th>마케팅활용동의</th>
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

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                closeButton={false}
                theme="light"
                limit={1}
            />
        </>
    );
});

export default EditTable;
