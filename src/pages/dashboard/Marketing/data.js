
const mkData = [
    {
        title: '노출 수',
        stats: 36254 + '회',
        value: 5.27 + '%',
        color: 'text-success',
        icon: 'up',
    },
    {
        title: '링크클릭 수',
        stats: 500 + '회',
        value: 50 + '회',
        color: 'text-danger',
        icon: 'down',
    },
    {
        title: '타입폼 작성, 매장방문자 수',
        stats: 150 + '명',
        value: 10 + '명',
        color: 'text-success',
        icon: 'up',
    },
    {
        title: '1000회 노출당 비용 (CPM)',
        stats: 36254 + '원',
        value: 5.27 + '%',
        color: 'text-danger',
        icon: 'down',
    },
    {
        title: '링크 클릭률 (CTR)',
        stats: 1.23 + '%',
        value: 0.2 + '%',
        color: 'text-success',
        icon: 'up',
    },
    {
        title: '매장방문전환율 (CVR)',
        stats: 1.23 + '%',
        value: 3 + '%',
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
