import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ sortedByPeriodSalesData }) => {
    const [amountBatterBoxSales, setAmountBetterboxSales] = useState('');

    useEffect(() => {
        const amountOfElements = {
            batterBox: '',
            lesson: '',
            locker: '',
            etc: '',
        };
        if (sortedByPeriodSalesData) {
            amountOfElements.batterBox = sortedByPeriodSalesData.reduce((acc, curr) => {
                return acc + curr.totalPaymentPrice;
            }, 0);
        }

        setAmountBetterboxSales(amountOfElements);
    }, [sortedByPeriodSalesData]);

    return (
        <>
            <Row>
                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-account-multiple"
                        description="Number of Customers"
                        title="타석"
                        stats={amountBatterBoxSales.batterBox}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '5.27%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-cart-plus"
                        description="Number of Orders"
                        title="레슨"
                        stats="5,543원"
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: '1.08%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-currency-usd"
                        description="Revenue"
                        title="락커"
                        stats="6,254원"
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: '7.00%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-currency-usd"
                        description="Revenue"
                        title="기타"
                        stats="2,034원"
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '1%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                </Col>
                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-pulse bg-danger bg-opacity-50 text-danger"
                        border="danger"
                        description="Refund"
                        title="환불"
                        stats="3,056원"
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: '1.87%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                </Col>
            </Row>
        </>
    );
};

export default Statistics;
