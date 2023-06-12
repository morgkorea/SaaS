import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultPagination from '../../../components/DefaultPagination.js';

import ProductsTable from './ProductsTable.js';
import ProductRegistrationModal from './ProductRegistrationModal.js';

import { firestoreProductsFieldSchema } from '../../../firebase/firestoreDbSchema.js';

const ProductDB = () => {
    const [productsData, setProductsData] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

    useEffect(() => {
        const produtsArray = Array.from({ length: 180 }, (_, idx) => {
            return {
                ...firestoreProductsFieldSchema,
                productsNumber: firestoreProductsFieldSchema.productsNumber + `${idx}`,
                expirationPeriod: idx,
                regularPrice: firestoreProductsFieldSchema.regularPrice + idx * 20,
                activation: idx % 2 === 0 ? true : false,
            };
        });
        setProductsData(produtsArray);
        console.log('intialized');
    }, []);

    const productsActivationHandler = (event, idx) => {
        const products = [...productsData];
        products[idx].activation = event.target.checked;
        setProductsData(products);
    };

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
            <div className="edit-btn-area avatar-md">
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
            <ProductRegistrationModal />
        </>
    );
};

export default ProductDB;
