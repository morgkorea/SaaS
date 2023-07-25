import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';
import SortableTable from './SortableTable';

const Location = ({ members }) => {
    const allRegions = members.map((m) => m.region);
    let regions = allRegions.filter((element) => element !== undefined && element.trim() !== '');

    function mergeDuplicatesWithCount(regions) {
        const counts = {};

        regions.forEach((item) => {
            if (counts[item]) {
                counts[item]++;
            } else {
                counts[item] = 1;
            }
        });

        const merged = Object.keys(counts).map((region) => ({ region, count: counts[region] }));

        return merged;
    }

    const mergedDuplicates = mergeDuplicatesWithCount(regions);

    const columns = React.useMemo(
        () => [
            {
                Header: '지역',
                accessor: 'region',
            },
            {
                Header: '인원',
                accessor: 'count',
                Cell: ({ value }) => <>{value.toLocaleString()}명</>,
            },
            {
                Header: '비율',
                accessor: (row) => Math.floor((row.count / members.length) * 100),
                Cell: ({ row }) => (
                    <ProgressBar
                        now={Math.floor((row.original.count / members.length) * 100)}
                        style={{ height: '3px' }}
                        variant=""
                    />
                ),
            },
        ],
        [members.length]
    );

    return (
        <Card>
            <Card.Body style={{ height: '450px' }}>
                <CardTitle containerClass="d-flex align-items-center justify-content-between mb-3 pt-1" title="지역" />
                <div style={{ height: '370px', overflowY: 'scroll' }}>
                    <SortableTable columns={columns} data={mergedDuplicates} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default Location;
