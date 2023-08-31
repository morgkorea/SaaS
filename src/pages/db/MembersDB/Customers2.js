import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, Col, Nav, NavDropdown, Row, Tab } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import Table2 from './Table2';
import classnames from 'classnames';

const onClickMemberInfo = ({ row }) => {
    return (
        <>
            <Link to={`/database/member-info`} state={{ member: row.original }}>
                {row.original.name}
            </Link>
        </>
    );
};

const CreatedTimeColumn = ({ row }) => {
    const timeString = row.original.createdTime; // 시간 형식의 문자열을 가져옵니다.
    const time = moment(timeString, 'HH:mm:ss'); // 시간 형식 문자열을 'HH:mm:ss' 형식으로 Moment 객체로 변환합니다.

    if (time.isValid()) {
        const formattedTime = time.format('A hh:mm'); // AM/PM과 hh:mm 형식으로 변환합니다.
        return formattedTime;
    } else {
        return 'Invalid date';
    }
};

const MarketingInputColumn = ({ row }) => {
    return (
        <div className="text-center">
            <input
                type="checkbox"
                checked={row.original.marketingRecieveAllow}
                className="custom-checkbox"
                readOnly
                id="marketingCheckbox"
            />
            <label htmlFor="marketingCheckbox">ㅤ</label>
        </div>
    );
};

const PrivateInputColumn = ({ row }) => {
    return (
        <div className="text-center">
            <input
                type="checkbox"
                checked={row.original.privateInfoAllow}
                className="custom-checkbox"
                readOnly
                id="privateInfoCheckbox"
            />
            <label htmlFor="privateInfoCheckbox">ㅤ</label>
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

const audienceAccessor = (row) => {
    const availableProducts = row.availableProducts || [];
    const unavailableProducts = row.unavailableProducts || [];
    const allProducts = availableProducts.concat(unavailableProducts);

    if (allProducts.length === 0) {
        return '잠재';
    } else if (allProducts.length === 1) {
        return '신규';
    } else {
        return '재등록';
    }
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

    const isActive =
        availableProducts &&
        Array.isArray(availableProducts) &&
        availableProducts.some((product) => product.productType === 'batterBox');

    let content = null;
    let badgeColor = '';

    if (isActive) {
        const batterBoxProduct = availableProducts.find((product) => product.productType === 'batterBox');

        if (batterBoxProduct) {
            const dDay = batterBoxProduct.dDay;

            if (dDay <= 10) {
                badgeColor = 'danger';
            } else if (dDay <= 30) {
                badgeColor = 'warning';
            } else {
                badgeColor = 'success';
            }

            content = `D - ${dDay}`;
        }
    } else {
        content = '비활성';
        badgeColor = 'dark';
    }

    return (
        <div className="text-center">
            <Badge bg="" className={`badge-${badgeColor}-lighten`}>
                {content}
            </Badge>
        </div>
    );
};

const LessonActiveColumn = ({ row }) => {
    const availableProducts = row.original?.availableProducts;

    const isActive =
        availableProducts &&
        Array.isArray(availableProducts) &&
        availableProducts.some((product) => product.productType === 'lesson');

    let content = null;
    let badgeColor = '';

    if (isActive) {
        const lessonProduct = availableProducts.find((product) => product.productType === 'lesson');
        if (lessonProduct) {
            const dDay = lessonProduct.dDay;

            if (dDay <= 10) {
                badgeColor = 'danger';
            } else if (dDay <= 30) {
                badgeColor = 'warning';
            } else {
                badgeColor = 'success';
            }

            content = `D - ${dDay}`;

            content = `D - ${dDay}`;
        }
    } else {
        content = '비활성';
        badgeColor = 'dark';
    }

    return (
        <div className="text-center">
            <Badge bg="" className={`badge-${badgeColor}-lighten`}>
                {content}
            </Badge>
        </div>
    );
};

const taSeokActive = (row) => {
    const availableProducts = row.availableProducts;

    const isActive =
        availableProducts &&
        Array.isArray(availableProducts) &&
        availableProducts.some((product) => product.productType === 'batterBox');
    if (isActive) {
        const batterBoxProduct = availableProducts.find((product) => product.productType === 'batterBox');
        if (batterBoxProduct) {
            return batterBoxProduct.dDay;
        }
    }

    return -1;
};

const lessonActive = (row) => {
    const availableProducts = row.availableProducts;

    const isActive =
        availableProducts &&
        Array.isArray(availableProducts) &&
        availableProducts.some((product) => product.productType === 'lesson');
    if (isActive) {
        const lessonProduct = availableProducts.find((product) => product.productType === 'lesson');
        if (lessonProduct) {
            return lessonProduct.dDay;
        }
    }

    return -1;
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
        Cell: CreatedTimeColumn,
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
        accessor: audienceAccessor,
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
        Cell: ({ value }) => (value === '없음' ? '' : value),
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
        sort: true,
    },
    {
        Header: '타석 활성여부',
        accessor: taSeokActive,
        Cell: TaSeokActiveColumn,
        sort: true,
    },
    {
        Header: '레슨 활성여부',
        accessor: lessonActive,
        Cell: LessonActiveColumn,
        sort: true,
    },
];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
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
];

