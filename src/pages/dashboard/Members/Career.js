import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import SortableTable from './SortableTable';

const Career = ({ members }) => {
    const periodMap = members.reduce((acc, member) => {
        const golfPeriod = member.golfPeriod.toLowerCase().trim();
        acc[golfPeriod] = (acc[golfPeriod] || 0) + 1;
        return acc;
    }, {});

    const period = Object.keys(periodMap)
        .filter((key) => key
        .trim() !== '').map((periodKey) => ({
            name: periodKey,
            number: periodMap[periodKey],
            rate: periodMap[periodKey],
    }));

    const totalNumber = period.reduce((sum, value) => sum + value.number, 0);

    const columns = React.useMemo(
        () => [
            {
                Header: '경력기간',
                accessor: 'name',
            },
            {
                Header: '인원',
                accessor: 'number',
                Cell: ({ value }) => <>{value.toLocaleString()}명</>,
            },
            {
                Header: '비율',
                accessor: 'rate',
                Cell: ({ value }) => (
                    <>
                        <ProgressBar
                            now={Math.floor((value / totalNumber) * 100)}
                            style={{ height: '3px', width: '100%' }}
                            variant=""
                        />
                    </>
                ),
            },
        ],
        []
    );
    return (
        <Card>
            <Card.Body style={{ height: '450px' }}>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-3 pt-1"
                    title="골프경력"
                />
                <div style={{ height: '370px', overflowY: 'scroll' }}>
                    <SortableTable columns={columns} data={period} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default Career;
