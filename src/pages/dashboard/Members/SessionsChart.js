import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const SessionsChart = ({ members, index }) => {
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

    const now = new Date();
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
                    dailyData[i - 1]++;
                }
            }

            if (year === currentYear) {
                monthlyData[month]++;
            }
        }

        return isMonthlyView ? dailyData : monthlyData;
    }

    // 타석/레슨 추이

function calculateMonthlyData(dataArray) {
    const dailyData = new Array(labels.length).fill(0);
    const monthlyData = new Array(12).fill(0);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 현재 월의 마지막 날

    dataArray.forEach((data) => {
        const { startDate, endDate } = data;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        const startMonth = start.getMonth();
        const endMonth = end.getMonth();

        // dailyData 구하기
        if (startYear <= currentYear && currentYear <= endYear) {
            const isStartMonthInRange = startMonth === currentMonth;
            const isEndMonthInRange = endMonth === currentMonth;

            if (isStartMonthInRange || isEndMonthInRange || (start <= lastDayOfCurrentMonth && end >= 1)) {
                const startDay = isStartMonthInRange ? start.getDate() : 1;
                const endDay = isEndMonthInRange ? end.getDate() : lastDayOfCurrentMonth;

                for (let day = startDay; day <= endDay; day++) {
                    const index = day - 1; // 인덱스는 월이 0부터 시작하므로 1을 빼줌
                    dailyData[index]++;
                }
            }
        }

        // monthlyData 구하기
        if (startYear === currentYear && endYear === currentYear) {
            for (let i = startMonth; i <= endMonth; i++) {
                monthlyData[i]++;
            }
        } else if (startYear === currentYear && endYear !== currentYear) {
            for (let i = startMonth; i < 12; i++) {
                monthlyData[i]++;
            }
        } else if (startYear !== currentYear && endYear === currentYear) {
            for (let i = 0; i <= endMonth; i++) {
                monthlyData[i]++;
            }
        } else if (startYear < currentYear && endYear > currentYear) {
            for (let i = 0; i < 12; i++) {
                monthlyData[i]++;
            }
        }
    });

    console.log('dailyData', dailyData);
    console.log('monthlyData', monthlyData);

    return isMonthlyView ? dailyData : monthlyData;
}


    const calculateAnnualActivateBatterboxData = () => {
        const activateBatterboxMembers = sortedMembers.flatMap((member) =>
            (member.availableProducts || []).filter((product) => product.productType === 'batterBox')
        );
        const filteredBatterboxMembers = activateBatterboxMembers.filter((product) => {
            const endDate = new Date(product.endDate);
            return endDate >= now;
        });
        console.log('filteredBatterboxMembers', filteredBatterboxMembers)
        return calculateMonthlyData(filteredBatterboxMembers);
    };

    const calculateAnnualActivateLessonData = () => {
        const activateLessonMembers = sortedMembers.flatMap((member) =>
            (member.availableProducts || []).filter((product) => product.productType === 'lesson')
        );

        const filteredLessonMembers = activateLessonMembers.filter((product) => {
            const endDate = new Date(product.endDate);
            return endDate >= now;
        });

        console.log('filteredLessonMembers',filteredLessonMembers)
        return calculateMonthlyData(filteredLessonMembers);
    };

    const apexBarChartData = [
        {
            name: '전체회원 추이',
            data: calculateDailyAndMonthlyData(sortedMembers),
        },
    ];

    const apexBarChartData2 = [
        {
            name: '타석활성 회원 추이',
            data: calculateAnnualActivateBatterboxData(),
        },
    ];

    const apexBarChartData3 = [
        {
            name: '레슨활성 회원 추이',
            data: calculateAnnualActivateLessonData(),
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
