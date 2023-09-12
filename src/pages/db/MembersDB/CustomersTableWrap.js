import React from 'react';
import Columns from './Columns';
import CustomersTable from './CustomersTable';

function CustomersTableWrap({ data }) {
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '15',
            value: 15,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: '50',
            value: 50,
        },
    ];

    return (
        <div>
            <CustomersTable
                columns={Columns}
                data={data}
                sizePerPageList={sizePerPageList}
                pageSize={sizePerPageList[1].value}
                isSortable={true}
                pagination={true}
                isSelectable={true} // 체크박스
                isSearchable={true}
                searchBoxClass="mb-3"
            />
        </div>
    );
}

export default CustomersTableWrap;
