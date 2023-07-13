import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Table from './Table';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';

const onClickMemberInfo = ({ row }) => {
    return (
        <>
            <Link to={`/dashboard/member-info`} state={{ member: row.original }}>
                {row.original.name}
            </Link>
        </>
    );
};

const MarketingInputColumn = ({ row }) => {
    return (
        <div className="text-center">
            <input type="checkbox" checked={row.original.marketingRecieveAllow} />
        </div>
    );
};

const PrivateInputColumn = ({ row }) => {
    return (
        <div className="text-center">
            <input type="checkbox" checked={row.original.privateInfoAllow} />
        </div>
    );
};

const AgeColumn = ({ row }) => {
    const birthday = row.original.birthDate.replace(/-/gi, '');
    const today = moment().format('YYYYMMDD');

    const calcAge = () => {
        return Math.floor((today - birthday) / 10000);
    };

    let age = 0;
    let ageGroup = '';

    if (birthday.length === 8) {
        age = calcAge();

        if (age < 20) {
            ageGroup = '10대';
        } else if (age < 30) {
            ageGroup = '20대';
        } else if (age < 40) {
            ageGroup = '30대';
        } else if (age < 50) {
            ageGroup = '40대';
        } else if (age < 60) {
            ageGroup = '50대';
        } else {
            ageGroup = '60대 이상';
        }
    } else {
        return false;
    }

    const email = 'rnfkd@naver.com';

    if (row.original.birthDate) {
        const AgeUpdate = async () => {
            const memberRef = doc(firestoreDB, 'Users', email, 'Members', row.original.id);
            const updateAgeData = { ageGroup: ageGroup, age: age };
            await updateDoc(memberRef, updateAgeData);
        };
        AgeUpdate();
    } else {
        return false;
    }

    return <>{ageGroup}</>;
};

const HoursUseColumn = ({ row }) => {
    const hours = row.original.hoursUse;
    let newHours = hours;

    const replacements = [
        ['오전 (6:00am~12:00pm)', '오전'],
        ['낮 (12:00pm~4:00pm)', '낮'],
        ['저녁 (4:00pm~8:00pm)', '저녁'],
        ['밤 (8:00pm~11:00pm)', '밤'],
    ];

    replacements.forEach(([searchValue, replaceValue]) => {
        newHours = newHours.replace(searchValue, replaceValue);
    });

    return <>{newHours}</>;
};

const PhoneColumn = ({ row }) => {
    const phoneNumber = row.original.phone;

    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // 국가 코드와 나머지 번호로 분리
    let countryCode = '';
    let phoneNumberDigits = digitsOnly;

    // 국가 코드 추출
    if (digitsOnly.startsWith('82') && digitsOnly.length > 10) {
        countryCode = '';
        phoneNumberDigits = digitsOnly.slice(1);
    }

    const formattedPhoneNumber = phoneNumberDigits.replace(/(\d{3})(\d{4})(\d{4})/, '010-$2-$3');

    return countryCode + formattedPhoneNumber;
};

const columns = [
    {
        Header: '성함',
        accessor: 'name',
        Cell: onClickMemberInfo,
        sort: true,
    },
    {
        Header: '회원번호',
        accessor: 'memberNumber',
        sort: true,
    },
    {
        Header: '생성날짜',
        accessor: 'createdDate',
        sort: true,
    },
    {
        Header: '시간',
        accessor: 'createdTime',
        sort: true,
    },

    {
        Header: '성별',
        accessor: 'sex',
        sort: true,
    },
    {
        Header: '생년월일',
        accessor: 'birthDate',
        sort: true,
    },
    {
        Header: '연령대',
        Cell: AgeColumn,
        sort: true,
    },
    {
        Header: '휴대전화번호',
        accessor: 'phone',
        Cell: PhoneColumn,
        sort: true,
    },
    {
        Header: '유형',
        accessor: 'audience',
        sort: true,
    },
    {
        Header: '위치',
        accessor: 'location',
        sort: true,
    },
    {
        Header: '지역',
        accessor: 'region',
        sort: true,
    },
    {
        Header: '골프경력',
        accessor: 'golfPeriod',
        sort: true,
    },
    {
        Header: '골프목적',
        accessor: 'golfPurpose',
        sort: true,
    },
    {
        Header: '관심상품',
        accessor: 'product',
        sort: true,
    },
    {
        Header: '이용시간대',
        // accessor: 'hoursUse',
        Cell: HoursUseColumn,
        sort: true,
    },
    {
        Header: '부상전적',
        accessor: 'injuries',
        sort: true,
    },
    {
        Header: '부상부위',
        accessor: 'injuriedPart',
        sort: true,
    },
    {
        Header: '유입경로',
        accessor: 'inflowPath',
        sort: true,
    },
    {
        Header: '마케팅수신동의',
        Cell: MarketingInputColumn,
        sort: false,
    },
    {
        Header: '개인정보수집동의',
        Cell: PrivateInputColumn,
        sort: false,
    },
    {
        Header: '누적결제수',
        accessor: '',
        sort: true,
    },
    {
        Header: 'LTV(누적결제금액)',
        accessor: '',
        sort: true,
    },
    {
        Header: '평균결제금액',
        accessor: '',
        sort: true,
    },
    {
        Header: '활성여부',
        accessor: 'activation',
        sort: true,
    },
];

const sizePerPageList = [
    {
        text: '15',
        value: 15,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: '50',
        value: 50,
    },
    {
        text: '100',
        value: 100,
    },
];

const Customers = ({ currentMembers, addMode, setAddMode }) => {
    const location = useLocation();

    return (
        <>
            <Card>
                <Card.Body>
                    <Table
                        columns={columns}
                        data={currentMembers}
                        addMode={addMode}
                        setAddMode={setAddMode}
                        sizePerPageList={sizePerPageList}
                        pageSize={sizePerPageList[0].value}
                        isSortable={true}
                        pagination={true}
                        isSelectable={false}
                        isSearchable={true}
                        searchBoxClass="mb-3"
                    />
                </Card.Body>
            </Card>
        </>
    );
};

export default Customers;
