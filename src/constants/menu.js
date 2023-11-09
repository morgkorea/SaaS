const MENU_ITEMS = [
    // { key: 'dashboards', label: '대시보드', isTitle: true },
    {
        key: 'dashboards',
        label: '대시보드',
        isTitle: false,
        icon: 'uil-chart-line',
        badge: { variant: 'success' },
        children: [
            {
                key: 'sales-status',
                label: '매출',
                url: '/dashboard/sales-status',
                parentKey: 'dashboards',
            },

            {
                key: 'members',
                label: '회원',
                url: '/dashboard/members',
                parentKey: 'dashboards',
            },
            {
                key: 'counsel',
                label: '상담',
                url: '/dashboard/counsel',
                parentKey: 'dashboards',
            },
            // {
            //     key: 'ds-marketing',
            //     label: 'Dashboard_마케팅',
            //     url: '/dashboard/marketing',
            //     parentKey: 'dashboards',
            //     // badge: { variant: 'danger', text: 'New' },
            // },
        ],
    },
    // { key: 'database', label: 'DB', isTitle: true },
    {
        key: 'database',
        label: 'DB',
        isTitle: false,
        icon: 'uil-database-alt',
        badge: { variant: 'success' },
        children: [
            {
                key: 'sales-db',
                label: '매출',
                url: '/database/sales-db',
                parentKey: 'database',
            },
            {
                key: 'members-db',
                label: '회원',
                url: '/database/members-db',
                parentKey: 'database',
            },
            {
                key: 'product-db',
                label: '상품',
                url: '/database/product-db',
                parentKey: 'database',
            },
        ],
    },
    {
        key: 'shop',
        label: 'B2B전용몰',
        isTitle: false,
        icon: 'uil-desktop',
        exUrl: 'https://smartstore.naver.com/bestify',
        target: '_blank',
        badge: { variant: 'danger', text: 'New' },
    },
    {
        key: 'commerce',
        label: 'MORG Market',
        isTitle: false,
        icon: 'uil-desktop',
        exUrl: 'https://morg.cafe24.com/',
        target: '_blank',
        badge: { variant: 'danger', text: 'New' },
    },
];

export default MENU_ITEMS;
