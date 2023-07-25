import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

const BarChart = ({ members }) => {
    const groupedData = members.reduce((acc, member) => {
        const { inflowPath } = member;

        if (inflowPath) {
            if (!acc[inflowPath]) {
                acc[inflowPath] = 0;
            }
            acc[inflowPath]++;
        }

        return acc;
    }, {});

    // console.log('groupedData', groupedData)

    const groups = Object.keys(groupedData);

    const chartOpts = {
        chart: {
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
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff'],
            },
        },
        colors: ['#0ACF97'],
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },
        xaxis: {
            categories: groups,
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: { 
            show: false,
            labels: {
                formatter(value) {
                    return value.toFixed(0);
                },
            },
        },
        legend: {
            offsetY: -10,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '명';
                },
            },
        },
    };

    const chartData = [
        {
            name: '',
            data: Object.values(groupedData),
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3">유입경로</h4>
                <Chart
                    options={chartOpts}
                    series={chartData}
                    type="bar"
                    className="apex-charts"
                    height={340}
                />
            </Card.Body>
        </Card>
    );
};

export default BarChart;