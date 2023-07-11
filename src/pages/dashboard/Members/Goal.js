import React, { useEffect } from 'react';
import { Card, Table, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const Goal = ({ members }) => {
    let purpose1 = 0; // 입문
    let purpose2 = 0; // 스윙교정
    let purpose3 = 0; // 비거리
    let purpose4 = 0; // 숏게임
    let purpose5 = 0; // 퍼팅
    let purpose6 = 0; // 스코어
    let purpose7 = 0; // 필드
    let purpose8 = 0; // 백돌이
    let purpose9 = 0; // 기타

    members.map((m) => {
        if (m.golfPurpose === '골프 입문' || m.golfPurpose === '골프입문') {
            purpose1++;
        } else if (m.golfPurpose === '스윙 교정' || m.golfPurpose === '스윙교정') {
            purpose2++;
        } else if (m.golfPurpose === '비거리 향상') {
            purpose3++;
        } else if (m.golfPurpose === '숏게임') {
            purpose4++;
        } else if (m.golfPurpose === '퍼팅') {
            purpose5++;
        } else if (m.golfPurpose === '스코어') {
            purpose6++;
        } else if (m.golfPurpose === '필드') {
            purpose7++;
        } else if (m.golfPurpose === '백돌이 탈출') {
            purpose8++;
        } else {
            purpose9++;
        }
    });

    const purpose = [
        {
            name: '골프 입문',
            number: purpose1,
        },
        {
            name: '스윙 교정',
            number: purpose2,
        },
        {
            name: '비거리 향상',
            number: purpose3,
        },
        {
            name: '숏게임',
            number: purpose4,
        },
        {
            name: '퍼팅',
            number: purpose5,
        },
        {
            name: '스코어',
            number: purpose6,
        },
        {
            name: '필드',
            number: purpose7,
        },
        {
            name: '백돌이 탈출',
            number: purpose8,
        },
        {
            name: '기타',
            number: purpose9,
        },
    ];

    let totalNumber = purpose.reduce(function add(sum, value) {
        return sum + value.number;
    }, 0);

    return (
        <Card>
            <Card.Body style={{ height: '450px', overflowY: 'scroll' }}>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title="골프목적"
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
                            <th style={{ width: '35%' }}>목적</th>
                            <th style={{ width: '30%' }}>인원</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purpose.map((data) => (
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.number.toLocaleString()}명</td>
                                <td>
                                    <ProgressBar
                                        now={Math.floor((data.number / totalNumber) * 100)}
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

export default Goal;
