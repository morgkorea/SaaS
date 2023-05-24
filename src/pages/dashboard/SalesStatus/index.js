import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HyperDatepicker from '../../../components/Datepicker';

import Statistics from './Statistics';
import ProductSales from './ProductSales';
import SalesChart from './SalesChart';
import RevenueChart from './RevenueChart';

import { ButtonsGroup } from './ButtonsGroup.js';
const SalesStatus = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const onDateChange = (date) => {
        if (date) {
            console.log(date);
            setSelectedDate(date);
        }
    };
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
                                        value={selectedDate}
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
                    <Statistics />
                </Col>
            </Row>

            <Row>
                <Col lg={4}>
                    <SalesChart />
                </Col>
                <Col lg={8}>
                    <RevenueChart />
                </Col>
            </Row>

            <Row>
                <Col lg={12}>
                    <ProductSales />
                </Col>
            </Row>
        </>
    );
};

export default SalesStatus;
