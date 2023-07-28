import React, { useState, useEffect } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import HyperDatepicker from '../../../components/Datepicker';

import Statistics from './Statistics';
import ProductSales from './ProductSales';
import SalesChart from './SalesChart';
import RevenueChart from './RevenueChart';

import { ButtonsGroup } from './ButtonsGroup.js';

import { subWeeks, subDays } from 'date-fns';

import { collection, query, doc, getDocs, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';

const SalesStatus = () => {
    const [isLoading, setIsLoading] = useState(true);
    const todayStart = new Date(new Date().toISOString().split('T')[0] + ' 00:00:00');

    const [salesData, setSalesData] = useState([]);
    const [isFetchingData, setisFethcingData] = useState(true);
    //

    const [datePickDate, setDatePickDate] = useState(todayStart);
    // 월간,주간,일간 선택
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    // 현재시간 기준 전 월,주,일 날짜
    const [startDate, setStartDate] = useState(todayStart);
    // 현지시간 기준 전 월,주,일 기준 filtered data
    const [sortedByPeriodSalesData, setSortedByPeriodSalesData] = useState([]);
    // 전 매출데이터
    const [beforePeriodSalesData, setBeforePeriodSalesData] = useState([]);

    //현,전기간 환불데이터
    const [currentPeriodRefundData, setCurrentPeriodRefundData] = useState([]);
    const [previousPeriodRefundData, setPreviousPeriodRefundData] = useState([]);

    const [currentMembers, setCurrentMembers] = useState([]);
    const email = useSelector((state) => {
        return state.Auth?.user?.email;
    });

    const getFirestoreSalesData = async () => {
        setIsLoading(true);
        const firestoreSalesCollectionRef = query(collection(firestoreDB, 'Users', email, 'Sales'));

        onSnapshot(firestoreSalesCollectionRef, (querySnapshot) => {
            const salesArray = [];
            querySnapshot.forEach((sale) => {
                salesArray.push({ ...sale.data(), uid: sale.id });
            });

            setSalesData(salesArray);
        });
        setIsLoading(false);
    };

    useEffect(() => {
        getFirestoreSalesData();
    }, []);

    const onDateChange = (date) => {
        if (date) {
            setDatePickDate(date);
        }
    };

    const getFirstDayOfWeek = (datePickDate) => {
        const datePickDay = datePickDate.getDay(); // datePickDate의 요일을 구함
        const currentWeekSunday = new Date(
            datePickDate.getFullYear(),
            datePickDate.getMonth(),
            datePickDate.getDate() - datePickDay
        );

        return currentWeekSunday;
    };

    const checkPreviousWeek = (paymentDate, datePickDate) => {
        const datePickDay = datePickDate.getDay(); // datePickDate의 요일을 구함
        const previousSaturday = new Date(
            datePickDate.getFullYear(),
            datePickDate.getMonth(),
            datePickDate.getDate() - datePickDay
        );
        // datePickDate 이전의 가장 가까운 토요일 자정 - 1밀리초 계산
        previousSaturday.setMilliseconds(previousSaturday.getMilliseconds() - 1);

        const previousSunday = new Date(
            previousSaturday.getFullYear(),
            previousSaturday.getMonth(),
            previousSaturday.getDate() - 6
        );

        if (paymentDate >= previousSunday && paymentDate <= previousSaturday) {
            return true;
        } else {
            return false;
        }
    };

    const checkPreviousDate = (paymentDate, datePickDate) => {
        const previousDay = new Date(datePickDate);
        previousDay.setDate(previousDay.getDate() - 1);

        if (
            paymentDate.getDate() === previousDay.getDate() &&
            paymentDate.getMonth() === previousDay.getMonth() &&
            paymentDate.getFullYear() === previousDay.getFullYear()
        ) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        let firstDayOfWeek = new Date(getFirstDayOfWeek(datePickDate));

        switch (selectedPeriod) {
            case 'month':
                return setStartDate(new Date(datePickDate.getFullYear(), datePickDate.getMonth(), 1));
            case 'week':
                return setStartDate(firstDayOfWeek);
            case 'day':
                return setStartDate(datePickDate);

            default:
        }
    }, [datePickDate, selectedPeriod]);

    const getPeriodOfRefundData = () => {
        const currentRefund = salesData.filter((sales) => {
            if (sales.refund) {
                const refundDate = new Date(sales.refundDate + ' 00:00:00');

                return refundDate >= startDate && refundDate <= datePickDate ? true : false;
            }
        });
        const previousRefund = salesData.filter((sales) => {
            if (sales.refund) {
                const refundDate = new Date(sales.refundDate + ' 00:00:00');

                switch (selectedPeriod) {
                    case 'month':
                        return refundDate.getMonth() === datePickDate.getMonth() - 1;
                    case 'week':
                        return (
                            refundDate.getFullYear() === datePickDate.getFullYear() &&
                            checkPreviousWeek(refundDate, datePickDate)
                        );
                    case 'day':
                        return checkPreviousDate(refundDate, datePickDate);
                    default:
                }
            }
        });

        setCurrentPeriodRefundData(currentRefund);
        setPreviousPeriodRefundData(previousRefund);
    };

    useEffect(() => {
        const sortedPeriodData = salesData.filter((ele) => {
            const paymentDate = new Date(ele.paymentDate + ' 00:00:00');

            return paymentDate >= startDate && paymentDate <= datePickDate ? true : false;
        });

        const beforePeriodData = salesData.filter((ele) => {
            const paymentDate = new Date(ele.paymentDate + ' 00:00:00');

            switch (selectedPeriod) {
                case 'month':
                    return paymentDate.getMonth() === datePickDate.getMonth() - 1;
                case 'week':
                    return (
                        paymentDate.getFullYear() === datePickDate.getFullYear() &&
                        checkPreviousWeek(paymentDate, datePickDate)
                    );
                case 'day':
                    return checkPreviousDate(paymentDate, datePickDate);
                default:
            }
        });

        setSortedByPeriodSalesData(sortedPeriodData);
        setBeforePeriodSalesData(beforePeriodData);

        getPeriodOfRefundData();
    }, [salesData, startDate, datePickDate, selectedPeriod]);

    const [index, setIndex] = useState(1);
    const tabContents = [
        {
            id: 1,
            title: '월간',
        },
        {
            id: 2,
            title: '주간',
        },
        {
            id: 2,
            title: '일간',
        },
    ];

    return (
        <>
            {isLoading ? (
                <div style={{ display: 'grid', placeItems: 'center', height: '85vh' }}>
                    <div className="spinner-grow text-primary" role="status"></div>
                </div>
            ) : (
                <div>
                    <Row>
                        <Col xs={12}>
                            <div className="page-title-box">
                                <div className="page-title-right d-flex">
                                    <Tab.Container defaultActiveKey="월간">
                                        <Nav variant="pills" justify className="bg-nav-pills">
                                            {tabContents.map((tab, index) => {
                                                return (
                                                    <Nav.Item
                                                        key={index}
                                                        onClick={() => {
                                                            if (index === 0) {
                                                                setSelectedPeriod('month');
                                                            } else if (index === 1) {
                                                                setSelectedPeriod('week');
                                                            } else if (index === 2) {
                                                                setSelectedPeriod('day');
                                                            }
                                                            setIndex(tab.id);
                                                        }}>
                                                        <Nav.Link as={Link} to="#" eventKey={tab.title}>
                                                            <span className="d-none d-md-block">{tab.title}</span>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                );
                                            })}
                                        </Nav>
                                    </Tab.Container>
                                    <form className="d-flex ms-2">
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
                                    </form>
                                </div>
                                <h4 className="page-title">매출현황</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Statistics
                                datePickDate={datePickDate}
                                selectedPeriod={selectedPeriod}
                                sortedByPeriodSalesData={sortedByPeriodSalesData}
                                beforePeriodSalesData={beforePeriodSalesData}
                                currentPeriodRefundData={currentPeriodRefundData}
                                previousPeriodRefundData={previousPeriodRefundData}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>
                            <RevenueChart
                                datePickDate={datePickDate}
                                selectedPeriod={selectedPeriod}
                                sortedByPeriodSalesData={sortedByPeriodSalesData}
                                beforePeriodSalesData={beforePeriodSalesData}
                                currentPeriodRefundData={currentPeriodRefundData}
                                previousPeriodRefundData={previousPeriodRefundData}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={4}>
                            <SalesChart
                                sortedByPeriodSalesData={sortedByPeriodSalesData}
                                selectedPeriod={selectedPeriod}
                                datePickDate={datePickDate}
                            />
                        </Col>
                        <Col lg={8}>
                            <ProductSales
                                sortedByPeriodSalesData={sortedByPeriodSalesData}
                                selectedPeriod={selectedPeriod}
                                datePickDate={datePickDate}
                            />
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};

export default SalesStatus;
