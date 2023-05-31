import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const RevenueChart = ({ sortedByPeriodSalesData }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [beforeMonth, setBeforeMonth] = useState(new Date().getMonth());

    //mockup DATA ==============================================
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const firestoreSalesFieldSchema = {
        paymentNumber: '111', //결제번호
        paymentDate: '2023-05-01', //결제일
        paymentTime: '09:12:30', //결제시간
        registrationType: '', //등록구분
        memeberNumber: '', //회원번호
        name: '유승훈', //이름
        phone: '010-7178-1117', //전화번호
        products: [
            {
                product: '장갑', //상품
                regularPrice: '12', //상품 정상가
                discountRate: '10%', // 할인율
                discountPrice: getRandomInt(1, 1000000), //할인가
                startDate: '', // 시작일
                endDate: '', // 종료일
            },
            {
                product: '레슨', //상품
                regularPrice: '23', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: getRandomInt(1, 1000000), //할인가
                startDate: '2022-05-16', // 시작일
                endDate: '2022-06-16', // 종료일
            },
            {
                product: '타석', //상품
                regularPrice: '100000', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: getRandomInt(1, 1000000), //할인가
                startDate: '2022-05-16', // 시작일
                endDate: '2022-06-16', // 종료일
            },
            {
                product: '락커', //상품
                regularPrice: '100000', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: getRandomInt(1, 1000000), //할인가
                startDate: '2022-05-16', // 시작일
                endDate: '2022-06-16', // 종료일
            },
        ],
        totalPaymentPrice: '', //결제총액
        outstandingPrice: '', //미결제금액
        paymentMethod: '카드', //결제수단
        recieptNumber: '002', // 결제번호
        paymentMemo: '메모', //결제메모
        refundRequest_date: '2023-05-17', //환불요청일 2023-09-23
        refundDate: '2023-05-17', //환불일 2023-10-22
        refundPrice: '89000', //환불액
        refundReason: '단순변심', //환불사유
    };

    //=============================================================

    const sortedPeriodData = Array.from({ length: 120 }, (_, index) => {
        const paymentDate = new Date('2023-5-5');
        paymentDate.setDate(paymentDate.getDate() + index);
        return {
            ...firestoreSalesFieldSchema,
            paymentDate: paymentDate.toISOString().split('T')[0],
            paymentTime: paymentDate.toISOString().split('T')[1].split('.')[0],
            totalPaymentPrice: index + 30,
        };
    });

    const beforeSortedPeriodData = Array.from({ length: 120 }, (_, index) => {
        const paymentDate = new Date('2023-4-1');
        paymentDate.setDate(paymentDate.getDate() + index);
        return {
            ...firestoreSalesFieldSchema,
            paymentDate: paymentDate.toISOString().split('T')[0],
            paymentTime: paymentDate.toISOString().split('T')[1].split('.')[0],
            totalPaymentPrice: index + 60,
        };
    });
    const beforeMonthOfDate = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
    const currentMonthOfDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const applyMonthOfDate = beforeMonthOfDate > currentMonthOfDate ? beforeMonthOfDate : currentMonthOfDate;

    const getCurrentMonthOfDays = () => {
        const getSalesByDateArray = new Array(applyMonthOfDate).fill(0);
        return Array.from({ length: getSalesByDateArray.length }, (_, index) => index + 1);
    };

    const getCurrentMonthSalesByDate = () => {
        const result = new Array(applyMonthOfDate).fill(0);
        if (sortedPeriodData) {
            [...sortedPeriodData]
                .filter((sale) => {
                    return new Date().getMonth() + 1 === new Date(sale.paymentDate).getMonth() + 1 ? true : false;
                })
                .forEach((sale, idx) => {
                    const paymentDate = new Date(sale.paymentDate).getDate() - 1;
                    result[paymentDate] = sale.totalPaymentPrice;
                });
        }

        return result;
    };
    const getBeforeMonthSalesByDate = () => {
        const result = new Array(applyMonthOfDate).fill(0);
        if (beforeSortedPeriodData) {
            [...beforeSortedPeriodData]
                .filter((sale) => {
                    return new Date().getMonth() === new Date(sale.paymentDate).getMonth() ? true : false;
                })
                .forEach((sale, idx) => {
                    const paymentDate = new Date(sale.paymentDate).getDate() - 1;
                    result[paymentDate] = sale.totalPaymentPrice;
                });
        }

        return result;
    };

    const apexLineChartWithLables = {
        chart: {
            type: 'line',

            dropShadow: {
                enabled: true,
                opacity: 0.1,
                blur: 7,
                left: -7,
                top: 7,
            },
            toolbar: {
                show: false,
            },
            parentHeightOffset: 0,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 4,
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#727cf5', '#0acf97', '#fa5c7c', '#ffbc00'],
        xaxis: {
            type: 'string',
            categories: [
                // '1',
                // '2',
                // '3',
                // '4',
                // '5',
                // '6',
                // '7',
                // '8',
                // '9',
                // '10',
                // '11',
                // '12',
                // '13',
                // '14',
                // '15',
                // '16',
                // '17',
                // '18',
                // '19',
                // '20',
                // '21',
                // '22',
                // '23',
                // '24',
                // '25',
                // '26',
                // '27',
                // '28',
                // '29',
                // '30',
                // '31',
                ...getCurrentMonthOfDays(),
            ],
            tooltip: {
                enabled: false,
            },
            axisBorder: {
                show: false,
            },
        },
    };

    const apexLineChartWithLablesData = [
        {
            name: '이번 달',
            data: [...getCurrentMonthSalesByDate()],
        },
        {
            name: '지난 달',
            data: [...getBeforeMonthSalesByDate()],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <CardTitle containerClass="d-flex align-items-center justify-content-between mb-2" title="추이" />

                <div className="chart-content-bg">
                    <Row className="text-center">
                        <Col md={6}>
                            <p className="text-muted mb-0 mt-3">이번 달</p>
                            <h2 className="fw-normal mb-3">
                                <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
                                <span>
                                    {[...getCurrentMonthSalesByDate()].reduce((acc, curr) => {
                                        return acc + curr;
                                    }, 0)}
                                    원
                                </span>
                            </h2>
                        </Col>

                        <Col md={6}>
                            <p className="text-muted mb-0 mt-3">지난 달</p>
                            <h2 className="fw-normal mb-3">
                                <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
                                <span>
                                    {[...getBeforeMonthSalesByDate()].reduce((acc, curr) => {
                                        return acc + curr;
                                    }, 0)}
                                    원
                                </span>
                            </h2>
                        </Col>
                    </Row>
                </div>

                <Chart
                    options={apexLineChartWithLables}
                    series={apexLineChartWithLablesData}
                    type="line"
                    className="apex-charts mt-3"
                    height={330}
                />
            </Card.Body>
        </Card>
    );
};

export default RevenueChart;
