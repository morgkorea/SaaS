import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { salesData } from './data';

const ReadOnlyTable = ({ offset, limit }) => {
    return (
        <Card>
            <Card.Body>
                <div className="fixed-table-body">
                    <Table className="mb-0">
                        <thead>
                            <tr>
                                <th>회원번호</th>
                                <th>생성날짜</th>
                                <th>성함</th>
                                <th>유형</th>
                                <th>연령</th>
                                <th>휴대전화번호</th>
                                <th>위치</th>
                                <th>골프경력</th>
                                <th>골프목적</th>
                                <th>관심상품</th>
                                <th>이용시간대</th>
                                <th>부상전적</th>
                                <th>부상부위</th>
                                <th>유입경로</th>
                                <th>마케팅수신동의</th>
                                <th>개인정보수집동의</th>
                                <th>누적결제수</th>
                                <th>LTV(누적결제금액)</th>
                                <th>평균결제금액</th>
                                <th>활성여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesData?.slice(offset, offset + limit).map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{data.회원번호}</td>
                                        <td>{data.생성날짜}</td>
                                        <td>{data.성함}</td>
                                        <td>{data.유형}</td>
                                        <td>{data.연령}</td>
                                        <td>{data.휴대전화번호}</td>
                                        <td>{data.위치}</td>
                                        <td>{data.경력}</td>
                                        <td>{data.목적}</td>
                                        <td>{data.관심상품}</td>
                                        <td>{data.이용시간대}</td>
                                        <td>{data.부상전적}</td>
                                        <td>{data.부상부위}</td>
                                        <td>{data.유입경로}</td>
                                        <td className="text-center">
                                            <input type="checkbox" checked={data.marketingAgreements} />
                                        </td>
                                        <td className="text-center">
                                            <input type="checkbox" checked={data.개인정보동의} />
                                        </td>
                                        <td>{data.누적결제수}</td>
                                        <td>{data.LTV}</td>
                                        <td>{data.평균결제금액}</td>
                                        <td className="text-center">{data.활성}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ReadOnlyTable;
