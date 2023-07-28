import React from 'react';
import Chart from 'react-apexcharts';

const SpendingChart = () => {
    const apexBarChartOpts = {
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
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },     
        colors: ['#727CF5', '#D9D9D9'],
        stroke: {
            show: true,
            width: 0,
            colors: ['#fff'],
        },
        xaxis: {
            categories: ['이번달 지출', '지난달 지출'],
            gridLines: {
              display: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: true,
                align: 'top',
            },
        }
    };


    const apexBarChartData = [
        {
            data: [33780, 20400],
        },
    ];

    return (
        <>
            <Chart
                options={apexBarChartOpts}
                series={apexBarChartData}
                type="bar"
                className="apex-charts"
                height={195}
            />
        </>
    );
};

export default SpendingChart;
