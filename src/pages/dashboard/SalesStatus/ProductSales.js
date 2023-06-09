import React, { useState, useEffect } from 'react';
import { Card, Col, Form, Pagination, Row, Table, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RoundedPagination = ({ total, limit, page, setPage }) => {
    const numPages = Math.ceil(total / limit);

    return (
        <Pagination className="pagination-rounded">
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
            {Array(numPages)
                .fill()
                .map((_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        aria-current={page === i + 1 ? 'page' : null}
                        active={page === i + 1}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === numPages} />
        </Pagination>
    );
};

const ProductSales = ({ sortedByPeriodSalesData }) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const offset = (page - 1) * limit;
    const [productSalesData, setProductSalesData] = useState([]);

    // 상품 종류 관련 필드 추가 필요

    const getProductSales = () => {
        let mergedSalesData = [];
        if (sortedByPeriodSalesData) {
            mergedSalesData = [...sortedByPeriodSalesData].reduce((acc, curr) => {
                return !curr.refund ? [...acc, ...curr.products] : [...acc];
            }, []);
        }

        let productsInfo = {};
        mergedSalesData.forEach((sale) => {
            if (!productsInfo.hasOwnProperty(sale.product)) {
                productsInfo[`${sale.product}`] = {
                    title: sale.product,
                    type: sale.productType,
                    total: Number(sale.discountPrice),
                    number: 1,
                };
            } else {
                productsInfo[`${sale.product}`] = {
                    ...productsInfo[`${sale.product}`],
                    total: Number(productsInfo[`${sale.product}`].total) + Number(sale.discountPrice),
                    number: productsInfo[`${sale.product}`].number + 1,
                };
            }
        });

        const productsSalesArray = [];
        for (let key in productsInfo) {
            productsSalesArray.push(productsInfo[key]);
        }
        setProductSalesData(productsSalesArray);
    };
    useEffect(() => {
        getProductSales();
    }, [sortedByPeriodSalesData]);

    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <Card.Body>
                        <Row className="mb-2">
                            <Col xl={12}>
                                <Row className="align-items-center justify-content-between">
                                    <Col xs="auto">
                                        <Form.Group as={Row}>
                                            <Form.Label htmlFor="" column>
                                                상품별 판매상황
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    {/* <Col xs="auto">
                                        <Form.Group>
                                            <Form.Select
                                                type="number"
                                                value={limit}
                                                onChange={({ target: { value } }) =>
                                                    setLimit(Number(value), setPage(1))
                                                }>
                                                <option value="10" selected>
                                                    10
                                                </option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                                <option value="40">40</option>
                                                <option value="50">50</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col> */}
                                </Row>
                            </Col>
                        </Row>
                        <Table responsive className="table-centered table-nowrap">
                            <thead className="table-light">
                                <tr>
                                    {/* <th style={{ width: '20px' }}>
                                        <Form>
                                            <Form.Check type="checkbox" id="all" />
                                        </Form>
                                    </th> */}
                                    <th>상품</th>
                                    <th>종류</th>
                                    <th>수량</th>
                                    <th>총계</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productSalesData.slice(offset, offset + limit).map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            {/* <td>
                                                <Form>
                                                    <Form.Check type="checkbox" id={data.orderId} />
                                                </Form>
                                            </td> */}
                                            <td className="table-border">
                                                <Link to="#" className="text-body">
                                                    {data.title}
                                                </Link>
                                            </td>
                                            <td className="table-border">{data.type}</td>
                                            <td className="table-border">
                                                <Row>
                                                    <Col>
                                                        <ProgressBar
                                                            now={60}
                                                            className="mt-2 progress-sm"
                                                            variant="success"
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <span>{data.number}</span>
                                                    </Col>
                                                </Row>
                                            </td>
                                            <td className="table-border">{data.total.toLocaleString()}원</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        {productSalesData?.length > 10 && (
                            <RoundedPagination
                                total={productSalesData.length}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default ProductSales;
