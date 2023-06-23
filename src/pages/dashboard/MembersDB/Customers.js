import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Table from './Table';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';
import EditCell from './EditCell';



const onClickMemberInfo = ({ row }) => {
    return (
        <>
            <Link to={`/dashboard/member-info`} state={{ member: row.original }}>
                {row.original.name}
            </Link>
        </>
    );
};


const ActionColumn = ({ row }) => {
    return (
        <>
            <Link className="action-icon">
                <Button onClick={() => editUser(row)}>
                    <i className="mdi mdi-square-edit-outline"></i>
                </Button>
            </Link>
            <Link to="#" className="action-icon">
                <Button onClick={() => deleteUser(row)}>
                    <i className="mdi mdi-delete"></i>
                </Button>
            </Link>
        </>
    );
};

const editUser = async (row) => {
    const id = row.original.id
    const userDoc = doc(firestoreDB, 'Users', 'rnfkd@naver.com', 'Members', id);
    await updateDoc(userDoc, { name: '메롱' });
}

const deleteUser = async (row) => {
    const id = row.original.id
    const userDoc = doc(firestoreDB, 'Users', 'rnfkd@naver.com', 'Members', id);
    await deleteDoc(userDoc);
}

const MarketingInputColumn = ({ row }) => {
    return (
        <div className="text-center">
            <input type="checkbox" checked={row.original.marketingRecieveAllow} />
        </div>
    );
};

const PrivateInputColumn = ({ row }) => {
    return (
        <div className="text-center">
            <input type="checkbox" checked={row.original.privateInfoAllow} />
        </div>
    );
};

const columns = [
    {
        Header: '성함',
        accessor: 'name',
        Cell: onClickMemberInfo,
        sort: true,
    },
    {
        Header: '회원번호',
        accessor: '',
        sort: true,
        // Cell: ActionColumn,
        classes: 'table-action',
    },
    {
        Header: '생성날짜',
        accessor: 'createdDate',
        sort: true,
    },
    {
        Header: '시간',
        accessor: 'createdTime',
        sort: true,
    },

    {
        Header: '성별',
        accessor: 'sex',
        sort: true,
    },
    {
        Header: '생년월일',
        accessor: 'birthDate',
        sort: true,
    },
    {
        Header: '연령대',
        accessor: 'ageGroup',
        sort: true,
    },
    {
        Header: '휴대전화번호',
        accessor: 'phone',
        sort: true,
    },
    {
        Header: '유형',
        accessor: 'audience',
        sort: true,
    },
    {
        Header: '위치',
        accessor: 'location',
        sort: true,
    },
    {
        Header: '지역',
        accessor: '',
        sort: true,
    },
    {
        Header: '골프경력',
        accessor: 'golfPeriod',
        sort: true,
    },
    {
        Header: '골프목적',
        accessor: 'golfPurpose',
        sort: true,
    },
    {
        Header: '관심상품',
        accessor: '',
        sort: true,
    },
    {
        Header: '이용시간대',
        accessor: 'hoursUse',
        sort: true,
    },
    {
        Header: '부상전적',
        accessor: 'injuries',
        sort: true,
    },
    {
        Header: '부상부위',
        accessor: 'injuriedPart',
        sort: true,
    },
    {
        Header: '유입경로',
        accessor: '',
        sort: true,
    },
    {
        Header: '마케팅수신동의',
        accessor: 'marketingRecieveAllow',
        Cell: MarketingInputColumn,
        sort: false,
    },
    {
        Header: '개인정보수집동의',
        accessor: 'privateInfoAllow',
        Cell: PrivateInputColumn,
        sort: false,
    },
    {
        Header: '누적결제수',
        accessor: '',
        sort: true,
    },
    {
        Header: 'LTV(누적결제금액)',
        accessor: '',
        sort: true,
    },
    {
        Header: '평균결제금액',
        accessor: '',
        sort: true,
    },
    {
        Header: '활성여부',
        accessor: 'activation',
        sort: true,
    },
];

const sizePerPageList = [
    {
        text: '30',
        value: 30,
    },
    {
        text: '50',
        value: 50,
    },
    {
        text: '100',
        value: 100,
    },
];


const Customers = ({ currentMembers, addMode, email, editMode, setAddMode }) => {
    let location = useLocation();
    console.log(location);

    return (
        <>
            <Card>
                <Card.Body>
                    <Table
                        columns={columns}
                        data={currentMembers}
                        email={email}
                        addMode={addMode}
                        setAddMode={setAddMode}
                        editMode={editMode}
                        pageSize={30}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                        isSelectable={false}
                        isSearchable={true}
                        searchBoxClass="mb-3"
                    />
                </Card.Body>
            </Card>
        </>
    );
};

export default Customers;
