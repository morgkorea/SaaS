const MENU_ITEMS = [
    { key: 'dashboards', label: '대시보드', isTitle: true },
    {
        key: 'dashboards',
        label: '대시보드',
        isTitle: false,
        icon: 'uil-chart-line',
        badge: { variant: 'success' },
        children: [
            {
                key: 'ds-sales-status',
                label: '매출',
                url: '/dashboard/sales-status',
                parentKey: 'dashboards',
            },

            {
                key: 'ds-members',
                label: '회원',
                url: '/dashboard/members',
                parentKey: 'dashboards',
            },
            {
                key: 'members-db',
                label: '회원DB',
                url: '/dashboard/members-db',
                parentKey: 'dashboards',
            },
            // {
            //     key: 'ds-counsel',
            //     label: '상담',
            //     url: '/dashboard/counsel',
            //     parentKey: 'dashboards',
            // },
            // {
            //     key: 'ds-marketing',
            //     label: 'Dashboard_마케팅',
            //     url: '/dashboard/marketing',
            //     parentKey: 'dashboards',
            //     // badge: { variant: 'danger', text: 'New' },
            // },
            // {
            //     key: 'ds-marketing2',
            //     label: '마케팅',
            //     url: '/dashboard/marketing2',
            //     parentKey: 'dashboards',
            // },
        ],
    },
    { key: 'database', label: 'DB', isTitle: true },
    {
        key: 'database',
        label: 'DB',
        isTitle: false,
        icon: 'uil-database-alt',
        badge: { variant: 'success' },
        children: [
            {
                key: 'sales-db',
                label: '매출 DB',
                url: '/database/sales-db',
                parentKey: 'database',
            },
            {
                key: 'product-db',
                label: '상품 DB',
                url: '/database/product-db',
                parentKey: 'database',
            },
        ],
    },
];

export default MENU_ITEMS;
