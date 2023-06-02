import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const RevenueChart = ({ sortedByPeriodSalesData, selectedPeriod, beforePeriodSaelsData, datePickDate }) => {
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

    const getWeeksOfMinMaxDate = (sortedByPeriodSalesData, beforePeriodSaelsData, selectedPeriod) => {
        if (selectedPeriod === 'week') {
            const minDate = Math.min(
                ...[...beforePeriodSaelsData].reduce((acc, curr) => {
                    return [...acc, new Date(curr.paymentDate)];
                }, [])
            );

            const maxDate = Math.max(
                ...[...sortedByPeriodSalesData].reduce((acc, curr) => {
                    return [...acc, new Date(curr.paymentDate)];
                }, [])
            );

            return [new Date(minDate), new Date(maxDate)];
        }
    };

    console.log(getWeeksOfMinMaxDate(sortedByPeriodSalesData, beforePeriodSaelsData, selectedPeriod));

    const getPreviousPeriodTotalSales = (beforePeriodSaelsData) => {
        if (beforePeriodSaelsData) {
            const totalSales = [...beforePeriodSaelsData]
                .reduce((acc, curr) => {
                    return !curr.refund ? [...acc, ...curr.products] : [...acc];
                }, [])
                .reduce((acc, curr) => {
                    return acc + curr.discountPrice;
                }, 0);
            setPreviousPeriodTotalSales(totalSales);
        }
    };
    console.log(currentPeriodOfDate.length);
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
        if (sortedByPeriodSalesData) {
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
            console.log(currentPeriodSalesArray, salesData);
        }

        setCurrentPeriodSalesData(currentPeriodSalesArray);
    };

    console.log(sortedByPeriodSalesData, datePickDate);

    const getPreviousPeriodSalesData = (beforePeriodSaelsData, datePickDate) => {
        const previousMonthLastDate = new Date(datePickDate.getFullYear(), datePickDate.getMonth(), 0).getDate();
        console.log(previousMonthLastDate);
        const previousSalesData = [];
        if (beforePeriodSaelsData) {
            const salesData = [...beforePeriodSaelsData].reduce((acc, curr) => {
                return !curr.refund ? [...acc, curr] : [...acc];
            }, []);
            console.log(salesData);
            for (let date = 1; date <= previousMonthLastDate; date++) {
                let totalSalesByDate = 0;
                salesData.forEach((ele) => {
                    if (new Date(ele.paymentDate).getDate() === date) {
                        console.log('ok');
                        totalSalesByDate += ele.totalPaymentPrice;
                    }
                });
                previousSalesData.push(totalSalesByDate);
            }
        }
        setPreviousPeriodSalesData(previousSalesData);
    };

    console.log(previousPeriodSalesData, 'previousPeriodSalesData');

    useEffect(() => {
        getCurrentPeriodOfDate(datePickDate);
        getCurrentPeriodSalesData(sortedByPeriodSalesData, datePickDate);
        getPreviousPeriodSalesData(beforePeriodSaelsData, datePickDate);
    }, [datePickDate]);
    useEffect(() => {
        getPreviousPeriodTotalSales(beforePeriodSaelsData);
        getPreviousPeriodSalesData(beforePeriodSaelsData, datePickDate);
    }, [beforePeriodSaelsData]);
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
            categories: selectedPeriod === 'month?' ? [] : [],

            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            max: Math.max(...previousPeriodSalesData) + Math.max(...previousPeriodSalesData) * 0.1,
        },
        tooltip: {
            enabled: true,
        },
    };

    const apexLineChartWithLablesData = [
        {
            data: currentPeriodSalesData,
        },
        {
            data: previousPeriodSalesData,
        },
    ];

    return (
        <Card>
            <Card.Body>
                <CardTitle containerClass="d-flex align-items-center justify-content-between mb-2" title="추이" />

                <div className="chart-content-bg">
                    <Row className="text-center">
                        <Col md={6}>
                            <p className="text-muted mb-0 mt-3">이번 {selectedPeriod === 'week' ? '주' : '달'}</p>
                            <h2 className="fw-normal mb-3">
                                <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
                                <span>{currentPeriodTotalSales}원</span>
                            </h2>
                        </Col>

                        <Col md={6}>
                            <p className="text-muted mb-0 mt-3">지난 {selectedPeriod === 'week' ? '주' : '달'}</p>
                            <h2 className="fw-normal mb-3">
                                <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
                                <span>{previousPeriodTotalSales}원</span>
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
