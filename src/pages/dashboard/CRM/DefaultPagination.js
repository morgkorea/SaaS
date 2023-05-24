import React from 'react';
import { Pagination } from 'react-bootstrap';

const DefaultPagination = ({ total, limit, page, setPage }) => {
    const numPages = Math.ceil(total / limit);

    return (
        <Pagination>
            <Pagination.First onClick={() => setPage(page - 1)} disabled={page === 1} />
            {Array(numPages)
                .fill()
                .map((_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        aria-current={page === i + 1 ? 'page' : null}
                        active={page === i + 1}>
                        {i + 1}
                    </Pagination.Item>
                ))}
            <Pagination.Last onClick={() => setPage(page + 1)} disabled={page === numPages} />
        </Pagination>
    );
};

export default DefaultPagination;