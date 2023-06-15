import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

import { doc, getDocs, collection, query, where } from 'firebase/firestore';

import { firestoreDB } from '../../../firebase/firebase';
import { firestoreProductsFieldSchema } from '../../../firebase/firestoreDbSchema';

import DefaultPagination from '../../../components/DefaultPagination.js';

import ProductsTable from './ProductsTable.js';
import ProductRegistrationModal from './ProductRegistrationModal.js';
import { Modals } from './ProductRegistrationModal.js';

const ProductDB = () => {
    const [productsData, setProductsData] = useState([]);
    const [modifiedActivation, setModifiedActivation] = useState(false);
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

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
                productsArray.push({ ...product.data(), uniqueId: product.id });
            });

            console.log('getdocs success', typeof productsQuerySnapshot);
            setProductsData(productsArray);
        } catch (error) {
            console.log(error);
            console.log('products collections getdocs error');
        }
    };

    const productsActivationHandler = (event, idx) => {
        const products = [...productsData];
        products[idx].activation = event.target.checked;
        setProductsData(products);
    };

    console.log(productsData);

    const editBtn = () => toast('정보 수정 화면으로 전환됩니다.');
    const saveBtn = () => toast('저장되었습니다.');

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">상품 리스트</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        <ProductsTable
                            productsData={productsData}
                            productsActivationHandler={productsActivationHandler}
                            limit={limit}
                            offset={offset}
                        />
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    {productsData?.length > limit && (
                        <DefaultPagination total={productsData.length} limit={limit} page={page} setPage={setPage} />
                    )}
                </Col>
            </Row>
            <div className="edit-btn-area avatar-md" onClick={toggle}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
            <ProductRegistrationModal modal={modal} setModal={setModal} />
        </>
    );
};

export default ProductDB;
