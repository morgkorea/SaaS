import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import SortableTable from './SortableTable';

const Career = ({ members }) => {
    const totalNumber = members.length;

    const periodMap = members.reduce((acc, member) => {
        const golfPeriod = member.golfPeriod.toLowerCase().trim();

        if (golfPeriod === '') {
            acc['기타'] = (acc['기타'] || 0) + 1;
        } else {
            acc[golfPeriod] = (acc[golfPeriod] || 0) + 1;
        }

        return acc;
    }, {});

    const period = Object.keys(periodMap)
        .filter((key) => key.trim() !== '')
        .map((key) => ({
            name: key,
            count: periodMap[key],
            rate: Math.floor((periodMap[key] / totalNumber) * 100),
        }));


    const columns = React.useMemo(
        () => [
            {
                Header: '경력기간',
                accessor: 'name',
                width: '30%',
            },
            {
                Header: '인원',
                accessor: 'count',
                width: '25%',
                Cell: ({ value }) => <>{value.toLocaleString()}명</>,
            },
            {
                Header: '비율',
                accessor: 'rate',
                width: '45%',
                Cell: ({ value }) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {value}%
                        <ProgressBar
                            now={value}
                            style={{ height: '3px', width: '100%', marginLeft: '10px' }}
                            variant=""
                        />
                    </div>
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
