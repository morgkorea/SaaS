import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Table from './Table';
import { useState } from 'react';
import { useEffect } from 'react';

const onClickMemberInfo = ({ row }) => {
    return (
        <>
            <Link to={`/database/member-info`} state={{ member: row.original }}>
                {row.original.name}
            </Link>
        </>
    );
};

const MarketingInputColumn = ({ row }) => {
    return (
        <div className="text-center">
            <input type="checkbox" checked={row.original.marketingRecieveAllow} readOnly />
        </div>
    );
};

const PrivateInputColumn = ({ row }) => {
    return (
        <div className="text-center">
            <input type="checkbox" checked={row.original.privateInfoAllow} readOnly />
        </div>
    );
};

const PhoneColumn = ({ row }) => {
    const phoneNumber = row.original.phone || '';

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

const AudienceColumn = ({ row }) => {
    const [audienceValue, setAudienceValue] = useState(0);
    const availableProducts = row.original?.availableProducts || [];
    const unavailableProducts = row.original?.unavailableProducts || [];
    const allProducts = availableProducts.concat(unavailableProducts);

    useEffect(() => {
        // allProducts 배열의 길이를 기준으로 '잠재', '신규', '재등록'을 설정
        if (allProducts.length === 0) {
            setAudienceValue('잠재');
        } else if (allProducts.length === 1) {
            setAudienceValue('신규');
        } else {
            setAudienceValue('재등록');
        }
    }, [allProducts]);

    return <>{audienceValue}</>;
};

const CumulativePayCount = ({ row }) => {
    const [allProducts, setAllProducts] = useState(0);
    const availableProducts = row.original?.availableProducts;
    const unavailableProducts = row.original?.unavailableProducts;

    useEffect(() => {
        if (availableProducts && unavailableProducts) {
            const filteredAvailableProducts = availableProducts.filter(
                (product) => !product.deleted_at && !product.refund
            );
            const filteredUnavailableProducts = unavailableProducts.filter(
                (product) => !product.deleted_at && !product.refund
            );

            const products = [...filteredAvailableProducts, ...filteredUnavailableProducts];
            setAllProducts(products.length);
        }
    }, [availableProducts, unavailableProducts]);

    return <>{allProducts !== 0 ? allProducts.toLocaleString() : '-'}</>;
};

const CumulativePayAmount = ({ row }) => {
    const [totalValue, setTotalValue] = useState(0);
    const availableProducts = row.original?.availableProducts;
    const unavailableProducts = row.original?.unavailableProducts;

    useEffect(() => {
        if (availableProducts && unavailableProducts) {
            const products = [...availableProducts, ...unavailableProducts];
            const amounts = products
                .filter((product) => product.deleted_at === false && product.refund === false)
                .map((data) => data.adjustedPrice)
                .filter((amount) => !isNaN(amount) && amount !== 0);

            const totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

            setTotalValue(totalValue);
        }
    }, [availableProducts, unavailableProducts]);

    return <>{totalValue !== 0 ? totalValue.toLocaleString() : '-'}</>;
};

const AveragePayAmount = ({ row }) => {
    const [averageValue, setAverageValue] = useState(0);
    const availableProducts = row.original?.availableProducts;
    const unavailableProducts = row.original?.unavailableProducts;

    useEffect(() => {
        if (availableProducts && unavailableProducts) {
            const products = [...availableProducts, ...unavailableProducts];

            const amounts = products
                .filter((product) => product.deleted_at === false && product.refund === false)
                .map((data) => data.adjustedPrice)
                .filter((amount) => !isNaN(amount) && amount !== 0);

            const totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const averageValue = Math.floor(totalValue / amounts.length);

            setAverageValue(averageValue);
        }
    }, [availableProducts, unavailableProducts]);

    return <>{!isNaN(averageValue) && averageValue !== 0 ? averageValue.toLocaleString() : '-'}</>;
};

const cumulativePayAccessor = (row) => {
    const availableProducts = row.availableProducts;
    const unavailableProducts = row.unavailableProducts;

    let totalValue = 0;

    if (
        availableProducts &&
        Array.isArray(availableProducts) &&
        unavailableProducts &&
        Array.isArray(unavailableProducts)
    ) {
        const products = [...availableProducts, ...unavailableProducts];
        // const amounts = products.map((data) => data.adjustedPrice);
        const amounts = products
                .filter((product) => product.deleted_at === false && product.refund === false)
                .map((data) => data.adjustedPrice)
                .filter((amount) => !isNaN(amount) && amount !== 0);
        totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    return totalValue;
};

const averagePayAccessor = (row) => {
    const availableProducts = row.availableProducts;
    const unavailableProducts = row.unavailableProducts;

    let averageValue = 0;

    if (
        availableProducts &&
        Array.isArray(availableProducts) &&
        unavailableProducts &&
        Array.isArray(unavailableProducts)
    ) {
        const products = [...availableProducts, ...unavailableProducts];
        // const amounts = products.map((data) => data.adjustedPrice);
        const amounts = products
                .filter((product) => product.deleted_at === false && product.refund === false)
                .map((data) => data.adjustedPrice)
                .filter((amount) => !isNaN(amount) && amount !== 0);
        const totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        averageValue = Math.floor(totalValue / amounts.length);
    }

    return averageValue;
};

const TaSeokActiveColumn = ({ row }) => {
    const availableProducts = row.original?.availableProducts;

    const isActive = availableProducts && Array.isArray(availableProducts) && availableProducts.some((product) => product.productType === 'batterBox');

    return <>{isActive ? '활성' : '비활성'}</>;
}

const LessonActiveColumn = ({ row }) => {
    const availableProducts = row.original?.availableProducts;

    const isActive = availableProducts && Array.isArray(availableProducts) && availableProducts.some((product) => product.productType === 'lesson');

    return <>{isActive ? '활성' : '비활성'}</>;
}

const taSeokActive = (row) => {
    const availableProducts = row.original?.availableProducts;

    const isActive = availableProducts && Array.isArray(availableProducts) && availableProducts.some((product) => product.productType === 'batterBox');

    return isActive;
};

const lessonActive = (row) => {
    const availableProducts = row.original?.availableProducts;

    const isActive = availableProducts && Array.isArray(availableProducts) && availableProducts.some((product) => product.productType === 'lesson');

    return isActive;
};

const columns = [
    {
        Header: '성함',
        accessor: 'name',
        Cell: onClickMemberInfo,
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
        accessor: 'ageGroup',
        sort: true,
    },
    {
        Header: '전화번호',
        accessor: 'phone',
        Cell: PhoneColumn,
        sort: true,
    },
    {
        Header: '유형',
        accessor: 'audience',
        Cell: AudienceColumn,
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
        Header: '유입경로',
        accessor: 'inflowPath',
        sort: true,
    },
    {
        Header: '이용시간대',
        accessor: 'hoursUse',
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
        Header: '마케팅수신동의',
        accessor: 'marketingRecieveAllow',
        Cell: MarketingInputColumn,
        sort: false,
    },
    {
        Header: '개인정보수집동의',
        accessor: 'privateInfoAllow',
        Cell: PrivateInputColumn,
        sort: false,
    },
    {
        Header: '누적결제수',
        Cell: CumulativePayCount,
        sort: false,
    },
    {
        Header: 'LTV(누적결제금액)',
        accessor: cumulativePayAccessor,
        Cell: CumulativePayAmount,
        sortType: 'basic',
        sort: true,
    },
    {
        Header: '평균결제금액',
        accessor: averagePayAccessor,
        Cell: AveragePayAmount,
        sortType: 'basic',
        sort: true,
    },
    {
        Header: '타석 활성여부',
        accessor: taSeokActive,
        Cell: TaSeokActiveColumn,
        sortType: 'basic',
        sort: true,
    },
    {
        Header: '레슨 활성여부',
        accessor: lessonActive,
        Cell: LessonActiveColumn,
        sortType: 'basic',
        sort: true,
    },
];

const Customers = ({ currentMembers, addMode, setAddMode }) => {

    return (
        <>
            <Card>
                <Card.Body>
                    <Table
                        columns={columns}
                        data={currentMembers}
                        addMode={addMode}
                        setAddMode={setAddMode}
                        // sizePerPageList={sizePerPageList}
                        pageSize={20}
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
