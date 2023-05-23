export const firestoreDbSchema = ({ username, email }) => {
    // Users > email ID > firestoreSchema
    const firestoreSchema = {
        email: email,
        username: username,
        role: 'Admin',
        // owner, coworker
        store: '엘파르케_양재',
        // 매장명_지점
        photoUrl: 'img.jpn',
        ownerPhone: '010-7178-1117', //ex) '010-xxxx-xxxx' || null,
        //회원DB
        members: [...firestoreMemebersFieldSchema],

        //매출DB
        sales: {
            ...firestoreSalesFieldSchema,
        },

        //상품DB
        products: {
            ...firestoreProductsFieldSchema,
        },

        //마케팅DB
        marketing: {
            ...firestoreMarketingFieldSchema,
        },

        //컨설팅DB
        consulting: {
            ...firestoreConsultingFieldSchema,
        },
    };

    return firestoreSchema;
};

export const firestoreMemebersFieldSchema = [
    //회원DB

    {
        typeFormToken: '',
        memberNumber: '', //회원번호
        createdDate: '', //date 생성날짜 2023-04-23
        createdTime: '', //time 생성시간 04:10:42
        name: '', //이름
        phone: '', //전화번호
        sex: '', //성별
        birthDate: '', //date 생일
        ageGroup: '', //연령대
        location: '', //위치
        golfPeriod: '', //골프경력
        golfPurpose: '', //골프목적
        hoursUse: '', //이용시간
        injuries: '', //부상전적
        injuriedPart: '', //부상부위
        marketingRecieveAllow: false, //마케팅수신동의
        privateInfoAllow: false, //개인정보수집동의
        amountPayments: '', //누적결제수
        lifetimeValue: '', //LTV - 누적결제금액
        amountPaymentAverage: '', //평균결제금액
        audience: '', //오디언스
        activation: false, //활성여부 false || true

        //이용가능상품
        availableProducts: [
            {
                activateProduct: '레슨', //활성상품
                startDate: '2023-05-24', //시작일
                endDate: '2023-05-30', //종료일
                dDays: '6', //남은일수 endDate - startDate
            },
            {
                activateProduct: '락커', //활성상품
                startDate: '2023-02-19', //시작일
                endDate: '2023-07-19', //종료일
                dDays: '120', //남은일수
            },
        ],

        //이용불가상품
        unavailableProducts: [
            {
                inactiveProduct: '락커', //종료상품
                startDate: '2023-02-19', //시작일
                endDate: '2023-02-19', //종료일
                dDays: 0, //남은일수
            },
        ],
    },
];

export const firestoreSalesFieldSchema = [
    {
        paymentNumber: '', //결제번호
        paymentDate: '', //결제일
        registrationType: '', //등록구분
        memeberNumber: '', //회원번호
        name: '', //이름
        phone: '', //전화번호
        products: [
            {
                product: '', //상품
                regularPrice: '', //상품 정상가
                discountRate: '', // 할인율
                discountPrice: '', //할인가
                startDate: '', // 시작일
                endDate: '', // 종료일
            },
        ],
        totalPaymentPrice: '', //결제총액
        outstandingPrice: '', //미결제금액
        paymentMethod: '', //결제수단
        recieptNumber: '', // 결제번호
        paymentMemo: '', //결제메모
        refundRequest_date: '', //환불요청일 2023-09-23
        refundDate: '', //환불일 2023-10-22
        refundPrice: '', //환불액
        refundReason: '',
    },
];
export const firestoreProductsFieldSchema = {
    batterBox: [
        //타석
        {
            productsName: '30분권', //상품명
            expirationPeriod: '30일', //유효기간
            expirationCount: '2', //유효횟수
            price: '40000', //가격
        },
        {
            productsName: '20분권', //상품명
            expirationPeriod: '31일', //유효기간
            expirationCount: '5', //유효횟수
            price: '70000', //가격
        },
    ],
    lesson: [
        {
            productsName: '30분권', //상품명
            expirationPeriod: '30일', //유효기간
            expirationCount: '2', //유효횟수
            price: '40000', //가격
        },
        {
            productsName: '20분권', //상품명
            expirationPeriod: '31일', //유효기간
            expirationCount: '5', //유효횟수
            price: '70000', //가격
        },
    ],
    locker: [
        {
            productsName: '30분권', //상품명
            expirationPeriod: '30일', //유효기간
            expirationCount: '2', //유효횟수
            price: '40000', //가격
        },
        {
            productsName: '20분권', //상품명
            expirationPeriod: '31일', //유효기간
            expirationCount: '5', //유효횟수
            price: '70000', //가격
        },
    ],
    etc: [
        {
            productsName: '30분권', //상품명
            expirationPeriod: '30일', //유효기간
            expirationCount: '2', //유효횟수
            price: '40000', //가격
        },
        {
            productsName: '20분권', //상품명
            expirationPeriod: '31일', //유효기간
            expirationCount: '5', //유효횟수
            price: '70000', //가격
        },
    ],
};

export const firestoreMarketingFieldSchema = {
    marketingDate: '2023-06-11', //날짜
    platform: 'banner', //플랫폼
    campaign: '버디버디', //캠페인명
    campaignType: '트래픽', //캠페인유형
    exposureCount: '234234', //노출수
    amountClick: '324', //클릭수
    clickTroughRate: '70%', //클릭율 CTR
    costPerClick: '100', //평균클릭비용 CPC
    amountTotalPricke: '3403042034', // 총비용
    costPerMille: '232333', //1000회 노출당 비용
};

export const firestoreCouponFieldSchema = [
    {
        couponName: '쿠폰1', //쿠폰명
        applicableProduct: '레슨', //적용가능상품
        discountRate: '30%', //할인율
        discountPrice: '50000', //할인금액
    },
    {
        couponName: '쿠폰3', //쿠폰명
        applicableProduct: '타석', //적용가능상품
        discountRate: '30%', //할인율
        discountPrice: '50000', //할인금액
    },
    {
        couponName: '쿠폰2', //쿠폰명
        applicableProduct: '락커', //적용가능상품
        discountDate: '25%', //할인율
        discountPrice: '30000', //할인금액
    },
];
export const firestoreConsultingFieldSchema = [
    {
        consultingDate: '', //상담날짜 2023-4-14
        consultingTime: '', //상담시간 T04:10:42.000Z
        consultant: '', //상담자
        memberNumber: '', //회원번호
        name: '', //이름
        phone: '', //전화번호
        sex: '', //성별
        age: '', //나이
        inflowRoute: '', //유입경로
        location: '', //위치
        golfPeriod: '', //골프경력
        golfPurpose: '', //골프목적
        hoursUse: '', //이용시간
        injuries: '', //부상전적
        injuredPart: '', //부상부위
        registrationType: '', //등록구분
        etcConsulting: '', //기타상담내용
    },
];
export const createMembersAvailableProduct = (activateProduct, startDate, endDate, dDays) => {
    return {
        activateProduct: activateProduct, //활성상품
        startDate: startDate, //시작일
        endDate: endDate, //종료일
        dDays: dDays, //남은일수
    };
};
