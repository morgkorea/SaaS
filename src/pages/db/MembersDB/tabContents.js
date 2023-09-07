const tabContents = [
    {
        id: '1',
        title: '전체회원',
        group: [
            { category: '전체' },
            { category: '활성회원' },
            { category: '만료회원' },
            {
                category: '구력별',
                subgroup: [
                    { subcategory: '비기너' },
                    { subcategory: '1~3년' },
                    { subcategory: '3~5년' },
                    { subcategory: '5년 이상' },
                ],
            },
            {
                category: '연령별',
                subgroup: [
                    { subcategory: '10대' },
                    { subcategory: '20대' },
                    { subcategory: '30대' },
                    { subcategory: '40대' },
                    { subcategory: '50대' },
                    { subcategory: '60대 이상' },
                ],
            },
            {
                category: '유형별',
                subgroup: [{ subcategory: '잠재' }, { subcategory: '신규' }, { subcategory: '재등록' }],
            },
            {
                category: '목적별',
                subgroup: [
                    { subcategory: '골프 입문' },
                    { subcategory: '스윙 교정' },
                    { subcategory: '비거리 향상' },
                    { subcategory: '스코어' },
                    { subcategory: '숏게임' },
                    { subcategory: '퍼팅' },
                    { subcategory: '필드' },
                    { subcategory: '백돌이 탈출' },
                ],
            },
            {
                category: '관심상품별',
                subgroup: [{ subcategory: '레슨' }, { subcategory: '타석' }],
            },
            {
                category: '유입경로별',
                subgroup: [
                    { subcategory: '네이버' },
                    { subcategory: '지인추천' },
                    { subcategory: '인스타그램' },
                    { subcategory: '입주사' },
                    { subcategory: '제휴사' },
                    { subcategory: '카카오톡 채널' },
                    { subcategory: '당근마켓' },
                    { subcategory: '전단지' },
                    { subcategory: '외부간판 및 현수막' },
                ],
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

export default tabContents;
