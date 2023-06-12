import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const ProductsTable = ({ productsData, productsActivationHandler, offset, limit }) => {
    console.log('rerender');

    return (
        <Card>
            <Card.Body>
                <div className="fixed-table-body">
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>상품번호</th>
                                <th>상품명</th>
                                <th>카테고리</th>
                                <th>유효기간</th>
                                <th>유효횟수</th>
                                <th>정상가(원)</th>
                                <th>상태</th>
                                <th>등록일</th>
                                <th>수정일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsData?.slice(offset, offset + limit).map((product, idx) => {
                                return (
                                    <tr key={'product_' + idx}>
                                        <td>{product.productsNumber}</td>
                                        <td>{product.product}</td>
                                        <td>{product.category}</td>
                                        <td>{product.expirationPeriod}</td>
                                        <td>{product.expirationCount}</td>
                                        <td>{product.regularPrice}</td>
                                        <td>
                                            {product.activation}{' '}
                                            <Container className="d-flex p-0">
                                                <Form className="pe-auto">
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch"
                                                        label={product?.activation ? '활성' : '비활성'}
                                                        onChange={(event) => productsActivationHandler(event, idx)}
                                                        defaultChecked={product.activation}
                                                    />
                                                </Form>
                                            </Container>
                                        </td>

                                        <td>{product.createdDate.toISOString().split('T')[0]}</td>
                                        <td>{product.modifiedDate.toISOString().split('T')[0]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductsTable;
