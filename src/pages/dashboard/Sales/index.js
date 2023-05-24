<<<<<<< HEAD:src/pages/dashboard/Sales/index.js
import React, { useState } from 'react';
=======
// @flow
import React, { useState, useEffect } from 'react';
>>>>>>> 763f8c226a71f63d4c4283a12b8c374c36ad98bf:src/pages/dashboard/Ecommerce/index.js
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import HyperDatepicker from '../../../components/Datepicker';
import PerformanceChart from './PerformanceChart';

<<<<<<< HEAD:src/pages/dashboard/Sales/index.js
import Products from './Products';
import Statistics from './Statistics';
import SalesChart from './SalesChart';
import RevenueChart from './RevenueChart';
import Products2 from './Products2';

const SalesDashboard = () => {
=======
import { getFirestoreUserData } from '../../../firebase/firestore';

const EcommerceDashboard = (): React$Element<React$FragmentType> => {
>>>>>>> 763f8c226a71f63d4c4283a12b8c374c36ad98bf:src/pages/dashboard/Ecommerce/index.js
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    useEffect(() => {
        getFirestoreUserData();
    }, []);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
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
                        <h4 className="page-title">Dashboard_매출</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xl={5} lg={6}>
                    <Statistics />
                </Col>

                <Col xl={7} lg={6}>
                    <PerformanceChart />
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
                <Col xl={{ span: 6, order: 1 }} lg={{ span: 12, order: 2 }}>
                    <Products />
                </Col>
                <Col xl={{ span: 6, order: 1 }} lg={{ span: 12, order: 2 }}>
                    <Products2 />
                </Col>
            </Row>
        </>
    );
};

export default SalesDashboard;
