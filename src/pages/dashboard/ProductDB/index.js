import React, { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

import { collection, query, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

import { firestoreDB } from '../../../firebase/firebase';

import ProductRegistrationModal from './ProductRegistrationModal.js';
import ProductsTable from './ProductsTable.js';

import Spinner from '../../../components/Spinner.js';

import * as yup from 'yup';

const ProductDB = () => {
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isActivationFetching, setIsActivationFetching] = useState(false);
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

    const productTypeTextHandler = (type) => {
        switch (type) {
            case 'batterBox':
                return '타석';
            case 'lesson':
                return '레슨';
            case 'locker':
                return '락커';
            case 'etc':
                return '기타';
            default:
                return '';
        }
    };

    const email = useSelector((state) => {
        return state.Auth?.user?.email;
    });

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const fetchedProductsData = await getFirestoreProductsColletionData();
            const mergedProductsData = mergeProductsDataWithFirestore(productsData, fetchedProductsData);
            setProductsData(mergedProductsData);
        };

        fetchData();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // if (!modal) {
        //     console.log('modal closed and fetching start');
        //     const fetchData = async () => {
        //         setIsLoading(true);
        //         const fetchedProductsData = await getFirestoreProductsColletionData();
        //         const mergedProductsData = mergeProductsDataWithFirestore(productsData, fetchedProductsData);
        //         console.log(mergedProductsData);
        //         setProductsData(mergedProductsData);
        //     };
        //     fetchData();
        //     setIsLoading(false);
        // }

        const porductsCollectionRef = query(collection(firestoreDB, 'Users', email, 'Products'));
        onSnapshot(porductsCollectionRef, (querySnapshot) => {
            const productsArray = [];
            querySnapshot.forEach((products) => {
                productsArray.push(products.data());
            });

            console.log(productsArray);
            setProductsData(productsArray);
        });
    }, [modal]);

    const getFirestoreProductsColletionData = async () => {
        try {
            const productsCollectionRef = query(
                collection(firestoreDB, 'Users', email, 'Products')
                // orderBy('modifiedDate')
            );
            const productsQuerySnapshot = await getDocs(productsCollectionRef);
            // let productsArray = [];
            // onSnapshot(productsQuerySnapshot, (querySnapshot) => {
            //     querySnapshot.forEach((product) => {
            //         productsArray.push({ ...product.data(), uid: product.id });
            //         console.log(product.modifiedDate);
            //     });
            //     console.log('updated data resieved');
            // });

            let productsArray = [];
            productsQuerySnapshot.forEach((product) => {
                productsArray.push({ ...product.data(), uid: product.id });
            });

            return productsArray;
        } catch (error) {
            console.log(error);
        }
    };

    // todo: 기존 소팅된 배열과 새로 받은 배열이 순서가 다른 문제 해결,
    const mergeProductsDataWithFirestore = (previous, current) => {
        if (previous.length || current.legnth) {
            let upToDateProductData = [...previous];
            for (let i = 0; i < upToDateProductData.length; i++) {
                for (let j = 0; j < current.length; j++) {
                    if (upToDateProductData[i].uid === current[j].uid) {
                        upToDateProductData[i].activation = current[j].activation;
                        upToDateProductData[i].modifiedDate = current[j].modifiedDate;
                    }
                }
            }

            return upToDateProductData;
        } else {
            return current;
        }
    };

    const productsActivationHandler = async (event, idx) => {
        // console.log(idx);
        // const products = [...productsData];
        // products[idx].activation = event.target.checked;
        setIsActivationFetching(idx);

        try {
            await putFirestoreProductFieldData(event.target.checked, idx);
            const fetchedProductsData = await getFirestoreProductsColletionData();
            const mergedProductsData = mergeProductsDataWithFirestore(productsData, fetchedProductsData);
            console.log(mergedProductsData, 'updated');
            setProductsData(mergedProductsData);
        } catch (error) {
            console.log(error);
        }

        setIsActivationFetching(false);
    };

    const putFirestoreProductFieldData = async (isActivation, idx) => {
        const pudateDocRef = doc(firestoreDB, 'Users', email, 'Products', productsData[idx].uid);
        try {
            return await updateDoc(pudateDocRef, {
                activation: isActivation,
                modifiedDate: new Date().toISOString().split('T')[0].toString(),
            });
        } catch (error) {
            console.log(error);
        }
    };

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
            Cell: ({ value }) => {
                return productTypeTextHandler(value);
            },
            // ... 추가적인 열 설정
        },
        {
            id: '4', // 열 ID
            accessor: 'expirationPeriod', // 해당 열에 표시할 데이터 필드
            Header: '유효기간', // 열 헤더 텍스트
            sort: true,
            Cell: ({ value }) => {
                const period = parseInt(value);
                const isMonth = value.includes('월');
                return <span>{isMonth ? `${period}월` : `${period}일`}</span>;
            },
            sortType: (rowA, rowB, columnId) => {
                const valueA = parseInt(rowA.values[columnId]);
                const valueB = parseInt(rowB.values[columnId]);
                const isMonthA = rowA.values[columnId].includes('월');
                const isMonthB = rowB.values[columnId].includes('월');

                if (isMonthA && !isMonthB) {
                    return 1;
                } else if (!isMonthA && isMonthB) {
                    return -1;
                } else {
                    return valueA - valueB;
                }
            },

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
            Cell: ({ value, row }) => (
                <Container className="d-flex p-0">
                    {
                        <Form className="pe-auto">
                            <Form.Check
                                type="switch"
                                id={`custom-switch-${row.index}`}
                                label={
                                    isActivationFetching === row.index ? (
                                        <Spinner
                                            className="me-1"
                                            size="sm"
                                            color="primary"
                                            style={{ width: '15px', height: '15px' }}
                                        />
                                    ) : value ? (
                                        '활성'
                                    ) : (
                                        '비활성'
                                    )
                                }
                                onChange={(event) => productsActivationHandler(event, row.index)}
                                defaultChecked={value}
                            />
                        </Form>
                    }
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

    return (
        <>
            <ProductRegistrationModal modal={modal} setModal={setModal} productsData={productsData} />
            {isLoading ? (
                <Spinner className="me-1" size="sm" color="primary" style={{ width: '15px', height: '15px' }} />
            ) : (
                <ProductsTable data={productsData} columns={tableColumns} />
            )}

            <div className="edit-btn-area avatar-md" style={{ zIndex: '100' }} onClick={toggle}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
        </>
    );
};

export default ProductDB;
