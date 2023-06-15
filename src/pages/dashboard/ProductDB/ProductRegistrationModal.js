// @flow
import React, { useState } from 'react';
import { Row, Col, Button, Modal, Alert } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import { doc, setDoc, collection } from 'firebase/firestore';

import { firestoreDB } from '../../../firebase/firebase';
import { firestoreProductsFieldSchema } from '../../../firebase/firestoreDbSchema';

//loading spinner
import Spinner from '../../../components/Spinner';

const ProductRegistrationModal = ({ modal, setModal }) => {
    // const [modal, setModal] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [size, setSize] = useState('lg');

    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState(null);
    const [expirationPeriod, setExpirationPeriod] = useState(0);
    const [expirationCount, setExpirationCount] = useState(0);
    const [regularPrice, setRegularPrice] = useState(0);
    const [activation, setActivation] = useState(true);
    /**
     * Show/hide the modal
     */

    // users(collection) => email(doc) => 1.members(collection) 2. fields(data)
    const email = useSelector((state) => {
        return state.Auth?.user?.email;
    });

    const productRegistration = async () => {
        setIsRegistering(true);
        const productsDocRef = doc(collection(firestoreDB, 'Users', email, 'Products'));

        const productData = {
            ...firestoreProductsFieldSchema,
            product: productName,
            type: productType,
            expirationPeriod: expirationPeriod,
            expirationCount: expirationCount,
            regularPrice: regularPrice,
            activation: activation,
            createdDate: new Date(),
        };

        console.log(productData);

        try {
            await setDoc(productsDocRef, productData).then((response) => {
                console.log(response);
            });
        } catch (error) {
            console.log(error);
        }

        setIsRegistering(false);
    };
    const productsDocRef = doc(collection(firestoreDB, 'Users', email, 'Products'));
    //products collection 생성

    setDoc(productsDocRef, { ...firestoreProductsFieldSchema });

    const toggle = () => {
        setModal(!modal);
    };
    const getProductName = (event) => {
        setProductName(event.target.value);
    };
    const getProductType = (event) => {
        setProductType(event.target.value);
    };
    const getExpirationPeriod = (event) => {
        setExpirationPeriod(event.target.value);
    };
    const getExpirationCount = (event) => {
        setExpirationCount(event.target.value);
    };

    const getRegularPrice = (event) => {
        setRegularPrice(event.target.value);
    };

    return (
        <>
            <Modal show={modal} onHide={toggle} size={size} centered={true}>
                <Modal.Header className="border-bottom-0" onHide={toggle} closeButton></Modal.Header>
                <Modal.Body style={{ height: '456px', padding: '0px 60px' }}>
                    <h4 className="modal-title mb-3 ">상품 등록</h4>
                    <Alert variant="info" className="mb-3" style={{ color: '#1E5B6D' }}>
                        <span className="fw-bold">패키지 상품 관련 안내</span> - 패키지는 각각의 단품상품 등록 후
                        매출등록에서 금액조정을 해주셔야 해요.
                    </Alert>
                    <div className="container">
                        <Row className="mb-4">
                            <Col className="">
                                <div className="mb-1">
                                    {' '}
                                    <span>상품명</span>
                                    <i className="mdi mdi-help-circle-outline" />
                                </div>

                                <input
                                    onChange={(e) => {
                                        getProductName(e);
                                    }}
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                    }}></input>
                            </Col>
                            <Col className="">
                                <div className="mb-1">
                                    <span>카테고리</span>
                                </div>

                                <select
                                    onChange={(e) => {
                                        getProductType(e);
                                    }}
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                        cursor: 'pointer',
                                    }}>
                                    <option value="batterBox">타석</option>
                                    <option value="lesson">레슨</option>
                                    <option value="locker">락커</option>
                                    <option value="etc">기타</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <div className="mb-1">
                                    {' '}
                                    <span>유효기간</span>
                                </div>
                                <select
                                    onChange={(e) => {
                                        getExpirationPeriod(e);
                                    }}
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                        cursor: 'pointer',
                                    }}>
                                    <option>1개월</option>
                                    <option>2개월</option>
                                    <option>3개월</option>
                                    <option>4개월</option>
                                    <option>5개월</option>
                                    <option>6개월</option>
                                    <option>7개월</option>
                                    <option>8개월</option>
                                    <option>9개월</option>
                                    <option>10개월</option>
                                    <option>11개월</option>
                                    <option>12개월</option>
                                    <option>30일</option>
                                    <option>60일</option>
                                    <option>90일</option>
                                    <option>120일</option>
                                    <option>150일</option>
                                    <option>180일</option>
                                    <option>1일</option>
                                    <option>7일</option>
                                    <option>14일</option>
                                    <option>15일</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="mb-1">
                                    {' '}
                                    <span>유효횟수</span>
                                </div>
                                <input
                                    onChange={(e) => {
                                        getExpirationCount(e);
                                    }}
                                    type="number"
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                    }}></input>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col style={{ position: 'relative' }}>
                                <div className="mb-1">
                                    {' '}
                                    <span>상품 가격</span>
                                </div>
                                <input
                                    className="w-100 p-1"
                                    onChange={(e) => {
                                        getRegularPrice(e);
                                    }}
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                    }}></input>
                                <span style={{ position: 'absolute', right: '20px', bottom: '10px' }}>원</span>
                            </Col>
                            <Col>
                                <div className="mb-1">
                                    <span>판매등록</span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button
                                        onClick={() => {
                                            setActivation(true);
                                        }}
                                        style={{
                                            width: '150px',
                                            height: '40px',
                                            border: `1px solid ${activation ? '#727CF5' : '#DEE2E6'}`,
                                            color: activation ? '#727CF5' : '#DEE2E6',

                                            borderRadius: ' 2px',
                                            backgroundColor: '#FFFFFF',
                                        }}>
                                        판매등록
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActivation(false);
                                        }}
                                        style={{
                                            width: '150px',
                                            height: '40px',
                                            border: `1px solid ${!activation ? '#727CF5' : '#DEE2E6'}`,
                                            color: !activation ? '#727CF5' : '#DEE2E6',
                                            borderRadius: ' 2px',
                                            backgroundColor: '#FFFFFF',
                                        }}>
                                        보류하기
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0">
                    <Button onClick={productRegistration} variant="primary">
                        {isRegistering ? (
                            <Spinner
                                className="me-1"
                                size="sm"
                                color="white"
                                style={{ width: '15px', height: '15px' }}
                            />
                        ) : (
                            '등록'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductRegistrationModal;
