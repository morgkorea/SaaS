import React from 'react';

const Table = ({ member }) => {
    // 연락처
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

    // 생성일자
    const createdDate = member?.createdDate;
    const createdTime = member?.createdTime;

    let formattedDate = '';
    let formattedTime = '';

    if (createdDate) {
        const dateParts = createdDate.includes('-') ? createdDate.split('-') : [createdDate.substr(0, 4), createdDate.substr(4, 2), createdDate.substr(6, 2)];
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        const date = new Date(year, month, day);
    
        formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    }

    if (createdTime) {
        if (createdTime.match(/^(am|pm) \d{1,2}:\d{2}$/i)) {
            const timeParts = createdTime.split(' ');
            const isPM = timeParts[0].toLowerCase() === 'pm';
            const timeString = timeParts[1];
            
            const timeParts2 = timeString.split(':');
            let hours = parseInt(timeParts2[0], 10);
            const minutes = parseInt(timeParts2[1], 10);
    
            if (isPM && hours !== 12) {
                hours += 12;
            }
    
            formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        } else if (createdTime.match(/^\d{2}:\d{2}:\d{2}$/)) {
            const timeParts = createdTime.split(':');
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);
    
            formattedTime = `${hours.toString().padStart(2, '0')}시 ${minutes.toString().padStart(2, '0')}분`;
        }
    }

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
                            {member.birthDate}
                            {member?.birthDate && member?.age && (
                                <>
                                    <span className='mx-1'>/</span>
                                    만 {member.age}세
                                </>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <th>위치</th>
                        <td>
                            {member?.region}
                            {member?.region && member?.location ? <span className='mx-1'>/</span> : null} 
                            {member?.location}
                        </td>
                    </tr>
                    <tr>
                        <th>생성일자</th>
                        <td>
                            {formattedDate} 
                            {member?.createdDate && member?.createdTime ? <span className='mx-1'>/</span> : null} 
                            {formattedTime}
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
                        <th>부상 부위</th>
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
