import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';

const BarChart = ({ members }) => {
    const inflowPathList = [
        '네이버',
        '지인추천',
        '인스타그램',
        '입주사',
        '제휴사',
        '카카오톡 채널',
        '당근마켓',
        '전단지',
        '외부간판 및 현수막',
        '기타',
    ];

    const groupedData = members.reduce((acc, member) => {
        const { inflowPath } = member;

        if (inflowPath) {
            if (!acc[inflowPath]) {
                acc[inflowPath] = 0;
            }
            acc[inflowPath]++;
        } else {
            const defaultInflowPath = '기타';
            if (!acc[defaultInflowPath]) {
                acc[defaultInflowPath] = 0;
            }
        }

        return acc;
    }, {});

    const hasData = inflowPathList.some((path) => groupedData[path] > 0);

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
            categories: inflowPathList,
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
            data: inflowPathList.map((path) => groupedData[path] || 0),
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3">유입경로</h4>
                <Chart options={chartOpts} series={chartData} type="bar" className="apex-charts" height={340} />
                {!hasData && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            아직 표기할 데이터가 없어요.
                            <span className='d-block'><Warning style={{ width: '8rem', height: '8rem', marginTop: '1rem' }} /></span>
                        </div>
                    )}
            </Card.Body>
        </Card>
    );
};

export default BarChart;
