import React from 'react';
import { Card } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Chart from 'react-apexcharts';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AgeChart = ({ members }) => {
    const countByAgeGroupAndSex = {};

    members.forEach((member) => {
        const { sex, ageGroup } = member;
        const key = `${ageGroup} ${sex}`;

        if (!countByAgeGroupAndSex[key]) {
            countByAgeGroupAndSex[key] = 1;
        } else {
            countByAgeGroupAndSex[key]++;
        }
    });

    const ageGroups = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];
    const sexes = ['남성', '여성'];

    let maxCount = 0;
    let maxCountObject = null;

    for (const key in countByAgeGroupAndSex) {
        if (countByAgeGroupAndSex[key] > maxCount) {
            const [ageGroup, sex] = key.split(' ');
            if (ageGroup !== '' && sex !== '') {
                maxCount = countByAgeGroupAndSex[key];
                maxCountObject = key;
            }
        }
    }

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
            categories: ageGroups,
        },
        yaxis: {
            // min: 0,
            // max: 5,
            // forceNiceScale: true,
            labels: {
                formatter(value) {
                    return value.toFixed(0);
                },
            },
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
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '명';
                },
            },
        },
    };

    const apexBarChartData = sexes.map((sex) => ({
        name: sex,
        data: ageGroups.map((ageGroup) => countByAgeGroupAndSex[`${ageGroup} ${sex}`] || 0),
    }));

    const hasData = apexBarChartData.some((series) => series.data.some((count) => count > 0));

    return (
        <Card>
            <Card.Body>
                <div className="d-flex">
                    <h4 className="header-title mb-3">성별/연령별 추이</h4>
                    <h5 className="text-muted fw-normal mt-0 m-2 text-truncate">
                        {maxCountObject && (
                            <>
                                우리 매장은 <span className="text-primary">{maxCountObject}</span>이 제일 많네요
                            </>
                        )}
                    </h5>
                </div>

                <Chart
                    options={apexBarChartOpts}
                    series={apexBarChartData}
                    type="bar"
                    className="apex-charts"
                    height={360}
                />
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
                        <span className='d-block'><Warning style={{ width: '10rem', height: '10rem', marginTop: '1rem' }} /></span>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default AgeChart;
