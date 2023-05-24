const salesData = [
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '김유환',
        유형: '신규',
        연령: '60대 이상',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '스윙 교정',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '외부간판 및 현수막',
        marketingAgreements: true,
        개인정보동의: false,
        누적결제수: 1,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '일시중지', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '주용환',
        유형: '재등록',
        연령: '20대',
        휴대전화번호: '010-7644-9951',
        위치: '직장',
        경력: '비기너',
        목적: '비거리 향상',
        관심상품: '타석권',
        이용시간대: '낮',
        부상전적: '무',
        부상부위: '',
        유입경로: '네이버',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 2,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '이수민',
        유형: '신규',
        연령: '30대',
        휴대전화번호: '010-7644-9951',
        위치: '기타',
        경력: '1~3년',
        목적: '스윙 교정',
        관심상품: '레슨 + 타석권',
        이용시간대: '저녁',
        부상전적: '유',
        부상부위: '팔꿈치',
        유입경로: '지인추천',
        marketingAgreements: false,
        개인정보동의: false,
        누적결제수: 3,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '비활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '심하은',
        유형: '재등록',
        연령: '40대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '3~5년',
        목적: '숏게임',
        관심상품: '타석권',
        이용시간대: '밤',
        부상전적: '유',
        부상부위: '무릎',
        유입경로: '당근마켓',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 4,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '유승훈',
        유형: '신규',
        연령: '10대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '퍼팅',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '인스타그램',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 5,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '김유환',
        유형: '신규',
        연령: '60대 이상',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '스윙 교정',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '외부간판 및 현수막',
        marketingAgreements: true,
        개인정보동의: false,
        누적결제수: 1,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '주용환',
        유형: '재등록',
        연령: '20대',
        휴대전화번호: '010-7644-9951',
        위치: '직장',
        경력: '비기너',
        목적: '비거리 향상',
        관심상품: '타석권',
        이용시간대: '낮',
        부상전적: '무',
        부상부위: '',
        유입경로: '네이버',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 2,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '이수민',
        유형: '신규',
        연령: '30대',
        휴대전화번호: '010-7644-9951',
        위치: '기타',
        경력: '1~3년',
        목적: '스윙 교정',
        관심상품: '레슨 + 타석권',
        이용시간대: '저녁',
        부상전적: '유',
        부상부위: '팔꿈치',
        유입경로: '지인추천',
        marketingAgreements: false,
        개인정보동의: false,
        누적결제수: 3,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '비활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '심하은',
        유형: '재등록',
        연령: '40대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '3~5년',
        목적: '숏게임',
        관심상품: '타석권',
        이용시간대: '밤',
        부상전적: '유',
        부상부위: '무릎',
        유입경로: '당근마켓',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 4,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '유승훈',
        유형: '신규',
        연령: '10대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '퍼팅',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '인스타그램',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 5,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '김유환',
        유형: '신규',
        연령: '60대 이상',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '스윙 교정',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '외부간판 및 현수막',
        marketingAgreements: true,
        개인정보동의: false,
        누적결제수: 1,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '주용환',
        유형: '재등록',
        연령: '20대',
        휴대전화번호: '010-7644-9951',
        위치: '직장',
        경력: '비기너',
        목적: '비거리 향상',
        관심상품: '타석권',
        이용시간대: '낮',
        부상전적: '무',
        부상부위: '',
        유입경로: '네이버',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 2,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '이수민',
        유형: '신규',
        연령: '30대',
        휴대전화번호: '010-7644-9951',
        위치: '기타',
        경력: '1~3년',
        목적: '스윙 교정',
        관심상품: '레슨 + 타석권',
        이용시간대: '저녁',
        부상전적: '유',
        부상부위: '팔꿈치',
        유입경로: '지인추천',
        marketingAgreements: false,
        개인정보동의: false,
        누적결제수: 3,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '비활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '심하은',
        유형: '재등록',
        연령: '40대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '3~5년',
        목적: '숏게임',
        관심상품: '타석권',
        이용시간대: '밤',
        부상전적: '유',
        부상부위: '무릎',
        유입경로: '당근마켓',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 4,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '유승훈',
        유형: '신규',
        연령: '10대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '퍼팅',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '인스타그램',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 5,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '김유환',
        유형: '신규',
        연령: '60대 이상',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '스윙 교정',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '외부간판 및 현수막',
        marketingAgreements: true,
        개인정보동의: false,
        누적결제수: 1,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '주용환',
        유형: '재등록',
        연령: '20대',
        휴대전화번호: '010-7644-9951',
        위치: '직장',
        경력: '비기너',
        목적: '비거리 향상',
        관심상품: '타석권',
        이용시간대: '낮',
        부상전적: '무',
        부상부위: '',
        유입경로: '네이버',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 2,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '이수민',
        유형: '신규',
        연령: '30대',
        휴대전화번호: '010-7644-9951',
        위치: '기타',
        경력: '1~3년',
        목적: '스윙 교정',
        관심상품: '레슨 + 타석권',
        이용시간대: '저녁',
        부상전적: '유',
        부상부위: '팔꿈치',
        유입경로: '지인추천',
        marketingAgreements: false,
        개인정보동의: false,
        누적결제수: 3,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '비활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '심하은',
        유형: '재등록',
        연령: '40대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '3~5년',
        목적: '숏게임',
        관심상품: '타석권',
        이용시간대: '밤',
        부상전적: '유',
        부상부위: '무릎',
        유입경로: '당근마켓',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 4,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '유승훈',
        유형: '신규',
        연령: '10대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '퍼팅',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '인스타그램',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 5,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '김유환',
        유형: '신규',
        연령: '60대 이상',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '스윙 교정',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '외부간판 및 현수막',
        marketingAgreements: true,
        개인정보동의: false,
        누적결제수: 1,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '주용환',
        유형: '재등록',
        연령: '20대',
        휴대전화번호: '010-7644-9951',
        위치: '직장',
        경력: '비기너',
        목적: '비거리 향상',
        관심상품: '타석권',
        이용시간대: '낮',
        부상전적: '무',
        부상부위: '',
        유입경로: '네이버',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 2,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '이수민',
        유형: '신규',
        연령: '30대',
        휴대전화번호: '010-7644-9951',
        위치: '기타',
        경력: '1~3년',
        목적: '스윙 교정',
        관심상품: '레슨 + 타석권',
        이용시간대: '저녁',
        부상전적: '유',
        부상부위: '팔꿈치',
        유입경로: '지인추천',
        marketingAgreements: false,
        개인정보동의: false,
        누적결제수: 3,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '비활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '심하은',
        유형: '재등록',
        연령: '40대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '3~5년',
        목적: '숏게임',
        관심상품: '타석권',
        이용시간대: '밤',
        부상전적: '유',
        부상부위: '무릎',
        유입경로: '당근마켓',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 4,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '유승훈',
        유형: '신규',
        연령: '10대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '퍼팅',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '인스타그램',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 5,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '김유환',
        유형: '신규',
        연령: '60대 이상',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '스윙 교정',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '외부간판 및 현수막',
        marketingAgreements: true,
        개인정보동의: false,
        누적결제수: 1,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '주용환',
        유형: '재등록',
        연령: '20대',
        휴대전화번호: '010-7644-9951',
        위치: '직장',
        경력: '비기너',
        목적: '비거리 향상',
        관심상품: '타석권',
        이용시간대: '낮',
        부상전적: '무',
        부상부위: '',
        유입경로: '네이버',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 2,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '이수민',
        유형: '신규',
        연령: '30대',
        휴대전화번호: '010-7644-9951',
        위치: '기타',
        경력: '1~3년',
        목적: '스윙 교정',
        관심상품: '레슨 + 타석권',
        이용시간대: '저녁',
        부상전적: '유',
        부상부위: '팔꿈치',
        유입경로: '지인추천',
        marketingAgreements: false,
        개인정보동의: false,
        누적결제수: 3,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '비활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '심하은',
        유형: '재등록',
        연령: '40대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '3~5년',
        목적: '숏게임',
        관심상품: '타석권',
        이용시간대: '밤',
        부상전적: '유',
        부상부위: '무릎',
        유입경로: '당근마켓',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 4,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
    {
        회원번호: '000111',
        생성날짜: '2023.05.04 12:12',
        성함: '유승훈',
        유형: '신규',
        연령: '10대',
        휴대전화번호: '010-7644-9951',
        위치: '자택',
        경력: '5년 이상',
        목적: '퍼팅',
        관심상품: '레슨',
        이용시간대: '오전',
        부상전적: '유',
        부상부위: '손가락',
        유입경로: '인스타그램',
        marketingAgreements: true,
        개인정보동의: true,
        누적결제수: 5,
        LTV: 11222222,
        평균결제금액: 11222222,
        활성: '활성', 
    },
]

export { salesData };