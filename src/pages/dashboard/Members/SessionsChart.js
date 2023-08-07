import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const SessionsChart = ({ 
    activateBatterboxMembers, 
    activateLessonMembers, 
    monthlyActivateBatterboxMembers = [], 
    monthlyActivateLessonMembers = [],
    members,
    index 
}) => {
    const [isMonthlyView, setIsMonthlyView] = useState(true);
    const [isMonthlyViewBatterbox, setIsMonthlyViewBatterbox] = useState(true);
    const [isMonthlyViewLesson, setIsMonthlyViewLesson] = useState(true);

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
            
            if (year === currentYear) {
                monthlyData[month]++;
                
                if (month === currentMonth) {
                    const currentDate = new Date();
                    const currentDay = currentDate.getDate();
                    
                    for (let i = day; i <= currentDay; i++) {
                        dailyData[i - 1]++;
                    }
                    
                    for (let i = currentDay + 1; i <= new Date(currentYear, currentMonth + 1, 0).getDate(); i++) {
                        dailyData[i - 1] = dailyData[currentDay - 1];
                    }
                }
                
                for (let i = month + 1; i <= currentMonth; i++) {
                    monthlyData[i] = monthlyData[currentMonth];
                }
                
                for (let i = currentMonth + 1; i < 12; i++) {
                    monthlyData[i] = monthlyData[currentMonth];
                }
            }
        }
    
        return isMonthlyView ? dailyData : monthlyData;
    }

    const apexBarChartData = [
        {
            name: '전체회원 추이',
            data: calculateDailyAndMonthlyData(sortedMembers),
        },
    ];

    const apexBarChartData2 = [
        {
            name: '타석활성 회원 추이',
            data:  isMonthlyViewBatterbox ? activateBatterboxMembers : monthlyActivateBatterboxMembers
        },
    ];

    const apexBarChartData3 = [
        {
            name: '레슨활성 회원 추이',
            data: isMonthlyViewLesson ? activateLessonMembers : monthlyActivateLessonMembers
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

    const [dataLoaded, setDataLoaded] = useState(false);
    
    useEffect(() => {
        if (monthlyActivateBatterboxMembers.length > 0 && monthlyActivateLessonMembers.length > 0) {
            setDataLoaded(true);
        }
    }, [monthlyActivateBatterboxMembers, monthlyActivateLessonMembers]);


    return (
        <>
            {index === 1 && (
                <>
                    <Card>
                        <Card.Body>
                            <ul className="nav float-end d-lg-flex">
                                <li className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link ${isMonthlyViewBatterbox ? 'active' : 'text-muted'}`}
                                        onClick={() => setIsMonthlyViewBatterbox(true)}>
                                        월간
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link ${!isMonthlyViewBatterbox ? 'active' : 'text-muted'}`}
                                        onClick={() => setIsMonthlyViewBatterbox(false)}>
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
                            <ul className="nav float-end d-lg-flex">
                                <li className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link ${isMonthlyViewLesson ? 'active' : 'text-muted'}`}
                                        onClick={() => setIsMonthlyViewLesson(true)}>
                                        월간
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="#"
                                        className={`nav-link ${!isMonthlyViewLesson ? 'active' : 'text-muted'}`}
                                        onClick={() => setIsMonthlyViewLesson(false)}>
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
