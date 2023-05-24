import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = () => {
    return (
        <>
            <Row>
                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-account-multiple"
                        description="Number of Customers"
                        title="타석"
                        stats="36,254원"
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
