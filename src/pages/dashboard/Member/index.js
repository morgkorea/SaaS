import React, { useState } from 'react';
import { Row, Col, Alert, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Goal from './Goal';
import Career from './Career';
import Location from './Location';
import AgeChart from './AgeChart';
import Statistics from './Statistics';
import GenderStatus from './GenderStatus';
import SessionsChart from './SessionsChart';
import LocationStatus from './LocationStatus';

const MemberDashboard = () => {
    const [show, setShow] = useState(true);

    const tabContents = [
        {
            id: '1',
            title: '활성',
        },
        {
            id: '2',
            title: '전체',
        }
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
                                            <Nav.Item key={index}>
                                                <Nav.Link as={Link} to="#" eventKey={tab.title}>
                                                    <i
                                                        className={classnames(
                                                            tab.icon,
                                                            'd-md-none',
                                                            'd-block',
                                                            'me-1'
                                                        )}></i>
                                                    <span className="d-none d-md-block">{tab.title}</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })}
                                </Nav>
                                {/* <Tab.Content>
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                                                <Row>
                                                    <Col sm="12">
                                                        <p className="mt-3">{tab.text}</p>
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>
                                        );
                                    })}
                                </Tab.Content> */}
                            </Tab.Container>
                        </div>
                        <h4 className="page-title">회원현황</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                {show ? (
                    <Alert variant="info" onClose={() => setShow(false)} dismissible className="mb-3">
                        <span className='fw-bold'>활성회원 Tap</span> - 아래 데이터는 지금까지 등록하셨던 회원님들의 데이터에요, 현재 이용중인 회원님의
                        데이터를 확인하시려면 우측상단 활성탭을 이용해주세요.
                    </Alert>
                ) : null}
            </Row>

            <Row>
                <Col xl={3} lg={4}>
                    <Statistics />
                </Col>

                <Col xl={9} lg={8}>
                    <SessionsChart />
                </Col>
            </Row>

            <Row>
                <Col xl={3} lg={4}>
                    <GenderStatus />
                </Col>
                <Col xl={9} lg={8}>
                    <AgeChart />
                </Col>
            </Row>

            <Row>
                <Col xl={3} lg={6}>
                    <LocationStatus />
                </Col>
                <Col xl={3} lg={6}>
                    <Location />
                </Col>
                <Col xl={3} lg={6}>
                    <Goal />
                </Col>
                <Col xl={3} lg={6}>
                    <Career />
                </Col>
            </Row>
        </>
    );
};

export default MemberDashboard;
