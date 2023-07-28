import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

// 삭제페이지
const PerformanceChart = () => {
    const apexBarChartOpts = {
        chart: {
            height: 260,
            type: 'bar',
            stacked: true,
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#727cf5'],
        xaxis: {
            categories: [
                '06:00',
                '07:00',
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',
                '23:00',
                '24:00',
            ],
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val + '명';
                },
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '명';
                },
            },
        },
    };

    const apexBarChartData = [
        {
            name: 'time',
            data: [65, 59, 80, 81, 56, 89, 40, 32, 65, 59, 80, 81, 65, 59, 80, 81, 56, 89, 40],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title={
                        <div className="d-flex">
                            <h4 className="header-title">시간 별 상담</h4>
                            <h5 className="text-muted fw-normal mt-0 m-2 text-truncate" title="">
                                우리 매장은 <span className="text-primary">16시</span>에 바쁘고{' '}
                                <span className="text-primary">08시</span>엔 한가해요
                            </h5>
                        </div>
                    }
                />
                <div dir="ltr">
                    <Chart
                        options={apexBarChartOpts}
                        series={apexBarChartData}
                        type="bar"
                        className="apex-charts"
                        height={255}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default PerformanceChart;
