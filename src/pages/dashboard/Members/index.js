import React, { useEffect, useState } from 'react';
import { Row, Col, Alert, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Goal from './Goal';
import Career from './Career';
import Location from './Location';
import AgeChart from './AgeChart';
import Statistics from './Statistics';
import GenderStatus from './GenderStatus';
import SessionsChart from './SessionsChart';
import LocationStatus from './LocationStatus';
import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';

const MemberDashboard = () => {
    const currentMonthOfDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const previousMonthOfDays = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();

    const [activeMembers, setActiveMembers] = useState([]);
    const [currentMembers, setCurrentMembers] = useState([]);
    
    //현월 일자별 타석,레슨 활성화 회원 수 배열
    const [activateBatterboxMembers, setActiveBatterboxMembers] = useState(Array(currentMonthOfDays).fill(0));
    const [activateLessonMembers, setActiveLessonMembers] = useState(Array(currentMonthOfDays).fill(0));

    //전월 일자별 타석,레슨 활성화 회원 수 배열
    const [previousActivateBatterboxMembers, setPreviousActiveBatterboxMembers] = useState(Array(previousMonthOfDays).fill(0));
    const [previousActivateLessonMembers, setPreviousActiveLessonMembers] = useState(Array(previousMonthOfDays).fill(0));

    // 월별 활성화 회원 수 배열 선언 및 초기화
    const [monthlyActivateBatterboxMembers, setMonthlyActivateBatterboxMembers] = useState(Array(12).fill(0));
    const [monthlyActivateLessonMembers, setMonthlyActivateLessonMembers] = useState(Array(12).fill(0));

    const email = useSelector((state) => state.Auth?.user.email);
    const memberRef = collection(firestoreDB, 'Users', email, 'Members');
    
    const getMembers = async () => {
        const querySnapshot = await getDocs(memberRef);

        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setCurrentMembers(data);
        setActiveMembers(
            data.filter((member) => {
                if (Array.isArray(member.availableProducts)) {
                    return [...member.availableProducts, ...member.unavailableProducts].some(
                        (product) => product !== null && !product.deleted_at
                    );
                }
                return false;
            })
        );

        const getCurrentActivateMembers = (productType) => {
            const activateMembersArray = [];

            for (let day = 0; day < currentMonthOfDays; day++) {
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth();
                const dayOfActivateMembers = [];

                data?.forEach((doc) => {
                    const member = {
                        id: doc.id,
                        ...doc,
                    };

                    if (Array.isArray(member.availableProducts)) {
                        const allOfProducts = [
                            ...member.availableProducts,
                            ...(Array.isArray(member.unavailableProducts) ? member.unavailableProducts : []),
                        ];
                        if (allOfProducts.length > 0) {
                            allOfProducts
                                .filter((product) => product.productType === productType && !product.deleted_at)
                                .forEach((product) => {
                                    const startDate = new Date(
                                        new Date(product.startDate).toISOString().split('T')[0] + ' 00:00:00'
                                    );
                                    const endDate = new Date(
                                        new Date(product.endDate).toISOString().split('T')[0] + ' 00:00:00'
                                    );
                                    const refundDate = product.refundDate
                                        ? new Date(
                                              new Date(product.refundDate).toISOString().split('T')[0] + ' 00:00:00'
                                          )
                                        : false;

                                    const currentDate = new Date(currentYear, currentMonth, day + 1);

                                    if (startDate <= currentDate && endDate >= currentDate && !product.refund) {
                                        dayOfActivateMembers.push(member.id);
                                    }
                                    if (product.refund && startDate <= currentDate && currentDate <= refundDate) {
                                        dayOfActivateMembers.push(member.id);
                                    }
                                });
                        }
                    }
                });

                const distinctMembers = new Set(dayOfActivateMembers);
                activateMembersArray.push(distinctMembers.size);
            }

            return activateMembersArray;
        };

        setActiveBatterboxMembers(getCurrentActivateMembers('batterBox'));
        setActiveLessonMembers(getCurrentActivateMembers('lesson'));

        const getPreviousActivateMembers = (productType) => {
            const activateMembersArray = [];

            for (let day = 0; day < previousMonthOfDays; day++) {
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth() - 1;

                const dayOfActivateMembers = [];

                data?.forEach((doc) => {
                    const member = {
                        id: doc.id,
                        ...doc,
                    };

                    if (Array.isArray(member.availableProducts)) {
                        const allOfProducts = [
                            ...member.availableProducts,
                            ...(Array.isArray(member.unavailableProducts) ? member.unavailableProducts : []),
                        ];
                        if (allOfProducts.length > 0) {
                            allOfProducts
                                .filter((product) => product.productType === productType)
                                .forEach((product) => {
                                    const startDate = new Date(
                                        new Date(product.startDate).toISOString().split('T')[0] + ' 00:00:00'
                                    );
                                    const endDate = new Date(
                                        new Date(product.endDate).toISOString().split('T')[0] + ' 00:00:00'
                                    );
                                    const refundDate = product.refundDate
                                        ? new Date(
                                              new Date(product.refundDate).toISOString().split('T')[0] + ' 00:00:00'
                                          )
                                        : false;

                                    const currentDate = new Date(currentYear, currentMonth, day + 1);

                                    if (startDate <= currentDate && endDate >= currentDate && !product.refund) {
                                        dayOfActivateMembers.push(member.id);
                                    }
                                    if (product.refund && startDate <= currentDate && currentDate <= refundDate) {
                                        dayOfActivateMembers.push(member.id);
                                    }
                                });
                        }
                    }
                });

                const distinctMembers = new Set(dayOfActivateMembers);
                activateMembersArray.push(distinctMembers.size);
            }

            return activateMembersArray;
        };

        setPreviousActiveBatterboxMembers(getPreviousActivateMembers('batterBox'));
        setPreviousActiveLessonMembers(getPreviousActivateMembers('lesson'));

        // 월별 활성화
        const getMonthlyActivateMembers = (productType) => {
            const activateMembersArray = [];

            for (let month = 0; month < 12; month++) {
                const currentYear = new Date().getFullYear();
                const dayOfActivateMembers = [];

                data?.forEach((doc) => {
                    const member = {
                        id: doc.id,
                        ...doc,
                    };

                    if (Array.isArray(member.availableProducts)) {
                        const allOfProducts = [
                            ...member.availableProducts,
                            ...(Array.isArray(member.unavailableProducts) ? member.unavailableProducts : []),
                        ];

                        if (allOfProducts.length > 0) {
                            allOfProducts
                                .filter((product) => product.productType === productType && !product.deleted_at)
                                .forEach((product) => {
                                    const startDate = new Date(new Date(product.startDate).toISOString().split('T')[0] + ' 00:00:00');
                                    const endDate = new Date(new Date(product.endDate).toISOString().split('T')[0] + ' 00:00:00');
                                    const refundDate = product.refundDate
                                        ? new Date(new Date(product.refundDate).toISOString().split('T')[0] + ' 00:00:00')
                                        : false;
        
                                    const firstDayOfMonth = new Date(currentYear, month, 1);
                                    const lastDayOfMonth = new Date(currentYear, month + 1, 0);
        
                                    if ((startDate <= lastDayOfMonth && endDate >= firstDayOfMonth && !product.refund)
                                        || (product.refund && startDate <= lastDayOfMonth && lastDayOfMonth <= refundDate)) {
                                        dayOfActivateMembers.push(member.id);
                                    }
                                });
                        }

                    }
                });

                const distinctMembers = new Set(dayOfActivateMembers);
                activateMembersArray.push(distinctMembers.size);
            }

            return activateMembersArray;
        };

        setMonthlyActivateBatterboxMembers(getMonthlyActivateMembers('batterBox'));
        setMonthlyActivateLessonMembers(getMonthlyActivateMembers('lesson'));
    };

    useEffect(() => {
        getMembers();
    }, []);

    const [show, setShow] = useState(true);
    const [index, setIndex] = useState(1);

    const tabContents = [
        {
            id: 1,
            title: '활성',
        },
        {
            id: 2,
            title: '전체',
        },
    ];

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <Tab.Container defaultActiveKey="활성">
                                <Nav variant="pills" justify className="bg-nav-pills">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <Nav.Item key={index} onClick={() => setIndex(tab.id)}>
                                                <Nav.Link as={Link} to="#" eventKey={tab.title}>
                                                    <span className="d-none d-md-block">{tab.title}</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })}
                                </Nav>
                            </Tab.Container>
                        </div>
                        <h4 className="page-title">회원현황</h4>
                    </div>
                </Col>
            </Row>

            {index === 1 ? (
                <>
                    <Row>
                        {show ? (
                            <Alert variant="info" onClose={() => setShow(false)} dismissible className="mb-3">
                                <span className="fw-bold">활성회원 Tap</span> - 아래 데이터는 현재 이용중인 회원님의
                                데이터에요. 지금까지 등록하셨던 회원님들의 데이터를 확인하시려면 우측상단 전체탭을
                                이용해주세요.
                            </Alert>
                        ) : null}
                    </Row>

                    <Row>
                        <Col xxl={3} xl={4}>
                            <Statistics
                                previousActivateBatterboxMembers={previousActivateBatterboxMembers}
                                previousActivateLessonMembers={previousActivateLessonMembers}
                                activateBatterboxMembers={activateBatterboxMembers}
                                activateLessonMembers={activateLessonMembers}
                                members={currentMembers}
                                index={index}
                            />
                        </Col>
                        <Col xxl={9} xl={8}>
                            <SessionsChart
                                activateBatterboxMembers={activateBatterboxMembers}
                                activateLessonMembers={activateLessonMembers}
                                monthlyActivateBatterboxMembers={monthlyActivateBatterboxMembers}
                                monthlyActivateLessonMembers={monthlyActivateLessonMembers}
                                members={currentMembers}
                                index={index}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={3} xl={4}>
                            <GenderStatus members={activeMembers} />
                        </Col>
                        <Col xxl={9} xl={8}>
                            <AgeChart members={activeMembers} />
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={3} xl={6}>
                            <LocationStatus members={activeMembers} />
                        </Col>
                        <Col xxl={3} xl={6}>
                            <Location members={activeMembers} />
                        </Col>
                        <Col xxl={3} xl={6}>
                            <Goal members={activeMembers} />
                        </Col>
                        <Col xxl={3} xl={6}>
                            <Career members={activeMembers} />
                        </Col>
                    </Row>
                </>
            ) : (
                <>
                    <Row>
                        <Col xxl={3} xl={4}>
                            <Statistics members={currentMembers} />
                        </Col>

                        <Col xxl={9} xl={8}>
                            <SessionsChart members={currentMembers} />
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={3} xl={4}>
                            <GenderStatus members={currentMembers} />
                        </Col>
                        <Col xxl={9} xl={8}>
                            <AgeChart members={currentMembers} />
                        </Col>
                    </Row>

                    <Row>
                        <Col xxl={3} xl={6}>
                            <LocationStatus members={currentMembers} />
                        </Col>
                        <Col xxl={3} xl={6}>
                            <Location members={currentMembers} />
                        </Col>
                        <Col xxl={3} xl={6}>
                            <Goal members={currentMembers} />
                        </Col>
                        <Col xxl={3} xl={6}>
                            <Career members={currentMembers} />
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default MemberDashboard;
