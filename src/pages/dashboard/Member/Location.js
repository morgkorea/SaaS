import React from 'react';
import { Card, Table, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import { BuildingData } from './data.js'

const Location = () => {
    return (
        <Card>
            <Card.Body style={{ height: '450px', overflowY: 'scroll' }}>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title="지역"
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
                            <th>지역</th>
                            <th>인원</th>
                            <th style={{ width: '40%' }}>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BuildingData.map((data) => (
                             <tr>
                                <td>{data.name}</td>
                                <td>{data.number.toLocaleString()}명</td>
                                <td>
                                    <ProgressBar now={(data.number)} style={{ height: '3px' }} variant="" />
                                </td>
                            </tr>
                        ))}
                        {/* variant - info, warning, danger */}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Location;
