import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { records } from './data.js';

const StripedRowsTable = ({ offset, limit }) => {
    return (
        <Card>
            <Card.Body>
                <Table className="mb-0" striped>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>성별</th>
                            <th>휴대전화번호</th>
                            <th>이메일</th>
                            <th>업체</th>
                            <th>멤버쉽</th>
                            <th></th>
                            <th>횟수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.slice(offset, offset + limit).map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.name}</th>
                                    <td>{record.gender}</td>
                                    <td>{record.phone}</td>
                                    <td>{record.email}</td>
                                    <td>{record.업체}</td>
                                    <td>{record.멤버쉽}</td>
                                    <td>{record.day}</td>
                                    <td>{record.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
export default StripedRowsTable;