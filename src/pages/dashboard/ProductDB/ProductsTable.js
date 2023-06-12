import React from 'react';
import { Card, Table } from 'react-bootstrap';

const ProductsTable = ({ products, offset, limit }) => {
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
                            {products?.slice(offset, offset + limit).map((product, idx) => {
                                return (
                                    <tr key={'product_' + idx}>
                                        <td className="text-center">{product.productsNumber}</td>
                                        <td>{product.product}</td>
                                        <td>{product.category}</td>
                                        <td>{product.expirationPeriod}</td>
                                        <td>{product.expirationCount}</td>
                                        <td>{product.regularPrice}</td>
                                        <td>{product.actiavation}</td>
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
