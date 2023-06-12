import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultPagination from '../../../components/DefaultPagination.js';

import ProductsTable from './ProductsTable.js';

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
                actiavation: idx % 2 === 0 ? true : false,
            };
        });
        setProductsData(produtsArray);
    }, []);

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
                <Col>{<ProductsTable products={productsData} limit={limit} offset={offset} />}</Col>
            </Row>
            <Row>
                <Col>
                    {productsData?.length > limit && (
                        <DefaultPagination total={productsData.length} limit={limit} page={page} setPage={setPage} />
                    )}
                </Col>
            </Row>
        </>
    );
};

export default ProductDB;
