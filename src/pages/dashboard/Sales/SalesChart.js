import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

import CardTitle from '../../../components/CardTitle';

const SalesChart = () => {
    const apexDonutOpts = {
        chart: {
            height: 340,
            type: 'donut',
        },
        colors: ['#727cf5', '#fa5c7c', '#0acf97', '#ffbc00'],
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 376,
                options: {
                    chart: {
                        width: 250,
                        height: 250,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    const apexDonutData = [113000, 203234, 150000, 80000];

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between"
                    title="비중"
                    menuItems={[
                        { label: 'Sales Report' },
                        { label: 'Export Report' },
                        { label: 'Profit' },
                        { label: 'Action' },
                    ]}
                />

                <Chart
                    options={apexDonutOpts}
                    series={apexDonutData}
                    type="donut"
                    height={280}
                    className="apex-charts mb-4 mt-4"
                />

                <div className="chart-widget-list">
                    <p>
                        <i className="mdi mdi-square text-primary"></i> 타석매출
                        <span className="float-end">111,300원</span>
                    </p>
                    <p>
                        <i className="mdi mdi-square text-danger"></i> 레슨매출
                        <span className="float-end">203,234원</span>
                    </p>
                    <p>
                        <i className="mdi mdi-square text-success"></i> 락커 및 기타매출
                        <span className="float-end">150,000원</span>
                    </p>
                    <p className="mb-0">
                        <i className="mdi mdi-square text-warning"></i> 기타매출
                        <span className="float-end">80,000원</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SalesChart;
