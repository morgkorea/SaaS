// @flow
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';

const SalesTable = ({ data, columns }): React$Element<any> => {
    const sizePerPageList = [];
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
                                pageSize={20}
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
