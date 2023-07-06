import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const RevenueChart = ({ sortedByPeriodSalesData, selectedPeriod, beforePeriodSalesData, datePickDate }) => {
    const [currentPeriodOfDate, setCurrentPeriodOfDate] = useState([0]);

    const [previousPeriodTotalSales, setPreviousPeriodTotalSales] = useState(0);
    const [currentPeriodTotalSales, setCurrentPeriodTotalSales] = useState(0);

    const periodSaelsDataInit =
        selectedPeriod === 'month' ? Array.from({ length: 31 }, () => 1) : [1, 1, 1, 1, 1, 1, 1];

    // const periodSaelsDataInit = Array.from({ length: 31 }, () => 1);
    const [currentPeriodSalesData, setCurrentPeriodSalesData] = useState(periodSaelsDataInit);
    const [previousPeriodSalesData, setPreviousPeriodSalesData] = useState(periodSaelsDataInit);

    const [weeksOfMinMaxDate, setWeeksOfMinMaxDate] = useState([]);

    const apexLineInitData =
        selectedPeriod === 'month'
            ? Array.from({ length: currentPeriodOfDate.length }, () => 0)
            : [0, 0, 0, 0, 0, 0, 0];

    const getCurrentPeriodOfDate = (datePickDate) => {
        const year = datePickDate.getFullYear();
        const month = datePickDate.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();

        setCurrentPeriodOfDate(Array.from({ length: lastDay }, (_, index) => (index + 1).toString()));
    };

    const getPreviousPeriodTotalSales = (beforePeriodSalesData) => {
        if (beforePeriodSalesData.length) {
            const totalSales = [...beforePeriodSalesData].reduce((acc, curr) => {
                return !curr.refund ? acc + curr.totalPaymentPrice : acc;
            }, 0);

            setPreviousPeriodTotalSales(totalSales);
        } else {
            setPreviousPeriodTotalSales(0);
        }
    };

    const getCurrentPeriodTotalSales = (sortedByPeriodSalesData) => {
        if (sortedByPeriodSalesData.length) {
            const totalSales = [...sortedByPeriodSalesData].reduce((acc, curr) => {
                return !curr.refund ? acc + curr.totalPaymentPrice : acc;
            }, 0);
            setCurrentPeriodTotalSales(totalSales);
        } else {
            setCurrentPeriodTotalSales(0);
        }
    };

    const getCurrentPeriodSalesData = (sortedByPeriodSalesData, datePickDate) => {
        const currentDate = datePickDate?.getDate();
        // const lastDate = new Date(year, month, 0).getDate();

        if (sortedByPeriodSalesData.length && selectedPeriod === 'month') {
            const currentPeriodSalesArray = [];
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
        } else if (sortedByPeriodSalesData.length && selectedPeriod === 'week') {
            const currentPeriodSalesArray = [];
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
            setCurrentPeriodSalesData(currentPeriodSalesArray);
        }
    };

    const getPreviousPeriodSalesData = (beforePeriodSalesData, datePickDate) => {
        const previousMonthLastDate = new Date(datePickDate.getFullYear(), datePickDate.getMonth(), 0).getDate();

        if (beforePeriodSalesData.length && selectedPeriod === 'month') {
            const previousSalesData = [];
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

            setPreviousPeriodSalesData(previousSalesData);
        } else if (beforePeriodSalesData.length && selectedPeriod === 'week') {
            const previousSalesData = [];
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

            setPreviousPeriodSalesData(previousSalesData);
        }
    };

    useEffect(() => {
        getCurrentPeriodOfDate(datePickDate);
        getCurrentPeriodSalesData(sortedByPeriodSalesData, datePickDate);
        getPreviousPeriodSalesData(beforePeriodSalesData, datePickDate);
    }, [datePickDate, selectedPeriod]);
    useEffect(() => {
        getPreviousPeriodTotalSales(beforePeriodSalesData);
        getPreviousPeriodSalesData(beforePeriodSalesData, datePickDate);
    }, [beforePeriodSalesData, selectedPeriod, datePickDate]);
    useEffect(() => {
        getCurrentPeriodTotalSales(sortedByPeriodSalesData);
        getCurrentPeriodSalesData(sortedByPeriodSalesData, datePickDate);
    }, [sortedByPeriodSalesData, selectedPeriod, datePickDate]);

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
        dataLabels: { enabled: false },
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
            max:
                Math.max(...currentPeriodSalesData) > Math.max(...previousPeriodSalesData)
                    ? Math.max(...currentPeriodSalesData) * 1.1
                    : Math.max(...previousPeriodSalesData) * 1.1,
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
        {
            name: selectedPeriod === 'month' ? '이번 달' : '이번 주',
            data: sortedByPeriodSalesData.length ? [...currentPeriodSalesData] : apexLineInitData,
        },
        {
            name: selectedPeriod === 'month' ? '지난 달' : '지난 주',
            data: beforePeriodSalesData.length ? [...previousPeriodSalesData] : apexLineInitData,
        },
    ];

    return (
        <Card>
            {selectedPeriod !== 'day' ? (
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
            ) : (
                <Card.Body>
                    <CardTitle
                        containerClass="d-flex align-items-center justify-content-between mb-2"
                        title="일 매출 총계"
                    />

                    <div className="chart-content-bg">
                        <Row className="text-center">
                            <Col md={6}>
                                <p className="text-muted mb-0 mt-3">오늘</p>
                                <h2 className="fw-normal mb-3">
                                    <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
                                    <span>{currentPeriodTotalSales.toLocaleString()}원</span>
                                </h2>
                            </Col>

                            <Col md={6}>
                                <p className="text-muted mb-0 mt-3">어제</p>
                                <h2 className="fw-normal mb-3">
                                    <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
                                    <span>{previousPeriodTotalSales.toLocaleString()}원</span>
                                </h2>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
            )}
        </Card>
    );
};

export default RevenueChart;
