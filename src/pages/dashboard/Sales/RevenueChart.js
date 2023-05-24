import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const RevenueChart = () => {
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
            categories: ['월', '화', '수', '목', '금', '토', '일'],
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
            name: 'Current Week',
            data: [10, 20, 15, 25, 20, 30, 20], // 일일매출
        },
        {
            name: 'Previous Week',
            data: [0, 15, 10, 30, 15, 35, 25], // 일일매출
        },
    ];

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title="추이"
                />

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
