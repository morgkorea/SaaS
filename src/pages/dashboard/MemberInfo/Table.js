import React from 'react';

const Table = ({ member }) => {
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
                        <th>생년월일</th>
                        <td>
                            {member.birthDate ? (
                                <>
                                    {member.birthDate} 만 {member.age}세
                                </>
                            ) : null}
                        </td>
                    </tr>
                    <tr>
                        <th>휴대전화</th>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <th>위치</th>
                        <td>
                            {member?.region} / {member?.location}
                        </td>
                    </tr>
                    <tr>
                        <th>회원번호</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>생성일자</th>
                        <td>
                            {member?.createdDate} / {member?.createdTime}
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
                        <th>관심 품목</th>
                        <td>{member?.product}</td>
                    </tr>
                    <tr>
                        <th>이용시간</th>
                        <td>{member?.hoursUse}</td>
                    </tr>
                    <tr>
                        <th>부상 전적</th>
                        <td>
                            {member?.injuries}
                            {member.injuries === '무' ? null : ` / ${member?.injuriedPart}`}
                        </td>
                    </tr>
                    <tr>
                        <th>유입 경로</th>
                        <td>{member?.inflowPath}</td>
                    </tr>
                    <tr>
                        <th>개인정보수집동의</th>
                        <td>
                            {member?.privateInfoAllow === true ? (
                                <i className="mdi mdi-check widget-icon2" />
                            ) : (
                                <i className="mdi mdi-check" />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>마케팅수집동의</th>
                        <td>
                            {member?.marketingRecieveAllow === true ? (
                                <i className="mdi mdi-check widget-icon2" />
                            ) : (
                                <i className="mdi mdi-check" />
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Table;
