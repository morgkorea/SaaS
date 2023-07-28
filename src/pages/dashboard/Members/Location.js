import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import SortableTable from './SortableTable';

const Location = ({ members }) => {
    const totalNumber = members.length;
    const LocationMap = members.reduce((acc, member) => {
        const regions = member.region.toLowerCase().trim();

        if (regions === '') {
            acc['기타'] = (acc['기타'] || 0) + 1;
        } else {
            acc[regions] = (acc[regions] || 0) + 1;
        }

        return acc;
    }, {});

    const location = Object.keys(LocationMap)
        .filter((key) => key.trim() !== '')
        .map((key) => ({
            name: key,
            count: LocationMap[key],
            rate: Math.floor((LocationMap[key] / totalNumber) * 100),
        }));

    const columns = React.useMemo(
        () => [
            {
                Header: '지역',
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
                <CardTitle containerClass="d-flex align-items-center justify-content-between mb-3 pt-1" title="지역" />
                <div style={{ height: '370px', overflowY: 'scroll' }}>
                    <SortableTable columns={columns} data={location} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default Location;
