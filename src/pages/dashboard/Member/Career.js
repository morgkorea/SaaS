import React from 'react';
import { Card, ProgressBar, Table } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const Career = ({ members }) => {
    let period1 = 0;
    let period2 = 0;
    let period3 = 0;
    let period4 = 0;

    members.map((member) => {
        if (member.golfPeriod === '비기너') {
            period1++;
        } else if (member.golfPeriod === '1~3년') {
            period2++;
        } else if (member.golfPeriod === '3~5년') {
            period3++;
        } else {
            period4++;
        }
    });

    const period = [
        {
            name: '비기너',
            number: period1,
            rate: period1,
        },
        {
            name: '1~3년',
            number: period2,
            rate: period2,
        },
        {
            name: '3~5년',
            number: period3,
            rate: period3,
        },
        {
            name: '5년 이상',
            number: period4,
            rate: period4,
        },
    ];

    let totalNumber = period.reduce(function add(sum, value) {
        return sum + value.number;
    }, 0);

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
                            <th style={{ width: '30%' }}>경력기간</th>
                            <th style={{ width: '25%' }}>인원</th>
                            <th colspan="2">비율(100%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {period.map((data) => (
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.number.toLocaleString()}명</td>
                                <td style={{ width: '40px' }}>
                                    {Math.floor((data.rate / totalNumber) * 100) + '%'}
                                </td>
                                <td className='ps-0'>
                                    <ProgressBar
                                        now={Math.floor((data.rate / totalNumber) * 100)}
                                        style={{ height: '3px' }}
                                        variant=""
                                    />
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
