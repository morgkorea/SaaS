import React, { useState, useEffect } from 'react';
import { Card, Col, Form, Pagination, Row, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';

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
    console.log(
        productSalesData.reduce((acc, curr) => {
            return acc + curr.number;
        }, 0)
    );
    // 상품 종류 관련 필드 추가 필요

    const getProductSales = () => {
        let mergedSalesData = [];
        if (sortedByPeriodSalesData) {
            mergedSalesData = [...sortedByPeriodSalesData].reduce((acc, curr) => {
                return [...acc, ...curr.salesProducts];
            }, []);
        }

        let productsInfo = {};
        mergedSalesData.forEach((sale) => {
            if (!productsInfo.hasOwnProperty(sale.product)) {
                productsInfo[`${sale.product}`] = {
                    title: sale.product,
                    type: sale.productType,
                    total: Number(sale.adjustedPrice),
                    number: 1,
                };
            } else {
                productsInfo[`${sale.product}`] = {
                    ...productsInfo[`${sale.product}`],
                    total: Number(productsInfo[`${sale.product}`].total) + Number(sale.adjustedPrice),
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

    const productTypeTextHandler = (productType) => {
        switch (productType) {
            case 'batterBox':
                return '타석';
            case 'lesson':
                return '레슨';
            case 'locker':
                return '락커';
            case 'etc':
                return '기타';
        }
    };
    useEffect(() => {
        getProductSales();
    }, [sortedByPeriodSalesData]);
    const sizePerPageList = [];
    const tableColumns = [
        {
            id: '1',
            accessor: 'title',
            Header: '상품',
            sort: true,
        },
        {
            id: '2',
            accessor: 'type',
            Header: '상품',
            sort: true,
            Cell: ({ value }) => productTypeTextHandler(value),
        },

        {
            id: '3',
            accessor: 'number',
            Header: '상품',
            sort: true,
            Cell: ({ value }) => {
                return (
                    <Row style={{ display: 'flex', alingItems: 'center' }}>
                        <Col xl={9}>
                            <ProgressBar
                                now={
                                    (value /
                                        productSalesData.reduce((acc, curr) => {
                                            return acc + curr.number;
                                        }, 0)) *
                                    100
                                }
                                className="mt-1 progress-md"
                                variant="success"
                                value={productSalesData.reduce((acc, curr) => {
                                    return acc + curr.number;
                                }, 0)}
                            />
                        </Col>
                        <Col xl={1}>
                            <span>{value}</span>
                            <span>
                                {' '}
                                (
                                {Math.floor(
                                    (value /
                                        productSalesData.reduce((acc, curr) => {
                                            return acc + curr.number;
                                        }, 0)) *
                                        100
                                )}
                                %)
                            </span>
                        </Col>
                    </Row>
                );
            },
        },
        {
            id: '4',
            accessor: 'total',
            Header: '총계',
            sort: true,
            Cell: ({ value }) => value.toLocaleString() + '원',
        },
    ];
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Col xs="auto">
                                <Form.Group as={Row}>
                                    <Form.Label htmlFor="" column>
                                        상품별 판매현황
                                    </Form.Label>
                                </Form.Group>
                            </Col>
                            <Table
                                columns={tableColumns}
                                data={productSalesData}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pageSize={20}
                                pagination={true}
                                paginationStyleCenter={true}
                                minHeight={424}
                                tablePurpose={{ id: '3', desc: true }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ProductSales;
