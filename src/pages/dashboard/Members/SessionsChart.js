import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const SessionsChart = ({ activateBatterboxMembers, activateLessonMembers, members, index }) => {
    const [isMonthlyView, setIsMonthlyView] = useState(true); // 월간 데이터 보기 설정
    const sortedMembers = members.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

    const getDaysInMonth = (month, year) => {
        var startDate = new Date(year, month, 1);
        var endDate = new Date(year, month + 1, 0);
        var days = [];

        while (startDate <= endDate) {
            var d = new Date(startDate);
            if (month === d.getMonth()) {
                days.push(d.getDate() + '일');
            }
            startDate.setDate(startDate.getDate() + 1);
        }

        return days;
    };

    const now = new Date(new Date().toISOString().split('T')[0] + ' 00:00:00');
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const labels = isMonthlyView
        ? getDaysInMonth(currentMonth, currentYear)
        : Array(12)
              .fill('')
              .map((_, idx) => idx + 1 + '월');

    // 전체회원 추이
    function calculateDailyAndMonthlyData(members) {
        const dailyData = new Array(labels.length).fill(0);
        const monthlyData = new Array(12).fill(0);

        for (const member of members) {
            const createdDate = new Date(member.createdDate);
            const year = createdDate.getFullYear();
            const month = createdDate.getMonth();
            const day = createdDate.getDate();

            if (year === currentYear && month === currentMonth) {
                const currentDate = new Date();
                const currentDay = currentDate.getDate();

                for (let i = day; i <= currentDay; i++) {
                    dailyData[i]++;
                }
            }

            if (year === currentYear) {
                monthlyData[month]++;
            }
        }

        return isMonthlyView ? dailyData : monthlyData;
    }

    function calculateDailyAndMonthlyData2(members) {
        const dailyData = new Array(labels.length).fill(0);
        const monthlyData = new Array(12).fill(0);

        // member.availableProducts 배열과 member.unavailableProducts 배열을 합친 allProducts 생성
        // allProducts의 startDate ~ endDate 검색
        // refund가 true 라면 endDate 대신 refundDate 사용
        for (const member of members) {
            const allProducts = [...member.availableProducts, ...member.unavailableProducts];
            const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            for (const product of allProducts) {
                if (!product.deleted_at) {
                    const { startDate, endDate, refundDate } = product;
                    const start = new Date(new Date(startDate).toISOString().split('T')[0] + ' 00:00:00');
                    const end = new Date(new Date(endDate).toISOString().split('T')[0] + ' 00:00:00');
                    const refund = refundDate
                        ? new Date(new Date(refundDate).toISOString().split('T')[0] + ' 00:00:00')
                        : false;

                    const startYear = start.getFullYear();
                    const startMonth = start.getMonth();
                    const startDay = start.getDate();
    
                    const endYear = end.getFullYear();
                    const endMonth = end.getMonth();
                    const endDay = end.getDate();
    
                    // refund가 true 라면 end 말고 refund로 찾기
                    if (start <= now && now <= end) {
                        const currentDate = new Date();
                        const currentDay = currentDate.getDate();
                        
                        // startMonth ~ endMonth 사이에 있는 값이
                        // currentMonth에 포함된다면 dailyData에 데이터가 쌓여야 해
                        for (let i = ''; i <= currentDay; i++) {
                            dailyData[i]++;
                        }
                    }


                    // dailyData
                    // if (start <= now <= end) {
                    //     if (startYear === currentYear && startMonth === currentMonth) {
                    //         for (let day = startDay; day <= endDay && day <= lastDayOfCurrentMonth; day++) {
                    //             dailyData[day]++;
                    //         }
                    //     }
                    //     else if (startYear === currentYear && startMonth === currentMonth) {
                    //         for (let day = startDay; day <= lastDayOfCurrentMonth; day++) {
                    //             dailyData[day]++;
                    //         }
                    //     }
                    //     else if (endYear === currentYear && endMonth === currentMonth) {
                    //         for (let day = 1; day <= endDay && day <= lastDayOfCurrentMonth; day++) {
                    //             dailyData[day]++;
                    //         }
                    //     }
                    //     else if (startYear < currentYear && currentYear < endYear) {
                    //         for (let day = 1; day <= lastDayOfCurrentMonth; day++) {
                    //             dailyData[day]++;
                    //         }
                    //     }
                    // }
                    // monthlyData
                    // if (startYear <= currentYear && currentYear <= endYear) {
                    //     for (let month = 0; month < 12; month++) {
                    //         const firstDayOfMonth = new Date(currentYear, month, 1);
                    //         const lastDayOfMonth = new Date(currentYear, month + 1, 0);
    
                    //         if (refund && refund >= firstDayOfMonth && refund <= lastDayOfMonth) {
                    //             monthlyData[month]++;
                    //         }
                    //     }
                    // }
                }
            }
        }

        return isMonthlyView ? dailyData : monthlyData;
    }

    // member.availableProducts 배열과 member.unavailableProducts 배열을 합친 allProducts 생성
    // allProducts 를 탐색
    // 1. !allProducts.deleted_at 
    // 2. allProducts.productType === 'batterBox'
    // 이면 타석 멤버로 저장
    

    const filterMembersByProductType = (productType) => {
        return members.map((member) => {
            const allProducts = [...member.availableProducts, ...member.unavailableProducts];
            if (allProducts.some((product) => !product.deleted_at && product.productType === productType)) {
                return member;
            }
            return null;
        }).filter((member) => member !== null);
    };
    
    const batterboxMembers = filterMembersByProductType('batterBox');
    const lessonMembers = filterMembersByProductType('lesson');
    
    // console.log('batterboxMembers', batterboxMembers);
    // console.log('lessonMembers', lessonMembers);
    
    const apexBarChartData = [
        {
            name: '전체회원 추이',
            data: calculateDailyAndMonthlyData(sortedMembers),
        },
    ];

    const apexBarChartData2 = [
        {
            name: '타석활성 회원 추이',
            data: activateBatterboxMembers,
        },
    ];

    const apexBarChartData3 = [
        {
            name: '레슨활성 회원 추이',
            data: activateLessonMembers,
        },
    ];

    const apexBarChartOpts = {
        chart: {
            height: 309,
            type: 'area',
            toolbar: {
                show: false, // zoom, download 기능
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 5,
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#0acf97'],
        xaxis: {
            type: 'string',
            categories: labels,
            tooltip: {
                enabled: false,
            },
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            // min: 0,
            // max: 5,
            // forceNiceScale: true,
            labels: {
                offsetX: 0,
                // offsetX: -50, // hide
                formatter(value) {
                    return value.toFixed(0);
                },
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '명';
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.1,
                stops: [45, 100],
            },
        },
    };

    return (
        <>
            {index === 1 && (
                <>
                    {' '}
                    <Card>
                        <Card.Body>
                            <ul className="nav float-end d-lg-flex">
                                <li className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link ${isMonthlyView ? 'active' : 'text-muted'}`}
                                        onClick={() => setIsMonthlyView(true)}>
                                        월간
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link ${!isMonthlyView ? 'active' : 'text-muted'}`}
                                        onClick={() => setIsMonthlyView(false)}>
                                        년간
                                    </Link>
                                </li> */}
                            </ul>
                            <h4 className="header-title mb-3">타석 활성 회원 추이</h4>
                            <Chart
                                options={apexBarChartOpts}
                                series={apexBarChartData2}
                                type="area"
                                className="apex-charts mt-3"
                                height={308}
                            />
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <ul className="nav float-end d-lg-flex">
                                <li className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link ${isMonthlyView ? 'active' : 'text-muted'}`}
                                        onClick={() => setIsMonthlyView(true)}>
                                        월간
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link ${!isMonthlyView ? 'active' : 'text-muted'}`}
                                        onClick={() => setIsMonthlyView(false)}>
                                        년간
                                    </Link>
                                </li> */}
                            </ul>
                            <h4 className="header-title mb-3">레슨 활성 회원 추이</h4>
                            <Chart
                                options={apexBarChartOpts}
                                series={apexBarChartData3}
                                type="area"
                                className="apex-charts mt-3"
                                height={308}
                            />
                        </Card.Body>
                    </Card>
                </>
            )}

            {index !== 1 && (
                <Card>
                    <Card.Body>
                        <ul className="nav float-end d-lg-flex">
                            <li className="nav-itemㄴ">
                                <Link
                                    to="#"
                                    className={`nav-link ${isMonthlyView ? 'active' : 'text-muted'}`}
                                    onClick={() => setIsMonthlyView(true)}>
                                    월간
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="#"
                                    className={`nav-link ${!isMonthlyView ? 'active' : 'text-muted'}`}
                                    onClick={() => setIsMonthlyView(false)}>
                                    년간
                                </Link>
                            </li>
                        </ul>
                        <h4 className="header-title mb-3">전체 회원 추이</h4>
                        <Chart
                            options={apexBarChartOpts}
                            series={apexBarChartData}
                            type="area"
                            className="apex-charts mt-3"
                            height={308}
                        />
                    </Card.Body>
                </Card>
            )}
        </>
    );
};

export default SessionsChart;
