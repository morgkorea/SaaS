// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';

const SalesTable = ({ data, columns }): React$Element<any> => {
    const sizePerPageList = [
        // {
        //     text: '30',
        //     value: 30,
        // },
        // {
        //     text: '60',
        //     value: 60,
        // },
        // {
        //     text: '90',
        //     value: 90,
        // },
        // {
        //     text: 'All',
        //     value: data.length,
        // },
    ];
    return (
        <>
            <PageTitle title={'매출 DB'} />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={30}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                tablePurpose={'salesDB'}
                                productTablePlaceholder={'검색'}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SalesTable;
