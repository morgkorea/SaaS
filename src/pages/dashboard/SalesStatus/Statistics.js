import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({
    selectedPeriod,
    datePickDate,
    sortedByPeriodSalesData,
    beforePeriodSalesData,
    currentPeriodRefundData,
    previousPeriodRefundData,
}) => {
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

    const getCurrentPeriodRefund = () => {
        if (currentPeriodRefundData) {
            const currentRefund = [...currentPeriodRefundData].reduce((acc, curr) => {
                if (curr.refundPrice !== undefined) {
                    return curr.refund ? acc + Number(curr.refundPrice) : acc;
                }
            }, 0);
            setCurrentRefundPrice(currentRefund);
        }
    };
    const getPreviousPeriodRefund = () => {
        if (previousPeriodRefundData) {
            const previosRefund = [...previousPeriodRefundData].reduce((acc, curr) => {
                if (curr.refundPrice !== undefined) {
                    return curr.refund ? acc + Number(curr.refundPrice) : acc;
                }
            }, 0);
            setPreviousRefundPrice(previosRefund);
        }
    };
    const comparedWithPreviousRefund = (previous, current) => {
        setComparedRefundPrice(0);
        console.log(previousRefundPrice);

        const percentage = (((current - previous) / previous) * 100).toFixed(2);
        if (previous === 0 && current === 0) {
            return setComparedRefundPrice(0);
        } else if (previous === 0) {
            return setComparedRefundPrice(100);
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
                    return !curr.deleted_at ? [...acc, ...curr.salesProducts] : [...acc];
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
                    return !curr.deleted_at ? [...acc, ...curr.salesProducts] : [...acc];
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
        }
        setAmountBeforeProductsSales(productsSales);
        productsSales = { batterBox: 0, lesson: 0, locker: 0, etc: 0 };
    };

    const compareWithPreviousSales = () => {
        setAmountCompoareWithPreviousSales({ batterBox: 0, lesson: 0, locker: 0, etc: 0 });

        const percentCalculator = (before, current) => {
            const percentage = Number((((current - before) / before) * 100).toFixed(0));

            if ((before === 0 && current === 0) || isNaN(percentage)) {
                return 0;
            } else if (before === 0 || percentage === Infinity) {
                return 100;
            }

            return percentage % 1 === 0 ? Math.floor(percentage) : percentage;
        };

        const comparedPercentages = {
            batterBox: percentCalculator(amountBeforeProductsSales.batterBox, amountProductsSales.batterBox),
            lesson: percentCalculator(amountBeforeProductsSales.lesson, amountProductsSales.lesson),
            locker: percentCalculator(amountBeforeProductsSales.locker, amountProductsSales.locker),
            etc: percentCalculator(amountBeforeProductsSales.etc, amountProductsSales.etc),
        };

        console.log(comparedPercentages);

        setAmountCompoareWithPreviousSales(comparedPercentages);
    };

    const getUpDownIcon = (value) => {
        if (beforePeriodSalesData.length) {
            return value > 0 ? 'mdi mdi-arrow-up-bold' : value === 0 ? '' : 'mdi mdi-arrow-down-bold';
        } else {
            return value === 0 ? '' : 'mdi mdi-arrow-up-bold';
        }
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
    }, [currentRefundPrice, previousRefundPrice, amountBeforeProductsSales]);

    return (
        <>
            <Row>
                <Col xxl={3} xl={6}>
                    <StatisticsWidget
                        icon="mdi mdi mdi-golf-tee"
                        description="Number of Customers"
                        title="타석"
                        stats={amountProductsSales.batterBox.toLocaleString() + '원'}
                        amountBeforeProductsSales={amountBeforeProductsSales.batterBox.toLocaleString() + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.batterBox >= 0 ? 'text-success' : 'text-danger',
                            icon: getUpDownIcon(amountCompareWithPreviousSales.batterBox),
                            value: amountCompareWithPreviousSales.batterBox + '%',

                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>
                <Col xxl={3} xl={6}>
                    <StatisticsWidget
                        icon="mdi mdi-school"
                        description="Number of Orders"
                        title="레슨"
                        stats={amountProductsSales.lesson.toLocaleString() + '원'}
                        amountBeforeProductsSales={amountBeforeProductsSales.lesson.toLocaleString() + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.lesson >= 0 ? 'text-success' : 'text-danger',
                            icon: getUpDownIcon(amountCompareWithPreviousSales.lesson),
                            value: amountCompareWithPreviousSales.lesson + '%',

                            // beforePeriodSalesData.length ? amountCompareWithPreviousSales.lesson + '%' : '0%'
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>
                <Col xxl={2} xl={4}>
                    <StatisticsWidget
                        icon="mdi mdi-locker-multiple"
                        description="Revenue"
                        title="락커"
                        stats={amountProductsSales.locker.toLocaleString() + '원'}
                        amountBeforeProductsSales={amountBeforeProductsSales.locker.toLocaleString() + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.locker >= 0 ? 'text-success' : 'text-danger',
                            icon: getUpDownIcon(amountCompareWithPreviousSales.locker),
                            value: amountCompareWithPreviousSales.locker + '%',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>
                <Col xxl={2} xl={4}>
                    <StatisticsWidget
                        icon="mdi mdi-sack"
                        description="Revenue"
                        title="기타"
                        stats={amountProductsSales.etc.toLocaleString() + '원'}
                        amountBeforeProductsSales={amountBeforeProductsSales.etc.toLocaleString() + '원'}
                        trend={{
                            textClass: amountCompareWithPreviousSales.etc >= 0 ? 'text-success' : 'text-danger',

                            icon: getUpDownIcon(amountCompareWithPreviousSales.etc),
                            // beforePeriodSalesData.length
                            //     ? amountCompareWithPreviousSales.etc > 0
                            //         ? 'mdi mdi-arrow-up-bold'
                            //         : amountCompareWithPreviousSales.etc === 0
                            //         ? ''
                            //         : 'mdi mdi-arrow-down-bold'
                            //     : 'mdi mdi-arrow-up-bold',
                            value: amountCompareWithPreviousSales.etc + '%',

                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>
                <Col xxl={2} xl={4}>
                    <StatisticsWidget
                        icon="mdi mdi-cash-refund danger"
                        border="danger"
                        description="Refund"
                        title="환불"
                        stats={currentRefundPrice.toLocaleString() + '원'}
                        amountBeforeProductsSales={previousRefundPrice.toLocaleString() + '원'}
                        trend={{
                            textClass: comparedRefundPrice <= 0 ? 'text-success' : 'text-danger',
                            icon: getUpDownIcon(comparedRefundPrice),
                            value: comparedRefundPrice + '%',
                            time: periodTextHandler(),
                        }}></StatisticsWidget>
                </Col>
            </Row>
        </>
    );
};

export default Statistics;
