import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { channelData } from './data';

import CardTitle from '../../../components/CardTitle';

const PerformanceDetails = () => {
    return (
        <>
            <div className="chart-widget-list">
                {channelData.map((data) => {
                    return (
                        <p>
                            <i className={`mdi mdi-square text-${data.color}`}></i> {data.channel}
                            <span className="float-end">{data.cost.toLocaleString()}원</span>
                        </p>
                    );
                })}
            </div>
        </>
    );
};

const SalesChart = ({ channelData }) => {
    const apexDonutOpts = {
        chart: {
            type: 'donut',
        },
        colors: ['#727cf5', '#fa5c7c', '#0acf97', '#ffbc00'],
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
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
                        { label: '네이버 플레이스' },
                        { label: '네이버 파워링크' },
                        { label: '메타' },
                        { label: '당근마켓' },
                    ]}
                />

                <Chart
                    options={apexDonutOpts}
                    series={apexDonutData}
                    type="donut"
                    height={345}
                    className="apex-charts mb-4 mt-4"
                />

                <PerformanceDetails channelData={channelData} />
            </Card.Body>
        </Card>
    );
};

export default SalesChart;
