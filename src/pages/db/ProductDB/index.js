import React, { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

import { collection, query, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

import { firestoreDB } from '../../../firebase/firebase';

import ProductRegistrationModal from './ProductRegistrationModal.js';
import ProductsTable from './ProductsTable.js';

import Spinner from '../../../components/Spinner.js';

// import * as yup from 'yup';

const ProductDB = () => {
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        const porductsCollectionRef = query(collection(firestoreDB, 'Users', email, 'Products'));
        onSnapshot(porductsCollectionRef, (querySnapshot) => {
            const productsArray = [];
            querySnapshot.forEach((product) => {
                productsArray.push({ ...product.data(), uid: product.id });
            });

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
        try {
            await putFirestoreProductFieldData(event.target.checked, idx);
            const fetchedProductsData = await getFirestoreProductsColletionData();
            const mergedProductsData = mergeProductsDataWithFirestore(productsData, fetchedProductsData);

            setProductsData(mergedProductsData);
        } catch (error) {
            console.log(error);
        }
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
            accessor: 'productCode', // 해당 열에 표시할 데이터 필드
            Header: '상품번호', // 열 헤더 텍스트
            sort: true,
        },
        {
            id: '2',
            accessor: 'product',
            Header: '상품명',
            sort: true,
        },
        {
            id: '3',
            accessor: 'type',
            Header: '상품종류',
            sort: true,
            Cell: ({ value }) => {
                return productTypeTextHandler(value);
            },
        },
        {
            id: '4',
            accessor: 'expirationPeriod',
            Header: '유효기간',
            sort: true,
            Cell: ({ value }) => {
                const period = parseInt(value);
                const isMonth = value.includes('개월');
                return <span>{isMonth ? `${period}개월` : `${period}일`}</span>;
            },
            sortType: (rowA, rowB, columnId) => {
                const valueA = parseInt(rowA.values[columnId]);
                const valueB = parseInt(rowB.values[columnId]);
                const isMonthA = rowA.values[columnId].includes('개월');
                const isMonthB = rowB.values[columnId].includes('개월');

                if (isMonthA && !isMonthB) {
                    return 1;
                } else if (!isMonthA && isMonthB) {
                    return -1;
                } else {
                    return valueA - valueB;
                }
            },
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
            Cell: ({ value, raw }) => {
                return <div style={{ width: '100%', textAlign: 'right' }}>{value.toLocaleString() + '원'}</div>;
            },
        },
        {
            id: '7',
            accessor: 'activation',
            Header: '상태',
            sort: true,
            Cell: ({ value, row }) => (
                <Container className="d-flex p-0">
                    {
                        <Form className="pe-auto">
                            <Form.Check
                                type="switch"
                                id={`custom-switch-${row.index}`}
                                label={value ? '활성' : '비활성'}
                                onChange={(event) => productsActivationHandler(event, row.index)}
                                defaultChecked={value}
                            />
                        </Form>
                    }
                </Container>
            ),
            sortType: (rowA, rowB, columnId) => {
                const valueA = rowA.values[columnId];
                const valueB = rowB.values[columnId];

                console.log(rowA, rowB, columnId);

                if (valueA === true && valueB !== true) {
                    return 1;
                } else if (valueA !== true && valueB === true) {
                    return -1;
                }
            },
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
            {modal && <ProductRegistrationModal modal={modal} setModal={setModal} productsData={productsData} />}
            {isLoading ? (
                <Spinner className="me-1" size="sm" color="primary" style={{ width: '15px', height: '15px' }} />
            ) : (
                <ProductsTable data={productsData} columns={tableColumns} />
            )}

            <div className="circle-btn edit-btn-area avatar-md" onClick={toggle}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
        </>
    );
};

export default ProductDB;
