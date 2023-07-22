import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Card, Table, ProgressBar } from 'react-bootstrap';
import CardTitle from '../../../components/CardTitle';

const Location = ({ members }) => {
    const allRegions = members.map((m) => m.region);
    let regions = allRegions.filter((element) => element !== undefined && element.trim() !== '');

    function mergeDuplicatesWithCount(regions) {
        const counts = {};

        regions.forEach((item) => {
            if (counts[item]) {
                counts[item]++; 
            } else {
                counts[item] = 1
            }
        });

        const merged = Object.keys(counts).map((region) => ({ region, count: counts[region] }));

        return merged;
    }

    const mergedDuplicates = mergeDuplicatesWithCount(regions);
    // console.log(mergedDuplicates)
    // console.log('regions:', regions);
    // console.log('중복 합치기:', mergedDuplicates);
    return (
        <Card>
            <Card.Body style={{ height: '450px' }}>
                <CardTitle containerClass="d-flex align-items-center justify-content-between mb-3 pt-1" title="지역" />
                <div style={{ height: '370px', overflowY: 'scroll' }}>
                    {/* <SortableTable data={mergedDuplicates} /> */}
                    <Table responsive className="table table-sm table-centered mb-0 font-14">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '25%' }}>지역</th>
                                <th style={{ width: '25%' }}>인원</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mergedDuplicates.map((region) => (
                                <tr key={region.index}>
                                    <td>{region.region}</td>
                                    <td>{region.count}명</td>
                                    <td>
                                        <ProgressBar
                                            now={Math.floor((region.count / members.length) * 100)}
                                            style={{ height: '3px' }}
                                            variant=""
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
};

// const SortableTable = ({ data }) => {
//     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
//         {
//             columns: React.useMemo(
//                 () => [
//                     {
//                         Header: '지역',
//                         accessor: 'region',
//                     },
//                     {
//                         Header: '인원',
//                         accessor: 'count',
//                     },
//                 ],
//                 []
//             ),
//             data: React.useMemo(() => data, [data]),
//         },
//         useSortBy
//     );

//     return (
//         <Table responsive className="table table-sm table-centered mb-0 font-14">
//             <thead className="table-light">
//                 <tr>
//                     {headerGroups.map((headerGroup) => (
//                         <th {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map((column) => (
//                                 <span {...column.getHeaderProps(column.getSortByToggleProps())}>
//                                     {column.render('Header')}
//                                     {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//                                 </span>
//                             ))}
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                     prepareRow(row);
//                     return (
//                         <tr {...row.getRowProps()}>
//                             {row.cells.map((cell) => (
//                                 <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                             ))}
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </Table>
//     );
// };

export default Location;
