import React, { useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PerformanceChart from '../Sales/PerformanceChart';
import BarChart from './BarChart';

const Counsel = () => {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">상담</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <BarChart />
                </Col>
            </Row>
            <Row>
                <Col>
                    <PerformanceChart />
                </Col>
            </Row>
        </>
    );
};

export default Counsel;
