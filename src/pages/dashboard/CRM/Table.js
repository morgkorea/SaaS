import React from 'react';
import { Card, Table } from 'react-bootstrap';

const StripedRowsTable = ({ offset, limit, currentMembers }) => {
    
    return (
        <Card>
            <Card.Body>
                <Table className="mb-0" striped>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>성별</th>
                            <th>전화번호</th>
                            <th>이메일</th>
                            <th>업체</th>
                            <th>멤버쉽</th>
                            <th>횟수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMembers?.slice(offset, offset + limit).map((member, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{member.name}</th>
                                    <td>{member.sex}</td>
                                    <td>{member.phone}</td>
                                    <td>{member.email}</td>
                                    <td>{member.업체}</td>
                                    <td>{member.availableProducts[0].activateProduct}</td>
                                    <td>{member.availableProducts[0].dDays}</td>
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