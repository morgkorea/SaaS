import React, { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

import { doc, getDocs, collection, query, where } from 'firebase/firestore';

import { firestoreDB } from '../../../firebase/firebase';
import { firestoreProductsFieldSchema } from '../../../firebase/firestoreDbSchema';

import DefaultPagination from '../../../components/DefaultPagination.js';

import ProductRegistrationModal from './ProductRegistrationModal.js';
import ProductsTable from './ProductsTable.js';

const ProductDB = () => {
    const [productsData, setProductsData] = useState([]);
    const [modifiedActivation, setModifiedActivation] = useState(false);
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

    const tableColumns = [
        {
            id: '1', // 열 ID
            accessor: 'productNumber', // 해당 열에 표시할 데이터 필드
            Header: '상품번호', // 열 헤더 텍스트
            sort: true,
            // ... 추가적인 열 설정
        },
        {
            id: '2', // 열 ID
            accessor: 'product', // 해당 열에 표시할 데이터 필드
            Header: '상품명', // 열 헤더 텍스트
            sort: true,
            // ... 추가적인 열 설정
        },
        {
            id: '3', // 열 ID
            accessor: 'type', // 해당 열에 표시할 데이터 필드
            Header: '상품종류', // 열 헤더 텍스트
            sort: true,
            // ... 추가적인 열 설정
        },
        {
            id: '4', // 열 ID
            accessor: 'expirationPeriod', // 해당 열에 표시할 데이터 필드
            Header: '유효기간', // 열 헤더 텍스트
            sort: true,
            // ... 추가적인 열 설정
        },
        {
            id: '5',
            accessor: 'expirationCount',
            Header: '유효횟수',
            sort: true,
        },
        {
            id: '6',
            accessor: 'regularPrice',
            Header: '정상가',
            sort: true,
        },
        {
            id: '7',
            accessor: 'activation',
            Header: '상태',
            sort: true,
            Cell: ({ value, row }) => (
                <Container className="d-flex p-0">
                    <Form className="pe-auto">
                        <Form.Check
                            type="switch"
                            id={`custom-switch-${row.index}`}
                            label={value ? '활성' : '비활성'}
                            onChange={(event) => productsActivationHandler(event, row.index)}
                            defaultChecked={value}
                        />
                    </Form>
                </Container>
            ),
        },
        {
            id: '8',
            accessor: 'createdDate',
            Header: '등록일',
            sort: true,
        },
        {
            id: '9',
            accessor: 'modifiedDate',
            Header: '수정일',
            sort: true,
        },
    ];

    const email = useSelector((state) => {
        return state.Auth?.user?.email;
    });

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        getFirestoreProductsColletionData();
    }, []);

    useEffect(() => {
        if (!modal) {
            getFirestoreProductsColletionData();
            console.log('test,', modal);
        }
    }, [modal]);

    const getFirestoreProductsColletionData = async () => {
        try {
            const productsCollectionRef = query(collection(firestoreDB, 'Users', email, 'Products'));
            const productsQuerySnapshot = await getDocs(productsCollectionRef);
            let productsArray = [];
            productsQuerySnapshot.forEach((product) => {
                productsArray.push({ ...product.data(), uid: product.id });
            });
            setProductsData(productsArray);
        } catch (error) {
            console.log(error);
        }
    };

    const productsActivationHandler = (event, idx) => {
        const products = [...productsData];
        products[idx].activation = event.target.checked;
        setProductsData(products);
    };

    console.log(productsData);
    return (
        <>
            <ProductRegistrationModal modal={modal} setModal={setModal} />
            <ProductsTable data={productsData} columns={tableColumns} />
            <div className="edit-btn-area avatar-md" style={{ zIndex: '100' }} onClick={toggle}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
        </>
    );
};

export default ProductDB;
