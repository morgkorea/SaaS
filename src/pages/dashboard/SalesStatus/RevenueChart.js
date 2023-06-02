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

    const getCurrentPeriodOfDate = (datePickDate) => {
        const year = datePickDate.getFullYear();
        const month = datePickDate.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();

        setCurrentPeriodOfDate(Array.from({ length: lastDay }, (_, index) => (index + 1).toString()));
    };

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

    const getPreviousPeriodSalesData = (beforePeriodSaelsData) => {
        const previousMonthLastDate = new Date(datePickDate.getFullYear(), datePickDate.getMonth(), 0).getDate();

        const previousPeriodSalesData = [];
        if (beforePeriodSaelsData) {
            const salesData = [...beforePeriodSaelsData].reduce((acc, curr) => {
                return !curr.refund ? [...acc, curr] : [...acc];
            }, []);
            for (let date = 1; date <= previousMonthLastDate; date++) {
                let totalSalesByDate = 0;
                salesData.forEach((ele) => {
                    if (new Date(ele.paymentDate).getDate === date) {
                    }
                });
            }
        }
    };

    useEffect(() => {
        getCurrentPeriodOfDate(datePickDate);
        getCurrentPeriodSalesData(sortedByPeriodSalesData, datePickDate);
    }, [datePickDate]);
    useEffect(() => {
        getPreviousPeriodTotalSales(beforePeriodSaelsData);
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
            parentHeightOffset: 0,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
            width: 6,
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#727cf5', '#0acf97', '#fa5c7c', '#ffbc00'],
        xaxis: {
            type: 'string',
            categories: [...currentPeriodOfDate],

            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
        },
    };

    const apexLineChartWithLablesData = [
        {
            name: '이번 달',
            data: currentPeriodSalesData,
        },
        {
            name: '지난 달',
            data: [],
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
                    height={300}
                />
            </Card.Body>
        </Card>
    );
};

export default RevenueChart;
