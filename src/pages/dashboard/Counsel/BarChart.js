import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

const BarChart = () => {
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
            categories: [
                '네이버',
                '건물방문',
                '지인추천',
                '제휴',
                '인스타그램',
                '전단지',
                '김캐디',
                '카카오채널',
                '현수막',
                '간판',
                '기타',
                '프로소개',
                '홈페이지',
                '베스티파이',
            ],
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: { show: false },
        legend: {
            offsetY: -10,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
    };

    const chartData = [
        {
            name: '',
            data: [4, 18, 15, 22, 28, 20, 33, 2, 26, 19, 14, 5, 30, 20],
            // api로 data 가져오기 예시
            // data: historyData?.map((price) => price.close)as number[],
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
