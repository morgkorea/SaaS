import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import SortableTable from './SortableTable';

const Goal = ({ members }) => {
    const totalNumber = members.length;
    const purposeMap = members.reduce((acc, member) => {
        const golfPurpose = member.golfPurpose.toLowerCase().trim();

        if (golfPurpose === '') {
            acc['기타'] = (acc['기타'] || 0) + 1;
        } else {
            acc[golfPurpose] = (acc[golfPurpose] || 0) + 1;
        }

        return acc;
    }, {});

    const purpose = Object.keys(purposeMap)
        .filter((key) => key.trim() !== '')
        .map((key) => ({
            name: key,
            count: purposeMap[key],
            rate: Math.floor((purposeMap[key] / totalNumber) * 100),
        }));

    const columns = React.useMemo(
        () => [
            {
                Header: '목적',
                accessor: 'name',
                width: '35%',
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
                width: '40%',
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
