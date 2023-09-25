import React, { useRef, useEffect, forwardRef, useState } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import Pagination from './Pagination';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center form-control">
                <i className="mdi mdi-magnify search-icon" />
                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder="회원 찾기"
                    className="w-auto ms-1 border-0"
                />
            </span>
        </div>
    );
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

const CustomersTable = (props) => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;


    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { 
                pageSize: props['pageSize'] || 5,
                selectedRowIds: {}, // 초기 선택 상태 설정
            },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div style={{ display: 'flex' }}>
                                <IndeterminateCheckbox
                                    {...getToggleAllPageRowsSelectedProps()} 
                                    onClick={() => toggleAllRows(dataTable.toggleAllRowsSelected)}
                                />
                            </div>
                        ),
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox 
                                    {...row.getToggleRowSelectedProps()} 
                                    onClick={() => toggleSingleRow(row)}
                                />
                            </div>
                        ),
                    },
                    ...columns,
                ]);
            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'expander',
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    const rows = pagination ? dataTable.page : dataTable.rows;

    const toggleAllRows = (toggleRowsSelected) => {
        toggleRowsSelected();
    };

    const toggleSingleRow = (row) => {
        const memberId = row.original.id;

        dataTable.toggleRowSelected(memberId);
    };

    const selectedRowIds = dataTable.state.selectedRowIds;
    const selectedMemberIds = Object.keys(selectedRowIds).filter((id) => selectedRowIds[id]);

    // console.log('Selected Member IDs:', selectedMemberIds);
    
    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <div>
                        <h5>
                            현재 <span className="text-primary">{dataTable.data.length}명</span>의 회원분들이 함께 하고
                            있어요!
                        </h5>
                        <h5>선택: {selectedMemberIds.length}명</h5>
                    </div>
                </div>
                <div className="d-flex">
                    <div> 
                        {isSearchable && (
                            <GlobalFilter
                                preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                                globalFilter={dataTable.state.globalFilter}
                                setGlobalFilter={dataTable.setGlobalFilter}
                                searchBoxClass={props['searchBoxClass']}
                            />
                        )}
                    </div>
                    <div className='ms-2'>
                        <OverlayTrigger
                            overlay={<Tooltip id="tooltip-disabled"><b>서비스 준비중</b>입니다.</Tooltip>}>
                            <Button>문자 메시지 전송</Button>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>

            <div className="table-responsive customers-table" style={{ minHeight: '344px' }}>
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {rows.length === 0 ? (
                            <tr className="dataless" style={{ height: '500px' }}>
                                <td colSpan={dataTable.columns.length}>
                                    등록된 회원이 없습니다. 회원 등록을 해주세요.
                                    <span className="d-block">
                                        <Warning style={{ width: '12rem', height: '12rem', marginTop: '1rem' }} />
                                    </span>
                                </td>
                            </tr>
                        ) : (
                            (rows || []).map((row, i) => {
                                dataTable.prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={row.original.id}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td key={cell.id} {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {pagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
        </>
    );
};

export default CustomersTable;
