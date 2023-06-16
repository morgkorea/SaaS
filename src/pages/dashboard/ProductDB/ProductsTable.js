// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';

const ProductsTable = ({ data, columns }): React$Element<any> => {
    const sizePerPageList = [
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: '30',
            value: 30,
        },
        {
            text: 'All',
            value: data.length,
        },
    ];
    return (
        <>
            <PageTitle
                // breadCrumbItems={[
                //     { label: 'Tables', path: '/features/tables/advanced' },
                //     {
                //         label: 'Advanced Tables',
                //         path: '/features/tables/advanced',
                //         active: true,
                //     },
                // ]}
                title={'상품리스트'}
            />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductsTable;
