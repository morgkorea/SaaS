import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { counselorData } from './data.js'


const BorderedTable = () => {
    return (
        <Card>
            <Card.Body>
                <Table className="mb-0" bordered>
                    <thead>
                        <tr>
                            <th>담당자</th>
                            <th>신규상담</th>
                            <th>신규등록</th>
                            <th>신규등록률</th>
                            <th>재등록대상</th>
                            <th>재등록</th>
                            <th>이탈</th>
                            <th>매출</th>
                        </tr>
                    </thead>
                    <tbody>
                        {counselorData.map((data, index) => {
                            return (
                                <tr style={{lineHeight: 2}} key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.newConsult}명</td>
                                    <td>{data.newRegister}명</td>
                                    <td>{data.newRate}%</td>
                                    <td>{data.reTarget}명</td>
                                    <td>{data.reRegister}명</td>
                                    <td>{data.leave}명</td>
                                    <td>{data.sales.toLocaleString()}원</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

const Tables = () => {
    return (
        <>
            <BorderedTable />
        </>
    );
};

export default Tables;
