import React from 'react';
import { Table } from 'react-bootstrap';
import AddTable from './AddTable';

const ReadOnlyTable = ({ offset, limit, currentMembers, addMode }) => {
    // const ageGroup = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
    
    const getWesternAge = () => {
        const today = new Date();
        // const birthDate = new Date(1997, 12, 8);
        let birthyear = currentMembers.map((member) => Number(member.birthDate.slice(0, 4)));
        let birthmonth = currentMembers.map((member) => Number(member.birthDate.slice(5, 7)));
        let birthdate = currentMembers.map((member) => Number(member.birthDate.slice(8, 10)));

        let age = today.getFullYear() - birthyear[1];
        const m = today.getMonth() - birthmonth[1];
        if (m < 0 || (m === 0 && today.getDate() < birthdate[1])) {
            age--;
        }

        console.log(age);
        return age;
    };
    // getWesternAge();

    const columns = [
        { headerName: '회원번호', sort: true }, // typeFormToken / memberNumber 둘 중 하나인가요?
        { headerName: '생성날짜', sort: true },
        { headerName: '시간', sort: true },
        { headerName: '성함', sort: true },
        { headerName: '유형', sort: true },
        { headerName: '성별', sort: true },
        { headerName: '생년월일', sort: true },
        { headerName: '연령대' }, // db삭제..? (직접 db입력 X - 태어난 년도로 계산해서 보여주기)
        { headerName: '휴대전화번호' },
        { headerName: '위치' }, // 자택, 직장, 기타
        // ++ 동네 선택 db도 추가해야 함 (역삼,강남... - 매장에서 가까운 동네 5~10개 정도 라고 하셨습니다)
        { headerName: '골프경력', sort: true },
        { headerName: '골프목적', sort: true },
        { headerName: '관심상품', sort: true }, // db추가 (타석권, 레슨권, 타석+레슨권)
        { headerName: '이용시간대', sort: true },
        { headerName: '부상전적', sort: true },
        { headerName: '부상부위', sort: true },
        { headerName: '유입경로', sort: true }, // db추가 (네이버, 지인, 인스타 등...)
        { headerName: '마케팅수신동의', sort: true },
        { headerName: '개인정보수집동의', sort: true },
        { headerName: '누적결제수', sort: true },
        { headerName: 'LTV(누적결제금액)', sort: true },
        { headerName: '평균결제금액', sort: true },
        { headerName: '활성여부', sort: true },
    ];

    return (
        <>
            <Table className="mb-0 sales">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>
                                {column.headerName}
                                <i className='mdi mdi-sort-variant ms-2'></i>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {addMode ? <AddTable /> : null}
                    {currentMembers.slice(offset, offset + limit).map((member, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">{member.memberNumber}</td>
                                <td>{member.createdDate}</td>
                                <td>{member.createdTime}</td>
                                <td>{member.name}</td>
                                <td>{member.audience}</td>
                                <td>{member.sex}</td>
                                <td>{member.birthDate}</td>
                                <td>{member.연령대}</td>
                                <td>{member.phone}</td>
                                <td>{member.location}</td>
                                <td>{member.golfPeriod}</td>
                                <td>{member.golfPurpose}</td>
                                <td>{member.관심상품}</td>
                                <td>{member.hoursUse}</td>
                                <td>{member.injuries}</td>
                                <td>{member.injuriedPart}</td>
                                <td>{member.유입경로}</td>
                                <td className="text-center">
                                    <input type="checkbox" checked={member.marketingRecieveAllow} />
                                </td>
                                <td className="text-center">
                                    <input type="checkbox" checked={member.privateInfoAllow} />
                                </td>
                                <td>{member.amountPayments}</td>
                                <td>{member.lifetimeValue}</td>
                                <td>{member.amountPaymentAverage}</td>
                                <td className="text-center">{member.activation}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default ReadOnlyTable;
