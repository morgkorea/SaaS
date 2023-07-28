
const mkData = [
    {
        title: '광고비',
        stats: 20000000,
        value: 2000000,
        color: 'text-success',
        icon: 'up',
    },
    {
        title: '1000회 노출당 비용 (CPM)',
        stats: 10000,
        value: '-',
        color: '',
        icon: '',
    },
    {
        title: '광고수익률 (ROAS)',
        stats: 2000,
        value: 150,
        color: 'text-success',
        icon: 'down',
    },
    {
        title: '고객 1명 획득비용 (CAC)',
        stats: 33333,
        value: 10000,
        color: 'text-danger',
        icon: 'down',
    },
    {
        title: '객단가',
        stats: 900000,
        value: 200000,
        color: 'text-success',
        icon: 'up',
    },
    {
        title: '매출',
        stats: 2000000000,
        value: 2000000,
        color: 'text-success',
        icon: 'up',
    }
]

const channelData = [
    {
        channel: '네이버 플레이스',
        type: '타석',
        impression: 478, // 노출 수
        cpm: 10231231, // 1000회 노출당 비용
        linkStats: 310, // 링크 클릭 수
        ctr: 40, // 클릭률
        cpc: 10231231, // 클릭당 비율
        cvr: 10, // 전환율
        cost: 112300,
        color: 'primary',
    },
    {
        channel: '네이버 파워링크',
        type: '타석',
        impression: 478,
        cpm: 10231231,
        linkStats: 224,
        ctr: 30,
        cpc: 10231231,
        cvr: 20,
        cost: 203234,
        color: 'danger',
    },
    {
        channel: '메타',
        type: '타석',
        impression: 478,
        cpm: 10231231,
        linkStats: 142,
        ctr: 20,
        cpc: 10231231,
        cvr: 30,
        cost: 150000,
        color: 'success',
    },
    {
        channel: '당근마켓',
        type: '타석',
        impression: 78,
        cpm: 10231231,
        linkStats: 84,
        ctr: 10,
        cpc: 10231231,
        cvr: 40,
        cost: 80000,
        color: 'warning',
    },
    
];

export { mkData, channelData };
