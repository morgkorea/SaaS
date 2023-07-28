// @flow
import React from 'react';
import { Card, ProgressBar, Table } from 'react-bootstrap';
import { channelData } from './data';

const ConversionRate = () => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title  mt-1 mb-3">채널별 전환률</h4>
                <Table responsive className="table table-sm table-centered mb-0 font-14">
                    <thead className="table-light">
                        <tr>
                            <th>소제</th>
                            <th>%</th>
                            <th style={{ width: '40%' }}>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {channelData.map((data) => {
                            return (
                                <tr>
                                    <td>{data.channel}</td>
                                    <td>{data.cvr}%</td>
                                    <td>
                                        <ProgressBar now={data.cvr} style={{ height: '3px' }} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default ConversionRate;
