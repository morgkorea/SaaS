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

    const [activeMembers, setActiveMembers] = useState([]);
    const [currentMembers, setCurrentMembers] = useState([]);
    const [activateBatterboxMembers, setActiveBatterboxMembers] = useState(Array(currentMonthOfDays).fill(0));
    const [activateLessonMembers, setActiveLessonMembers] = useState(Array(currentMonthOfDays).fill(0));

    const email = useSelector((state) => state.Auth?.user.email);
    const memberRef = collection(firestoreDB, 'Users', email, 'Members');

    const getMembers = async () => {
        const data = await getDocs(memberRef);

        setActiveMembers(
            data.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter((member) => {
                    if (Array.isArray(member.availableProducts) && member.availableProducts.length > 0) {
                        return member.availableProducts.some(
                            (product) => Object.keys(product).length > 0 && product !== null
                        );
                    }
                    return false;
                })
        );

        const currentActivateBatterBoxMembers = () => {
            const activateBatterboxMembersArray = [];
            for (let day = 0; day < currentMonthOfDays; day++) {
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth();

                let memberNumber = 0;

                const activateBatterboxProduct = data.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .map((member, idx) => {
                        let minDate;
                        let maxDate;

                        member.availableProducts
                            .filter((product) => product.productType === 'batterBox')
                            .forEach((product, idx) => {
                                const startDate = new Date(
                                    new Date(product.startDate).toISOString().split('T')[0] + ' 00:00:00'
                                );
                                const endDate = new Date(
                                    new Date(product.endDate).toISOString().split('T')[0] + ' 00:00:00'
                                );
                                if (idx === 0) {
                                    minDate = startDate;
                                    maxDate = endDate;
                                } else {
                                    if (minDate > startDate) {
                                        minDate = startDate;
                                    }
                                    if (maxDate < endDate) {
                                        maxDate = endDate;
                                    }
                                }
                            });

                        if (
                            minDate <= new Date(currentYear, currentMonth, day + 1) &&
                            maxDate >= new Date(currentYear, currentMonth, day + 1)
                        ) {
                            memberNumber = memberNumber + 1;
                        }
                    });
                activateBatterboxMembersArray.push(memberNumber);
            }

            setActiveBatterboxMembers(activateBatterboxMembersArray);
        };
        currentActivateBatterBoxMembers();

        const currentActivateLessonMembers = () => {
            const activateLessonArray = [];
            for (let day = 0; day < currentMonthOfDays; day++) {
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth();

                let memberNumber = 0;

                const activateLessonProduct = data.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .map((member, idx) => {
                        let minDate;
                        let maxDate;

                        member.availableProducts
                            .filter((product) => product.productType === 'lesson')
                            .forEach((product, idx) => {
                                const startDate = new Date(
                                    new Date(product.startDate).toISOString().split('T')[0] + ' 00:00:00'
                                );
                                const endDate = new Date(
                                    new Date(product.endDate).toISOString().split('T')[0] + ' 00:00:00'
                                );
                                if (idx === 0) {
                                    minDate = startDate;
                                    maxDate = endDate;
                                } else {
                                    if (minDate > startDate) {
                                        minDate = startDate;
                                    }
                                    if (maxDate < endDate) {
                                        maxDate = endDate;
                                    }
                                }
                            });

                        if (
                            minDate <= new Date(currentYear, currentMonth, day + 1) &&
                            maxDate >= new Date(currentYear, currentMonth, day + 1)
                        ) {
                            memberNumber = memberNumber + 1;
                        }
                    });
                activateLessonArray.push(memberNumber);
            }

            setActiveLessonMembers(activateLessonArray);
        };

        currentActivateLessonMembers();

        setCurrentMembers(
            data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        );
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
                            <Statistics members={currentMembers} index={index} />
                        </Col>
                        <Col xxl={9} xl={8}>
                            <SessionsChart
                                members={activeMembers}
                                activateBatterboxMembers={activateBatterboxMembers}
                                activateLessonMembers={activateLessonMembers}
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
