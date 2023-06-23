import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Select from 'react-select';
import { firestoreDB } from '../../../firebase/firebase';

const EditTable = ({ offset, limit, currentMembers, email }) => {
    const modifyingFirestoreMember = async () => {
        const washingtonRef = doc(firestoreDB, 'Users', email, 'Members', 'thsdhrhd');
        const memberData = {
            activation: '이탈',
            ageGroup: '',
            amountPayments: '',
            audience: '신규',
            birthDate: '1999/09/09',
            createdDate: '2023.06.09',
            createdTime: 'PM 12:12',
            golfPeriod: '5년 이상',
            golfPurpose: '비거리 향상',
            hoursUse: '저녁',
            injuriedPart: '손가락',
            injuries: '유',
            lifetimeValue: '',
            location: '자택',
            marketingRecieveAllow: true,
            memberNumber: '',
            name: '이름',
            phone: '010-3456-7890',
            privateInfoAllow: true,
            sex: '남성',
            typeFormToken: '',
            availableProducts: [
                {
                    activateProduct: '레슨',
                    startDate: '2023-05-24',
                    endDate: '2023-05-30',
                    dDays: '6',
                },
            ],
            unavailableProducts: [
                {
                    inactiveProduct: '락커',
                    startDate: '2023-02-19',
                    endDate: '2023-02-19',
                    dDays: 0,
                },
            ],
        };

        await updateDoc(washingtonRef, memberData);
    };

    const modifyMember = () => {
        modifyingFirestoreMember();
    };

    const columns = [
        { headerName: '회원번호' },
        { headerName: '생성날짜' },
        { headerName: '시간' },
        { headerName: '성함' },
        { headerName: '유형' },
        { headerName: '생년월일' },
        { headerName: '연령' },
        { headerName: '휴대전화번호' },
        { headerName: '위치' },
        { headerName: '골프경력' },
        { headerName: '골프목적' },
        { headerName: '관심상품' },
        { headerName: '이용시간대' },
        { headerName: '부상전적' },
        { headerName: '부상부위' },
        { headerName: '유입경로' },
        { headerName: '마케팅수신동의' },
        { headerName: '개인정보수집동의' },
        { headerName: '누적결제수' },
        { headerName: 'LTV(누적결제금액)' },
        { headerName: '평균결제금액' },
        { headerName: '활성' },
    ];
    
    return (
        <>
            <button onClick={modifyMember}>수정</button>
            <Table className="mb-0 sales editTable" hover>
                <thead>
                    <tr>
                        {columns.map((col) => {
                            return <th>{col.headerName}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {currentMembers?.slice(offset, offset + limit).map((member, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center" onClick={() => console.log(index, member.row)}>
                                    {member.memberNumber}
                                </td>
                                <td>{member.createdDate}</td>
                                <td>{member.createdTime}</td>
                                <td>
                                    <input
                                        style={{ width: '42px' }}
                                        className="editInput"
                                        type="text"
                                        name="placeholder"
                                        placeholder={member.name}
                                    />
                                </td>
                                <td>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder={member.audience}
                                        options={[
                                            { value: '신규', label: '신규' },
                                            { value: '재등록', label: '재등록' },
                                        ]}></Select>
                                </td>
                                <td>{member.birthDate}</td>
                                <td>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder={member.ageGroup}
                                        options={[
                                            { value: '10대', label: '10대' },
                                            { value: '20대', label: '20대' },
                                            { value: '30대', label: '30대' },
                                            { value: '40대', label: '40대' },
                                            { value: '50대', label: '50대' },
                                            { value: '60대 이상', label: '60대 이상' },
                                        ]}></Select>
                                </td>
                                <td>
                                    <input
                                        style={{ width: '110px' }}
                                        className="editInput"
                                        type="tel"
                                        pattern="[0-9]*"
                                        name="placeholder"
                                        placeholder={member.phone}
                                    />
                                </td>
                                <td>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder={member.location}
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
                                        placeholder={member.golfPeriod}
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
                                        placeholder={member.golfPurpose}
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
                                        placeholder={member.관심상품}
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
                                        placeholder={member.hoursUse}
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
                                        placeholder={member.injuries}
                                        options={[
                                            { value: '유', label: '유' },
                                            { value: '무', label: '무' },
                                        ]}></Select>
                                </td>
                                <td>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder={member.injuriedPart}
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
                                </td>
                                <td>
                                    <Select
                                        data-width="100%"
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder={member.유입경로}
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
                                    <input type="checkbox" checked={member.marketingRecieveAllow} />
                                </td>
                                <td className="text-center">
                                    <input type="checkbox" checked={member.privateInfoAllow} />
                                </td>
                                <td>{member.amountPayments}</td>
                                <td>{member.lifetimeValue}</td>
                                <td>{member.amountPaymentAverage}</td>
                                <td>
                                    <Select
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        placeholder={member.activation ? '활성' : '비활성'}
                                        options={[
                                            { value: '활성', label: '활성' },
                                            { value: '이탈', label: '이탈' },
                                            { value: '일시중지', label: '일시중지' },
                                        ]}></Select>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default EditTable;
