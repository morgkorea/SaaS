// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';

const ProductsTable = ({ data, columns }): React$Element<any> => {
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
            <PageTitle title={'상품 DB'} />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={20}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                tablePurpose={{ id: '7', desc: true }}
                                productTablePlaceholder={'상품명 / 코드 검색'}
                                paginationStyleCenter={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductsTable;
