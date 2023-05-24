// @flow
import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products2 = () => {
    const dataList = [
        {
            title: '[종일]레슨권 6개월',
            price: '1,000,000원',
            quantity: '82',
            amount: '82,000,000원'
        },
        {
            title: '[종일]레슨권 6개월',
            price: '1,000,000원',
            quantity: '82',
            amount: '82,000,000원'
        },
        {
            title: '[종일]레슨권 6개월',
            price: '1,000,000원',
            quantity: '82',
            amount: '82,000,000원'
        },
        {
            title: '[종일]레슨권 6개월',
            price: '1,000,000원',
            quantity: '82',
            amount: '82,000,000원'
        },
        {
            title: '[종일]레슨권 6개월',
            price: '1,000,000원',
            quantity: '82',
            amount: '82,000,000원'
        },
    ]

    return (
        <Card>
            <Card.Body>
                <Link to="#" className="float-end">
                    Export <i className="mdi mdi-download ms-1"></i>
                </Link>

                <h4 className="header-title mt-2 mb-3">레슨상품 매출순위</h4>

                <Table hover responsive className="mb-0">
                    <tbody>
                        {dataList.map((data) => <tr>
                                <td>
                                    <h5 className="font-14 my-1 fw-normal">{data.title}</h5>
                                    <span className="text-muted font-13"></span>
                                </td>
                                <td>
                                    <h5 className="font-14 my-1 fw-normal">{data.price}</h5>
                                    <span className="text-muted font-13">가격</span>
                                </td>
                                <td>
                                    <h5 className="font-14 my-1 fw-normal">{data.quantity}</h5>
                                    <span className="text-muted font-13">수량</span>
                                </td>
                                <td>
                                    <h5 className="font-14 my-1 fw-normal">{data.amount}</h5>
                                    <span className="text-muted font-13">총액</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Products2;
