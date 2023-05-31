import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HyperDatepicker from '../../../components/Datepicker';

import Statistics from './Statistics';
import ProductSales from './ProductSales';
import SalesChart from './SalesChart';
import RevenueChart from './RevenueChart';

import { ButtonsGroup } from './ButtonsGroup.js';

import { subWeeks, subDays } from 'date-fns';

const SalesStatus = () => {
    //
    const [datePickDate, setDatePickDate] = useState(new Date());
    // 월간,주간,일간 선택
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    // 현재시간 기준 전 월,주,일 날짜
    const [startDate, setStartDate] = useState(new Date());
    // 현지시간 기준 전 월,주,일 기준 filtered data
    const [sortedByPeriodSalesData, setSortedByPeriodSalesData] = useState(false);
    // 전월 매출데이터
    const [beforePeriodSaelsData, setBeforePeriodSalesData] = useState(false);

    const onDateChange = (date) => {
        if (date) {
            console.log(date);
            setDatePickDate(date);
        }
    };

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
                discountPrice: 1, //할인가
                startDate: '', // 시작일
                endDate: '', // 종료일
            },
            {
                product: '레슨', //상품
                regularPrice: '23', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: 1, //할인가
                startDate: '2022-05-16', // 시작일
                endDate: '2022-06-16', // 종료일
            },
            {
                product: '타석', //상품
                regularPrice: '100000', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: 1, //할인가
                startDate: '2022-05-16', // 시작일
                endDate: '2022-06-16', // 종료일
            },
            {
                product: '락커', //상품
                regularPrice: '100000', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: 1, //할인가
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
        refund: false,
        refundPrice: '4', //환불액
        refundReason: '단순변심', //환불사유
    };

    //=============================================================

    const getFirstDayOfWeek = (date) => {
        const dayOfWeek = date.getDay();
        const firstDayOfWeek = new Date(date);
        firstDayOfWeek.setDate(date.getDate() - dayOfWeek);

        console.log('firstDayOfWeek', firstDayOfWeek);

        return firstDayOfWeek.toDateString();
        // return firstDayOfWeek.getMonth() !== datePickDate.getMonth()
        //     ? new Date(getLastWeekOfMonth(firstDayOfWeek.getFullYear, firstDayOfWeek.getMonth())).toDateString()
        //     : firstDayOfWeek.toDateString();
    };
    // const getLastWeekOfMonth = (year, month) => {
    //     const firstDayOfMonth = new Date(year, month, 1);
    //     const firstDay = firstDayOfMonth.getDay();
    //     const totalDays = new Date(year, month + 1, 0).getDate();
    //     const lastWeek = Math.ceil((firstDay + totalDays) / 7);
    //     return lastWeek;
    // };

    useEffect(() => {
        let firstDayOfWeek = new Date(getFirstDayOfWeek(datePickDate));

        switch (selectedPeriod) {
            case 'month':
                return setStartDate(new Date(datePickDate.getFullYear(), datePickDate.getMonth(), 1));
            case 'week':
                // return setStartDate(subWeeks(datePickDate, 1));
                return setStartDate(firstDayOfWeek);
            case 'day':
                return setStartDate(subDays(datePickDate, 1));

            default:
        }
    }, [datePickDate, selectedPeriod]);

    useEffect(() => {
        const sortedPeriodData = Array.from({ length: 360 }, (_, index) => {
            const paymentDate = new Date('2023-01-01');
            paymentDate.setDate(paymentDate.getDate() + index);
            return {
                ...firestoreSalesFieldSchema,
                paymentDate: paymentDate.toISOString().split('T')[0],
                paymentTime: paymentDate.toISOString().split('T')[1].split('.')[0],
                totalPaymentPrice: index + 1,
                // refund: true,
            };
        }).filter((ele) => {
            const paymentDate = new Date(ele.paymentDate);
            return paymentDate >= startDate && paymentDate <= datePickDate ? true : false;
        });

        const beforePeriodData = Array.from({ length: 360 }, (_, index) => {
            const paymentDate = new Date('2023-01-01');
            paymentDate.setDate(paymentDate.getDate() + index);
            return {
                ...firestoreSalesFieldSchema,
                paymentDate: paymentDate.toISOString().split('T')[0],
                paymentTime: paymentDate.toISOString().split('T')[1].split('.')[0],
                totalPaymentPrice: index + 1,
                // refund: true,
            };
        }).filter((ele) => {
            const paymentDate = new Date(ele.paymentDate);
            const sevenDaysAgoDate = new Date(datePickDate.toISOString().split('T')[0]);

            const getWeek = (date) => {
                const currentDate = date ? date.getDate() : new Date();
                const firstDay = new Date(date?.setDate(1)).getDay();

                return Math.ceil((currentDate + firstDay) / 7);
            };

            switch (selectedPeriod) {
                case 'month':
                    return paymentDate.getMonth() === datePickDate.getMonth() - 1;
                case 'week':
                    return (
                        getWeek(paymentDate) === getWeek(sevenDaysAgoDate) - 1 &&
                        paymentDate.getMonth() === datePickDate.getMonth()
                    );
                case 'day':
                    return paymentDate.getDate() === new Date().setDate(datePickDate.getDate() - 1);
                default:
            }
        });

        setSortedByPeriodSalesData(sortedPeriodData);
        setBeforePeriodSalesData(beforePeriodData);
    }, [startDate, datePickDate, selectedPeriod]);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <div className="btn-group">
                                    <ButtonsGroup
                                        selectedPeriod={selectedPeriod}
                                        setSelectedPeriod={setSelectedPeriod}
                                    />
                                </div>
                                <div className="input-group">
                                    <HyperDatepicker
                                        value={datePickDate}
                                        maxDate={new Date()}
                                        inputClass="form-control-light"
                                        onChange={(date) => {
                                            onDateChange(date);
                                        }}
                                    />
                                </div>
                                <Link to="#" className="btn btn-primary ms-2">
                                    <i className="mdi mdi-autorenew"></i>
                                </Link>
                                <Link to="#" className="btn btn-primary ms-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </Link>
                            </form>
                        </div>
                        <h4 className="page-title">매출현황</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <Statistics
                        selectedPeriod={selectedPeriod}
                        sortedByPeriodSalesData={sortedByPeriodSalesData}
                        beforePeriodSaelsData={beforePeriodSaelsData}
                        datePickDate={datePickDate}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={4}>
                    <SalesChart sortedByPeriodSalesData={sortedByPeriodSalesData} />
                </Col>
                <Col lg={8}>
                    <RevenueChart sortedByPeriodSalesData={sortedByPeriodSalesData} />
                </Col>
            </Row>

            <Row>
                <Col lg={12}>
                    <ProductSales sortedByPeriodSalesData={sortedByPeriodSalesData} />
                </Col>
            </Row>
        </>
    );
};

export default SalesStatus;
