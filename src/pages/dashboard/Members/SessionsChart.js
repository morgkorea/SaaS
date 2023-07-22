import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const SessionsChart = ({ members, index }) => {
    const [isMonthlyView, setIsMonthlyView] = useState(true); // 월간 데이터 보기 설정
    const sortedMembers = members.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
    const taSeokMembers = members.filter((member) =>
        member.availableProducts?.some((product) => product && product.product && product.product.includes('타석'))
    );
    const lessonMembers = members.filter((member) =>
        member.availableProducts?.some((product) => product && product.product && product.product.includes('레슨'))
    );

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

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const labels = isMonthlyView
        ? getDaysInMonth(currentMonth, currentYear)
        : Array(12)
              .fill('')
              .map((_, idx) => idx + 1 + '월');

    // // 전체회원 추이
    // function calculateDailyAndMonthlyData(members) {
    //     const dailyData = new Array(labels.length).fill(0);
    //     const monthlyData = new Array(12).fill(0);

    //     for (const member of members) {
    //         const createdDate = new Date(member.createdDate);
    //         const year = createdDate.getFullYear();
    //         const month = createdDate.getMonth();
    //         const day = createdDate.getDate();

    //         if (year === currentYear && month === currentMonth) {
    //             dailyData[day - 1]++;
    //         }
    //         if (year === currentYear) {
    //             monthlyData[month]++;
    //         }
    //     }

    //     return isMonthlyView ? dailyData : monthlyData;
    // }

    // // 타석 추이
    // function calculateDailyAndMonthlyData2(members) {
    //     const dailyData = new Array(labels.length).fill(0);
    //     const monthlyData = new Array(12).fill(0);

    //     const product = '타석';

    //     for (const member of members) {
    //         const availableProductsFiltered = member.availableProducts.filter(
    //             (productInfo) =>
    //                 productInfo &&
    //                 productInfo.product &&
    //                 productInfo.product.includes(product) &&
    //                 new Date(productInfo.startDate) <= new Date() &&
    //                 new Date(productInfo.endDate) >= new Date()
    //         );

    //         const unavailableProductsFiltered = member.unavailableProducts.filter(
    //             (productInfo) =>
    //                 productInfo &&
    //                 productInfo.product &&
    //                 productInfo.product.includes(product) &&
    //                 new Date(productInfo.startDate) <= new Date() &&
    //                 new Date(productInfo.endDate) >= new Date()
    //         );

    //         const intersection = [...availableProductsFiltered, ...unavailableProductsFiltered];

    //         console.log(intersection);

    //         // if (intersection.length > 0) {
    //         //     intersection.forEach((productInfo) => {
    //         //         const productStartDate = new Date(productInfo.startDate);
    //         //         const productEndDate = new Date(productInfo.endDate);

    //         //         let currentDate = new Date(productStartDate);

    //         //         while (currentDate <= productEndDate) {
    //         //             if (
    //         //                 (!isMonthlyView && currentDate.getMonth() === currentMonth) ||
    //         //                 (isMonthlyView &&
    //         //                     currentDate.getMonth() === currentMonth &&
    //         //                     currentDate.getDate() >= productStartDate.getDate())
    //         //             ) {
    //         //                 if (isMonthlyView) {
    //         //                     monthlyData[currentDate.getDate() - 1]++;
    //         //                 } else {
    //         //                     dailyData[currentDate.getDate() - 1]++;
    //         //                 }
    //         //             }

    //         //             currentDate.setDate(currentDate.getDate() + 1);
    //         //         }
    //         //     });
    //         // }
    //     }

    //     return isMonthlyView ? dailyData : monthlyData;
    // }

    // const chartData = calculateDailyAndMonthlyData(sortedMembers, '전체');
    // const chartData2 = calculateDailyAndMonthlyData2(members);
    // const chartData3 = calculateDailyAndMonthlyData(lessonMembers, '레슨');

    const apexBarChartData = [
        {
            name: '',
            // data: chartData,
        },
    ];

    const apexBarChartData2 = [
        {
            name: '',
            data: members,
        },
    ];

    const apexBarChartData3 = [
        {
            name: '',
            // data: chartData3,
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
            labels: {
                offsetX: 0,
                // offsetX: -50, // hide
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
                            <ul className="nav float-end d-none d-lg-flex">
                                <li className="nav-item">
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
                            <ul className="nav float-end d-none d-lg-flex">
                                <li className="nav-item">
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
                        <ul className="nav float-end d-none d-lg-flex">
                            <li className="nav-item">
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
