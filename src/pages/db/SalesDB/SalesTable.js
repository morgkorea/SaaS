// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';

const SalesTable = ({ data, columns }): React$Element<any> => {
    const sizePerPageList = [
    // {
    //     text: '5',
    //     value: 5,
    // },
    // {
    //     text: '10',
    //     value: 10,
    // },
    // {
    //     text: '15',
    //     value: 15,
    // },
    // {
    //     text: '25',
    //     value: 25,
    // },
    // {
    //     text: '50',
    //     value: 50,
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
                                pageSize={10}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                tablePurpose={{ id: '1', desc: true }}
                                productTablePlaceholder={'검색'}
                                paginationStyleCenter={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SalesTable;
