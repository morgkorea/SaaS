import React from 'react';
import { Card, ProgressBar, Table } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import { golfCareer } from './data.js';

const Career = () => {
    return (
        <Card>
            <Card.Body style={{ height: '450px', overflowY: 'scroll' }}>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title="골프경력"
                    menuItems={[
                        { label: 'Weekly Report' },
                        { label: 'Monthly Report' },
                        { label: 'Action' },
                        { label: 'Settings' },
                    ]}
                />

                <Table responsive className="table table-sm table-centered mb-0 font-14">
                    <thead className="table-light">
                        <tr>
                            <th>경력기간</th>
                            <th style={{ width: '30%' }}>인원</th>
                            <th>비율(100%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {golfCareer.map((data) => (
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.number.toLocaleString()}</td>
                                <td>
                                    {data.rate + '%'}
                                    <ProgressBar now={data.rate} style={{ height: '3px' }} variant="" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Career;
