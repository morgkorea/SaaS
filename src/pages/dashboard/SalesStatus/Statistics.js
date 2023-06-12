import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ sortedByPeriodSalesData, selectedPeriod, beforePeriodSalesData, startDate }) => {
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
    const [currentRefundPrice, setCurrentRefundPrice] = useState(0);
    const [previousRefundPrice, setPreviousRefundPrice] = useState(0);
    const [comparedRefundPrice, setComparedRefundPrice] = useState(0);

    const testNumber = (123423423424).toLocaleString();

    const getCurrentPeriodRefund = () => {
        if (sortedByPeriodSalesData) {
            const currentRefund = [...sortedByPeriodSalesData].reduce((acc, curr) => {
                return curr.refund === true ? acc + Number(curr.totalPaymentPrice) : acc;
            }, 0);
            setCurrentRefundPrice(currentRefund);
        }
    };
    const getPreviousPeriodRefund = () => {
        if (beforePeriodSalesData) {
            const previosRefund = [...beforePeriodSalesData].reduce((acc, curr) => {
                return curr.refund === true ? acc + Number(curr.totalPaymentPrice) : acc;
            }, 0);
            setPreviousRefundPrice(previosRefund);
        }
    };
    const comparedWithPreviousRefund = (previous, current) => {
        const percentage = (((current - previous) / previous) * 100).toFixed(2);
        if (previous === 0 && current === 0) {
            return 0;
        } else if (previous === 0) {
            return 100;
        }
        setComparedRefundPrice(percentage % 1 === 0 ? Math.floor(percentage) : percentage);
    };

    const amountEachProductsSales = () => {
        setAmountProductsSales({
            batterBox: 0,
            lesson: 0,
            locker: 0,
            etc: 0,
        });
        let productsSales = { batterBox: 0, lesson: 0, locker: 0, etc: 0 };
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
        productsSales = { batterBox: 0, lesson: 0, locker: 0, etc: 0 };
    };

    const amountBeforePeriodProductsSales = () => {
        setAmountBeforeProductsSales({
            batterBox: 0,
            lesson: 0,
            locker: 0,
            etc: 0,
        });
        let productsSales = { batterBox: 0, lesson: 0, locker: 0, etc: 0 };
        if (beforePeriodSalesData) {
            [...beforePeriodSalesData]
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
        productsSales = { batterBox: 0, lesson: 0, locker: 0, etc: 0 };
    };

    const compareWithPreviousSales = () => {
        setAmountCompoareWithPreviousSales({ batterBox: 0, lesson: 0, locker: 0, etc: 0 });

        const comparedPercentages = {
            batterBox: percentCalculator(amountBeforeProductsSales.batterBox, amountProductsSales.batterBox),
            lesson: percentCalculator(amountBeforeProductsSales.lesson, amountProductsSales.lesson),
            locker: percentCalculator(amountBeforeProductsSales.locker, amountProductsSales.locker),
            etc: percentCalculator(amountBeforeProductsSales.etc, amountProductsSales.etc),
        };

        function percentCalculator(before, current) {
            const percentage = (((current - before) / before) * 100).toFixed(2);
            if (before === 0 && current === 0) {
                return 0;
            } else if (before === 0) {
                return 100;
            }
            return percentage % 1 === 0 ? Math.floor(percentage) : percentage;
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
        getPreviousPeriodRefund();
        getCurrentPeriodRefund();
        amountEachProductsSales();
    }, [sortedByPeriodSalesData]);

    useEffect(() => {
        amountBeforePeriodProductsSales();
    }, [beforePeriodSalesData]);

    useEffect(() => {
        compareWithPreviousSales();
        comparedWithPreviousRefund(previousRefundPrice, currentRefundPrice);
    }, [currentRefundPrice, amountBeforeProductsSales]);

    return (
        <>
            <Row>
                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-account-multiple"
                        description="Number of Customers"
                        title="타석"
                        stats={amountProductsSales.batterBox.toLocaleString() + '원'}
                        amountBeforeProductsSales={amountBeforeProductsSales.batterBox.toLocaleString() + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.batterBox >= 0 ? 'text-success' : 'text-danger',

                            icon: beforePeriodSalesData.length
                                ? amountCompareWithPreviousSales.batterBox > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : amountCompareWithPreviousSales.batterBox === 0
                                    ? ''
                                    : 'mdi mdi-arrow-down-bold'
                                : '',

                            value: beforePeriodSalesData.length ? amountCompareWithPreviousSales.batterBox + '%' : '0%',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-cart-plus"
                        description="Number of Orders"
                        title="레슨"
                        stats={amountProductsSales.lesson.toLocaleString() + '원'}
                        amountBeforeProductsSales={amountBeforeProductsSales.lesson.toLocaleString() + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.lesson >= 0 ? 'text-success' : 'text-danger',
                            icon: beforePeriodSalesData.length
                                ? amountCompareWithPreviousSales.lesson > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : amountCompareWithPreviousSales.lesson === 0
                                    ? ''
                                    : 'mdi mdi-arrow-down-bold'
                                : '',
                            value: beforePeriodSalesData.length ? amountCompareWithPreviousSales.lesson + '%' : '0%',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-currency-usd"
                        description="Revenue"
                        title="락커"
                        stats={amountProductsSales.locker.toLocaleString() + '원'}
                        amountBeforeProductsSales={amountBeforeProductsSales.locker.toLocaleString() + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.locker >= 0 ? 'text-success' : 'text-danger',
                            icon: beforePeriodSalesData.length
                                ? amountCompareWithPreviousSales.locker > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : amountCompareWithPreviousSales.locker === 0
                                    ? ''
                                    : 'mdi mdi-arrow-down-bold'
                                : '',
                            value: amountCompareWithPreviousSales.locker + '%',

                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>

                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-currency-usd"
                        description="Revenue"
                        title="기타"
                        stats={amountProductsSales.etc.toLocaleString() + '원'}
                        amountBeforeProductsSales={amountBeforeProductsSales.etc.toLocaleString() + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.etc >= 0 ? 'text-success' : 'text-danger',

                            icon: beforePeriodSalesData.length
                                ? amountCompareWithPreviousSales.etc > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : amountCompareWithPreviousSales.etc === 0
                                    ? ''
                                    : 'mdi mdi-arrow-down-bold'
                                : '',
                            value: beforePeriodSalesData.length ? amountCompareWithPreviousSales.etc + '%' : '0%',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>
                <Col>
                    <StatisticsWidget
                        icon="mdi mdi-pulse bg-danger bg-opacity-50 text-danger"
                        border="danger"
                        description="Refund"
                        title="환불"
                        stats={currentRefundPrice.toLocaleString() + '원'}
                        amountBeforeProductsSales={previousRefundPrice.toLocaleString() + '원'}
                        trend={{
                            textClass: comparedRefundPrice <= 0 ? 'text-success' : 'text-danger',
                            icon: beforePeriodSalesData.length
                                ? comparedRefundPrice > 0
                                    ? 'mdi mdi-arrow-up-bold'
                                    : comparedRefundPrice === 0
                                    ? ''
                                    : 'mdi mdi-arrow-down-bold'
                                : '',
                            value: comparedRefundPrice + '%',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>
            </Row>
        </>
    );
};

export default Statistics;
