import React, { useState, useEffect } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const ProductsTable = ({ productsData, productsActivationHandler, offset, limit }) => {
    console.log('rerender');

    const productTypeTextHandler = (type) => {
        switch (type) {
            case 'batterBox':
                return '타석';
            case 'lesson':
                return '레슨';
            case 'locker':
                return '락커';
            case 'etc':
                return '기타';
            default:
                return '';
        }
    };

    return (
        <Card style={{ minHeight: '600px' }}>
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
                            {!productsData.length && (
                                <td>
                                    <div>등록된 상품이 없습니다. 상품을 등록해 주세요.</div>
                                </td>
                            )}
                            {productsData?.slice(offset, offset + limit).map((product, idx) => {
                                return (
                                    <tr key={'product_' + idx}>
                                        <td>{product.productsNumber}</td>
                                        <td>{product.product}</td>
                                        <td>{productTypeTextHandler(product.type)}</td>
                                        <td>{product.expirationPeriod}</td>
                                        <td>{product.expirationCount?.toLocaleString()}</td>
                                        <td>{product.regularPrice?.toLocaleString()}</td>
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

                                        <td>{product.createdDate?.replace(/-/g, '.')}</td>
                                        <td>{product.modifiedDate?.replace(/-/g, '.')}</td>
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
