import React from 'react';
import { Card, Col, Form, Row, Table, Pagination } from 'react-bootstrap';
import { channelData } from './data';
import { Link } from 'react-router-dom';

const SelectInput = () => {
    return (
        <Form.Group>
            <Form.Select aria-label="Default">
                <option selected>4</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
                <option>전체</option>
            </Form.Select>
        </Form.Group>
    );
};

const RoundedPagination = () => {
    let items = [];
    for (let number = 1; number <= 4; number++) {
        items.push(
            <Pagination.Item key={number} active={number === 1}>
                {number}
            </Pagination.Item>
        );
    }
    return (
        <Pagination className="pagination-rounded">
            <Pagination.Prev />
            {items}
            <Pagination.Next />
        </Pagination>
    );
};

const PerformanceDetails = () => {
    return (
        <Table responsive className="table-centered table-nowrap mb-3">
            <thead className="table-light">
                <tr>
                    <th>채널</th>
                    <th>광고 비용</th>
                    <th>노출</th>
                    <th>1000회 노출당 비용</th>
                    <th>링크 클릭</th>
                    <th>링크 클릭률</th>
                    <th>링크 클릭당 비용</th>
                </tr>
            </thead>
            <tbody>
                {(channelData || []).map((data, i) => {
                    return (
                        <tr key={i}>
                            <td>
                                <Link to="#" className="text-body">
                                    {data.channel}
                                </Link>
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <p className="my-0">{data.type}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{data.impression.toLocaleString()}회</td>
                            <td>{data.cpm.toLocaleString()}원</td>
                            <td>{data.linkStats.toLocaleString()}회</td>
                            <td>{data.ctr.toLocaleString()}%</td>
                            <td>{data.cpc.toLocaleString()}원</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

const Performers = () => {
    return (
        <>
            <Card>
                <Card.Body>
                    <Row className="mb-2">
                        <Col xl={12}>
                            <Row className="align-items-center justify-content-between">
                                <Col xs="auto">
                                    <Form.Group as={Row}>
                                        <Form.Label htmlFor="exampleEmail3" column>
                                            채널별 광고 성과
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                                <Col xs="auto">
                                    <SelectInput />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <PerformanceDetails channelData={channelData} />
                    <RoundedPagination />
                </Card.Body>
            </Card>
        </>
    );
};

export default Performers;
