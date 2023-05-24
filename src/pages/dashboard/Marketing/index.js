import React, { useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import HyperDatepicker from '../../../components/Datepicker';

import Expense from './Expense';
import Statistics from './Statistics';
import Performers from './Performers';
import SalesChart from './SalesChart';
import ChannelList from './ChannelList';
import ConversionRate from './ConversionRate';
import ClickThroughRate from './ClickThroughRate';
import classNames from 'classnames';

const MarketingDashboard = () => {
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
                                                        className={classNames(
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
                        <h4 className="page-title">Dashboard_마케팅</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Expense />
                </Col>
                <Col xl={8} lg={6}>
                    <Statistics />
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <SalesChart />
                </Col>
                <Col lg={8}>
                    <Row>
                        <Col lg={12}>
                            <ChannelList />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <ClickThroughRate />
                        </Col>
                        <Col lg={6}>
                            <ConversionRate />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Performers />
                </Col>
            </Row>
        </>
    );
};

export default MarketingDashboard;
