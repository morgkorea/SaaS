import React, { useState } from 'react';
import { Row, Col, Tab, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HyperDatepicker from '../../../components/Datepicker';
import Statistics from './Statistics';
import Performers from '../Marketing/Performers';
import Table from './Table';



const ActionColumn = ({ row }) => {
    return (
        <>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>
        </>
    );
};

const MarketingDashboard2 = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const tabContents = [
        {
            id: '1',
            title: '전체',
        },
        {
            id: '2',
            title: '신규',
        },
        {
            id: '3',
            title: '재등록',
        },
    ];

    const columns = [
        {
            Header: '채널',
            accessor: 'name',
            sort: true,
            classes: 'table-user',
        },
        {
            Header: '광고비용',
            accessor: 'store',
            sort: true,
        },
        {
            Header: '노출',
            accessor: 'products',
            sort: true,
        },
        {
            Header: '1000회 노출당 비용',
            accessor: 'balance',
            sort: true,
        },
        {
            Header: '링크 클릭',
            accessor: 'created_on',
            sort: true,
        },
        {
            Header: '링크 클릭률',
            accessor: 'revenue',
            sort: false,
        },
        {
            Header: '링크 클릭당 비율',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            // Cell: ActionColumn,
        },
    ];

    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: '50',
            value: 50,
        },
    ];

    const sellers = [
        {
            id: 1,
            name: '네이버 플레이스',
            store: 120000,
            products: 478,
            balance: '10231123',
            created_on: '2439128',
            revenue: '385143',
            action: '5324123',
        },
    ]

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right d-flex">
                            <Tab.Container defaultActiveKey="전체">
                                <Nav variant="pills" justify className="bg-nav-pills">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <Nav.Item key={index}>
                                                <Nav.Link as={Link} to="#" eventKey={tab.title}>
                                                    <span className="d-none d-md-block text-nowrap">{tab.title}</span>
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
                        <h4 className="page-title">마케팅</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xl={12}>
                    <Statistics />
                </Col>
            </Row>
            {/* <Row>
                <Col xl={12}>
                    <Performers />
                </Col>
            </Row> */}

            <Row>
                <Col>
                    <Table
                        columns={columns}
                        data={sellers}
                        pageSize={10}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                        isSelectable={true}
                        isSearchable={true}
                        // tableClass="table-striped"
                        theadClass="table-light"
                        // searchBoxClass="mt-2 mb-3"
                    />
                </Col>
            </Row>
        </>
    );
};

export default MarketingDashboard2;
