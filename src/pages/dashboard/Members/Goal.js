import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import SortableTable from './SortableTable';

const Goal = ({ members }) => {
    const purposeMap = members.reduce((acc, member) => {
        const golfPurpose = member.golfPurpose.toLowerCase().trim();
        acc[golfPurpose] = (acc[golfPurpose] || 0) + 1;
        return acc;
    }, {});

    const totalNumber = Object.values(purposeMap).reduce((sum, value) => sum + value, 0);

    const purpose = Object.keys(purposeMap)
        .filter((key) => key.trim() !== '')
        .map((key) => ({
            name: key,
            number: purposeMap[key],
            rate: Math.floor((purposeMap[key] / totalNumber) * 100),
        }));

    const columns = React.useMemo(
        () => [
            {
                Header: '목적',
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
                Cell: ({ value }) => <ProgressBar now={value} style={{ height: '3px' }} variant="" />,
            },
        ],
        []
    );

    return (
        <Card>
            <Card.Body style={{ height: '450px' }}>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-3 pt-1"
                    title="골프목적"
                />
                <div style={{ height: '370px', overflowY: 'scroll' }}>
                    <SortableTable columns={columns} data={purpose} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default Goal;
