import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';

const SortableTable = ({ columns, data }) => {
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: React.useMemo(() => columns, [columns]),
      data: React.useMemo(() => data, [data]),
    },
    useSortBy
  );

  return (
    <Table responsive className="table table-sm table-centered mb-0 font-14">
      <thead className="table-light">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                style={{ width: column.width }}
              >
                <span {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? '' : '') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '4rem 0', border: 'none' }}>
              아직 표기할 데이터가 없어요.
              <span className='d-block'><Warning style={{width: '8rem', height: '8rem', marginTop: '1rem'}} /></span>
            </td>
          </tr>
        ) : (
          rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ width: cell.column.width }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
};

export default SortableTable;
