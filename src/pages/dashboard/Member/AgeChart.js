import React, { useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Chart from 'react-apexcharts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AgeChart = () => {

    const apexBarChartOpts = {
        chart: {
            height: 100,
            type: 'bar',
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
            style: {
                fontSize: '12px',
                colors: ['#fff'],
            },
        },
        colors: ['#727CF5', '#FA5C7C'],
        stroke: {
            show: true,
            width: 0,
            colors: ['#fff'],
        },
        xaxis: {
            categories: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
        },
        legend: {
            show: false,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    const apexBarChartData = [
        {
            name: '남성',
            data: [20, 100, 20, 40, 80, 43],
        },
        {
            name: '여성',
            data: [12, 70, 30, 40, 20, 14],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <div className='d-flex'>
                    <h4 className="header-title mb-3">성별/연령별 추이</h4>
                    {/* span - 가변 데이터 */}
                    <h5 className="text-muted fw-normal mt-0 m-2 text-truncate">
                        우리 매장은 <span className="text-primary">20대 남성</span>이 제일 많네요
                    </h5>
                </div>

                <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" height={360} />
            </Card.Body>
        </Card>
    );
};

export default AgeChart;
