export const firestoreDbSchema = ({ username, phone, email, userCode }) => {
    // Users > email ID > firestoreSchema
    const firestoreSchema = {
        email: email,
        username: username,
        userCode: userCode,
        ownerPhone: phone, //type string : ex) '010xxxxxxxx' || "",
        role: 'Admin',
        // owner, coworker
        store: '',
        // 매장명_지점
        photoUrl: '',
    };

    return firestoreSchema;
};

export const firestoreSalesProductSchema = {
    productCode: '', // 상품코드 , type:string ,
    product: '', //type: string 상품
    productType: '', // type: string (batterBox,lesson,locker,etc)
    regularPrice: 0, // type: number 상품 정상가
    discountRate: 0, // type: number 할인율
    discountPrice: 0, // type: number 할인가
    adjustedPrice: 0, // type: number 조정금액 (최종가)
    startDate: '', //type: string (yyyy-MM-dd) 시작일
    endDate: '', // type: string (yyyy-MM-dd) 종료일
    expirationPeriod: '', //type string "1개월","150일"
    paymentDate: '',
    paymentTime: '',
    refund: false,
    refundDate: false,
    refundAdjustment: 0, // type: number 원래 환불 금액과 실제 환불 금액 사이의 차액

    deleted_at: false,
};

export const firestorePaymentInfoFieldSchema = {
    paymentMethod: '',
    paymentPrice: 0,
    paymentReceiptNumber: '',
};

export const firestoreSalesFieldSchema = {
    paymentNumber: '', //type: string 결제번호
    paymentDate: '', //type: string (yyyy-MM-dd) 결제일
    paymentTime: '', //type: string (hh:mm:ss) //결제시간
    registrationType: '', //등록구분
    name: '', //type: string 이름
    phone: '', //type string 전화번호 010xxxxyyyy
    salesProducts: [
        // {
        //     ...firestoreSalesProductSchema,
        // },
    ], //type : array, elements : object 결제상품
    totalPaymentPrice: 0, //type: number 결제총액
    remainingPaymentPrice: 0, //type: number 미결제금액
    paymentInfo: [
        // { ...firestorePaymentInfoFieldSchema }
    ], //type: array, element: object
    paymentMemo: '', //type: string결제메모
    refund: false, // type: boolean 환불여부
    refundDate: '', //type: string yyyy-MM-dd 환불일
    refundPrice: 0, //type: number 환불액
    refundPenaltyPrice: 0,
    refundReason: '', //type: string 환불사유
    deleted_at: false,
};

export const firestoreProductsFieldSchema = {
    productCode: '', // 상품코드 , type:string , (고객사코드_종류_기간_번호)    KO0001_ME_091_001
    product: '', //상품명, type:string
    type: '', // 상품종류, type:string
    expirationPeriod: '', //유효기간 (일) type:string
    expirationCount: 0, //유효횟수 type:number
    regularPrice: 0, //가격 type:number
    activation: true, //활성화,
    createdDate: '', // type:string yyyy-mm-dd
    modifiedDate: '', // type:string yyyy-mm-dd
};
export const firestoreMembersMemoSchema = {
    contents: '', //type: string ,
    created: '', //type: string 생성날짜,시간 yyyy-mm-dd hh:mm
};
export const firestoreMemebersFieldSchema = {
    ownerId: '',
    typeFormToken: '',
    createdDate: new Date().toISOString().split('T')[0], //date 생성날짜 2023-04-23
    createdTime: new Date().toISOString().split('T')[1].split('.')[0], //time 생성시간 04:10:42
    name: '', //이름
    phone: '', //전화번호 type:string 형식: 010XXXXYYYY
    sex: '', //성별
    birthDate: '', //date 생일
    ageGroup: '', //연령대
    location: '', //위치
    golfPeriod: '', //골프경력
    golfPurpose: '', //골프목적
    hoursUse: '', //이용시간
    // injuries: '', //부상전적
    injuriedPart: '', //부상부위
    marketingRecieveAllow: false, //마케팅수신동의
    privateInfoAllow: false, //개인정보수집동의
    amountPayments: '', //누적결제수
    lifetimeValue: '', //LTV - 누적결제금액
    amountPaymentAverage: '', //평균결제금액
    audience: '', //오디언스
    activation: false, //활성여부 false || true
    region: '', // 지역
    inflowPath: '', // 유입경로
    product: '', // 관심상품
    memo: [
        //  {...firestoreMembersMemo}
    ],
    //이용가능상품
    availableProducts: [
        // { ...firestoreSalesProductSchema }
    ],

    //이용불가상품
    unavailableProducts: [
        // { ...firestoreSalesProductSchema }
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
        consultant: '', //상담
        name: '', //이름
        phone: '', //전화번호
        sex: '', //성별
        age: '', //나이
        inflowRoute: '', //유입경로
        location: '', //위치
        golfPeriod: '', //골프경력
        golfPurpose: '', //골프목적
        hoursUse: '', //이용시간
        // injuries: '', //부상전적
        injuredPart: '', //부상부위
        registrationType: '', //등록구분
        etcConsulting: '', //기타상담내용
    },
];
