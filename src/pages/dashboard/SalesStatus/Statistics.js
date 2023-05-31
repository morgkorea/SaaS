import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ sortedByPeriodSalesData, selectedPeriod, beforePeriodSaelsData, startDate }) => {
    const [amountProductsSales, setAmountProductsSales] = useState({
        batterBox: 0,
        lesson: 0,
        locker: 0,
        etc: 0,
    });
    const [amountBeforeProductsSales, setAmountBeforeProductsSales] = useState({
        batterBox: 0,
        lesson: 0,
        locker: 0,
        etc: 0,
    });

    const [amountCompareWithPreviousSales, setAmountCompoareWithPreviousSales] = useState({
        batterBox: 0,
        lesson: 0,
        locker: 0,
        etc: 0,
    });
    const [amountTotalRefundPrice, setAmountTotalRefundPrice] = useState(0);

    const sumTotalRefundPrice = () => {
        if (sortedByPeriodSalesData) {
            const totalRefund = [...sortedByPeriodSalesData].reduce((acc, curr) => {
                return curr.refund === true ? acc + Number(curr.refundPrice) : acc;
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
                    return !curr.refund ? [...acc, ...curr.products] : [...acc];
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
                });
        }
        setAmountProductsSales(productsSales);
    };

    const amountBeforePeriodProductsSales = () => {
        setAmountBeforeProductsSales({
            batterBox: 0,
            lesson: 0,
            locker: 0,
            etc: 0,
        });
        const productsSales = { batterBox: 0, lesson: 0, locker: 0, etc: 0 };
        if (beforePeriodSaelsData) {
            [...beforePeriodSaelsData]
                .reduce((acc, curr) => {
                    return !curr.refund ? [...acc, ...curr.products] : [...acc];
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
                });
        }
        setAmountBeforeProductsSales(productsSales);
    };

    const compareWithPreviousSales = () => {
        // const before = selectedPeriod === 'month' ? amountBeforeProductsSales : amountProductsSales;
        setAmountCompoareWithPreviousSales({ batterBox: 0, lesson: 0, locker: 0, etc: 0 });

        const before = amountBeforeProductsSales;

        const comparedPercentages = {
            batterBox: percentCalculater(before.batterBox, amountProductsSales.batterBox),
            lesson: percentCalculater(before.lesson, amountProductsSales.lesson),
            locker: percentCalculater(before.locker, amountProductsSales.locker),
            etc: percentCalculater(before.etc, amountProductsSales.etc),
        };

        function percentCalculater(before, current) {
            return (((current - before) / before) * 100).toFixed(2);
        }

        setAmountCompoareWithPreviousSales(comparedPercentages);
    };

    const periodTextHandler = () => {
        switch (selectedPeriod) {
            case 'month':
                return '전월 대비';
            case 'week':
                return '전주 대비';
            case 'day':
                return '전일 대비';
            default:
                return '전월 대비';
        }
    };

    useEffect(() => {
        setAmountTotalRefundPrice(0);
        sumTotalRefundPrice();
        amountEachProductsSales();
        amountBeforePeriodProductsSales();
        compareWithPreviousSales();
    }, [sortedByPeriodSalesData, selectedPeriod, beforePeriodSaelsData, startDate]);

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
                            textClass: amountCompareWithPreviousSales.batterBox > 0 ? 'text-success' : 'text-danger',
                            icon: beforePeriodSaelsData.length
                                ? amountCompareWithPreviousSales.batterBox > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : 'mdi mdi-arrow-down-bold'
                                : '',
                            value: beforePeriodSaelsData.length ? amountCompareWithPreviousSales.batterBox + '%' : '',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-cart-plus"
                        description="Number of Orders"
                        title="레슨"
                        stats={amountProductsSales.lesson + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.lesson > 0 ? 'text-success' : 'text-danger',
                            icon: beforePeriodSaelsData.length
                                ? amountCompareWithPreviousSales.lesson > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : 'mdi mdi-arrow-down-bold'
                                : '',
                            value: beforePeriodSaelsData.length ? amountCompareWithPreviousSales.lesson + '%' : '',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-currency-usd"
                        description="Revenue"
                        title="락커"
                        stats={amountProductsSales.locker + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.locker > 0 ? 'text-success' : 'text-danger',
                            icon: beforePeriodSaelsData.length
                                ? amountCompareWithPreviousSales.locker > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : 'mdi mdi-arrow-down-bold'
                                : '',
                            value: beforePeriodSaelsData.length ? amountCompareWithPreviousSales.locker + '%' : '',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-currency-usd"
                        description="Revenue"
                        title="기타"
                        stats={amountProductsSales.etc + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.etc > 0 ? 'text-success' : 'text-danger',
                            icon: beforePeriodSaelsData.length
                                ? amountCompareWithPreviousSales.etc > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : 'mdi mdi-arrow-down-bold'
                                : '',
                            value: beforePeriodSaelsData.length ? amountCompareWithPreviousSales.etc + '%' : '',
                            time: periodTextHandler(),
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
                            textClass: amountTotalRefundPrice > 0 ? 'text-success' : 'text-danger',
                            icon: amountTotalRefundPrice > 0 ? 'mdi mdi-arrow-up-bold' : 'mdi mdi-arrow-down-bold',
                            value: `${amountTotalRefundPrice}%`,
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>
            </Row>
        </>
    );
};

export default Statistics;
