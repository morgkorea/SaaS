import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';

import DefaultPagination from '../../../components/DefaultPagination.js';

import SalesTable from './SalesTable.js';

import SalesRegistrationModal from './SalesRegistrationModal.js';

import { collection, query, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

import { useSelector } from 'react-redux';

import { firestoreDB } from '../../../firebase/firebase.js';

const SalesDB = () => {
    const [modal, setModal] = useState(false);
    const [salesData, setSalesData] = useState([]);

    // 페이지네이션
    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

    // 수정하기
    const [editMode, setEditMode] = useState(false);

    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });

    const getFirestoreSalesData = async () => {
        const firestoreSalesCollectionRef = query(collection(firestoreDB, 'Users', email, 'Sales'));

        onSnapshot(firestoreSalesCollectionRef, (querySnapshot) => {
            const salesArray = [];
            querySnapshot.forEach((sale) => {
                salesArray.push({ ...sale.data(), uid: sale.id });
            });

            setSalesData(salesArray);
        });
    };

    useEffect(() => {
        getFirestoreSalesData();
    }, []);

    const toggle = () => {
        setModal(!modal);
    };
    const tableColumns = [
        {
            id: '1', // 열 ID
            accessor: 'paymentNumber', // 해당 열에 표시할 데이터 필드
            Header: '결제번호', // 열 헤더 텍스트
            sort: true,
            // ... 추가적인 열 설정
        },
        {
            id: '2', // 열 ID
            accessor: 'paymentDate', // 해당 열에 표시할 데이터 필드
            Header: '결제일', // 열 헤더 텍스트
            sort: true,
            // ... 추가적인 열 설정
        },
        {
            id: '3', // 열 ID
            accessor: 'paymentTime', // 해당 열에 표시할 데이터 필드
            Header: '결제시간', // 열 헤더 텍스트
            sort: true,
        },
        {
            id: '4', // 열 ID
            accessor: 'name', // 해당 열에 표시할 데이터 필드
            Header: '회원명', // 열 헤더 텍스트
            sort: true,
        },
        {
            id: '5',
            accessor: 'phone',
            Header: '전화번호',
            sort: true,
        },
        {
            id: '6',
            accessor: 'memberNumber',
            Header: '회원번호',
            sort: true,
        },
        {
            id: '7',
            accessor: 'salesProducts[0].product',
            Header: '상품',
            sort: true,
        },
        {
            id: '8',
            accessor: 'salesProducts[0].discountRate',
            Header: '할인율',
            sort: true,
        },
        {
            id: '9',
            accessor: 'salesProducts[0].regularPrice',
            Header: '정상가',
            sort: true,
        },
    ];

    //         Cell: ({ value, row }) => (
    //             <Container className="d-flex p-0">
    //                 {
    //                     <Form className="pe-auto">
    //                         <Form.Check
    //                             type="switch"
    //                             id={`custom-switch-${row.index}`}
    //                             label={value ? '활성' : '비활성'}
    //                             onChange={(event) => productsActivationHandler(event, row.index)}
    //                             defaultChecked={value}
    //                         />
    //                     </Form>
    //                 }
    //             </Container>
    //         ),

    return (
        <>
            {modal && <SalesRegistrationModal modal={modal} setModal={setModal} />}
            <SalesTable data={salesData} columns={tableColumns} />

            <div className="edit-btn-area avatar-md" style={{ zIndex: '100' }} onClick={toggle}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
        </>
    );
};

export default SalesDB;
