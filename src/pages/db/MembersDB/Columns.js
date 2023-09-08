import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const Phone = React.memo(({ row }) => {
    const phoneNumber = row.original.phone || '';
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    let countryCode = '';
    let phoneNumberDigits = digitsOnly;

    if (digitsOnly.startsWith('82') && digitsOnly.length > 10) {
        countryCode = '';
        phoneNumberDigits = digitsOnly.slice(1);
    }

    const formattedPhoneNumber = phoneNumberDigits.replace(/(\d{3})(\d{4})(\d{4})/, '010-$2-$3');

    return countryCode + formattedPhoneNumber;
});

const Created = ({ row }) => {
    const createdDate = row.original?.createdDate;
    const createdTime = row.original?.createdTime;

    const date = createdDate ? new Date(createdDate) : null;
    const time = createdTime ? new Date(`1970-01-01T${createdTime}`) : null;

    const formattedDate = date ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일` : '';
    const formattedTime = time ? `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}` : '';

    return (
        <>
            {formattedDate} {formattedTime}
        </>
    );
};

const Info = ({ row }) => {
    const sex = row.original?.sex ? <span className="me-2 mb-0">{row.original.sex}</span> : null;
    const ageGroup = row.original?.ageGroup ? <span className="me-2 mb-0">{row.original.ageGroup}</span> : null;
    const audience = row.original?.audience ? <span className="me-2 mb-0">{row.original.audience}</span> : null;
    const golfPurpose = row.original?.golfPurpose ? <span className="me-2 mb-0">{row.original.golfPurpose}</span> : null;
    const product = row.original?.product ? <span className="me-2 mb-0">{row.original.product}</span> : null;
    const golfPeriod = row.original?.golfPeriod ? <span className="me-2 mb-0">{row.original.golfPeriod}</span> : null;
    const availableProducts = row.original?.availableProducts
    
    const getActivityInfo = (activityType) => {
        const isActive =
            availableProducts &&
            Array.isArray(availableProducts) &&
            availableProducts.some((product) => product.productType === activityType);

        let activity = null;
        let badgeColor = '';

        if (isActive) {
            const activityProduct = availableProducts.find((product) => product.productType === activityType);

            if (activityProduct) {
                const dDay = activityProduct.dDay;

                if (dDay <= 10) {
                    badgeColor = 'danger';
                } else if (dDay <= 30) {
                    badgeColor = 'warning';
                } else {
                    badgeColor = 'success';
                }

                activity = `D - ${dDay}`;
            }
        } else {
            activity = '비활성';
            badgeColor = 'dark';
        }

        return { activity, badgeColor };
    };

    const { activity: batterBox, badgeColor: batterBoxBadgeColor } = getActivityInfo('batterBox');
    const { activity: lesson, badgeColor: lessonBadgeColor } = getActivityInfo('lesson');

    return (
        <>
            <div className="d-flex">
                {sex}
                {ageGroup}
                {audience}
                {golfPurpose}
                {product}
                {golfPeriod}
                <span>
                    <Badge bg="" className={`badge-${batterBoxBadgeColor}-lighten me-2`}>
                        타석 {batterBox}
                    </Badge>
                </span>
                <span>
                    <Badge bg="" className={`badge-${lessonBadgeColor}-lighten`}>
                        레슨 {lesson}
                    </Badge>
                </span>
            </div>
        </>
    );
};


const onClickMemberInfo = ({ row }) => {
    return (
        <>
            <Link to={`/database/member-info`} state={{ member: row.original }}>
                상세보기
            </Link>
        </>
    );
};

const Columns = [
    {
        Header: '회원',
        accessor: 'name',
        sort: true,
    },
    {
        Header: '휴대전화',
        accessor: 'phone',
        Cell: Phone,
        sort: true,
    },
    {
        Header: '등록 날짜',
        accessor: 'createdDate',
        Cell: Created,
        sort: true,
    },
    {
        Header: '회원정보',
        Cell: Info,
        sort: false,
    },
    {
        Header: ' ',
        Cell: onClickMemberInfo,
        sort: false,
    },
];

// const CreatedTimeColumn = ({ row }) => {
//     const timeString = row.original.createdTime; // 시간 형식의 문자열을 가져옵니다.
//     const time = moment(timeString, 'HH:mm:ss'); // 시간 형식 문자열을 'HH:mm:ss' 형식으로 Moment 객체로 변환합니다.

//     if (time.isValid()) {
//         const formattedTime = time.format('A hh:mm'); // AM/PM과 hh:mm 형식으로 변환합니다.
//         return formattedTime;
//     } else {
//         return 'Invalid date';
//     }
// };

// const MarketingInputColumn = ({ row }) => {
//     return (
//         <div className="text-center">
//             <input
//                 type="checkbox"
//                 checked={row.original.marketingRecieveAllow}
//                 className="custom-checkbox"
//                 readOnly
//                 id="marketingCheckbox"
//             />
//             <label htmlFor="marketingCheckbox">ㅤ</label>
//         </div>
//     );
// };

// const PrivateInputColumn = ({ row }) => {
//     return (
//         <div className="text-center">
//             <input
//                 type="checkbox"
//                 checked={row.original.privateInfoAllow}
//                 className="custom-checkbox"
//                 readOnly
//                 id="privateInfoCheckbox"
//             />
//             <label htmlFor="privateInfoCheckbox">ㅤ</label>
//         </div>
//     );
// };

// const CumulativePayCount = React.memo(({ row }) => {
//     const [allProducts, setAllProducts] = useState(0);
//     const availableProducts = row.original?.availableProducts;
//     const unavailableProducts = row.original?.unavailableProducts;

//     useEffect(() => {
//         if (availableProducts && unavailableProducts) {
//             const filteredAvailableProducts = availableProducts.filter(
//                 (product) => !product.deleted_at && !product.refund
//             );
//             const filteredUnavailableProducts = unavailableProducts.filter(
//                 (product) => !product.deleted_at && !product.refund
//             );

//             const products = [...filteredAvailableProducts, ...filteredUnavailableProducts];
//             setAllProducts(products.length);
//         }
//     }, [availableProducts, unavailableProducts]);

//     return <>{allProducts !== 0 ? allProducts.toLocaleString() : '-'}</>;
// });

// const CumulativePayAmount = React.memo(({ row }) => {
//     const [totalValue, setTotalValue] = useState(0);
//     const availableProducts = row.original?.availableProducts;
//     const unavailableProducts = row.original?.unavailableProducts;

//     useEffect(() => {
//         if (availableProducts && unavailableProducts) {
//             const products = [...availableProducts, ...unavailableProducts];
//             const amounts = products
//                 .filter((product) => product.deleted_at === false && product.refund === false)
//                 .map((data) => data.adjustedPrice)
//                 .filter((amount) => !isNaN(amount) && amount !== 0);

//             const totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//             setTotalValue(totalValue);
//         }
//     }, [availableProducts, unavailableProducts]);

//     return <>{totalValue !== 0 ? totalValue.toLocaleString() : '-'}</>;
// });

// const AveragePayAmount = React.memo(({ row }) => {
//     const [averageValue, setAverageValue] = useState(0);
//     const availableProducts = row.original?.availableProducts;
//     const unavailableProducts = row.original?.unavailableProducts;

//     useEffect(() => {
//         if (availableProducts && unavailableProducts) {
//             const products = [...availableProducts, ...unavailableProducts];

//             const amounts = products
//                 .filter((product) => product.deleted_at === false && product.refund === false)
//                 .map((data) => data.adjustedPrice)
//                 .filter((amount) => !isNaN(amount) && amount !== 0);

//             const totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//             const averageValue = Math.floor(totalValue / amounts.length);

//             setAverageValue(averageValue);
//         }
//     }, [availableProducts, unavailableProducts]);

//     return <>{!isNaN(averageValue) && averageValue !== 0 ? averageValue.toLocaleString() : '-'}</>;
// });

// const TaSeokActiveColumn = React.memo(({ row }) => {
//     const availableProducts = row.original?.availableProducts;

//     const isActive =
//         availableProducts &&
//         Array.isArray(availableProducts) &&
//         availableProducts.some((product) => product.productType === 'batterBox');

//     let content = null;
//     let badgeColor = '';

//     if (isActive) {
//         const batterBoxProduct = availableProducts.find((product) => product.productType === 'batterBox');

//         if (batterBoxProduct) {
//             const dDay = batterBoxProduct.dDay;

//             if (dDay <= 10) {
//                 badgeColor = 'danger';
//             } else if (dDay <= 30) {
//                 badgeColor = 'warning';
//             } else {
//                 badgeColor = 'success';
//             }

//             content = `D - ${dDay}`;
//         }
//     } else {
//         content = '비활성';
//         badgeColor = 'dark';
//     }

//     return (
//         <div className="text-center">
//             <Badge bg="" className={`badge-${badgeColor}-lighten`}>
//                 {content}
//             </Badge>
//         </div>
//     );
// });

// const LessonActiveColumn = React.memo(({ row }) => {
//     const availableProducts = row.original?.availableProducts;

//     const isActive =
//         availableProducts &&
//         Array.isArray(availableProducts) &&
//         availableProducts.some((product) => product.productType === 'lesson');

//     let content = null;
//     let badgeColor = '';

//     if (isActive) {
//         const lessonProduct = availableProducts.find((product) => product.productType === 'lesson');
//         if (lessonProduct) {
//             const dDay = lessonProduct.dDay;

//             if (dDay <= 10) {
//                 badgeColor = 'danger';
//             } else if (dDay <= 30) {
//                 badgeColor = 'warning';
//             } else {
//                 badgeColor = 'success';
//             }

//             content = `D - ${dDay}`;

//             content = `D - ${dDay}`;
//         }
//     } else {
//         content = '비활성';
//         badgeColor = 'dark';
//     }

//     return (
//         <div className="text-center">
//             <Badge bg="" className={`badge-${badgeColor}-lighten`}>
//                 {content}
//             </Badge>
//         </div>
//     );
// });

// // accessor
// const cumulativePayAccessor = (row) => {
//     const availableProducts = row.availableProducts;
//     const unavailableProducts = row.unavailableProducts;

//     let totalValue = 0;

//     if (
//         availableProducts &&
//         Array.isArray(availableProducts) &&
//         unavailableProducts &&
//         Array.isArray(unavailableProducts)
//     ) {
//         const products = [...availableProducts, ...unavailableProducts];
//         const amounts = products
//             .filter((product) => product.deleted_at === false && product.refund === false)
//             .map((data) => data.adjustedPrice)
//             .filter((amount) => !isNaN(amount) && amount !== 0);
//         totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//     }

//     return totalValue;
// };

// const averagePayAccessor = (row) => {
//     const availableProducts = row.availableProducts;
//     const unavailableProducts = row.unavailableProducts;

//     let averageValue = 0;

//     if (
//         availableProducts &&
//         Array.isArray(availableProducts) &&
//         unavailableProducts &&
//         Array.isArray(unavailableProducts)
//     ) {
//         const products = [...availableProducts, ...unavailableProducts];
//         const amounts = products
//             .filter((product) => product.deleted_at === false && product.refund === false)
//             .map((data) => data.adjustedPrice)
//             .filter((amount) => !isNaN(amount) && amount !== 0);
//         const totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

//         averageValue = Math.floor(totalValue / amounts.length);
//     }

//     return averageValue;
// };

// const taSeokActive = (row) => {
//     const availableProducts = row.availableProducts;

//     const isActive =
//         availableProducts &&
//         Array.isArray(availableProducts) &&
//         availableProducts.some((product) => product.productType === 'batterBox');
//     if (isActive) {
//         const batterBoxProduct = availableProducts.find((product) => product.productType === 'batterBox');
//         if (batterBoxProduct) {
//             return batterBoxProduct.dDay;
//         }
//     }

//     return -1;
// };

// const lessonActive = (row) => {
//     const availableProducts = row.availableProducts;

//     const isActive =
//         availableProducts &&
//         Array.isArray(availableProducts) &&
//         availableProducts.some((product) => product.productType === 'lesson');
//     if (isActive) {
//         const lessonProduct = availableProducts.find((product) => product.productType === 'lesson');
//         if (lessonProduct) {
//             return lessonProduct.dDay;
//         }
//     }

//     return -1;
// };

// const Columns = [
//     // {
//     //     Header: ' ',
//     //     id: 'checkbox',
//     //     Cell: checkboxColumn,
//     // },
//     {
//         Header: '성함',
//         accessor: 'name',
//         Cell: onClickMemberInfo,
//         sort: true,
//     },
//     {
//         Header: '생성날짜',
//         accessor: 'createdDate',
//         sort: true,
//     },
//     {
//         Header: '시간',
//         accessor: 'createdTime',
//         Cell: CreatedTimeColumn,
//         sort: true,
//     },
//     {
//         Header: '성별',
//         accessor: 'sex',
//         sort: true,
//     },
//     {
//         Header: '생년월일',
//         accessor: 'birthDate',
//         sort: true,
//     },
//     {
//         Header: '연령대',
//         accessor: 'ageGroup',
//         sort: true,
//     },
//     {
//         Header: '전화번호',
//         accessor: 'phone',
//         Cell: PhoneColumn,
//         sort: true,
//     },
//     {
//         Header: '유형',
//         accessor: 'audience',
//         sort: true,
//     },
//     {
//         Header: '위치',
//         accessor: 'location',
//         sort: true,
//     },
//     {
//         Header: '지역',
//         accessor: 'region',
//         sort: true,
//     },
//     {
//         Header: '골프경력',
//         accessor: 'golfPeriod',
//         sort: true,
//     },
//     {
//         Header: '골프목적',
//         accessor: 'golfPurpose',
//         sort: true,
//     },
//     {
//         Header: '관심상품',
//         accessor: 'product',
//         sort: true,
//     },
//     {
//         Header: '유입경로',
//         accessor: 'inflowPath',
//         sort: true,
//     },
//     {
//         Header: '이용시간대',
//         accessor: 'hoursUse',
//         sort: true,
//     },
//     {
//         Header: '부상부위',
//         accessor: 'injuriedPart',
//         Cell: ({ value }) => (value === '없음' ? '' : value),
//         sort: true,
//     },
//     {
//         Header: '마케팅수신동의',
//         accessor: 'marketingRecieveAllow',
//         Cell: MarketingInputColumn,
//         sort: false,
//     },
//     {
//         Header: '개인정보수집동의',
//         accessor: 'privateInfoAllow',
//         Cell: PrivateInputColumn,
//         sort: false,
//     },
//     {
//         Header: '누적결제수',
//         Cell: CumulativePayCount,
//         sort: false,
//     },
//     {
//         Header: 'LTV(누적결제금액)',
//         accessor: cumulativePayAccessor,
//         Cell: CumulativePayAmount,
//         sortType: 'basic',
//         sort: true,
//     },
//     {
//         Header: '평균결제금액',
//         accessor: averagePayAccessor,
//         Cell: AveragePayAmount,
//         sort: true,
//     },
//     {
//         Header: '타석 활성여부',
//         accessor: taSeokActive,
//         Cell: TaSeokActiveColumn,
//         sort: true,
//     },
//     {
//         Header: '레슨 활성여부',
//         accessor: lessonActive,
//         Cell: LessonActiveColumn,
//         sort: true,
//     },
// ];

export default Columns;
