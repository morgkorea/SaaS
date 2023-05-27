import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const RevenueChart = ({ sortedByPeriodSalesData }) => {
    //현재 연,월,일 / 해당 월 구하기 -> 현재일부터 해당월 1일까지의 데이터 일별로 배열로 구분
    // 총 매출 구하기-> 6개 기준점  첫요소의 배수로 배열에 할당 ex) [12,24,36,48,60]
    // 할당배열

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [beforeMonth, setBeforeMonth] = useState(new Date().getMonth());

    const getCurrentMonthOfDays = () => {
        const currentMonthDaysCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        return Array.from({ length: currentMonthDaysCount }, (_, index) => index + 1);
    };

    const getSalesByDate = () => {
        return sortedByPeriodSalesData
            ? [...sortedByPeriodSalesData].map((Sales, idx) => {
                  const salesDay = new Date(Sales.paymentDate).getDay();
                  const currentMonthDaysCount = new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + 1,
                      0
                  ).getDate();
              })
            : [];
    };
    console.warn('유승훈 바보');
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
            curve: 'smooth',
            width: 4,
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
            categories: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31',
            ],
            tooltip: {
                enabled: false,
            },
            axisBorder: {
                show: false,
            },
        },
    };

    const apexLineChartWithLablesData = [
        {
            name: '이번 달',
            data: [
                0, 20, 15, 25, 20, 30, 20, 10, 20, 15, 25, 20, 30, 20, 10, 20, 15, 25, 20, 30, 20, 10, 20, 15, 25, 20,
                30, 20,
            ],
        },
        {
            name: '지난 달',
            data: [
                15, 10, 30, 15, 35, 25, 10, 20, 15, 25, 20, 30, 20, 10, 20, 15, 25, 20, 30, 20, 10, 20, 15, 25, 20, 30,
                20,
            ],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <CardTitle containerClass="d-flex align-items-center justify-content-between mb-2" title="추이" />

                <div className="chart-content-bg">
                    <Row className="text-center">
                        <Col md={6}>
                            <p className="text-muted mb-0 mt-3">이번 달</p>
                            <h2 className="fw-normal mb-3">
                                <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
                                <span>10,258,254원</span>
                            </h2>
                        </Col>

                        <Col md={6}>
                            <p className="text-muted mb-0 mt-3">지난 달</p>
                            <h2 className="fw-normal mb-3">
                                <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
                                <span>21,321,524원</span>
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
