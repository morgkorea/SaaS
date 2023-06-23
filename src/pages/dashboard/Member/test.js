import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import HyperDatepicker from '../../../components/Datepicker';

import Statistics from './Statistics';
import ProductSales from './ProductSales';
import SalesChart from './SalesChart';
import RevenueChart from './RevenueChart';

import { ButtonsGroup } from './ButtonsGroup.js';

import { subWeeks, subDays } from 'date-fns';

import { doc, collection, getDoc, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';

const SalesStatus = () => {
    const [isDataLoading, setIsDataLoading] = useState(false);
    //

    const [datePickDate, setDatePickDate] = useState(new Date());
    // 월간,주간,일간 선택
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    // 현재시간 기준 전 월,주,일 날짜
    const [startDate, setStartDate] = useState(new Date());
    // 현지시간 기준 전 월,주,일 기준 filtered data
    const [sortedByPeriodSalesData, setSortedByPeriodSalesData] = useState(false);
    // 전월 매출데이터
    const [beforePeriodSalesData, setBeforePeriodSalesData] = useState(false);

    const [currentMembers, setCurrentMembers] = useState([]);
    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });

    const getFirestoreSalesData = async () => {
        const docRef = doc(firestoreDB, 'Users', email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data());
            const members = docSnap.data().members;
            setCurrentMembers(members);
            console.log('members', members);
        } else {
            // docSnap.data() will be undefined in this case
            console.log('No such document!');
        }
    };
    useEffect(() => {
        getFirestoreSalesData();
    }, []);

    const updateFirestoreAddMember = async () => {
        const washingtonRef = doc(firestoreDB, 'Users', email);
        const newMember = {
            typeFormToken: 'testtest',
            memberNumber: 'testest', //회원번호
            createdDate: 'test', //date 생성날짜 2023-04-23
            createdTime: 'testtest', //time 생성시간 04:10:42
            name: 'test', //이름
            phone: 'test', //전화번호
            sex: 'test', //성별
            birthDate: 'test', //date 생일
            ageGroup: 'test', //연령대
            location: 'test', //위치
            golfPeriod: 'test', //골프경력
            golfPurpose: 'test', //골프목적
            hoursUse: 'test', //이용시간
            injuries: 'test', //부상전적
            injuriedPart: 'test', //부상부위
            marketingRecieveAllow: false, //마케팅수신동의
            privateInfoAllow: false, //개인정보수집동의
            amountPayments: 'test', //누적결제수
            lifetimeValue: 'test', //LTV - 누적결제금액
            amountPaymentAverage: 'test', //평균결제금액
            audience: 'test', //오디언스
            activation: false, //활성여부 false || true

            //이용가능상품
            availableProducts: [
                {
                    activateProduct: '레슨', //활성상품
                    startDate: '2023-05-24', //시작일
                    endDate: '2023-05-30', //종료일
                    dDays: '6', //남은일수 endDate - startDate
                },
                {
                    activateProduct: '락커', //활성상품
                    startDate: '2023-02-19', //시작일
                    endDate: '2023-07-19', //종료일
                    dDays: '120', //남은일수
                },
            ],

            //이용불가상품
            unavailableProducts: [
                {
                    inactiveProduct: '락커', //종료상품
                    startDate: '2023-02-19', //시작일
                    endDate: '2023-02-19', //종료일
                    dDays: 0, //남은일수
                    refund: false,
                },
            ],
        };
        if (currentMembers.length) {
            try {
                await updateDoc(washingtonRef, {
                    members: [...currentMembers, newMember],
                });
                console.log('update member succeed');
            } catch (error) {
                console.log('update member error', error);
            }
        }

        // Set the "capital" field of the city 'DC'
    };
    const updateAddMembers = () => {
        console.log('updating member');
        updateFirestoreAddMember();
    };

    const modifyingFirestoreMember = async () => {
        const washingtonRef = doc(firestoreDB, 'Users', email);
        if (currentMembers.length) {
            const modifyingMembers = [...currentMembers].map((member, idx) => {
                if (idx === 0) {
                    const memberData = { ...member, name: '심수정' };
                    return memberData;
                } else {
                    return member;
                }
            });
            console.log(modifyingMembers);
            try {
                await updateDoc(washingtonRef, {
                    members: [...modifyingMembers],
                });

                console.log('modifying member suecced');
            } catch (error) {
                console.log('modifying member error', error);
            }
        }
    };

    const modifyMember = () => {
        console.log('modifying member');
        modifyingFirestoreMember();
    };

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
                productType: '기타',
                regularPrice: '12', //상품 정상가
                discountRate: '10%', // 할인율
                discountPrice: 10000, //할인가
                startDate: '', // 시작일
                endDate: '', // 종료일
            },
            {
                product: '레슨', //상품
                productType: '레슨',
                regularPrice: '23', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: 200000, //할인가
                startDate: '2022-05-16', // 시작일
                endDate: '2022-06-16', // 종료일
            },
            {
                product: '타석', //상품
                productType: '타석',
                regularPrice: '100000', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: 300000, //할인가
                startDate: '2022-05-16', // 시작일
                endDate: '2022-06-16', // 종료일
            },
            {
                product: '락커', //상품
                productType: '락커',
                regularPrice: '100000', //상품 정상가
                discountRate: '20%', // 할인율
                discountPrice: 100000, //할인가
                startDate: '2022-05-16', // 시작일
                endDate: '2022-06-16', // 종료일
            },
        ],
        totalPaymentPrice: 610000, //결제총액 type number
        outstandingPrice: '', //미결제금액
        paymentMethod: '카드', //결제수단
        recieptNumber: '002', // 결제번호
        paymentMemo: '메모', //결제메모
        refund: false,
        refundRequest_date: '2023-05-17', //환불요청일 2023-09-23 type:string
        refundDate: '2023-05-17', //환불일 2023-10-22  type:string

        refundPrice: '4', //환불액
        refundReason: '단순변심', //환불사유
    };

    //=============================================================

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
        const currentWeekSunday = new Date(
            datePickDate.getFullYear(),
            datePickDate.getMonth(),
            datePickDate.getDate() - datePickDay
        );
        const previousSunday = new Date(
            currentWeekSunday.getFullYear(),
            currentWeekSunday.getMonth(),
            currentWeekSunday.getDate() - 7
        ); // datePickDate 이전의 가장 가까운 일요일을 계산

        if (paymentDate >= previousSunday && paymentDate <= currentWeekSunday) {
            return true;
        } else {
            return false;
        }
    };

    const checkPreviousDate = (paymentDate, datePickDate) => {
        var previousDay = new Date(datePickDate.getTime() - 24 * 60 * 60 * 1000); // datePickDate의 전일을 계산

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
                // totalPaymentPrice: index + 1,
                refund: index % 2 === 0 ? true : false,
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
                // totalPaymentPrice: index + 1,
                refund: index % 2 === 0 ? true : false,
            };
        }).filter((ele) => {
            const paymentDate = new Date(ele.paymentDate);

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
            <button onClick={updateAddMembers}>Update Member</button>
            <button onClick={modifyMember}>Modifying Member</button>
            <Row>
                <Col xl={12}>
                    <Statistics
                        selectedPeriod={selectedPeriod}
                        sortedByPeriodSalesData={sortedByPeriodSalesData}
                        beforePeriodSalesData={beforePeriodSalesData}
                        datePickDate={datePickDate}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={12}>
                    <RevenueChart
                        sortedByPeriodSalesData={sortedByPeriodSalesData}
                        selectedPeriod={selectedPeriod}
                        beforePeriodSalesData={beforePeriodSalesData}
                        datePickDate={datePickDate}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={4}>
                    <SalesChart sortedByPeriodSalesData={sortedByPeriodSalesData} />
                </Col>
                <Col lg={8}>
                    <ProductSales sortedByPeriodSalesData={sortedByPeriodSalesData} />
                </Col>
            </Row>
        </>
    );
};

export default SalesStatus;

