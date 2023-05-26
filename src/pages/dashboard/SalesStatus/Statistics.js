import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ sortedByPeriodSalesData }) => {
    const [amountProductsSales, setAmountProductsSales] = useState({
        batterBox: 0,
        lesson: 0,
        locker: 0,
        etc: 0,
    });
    const [amountTotalRefundPrice, setAmountTotalRefundPrice] = useState(0);

    const sumTotalRefundPrice = () => {
        if (sortedByPeriodSalesData) {
            const totalRefund = [...sortedByPeriodSalesData].reduce((acc, curr) => {
                return acc + Number(curr.refundPrice);
            }, 0);
            setAmountTotalRefundPrice(totalRefund);
        }
    };

    const amountEachProductsSales = () => {
        setAmountProductsSales({
            batterBox: 0,
            lesson: 0,
            locker: 0,
            etc: 0,
        });
        const productsSales = { batterBox: 0, lesson: 0, locker: 0, etc: 0 };
        if (sortedByPeriodSalesData) {
            [...sortedByPeriodSalesData]
                .reduce((acc, curr) => {
                    return [...acc, ...curr.products];
                }, [])
                .forEach((ele, idx) => {
                    if (ele.product === '타석') {
                        productsSales.batterBox = productsSales.batterBox + Number(ele.discountPrice);
                    } else if (ele.product === '레슨') {
                        productsSales.lesson = productsSales.lesson + Number(ele.discountPrice);
                    } else if (ele.product === '락커') {
                        productsSales.locker = productsSales.locker + Number(ele.discountPrice);
                    } else {
                        productsSales.etc = productsSales.etc + Number(ele.discountPrice);
                    }

                    setAmountProductsSales(productsSales);
                });
        }

        console.log(amountProductsSales, productsSales);
    };

    useEffect(() => {
        setAmountTotalRefundPrice(0);
        sumTotalRefundPrice();
        amountEachProductsSales();
    }, [sortedByPeriodSalesData]);

    return (
        <>
            <Row>
                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-account-multiple"
                        description="Number of Customers"
                        title="타석"
                        stats={amountProductsSales.batterBox + '원'}
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
                        stats={amountProductsSales.lesson + '원'}
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
                        stats={amountProductsSales.locker + '원'}
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
                        stats={amountProductsSales.etc + '원'}
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
                        stats={amountTotalRefundPrice + '원'}
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
