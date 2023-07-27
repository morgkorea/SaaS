import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Table } from 'react-bootstrap';

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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} style={{ width: cell.column.width }}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SortableTable;