const tabContents = [
    {
        id: '1',
        title: '전체회원',
        group: [
            { category: '전체' },
            {
                category: '상품별',
                subgroup: [
                    { subcategory: '잔여 30일 이상' },
                    { subcategory: '만료 14일전' },
                    { subcategory: '만료 7일전' },
                    { subcategory: '만료 회원' },
                    { subcategory: '휴회/일시정지 회원' },
                ],
            },
            {
                category: '구력별',
                subgroup: [{ subcategory: '1년' }, { subcategory: '2년' }, { subcategory: '3년' }],
            },
            {
                category: '연령별',
                subgroup: [{ subcategory: '10대' }, { subcategory: '20대' }, { subcategory: '30대' }],
            },
            {
                category: '유형별',
                subgroup: [{ subcategory: '잠재' }, { subcategory: '신규' }, { subcategory: '재등록' }],
            },
            {
                category: '목적별',
                subgroup: [{ subcategory: '입문' }, { subcategory: '비거리향상' }, { subcategory: '스코어' }],
            },
            {
                category: '관심상품별',
                subgroup: [{ subcategory: '레슨' }, { subcategory: '타석' }],
            },
            {
                category: '유입경로별',
                subgroup: [{ subcategory: '카카오톡' }, { subcategory: '전단지' }, { subcategory: '네이버' }],
            },
        ],
    },
    {
        id: '2',
        title: '레슨회원',
        type: 'lesson',
        group: [
            { category: '전체' },
            { category: '잔여 30일 이상' },
            { category: '만료 14일전' },
            { category: '만료 7일전' },
        ],
    },
    {
        id: '3',
        title: '타석회원',
        type: 'batterBox',
        group: [
            { category: '전체' },
            { category: '잔여 30일 이상' },
            { category: '만료 14일전' },
            { category: '만료 7일전' },
        ],
    },
];

function filterMembers(members, titleFilter, groupFilter, subgroupFilter) {
    return members.filter(member => {
        const tabContent = tabContents.find(tab => tab.title === titleFilter);

        if (!tabContent) {
            return false;
        }

        // 1차 분류
        // if (titleFilter === '전체회원') {
        //     return true;
        // } else if (titleFilter === '레슨회원') {
        //     return member.availableProducts.some(product => product.productType === 'lesson');
        // } else if (titleFilter === '타석회원') {
        //     return member.availableProducts.some(product => product.productType === 'batterBox');
        // }

        // 1차 분류된 데이터를 가지고 2차 분류
        if (groupFilter) {
            const group = tabContent.group.find(g => g.category === groupFilter);

            if (!group) {
                return false;
            }

            // 2차 분류
            if (subgroupFilter) {
                const subgroup = group.subgroup.find(subg => subg.subcategory === subgroupFilter);

                if (!subgroup) {
                    return false;
                }

                // Apply subgroupFilter conditions
                switch (subgroup.subcategory) {
                    case '잔여 30일 이상':
                        return member.availableProducts.some(product => product.dDay >= 30);
                    case '만료 14일전':
                        return member.availableProducts.some(product => product.dDay < 14 && product.dDay >= 7);
                    case '만료 7일전':
                        return member.availableProducts.some(product => product.dDay < 7);
                    case '만료 회원':
                        return member.availableProducts.length === 0 && member.unavailableProducts.length >= 1;
                    default:
                        return true;
                }
            } else {
                // Apply groupFilter conditions
                switch (groupFilter) {
                    case '전체':
                        return true;
                    case '잔여 30일 이상':
                        return member.availableProducts.some(product => product.dDay >= 30);
                    case '만료 14일전':
                        return member.availableProducts.some(product => product.dDay < 14 && product.dDay >= 7);
                    case '만료 7일전':
                        return member.availableProducts.some(product => product.dDay < 7);
                    default:
                        return true;
                }
            }
        } else {
            return true;
        }
    });
}


