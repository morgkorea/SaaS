import React from 'react';
import moment from 'moment';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';

const PerformanceChart = ({ members }) => {
    const hasData = members.length > 0;

    const timeSlots = [
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
    ];

    const timeSlotCounts = {};

    for (const slot of timeSlots) {
        timeSlotCounts[slot] = 0;
    }

    for (const member of members) {
        const createdTimeHour = parseInt(member.createdTime.split(':')[0], 10);
        const timeSlotHour = `${createdTimeHour < 10 ? '0' : ''}${createdTimeHour}:00`;

        // 시간대가 timeSlots에 포함되는 경우에만 카운트 증가
        if (timeSlotCounts[timeSlotHour] !== undefined) {
            timeSlotCounts[timeSlotHour]++;
        }
    }

    // 많은 시간대, 적은 시간대 구하기
    let maxCount = 0;
    let maxCountTimeSlot = '';

    let minCount = Infinity;
    let minCountTimeSlot = '';

    for (const timeSlot in timeSlotCounts) {
        const count = timeSlotCounts[timeSlot];

        if (count > maxCount) {
            maxCount = count;
            maxCountTimeSlot = timeSlot;
        }

        if (count < minCount) {
            minCount = count;
            minCountTimeSlot = timeSlot;
        }
    }

    const apexBarChartData = [
        {
            name: '',
            data: Object.values(timeSlotCounts),
        },
    ];

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
            categories: timeSlots,
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            labels: {
                formatter: function (val) {
                    return val;
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

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title={
                        <div className="d-flex">
                            <h4 className="header-title">시간 별 상담</h4>
                            {maxCountTimeSlot && (
                                <h5 className="text-muted fw-normal mt-0 m-2 text-truncate" title="">
                                    우리 매장은
                                    <span className="text-primary"> {maxCountTimeSlot.slice(0, 2)}시</span>에 바쁘고
                                    <span className="text-primary"> {minCountTimeSlot.slice(0, 2)}시</span>엔 한가해요
                                </h5>
                            )}
                        </div>
                    }
                />
                <div dir="ltr">
                    <Chart
                        options={apexBarChartOpts}
                        series={apexBarChartData}
                        type="bar"
                        className="apex-charts"
                        height={340}
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
                            }}>
                            아직 표기할 데이터가 없어요.
                            <span className="d-block">
                                <Warning style={{ width: '8rem', height: '8rem', marginTop: '1rem' }} />
                            </span>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default PerformanceChart;
