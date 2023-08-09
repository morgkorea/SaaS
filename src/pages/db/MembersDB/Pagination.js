import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Pagination = ({ tableProps, sizePerPageList, styleCenter }) => {
    const [pageCount, setPageCount] = useState(tableProps.pageCount);
    const [pageIndex, setPageIndex] = useState(tableProps.state.pageIndex);

    useEffect(() => {
        setPageCount(tableProps.pageCount);
        setPageIndex(tableProps.state.pageIndex);
    }, [tableProps.pageCount, tableProps.state.pageIndex]);

    const filterPages = useCallback(
        (visiblePages, totalPages) => {
            return visiblePages.filter((page) => page <= pageCount);
        },
        [pageCount]
    );

    const getVisiblePages = useCallback(
        (page: number, total) => {
            if (total < 7) {
                return filterPages([1, 2, 3, 4, 5, 6], total);
            } else {
                if (page % 5 >= 0 && page > 4 && page + 2 < total) {
                    return [1, page - 1, page, page + 1, total];
                } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
                    return [1, total - 3, total - 2, total - 1, total];
                } else {
                    return [1, 2, 3, 4, 5, total];
                }
            }
        },
        [filterPages]
    );

    const changePage = (page) => {
        const activePage = pageIndex + 1;

        if (page === activePage) {
            return;
        }

        const visiblePages = getVisiblePages(page, pageCount);
        setVisiblePages(filterPages(visiblePages, pageCount));

        tableProps.gotoPage(page - 1);
    };

    useEffect(() => {
        const visiblePages = getVisiblePages(0, pageCount);
        setVisiblePages(visiblePages);
    }, [pageCount, getVisiblePages]);

    const [visiblePages, setVisiblePages] = useState(getVisiblePages(0, pageCount));
    const activePage = pageIndex + 1;

    return (
        <div className="align-items-center text-center pb-1"
            style={styleCenter ? { display: 'flex', justifyContent: 'center' } : null}
        >
             {/* {sizePerPageList.length > 0 && (
                <div className="d-inline-block me-3">
                    <label className="me-1">Display :</label>
                    <select
                        value={tableProps.state.pageSize}
                        onChange={(e) => {
                            tableProps.setPageSize(Number(e.target.value));
                        }}
                        className="form-select d-inline-block w-auto">
                        {(sizePerPageList || []).map((pageSize, index) => {
                            return (
                                <option key={index} value={pageSize.value}>
                                    {pageSize.text}
                                </option>
                            );
                        })}
                    </select>
                </div>
            )} */}
            <ul className={
                    styleCenter
                        ? 'pagination align-item-center mb-0'
                        : 'pagination d-inline-flex ms-auto align-item-center mb-0'
                }>
                <li
                    key="prevpage"
                    className={classNames('page-item', 'paginate_button', 'previous', {
                        disabled: activePage === 1,
                    })}
                    onClick={() => {
                        if (activePage === 1) return;
                        changePage(activePage - 1);
                    }}>
                    <Link to="#" className="page-link">
                        <i className="mdi mdi-chevron-left"></i>
                    </Link>
                </li>
                {(visiblePages || []).map((page, index, array) => {
                    return array[index - 1] + 1 < page ? (
                        <React.Fragment key={page}>
                            <li className="page-item disabled d-none d-xl-inline-block">
                                <Link to="#" className="page-link">
                                    ...
                                </Link>
                            </li>
                            <li
                                className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
                                    active: activePage === page,
                                })}
                                onClick={(e) => changePage(page)}>
                                <Link to="#" className="page-link">
                                    {page}
                                </Link>
                            </li>
                        </React.Fragment>
                    ) : (
                        <li
                            key={page}
                            className={classNames('page-item', 'd-none', 'd-xl-inline-block', {
                                active: activePage === page,
                            })}
                            onClick={(e) => changePage(page)}>
                            <Link to="#" className="page-link">
                                {page}
                            </Link>
                        </li>
                    );
                })}
                <li
                    key="nextpage"
                    className={classNames('page-item', 'paginate_button', 'next', {
                        disabled: activePage === tableProps.pageCount,
                    })}
                    onClick={() => {
                        if (activePage === tableProps.pageCount) return;
                        changePage(activePage + 1);
                    }}>
                    <Link to="#" className="page-link">
                        <i className="mdi mdi-chevron-right"></i>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