const Customers2 = ({ currentMembers }) => {

    return (
        <>
            <Card>
                <Card.Body>
                    <Tab.Container defaultActiveKey="전체회원">
                        <Nav variant="tabs" className="nav-bordered" as="ul">
                            {tabContents.map((tab, index) => {
                                return (
                                    <Nav.Item key={index} as="li">
                                        <Nav.Link as={Link} to="#" eventKey={tab.title}>
                                            <i className={classnames(tab.icon, 'd-md-none', 'd-block', 'me-1')}></i>
                                            <span className="d-none d-md-block">{tab.title}</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>

                        <Tab.Content>
                            {tabContents.map((tab, tabIndex) => {
                                return (
                                    <Tab.Pane eventKey={tab.title} id={tab.id} key={tabIndex}>
                                        <Row>
                                            <Col sm="12">
                                                <Tab.Container defaultActiveKey="전체회원">
                                                    <Nav>
                                                        {tab.group.map((group, groupIndex) => {
                                                            if (group.subgroup) {
                                                                return (
                                                                    <NavDropdown
                                                                        key={groupIndex}
                                                                        title={group.category}
                                                                        id={`group-dropdown-${groupIndex}`}>
                                                                        {group.subgroup.map((subgroup, subgroupIndex) => (
                                                                                <NavDropdown.Item
                                                                                    key={subgroupIndex}
                                                                                    as={Link}
                                                                                    to="#"
                                                                                    eventKey={subgroup.subcategory}>
                                                                                    {subgroup.subcategory}
                                                                                </NavDropdown.Item>
                                                                            )
                                                                        )}
                                                                    </NavDropdown>
                                                                );
                                                            } else {
                                                                return (
                                                                    <Nav.Item key={groupIndex}>
                                                                        <Nav.Link
                                                                            as={Link}
                                                                            to="#"
                                                                            eventKey={group.category}>
                                                                            <span className="d-none d-md-block">
                                                                                {group.category}
                                                                            </span>
                                                                        </Nav.Link>
                                                                    </Nav.Item>
                                                                );
                                                            }
                                                        })}
                                                    </Nav>

                                                    {/* table */}
                                                    <Tab.Content>
                                                        {tab.group.map((group, groupIndex) => {
                                                            return (
                                                                <Tab.Pane
                                                                    eventKey={group.category}
                                                                    id={groupIndex}
                                                                    key={groupIndex}>
                                                                    <Row>
                                                                        <Col sm="12">
                                                                            <p className="my-5">
                                                                                {group.category} 데이터 보여주기
                                                                            </p>
                                                                            <Table2
                                                                                columns={columns}
                                                                                // data={currentMembers}
                                                                                data={filterMembers(currentMembers, tab.title, group.category, group.subgroup)}
                                                                                sizePerPageList={sizePerPageList}
                                                                                pageSize={sizePerPageList[1].value}
                                                                                isSortable={true}
                                                                                pagination={true}
                                                                                isSelectable={false}
                                                                                isSearchable={true}
                                                                                searchBoxClass="mb-3"
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Tab.Pane>
                                                            );
                                                        })}
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                );
                            })}
                        </Tab.Content>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </>
    );
};

export default Customers2;
