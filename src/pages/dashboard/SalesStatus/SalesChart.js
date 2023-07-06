import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

import CardTitle from '../../../components/CardTitle';

const SalesChart = ({ sortedByPeriodSalesData }) => {
    const [amountProductsSales, setAmountProductsSales] = useState({
        batterBox: 0,
        lesson: 0,
        locker: 0,
        etc: 0,
    });
    const [apexDonutData, setApexDonutData] = useState([1, 1, 1, 1]);

    const amountEachProductsSales = () => {
        setAmountProductsSales({
            batterBox: 0,
            lesson: 0,
            locker: 0,
            etc: 0,
        });
        const productsSales = { batterBox: 0, lesson: 0, locker: 0, etc: 0 };
        if (sortedByPeriodSalesData.length) {
            [...sortedByPeriodSalesData]
                .reduce((acc, curr) => {
                    return !curr.refund ? [...acc, ...curr.salesProducts] : [...acc];
                }, [])
                .forEach((ele, idx) => {
                    if (ele.productType === 'batterBox') {
                        productsSales.batterBox = productsSales.batterBox + Number(ele.adjustedPrice);
                    } else if (ele.productType === 'lesson') {
                        productsSales.lesson = productsSales.lesson + Number(ele.adjustedPrice);
                    } else if (ele.productType === 'locker') {
                        productsSales.locker = productsSales.locker + Number(ele.adjustedPrice);
                    } else {
                        productsSales.etc = productsSales.etc + Number(ele.adjustedPrice);
                    }
                });

            setAmountProductsSales(productsSales);
            const apexData = [];
            for (let key in productsSales) {
                apexData.push(productsSales[`${key}`]);
            }
            setApexDonutData(apexData);
        }
    };

    useEffect(() => {
        setApexDonutData([0, 0, 0, 0]);
        amountEachProductsSales();
    }, [sortedByPeriodSalesData]);
    const apexDonutOpts = {
        chart: {
            height: 340,
            type: 'donut',
        },
        colors: ['#727cf5', '#fa5c7c', '#0acf97', '#ffbc00'],
        legend: {
            show: true,
        },
        labels: ['타석', '레슨', '락커', '기타'],
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

        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return (
                    '<div class="arrow_box" style="padding: 2px 6px;">' +
                    '<span>' +
                    series[seriesIndex].toLocaleString() +
                    '원' +
                    [dataPointIndex] +
                    '</span>' +
                    '</div>'
                );
            },
        },
    };

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between"
                    title="비중"
                    // menuItems={[{ label: 'Sales Report' }]}
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
                        <i className="mdi mdi-square text-primary"></i> 타석
                        <span className="float-end">{amountProductsSales.batterBox.toLocaleString()}원</span>
                    </p>
                    <p>
                        <i className="mdi mdi-square text-danger"></i> 레슨
                        <span className="float-end">{amountProductsSales.lesson.toLocaleString()}원</span>
                    </p>
                    <p>
                        <i className="mdi mdi-square text-success"></i> 락커
                        <span className="float-end">{amountProductsSales.locker.toLocaleString()}원</span>
                    </p>
                    <p className="mb-0">
                        <i className="mdi mdi-square text-warning"></i> 기타
                        <span className="float-end">{amountProductsSales.etc.toLocaleString()}원</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SalesChart;
