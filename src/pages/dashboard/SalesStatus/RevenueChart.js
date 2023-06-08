import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const RevenueChart = ({ sortedByPeriodSalesData, selectedPeriod, beforePeriodSalesData, datePickDate }) => {
    const [currentPeriodOfDate, setCurrentPeriodOfDate] = useState([]);

    const [previousPeriodTotalSales, setPreviousPeriodTotalSales] = useState(0);
    const [currentPeriodTotalSales, setCurrentPeriodTotalSales] = useState(0);

    const [currentPeriodSalesData, setCurrentPeriodSalesData] = useState([]);
    const [previousPeriodSalesData, setPreviousPeriodSalesData] = useState([]);

    const [weeksOfMinMaxDate, setWeeksOfMinMaxDate] = useState([]);

    const getCurrentPeriodOfDate = (datePickDate) => {
        const year = datePickDate.getFullYear();
        const month = datePickDate.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();

        setCurrentPeriodOfDate(Array.from({ length: lastDay }, (_, index) => (index + 1).toString()));
    };

    // const getWeeksOfMinMaxDate = (datePickDate, selectedPeriod) => {
    //     if (selectedPeriod === 'week') {
    //         const oneDay = 24 * 60 * 60 * 1000; // 1일의 밀리초 수

    //         const datePickDay = datePickDate.getDay(); // datePickDate의 요일을 구함
    //         const previousSunday = new Date(datePickDate.getTime() - datePickDay * oneDay); // datePickDate 이전의 가장 가까운 일요일을 계산

    //         const previousWeekStart = new Date(previousSunday.getTime() - 8 * oneDay); // 전 주의 시작일을 구함

    //         console.log('previousWeekStart', previousWeekStart);
    //     }
    // };

    // console.log(getWeeksOfMinMaxDate(datePickDate, selectedPeriod));

    const getPreviousPeriodTotalSales = (beforePeriodSalesData) => {
        if (beforePeriodSalesData) {
            const totalSales = [...beforePeriodSalesData]
                .reduce((acc, curr) => {
                    return !curr.refund ? [...acc, ...curr.products] : [...acc];
                }, [])
                .reduce((acc, curr) => {
                    return acc + curr.discountPrice;
                }, 0);
            setPreviousPeriodTotalSales(totalSales);
        }
    };

    const getCurrentPeriodTotalSales = (sortedByPeriodSalesData) => {
        if (sortedByPeriodSalesData) {
            const totalSales = [...sortedByPeriodSalesData]
                .reduce((acc, curr) => {
                    return !curr.refund ? [...acc, ...curr.products] : [...acc];
                }, [])
                .reduce((acc, curr) => {
                    return acc + curr.discountPrice;
                }, 0);
            setCurrentPeriodTotalSales(totalSales);
        }
    };

    const getCurrentPeriodSalesData = (sortedByPeriodSalesData, datePickDate) => {
        const currentDate = datePickDate?.getDate();
        // const lastDate = new Date(year, month, 0).getDate();
        const currentPeriodSalesArray = [];
        if (sortedByPeriodSalesData && selectedPeriod === 'month') {
            const salesData = [...sortedByPeriodSalesData].reduce((acc, curr) => {
                return !curr.refund ? [...acc, curr] : [...acc];
            }, []);

            for (let date = 1; date <= currentDate; date++) {
                let totalSalesByDate = 0;
                salesData.forEach((ele) => {
                    if (new Date(ele.paymentDate).getDate() === date) {
                        totalSalesByDate += ele.totalPaymentPrice;
                    }
                });

                currentPeriodSalesArray.push(totalSalesByDate);
            }
            setCurrentPeriodSalesData(currentPeriodSalesArray);
        } else if (sortedByPeriodSalesData && selectedPeriod === 'week') {
            const salesData = [...sortedByPeriodSalesData].reduce((acc, curr) => {
                return !curr.refund ? [...acc, curr] : [...acc];
            }, []);

            for (let day = 0; day < 7; day++) {
                let totalSalesByDay = 0;

                salesData.forEach((ele) => {
                    if (new Date(ele.paymentDate).getDay() === day) {
                        totalSalesByDay += ele.totalPaymentPrice;
                    }
                });

                currentPeriodSalesArray.push(totalSalesByDay);
            }
            const setDateArrayLength = currentPeriodSalesArray.slice(0, sortedByPeriodSalesData.length);
            setCurrentPeriodSalesData(setDateArrayLength);
        }
    };

    const getPreviousPeriodSalesData = (beforePeriodSalesData, datePickDate) => {
        const previousMonthLastDate = new Date(datePickDate.getFullYear(), datePickDate.getMonth(), 0).getDate();

        const previousSalesData = [];
        if (beforePeriodSalesData && selectedPeriod === 'month') {
            const salesData = [...beforePeriodSalesData].reduce((acc, curr) => {
                return !curr.refund ? [...acc, curr] : [...acc];
            }, []);

            for (let date = 1; date <= previousMonthLastDate; date++) {
                let totalSalesByDate = 0;
                salesData.forEach((ele) => {
                    if (new Date(ele.paymentDate).getDate() === date) {
                        totalSalesByDate += ele.totalPaymentPrice;
                    }
                });
                previousSalesData.push(totalSalesByDate);
            }
        } else if (beforePeriodSalesData && selectedPeriod === 'week') {
            const salesData = [...beforePeriodSalesData].reduce((acc, curr) => {
                return !curr.refund ? [...acc, curr] : [...acc];
            }, []);

            for (let day = 0; day < 7; day++) {
                let totalSalesByDay = 0;
                salesData.forEach((ele) => {
                    if (new Date(ele.paymentDate).getDay() === day) {
                        totalSalesByDay += ele.totalPaymentPrice;
                    }
                });
                previousSalesData.push(totalSalesByDay);
            }
        }
        setPreviousPeriodSalesData(previousSalesData);
    };

    useEffect(() => {
        getCurrentPeriodOfDate(datePickDate);
        getCurrentPeriodSalesData(sortedByPeriodSalesData, datePickDate);
        getPreviousPeriodSalesData(beforePeriodSalesData, datePickDate);
    }, [datePickDate]);
    useEffect(() => {
        getPreviousPeriodTotalSales(beforePeriodSalesData);
        getPreviousPeriodSalesData(beforePeriodSalesData, datePickDate);
    }, [beforePeriodSalesData]);
    useEffect(() => {
        getCurrentPeriodTotalSales(sortedByPeriodSalesData);
        getCurrentPeriodSalesData(sortedByPeriodSalesData, datePickDate);
    }, [sortedByPeriodSalesData]);

    const apexLineChartWithLables = {
        chart: {
            type: 'line',

            dropShadow: {
                enabled: true,
                opacity: 0.1,
                blur: 7,
                left: -7,
                top: 7,
            },
            toolbar: {
                show: false,
            },
            parentHeightOffset: 20,
        },
        grid: {
            padding: {
                left: 20, // or whatever value that works
                right: 20, // or whatever value that works
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
            width: 6,
        },

        legend: {
            show: false,
        },
        colors: ['#727cf5', '#0acf97', '#fa5c7c', '#ffbc00'],
        xaxis: {
            type: 'string',
            categories: selectedPeriod === 'week' ? ['일', '월', '화', '수', '목', '금', '토'] : [],

            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            max: Math.max(...previousPeriodSalesData) + Math.max(...previousPeriodSalesData) * 0.1,
            labels: {
                formatter: function (value) {
                    return (value / 10000).toFixed() + '만원';
                },
            },
        },
        tooltip: {
            enabled: true,
        },
    };

    const apexLineChartWithLablesData = [
        { name: selectedPeriod === 'month' ? '이번 달' : '이번 주', data: currentPeriodSalesData },
        { name: selectedPeriod === 'month' ? '지난 달' : '지난 주', data: previousPeriodSalesData },
    ];

    return (
        <Card>
            <Card.Body>
                <CardTitle containerClass="d-flex align-items-center justify-content-between mb-2" title="추이" />

                <div className="chart-content-bg">
                    <Row className="text-center">
                        <Col md={6}>
                            <p className="text-muted mb-0 mt-3">이번 {selectedPeriod === 'month' ? '달' : '주'}</p>
                            <h2 className="fw-normal mb-3">
                                <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
                                <span>{currentPeriodTotalSales.toLocaleString()}원</span>
                            </h2>
                        </Col>

                        <Col md={6}>
                            <p className="text-muted mb-0 mt-3">지난 {selectedPeriod === 'month' ? '달' : '주'}</p>
                            <h2 className="fw-normal mb-3">
                                <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
                                <span>{previousPeriodTotalSales.toLocaleString()}원</span>
                            </h2>
                        </Col>
                    </Row>
                </div>

                <Chart
                    options={apexLineChartWithLables}
                    series={apexLineChartWithLablesData}
                    type="line"
                    className="apex-charts mt-3"
                    height={330}
                />
            </Card.Body>
        </Card>
    );
};

export default RevenueChart;
