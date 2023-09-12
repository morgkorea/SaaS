import moment from 'moment';
import React from 'react';

const Table = ({ member }) => {
    const formattedCreatedTime = member?.createdTime
    ? (() => {
        const timeA = moment(member.createdTime, "A hh:mm");
        const timeHH = moment(member.createdTime, "HH:mm:ss");

        if (timeA.isValid()) {
            return timeA.format('A hh:mm');
        } else if (timeHH.isValid()) {
            const time = moment(member.createdTime, "HH:mm:ss");
            return time.format('A hh:mm');
        } else {
            return 'Invalid date';
        }
    })()
    : '';
    
    const phoneNumber = member.phone;
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    let countryCode = '';
    let phoneNumberDigits = digitsOnly;

    if (digitsOnly.startsWith('82') && digitsOnly.length > 10) {
        countryCode = '';
        phoneNumberDigits = digitsOnly.slice(1);
    }

    const formattedPhoneNumber = phoneNumberDigits.replace(/(\d{3})(\d{4})(\d{4})/, '010-$2-$3');
    const phone = countryCode + formattedPhoneNumber;

    return (
        <>
            <table className="basic-table mt-3">
                <tbody>
                    <tr>
                        <th>성함</th>
                        <td>
                            <span className="text-primary fs-4 me-1 fw-600">{member?.name}</span>
                            회원님
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
                        <td>
                            {member?.sex}
                        </td>
                    </tr>
                    <tr>
                        <th>생년월일</th>
                        <td>
                            {member.birthDate ? (
                                <>
                                    {member.birthDate} / 만 {member.age}세
                                </>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <th>위치</th>
                        <td>
                            {member?.region} {member?.location ? '/' : null} {member?.location}
                        </td>
                    </tr>
                    <tr>
                        <th>생성일자</th>
                        <td>
                            {member?.createdDate} {member?.createdTime ? '/' : null} {formattedCreatedTime}
                        </td>
                    </tr>
                    <tr>
                        <th>유형</th>
                        <td>{member?.audience}</td>
                    </tr>
                    <tr>
                        <th>골프 경력</th>
                        <td>{member?.golfPeriod}</td>
                    </tr>
                    <tr>
                        <th>골프 목적</th>
                        <td>{member?.golfPurpose}</td>
                    </tr>
                    <tr>
                        <th>관심 상품</th>
                        <td>{member?.product}</td>
                    </tr>
                    <tr>
                        <th>유입 경로</th>
                        <td>{member?.inflowPath}</td>
                    </tr>
                    <tr>
                        <th>이용 시간대</th>
                        <td>{member?.hoursUse}</td>
                    </tr>
                    <tr>
                        <th>부상 전적</th>
                        <td>
                            {member?.injuriedPart}
                        </td>
                    </tr>
                    <tr>
                        <th>개인정보수집동의</th>
                        <td>
                            <input type="checkbox" checked={member?.privateInfoAllow} className="custom-checkbox" readOnly id="privateInfoCheckbox" />
                            <label htmlFor="privateInfoCheckbox">ㅤ</label>
                        </td>
                    </tr>
                    <tr>
                        <th>마케팅활용동의</th>
                        <td>
                            <input type="checkbox" checked={member?.marketingRecieveAllow} className="custom-checkbox" readOnly id="marketingCheckbox" />
                            <label htmlFor="marketingCheckbox">ㅤ</label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Table;
