import React, { useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import PerformanceChart from '../Sales/PerformanceChart';
import HyperDatepicker from '../../../components/Datepicker';
import Tables from './Tables';
import BarChart from './BarChart';
import Statistics from './Statistics';

const Counsel = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const tabContents = [
        {
            id: '1',
            title: '월간',
        },
        {
            id: '2',
            title: '주간',
        },
        {
            id: '3',
            title: '일간',
        }
    ];
    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right d-flex">
                        <Tab.Container defaultActiveKey="월간">
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
                            </Tab.Container>
                            <form className="d-flex ms-2">
                                <div className="input-group">
                                    <HyperDatepicker
                                        value={selectedDate}
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
                        <h4 className="page-title">상담</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xxl={4} xl={12}>
                    <Row>
                        <Col>
                            <Statistics />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div
                                style={{
                                    backgroundImage: `url(${process.env.PUBLIC_URL + '/banner.png'})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '300px',
                                }}></div>
                        </Col>
                    </Row>
                </Col>
                <Col xxl={8} xl={12}>
                    <Row>
                        <Col>
                            <BarChart />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Tables />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <PerformanceChart />
                </Col>
            </Row>
        </>
    );
};

export default Counsel;
