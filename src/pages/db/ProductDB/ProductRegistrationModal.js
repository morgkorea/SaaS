// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Alert } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

import { firestoreDB } from '../../../firebase/firebase';
import { firestoreProductsFieldSchema } from '../../../firebase/firestoreDbSchema';

import * as yup from 'yup';

//loading spinner
import Spinner from '../../../components/Spinner';

const ProductRegistrationModal = ({ modal, setModal, productsData }) => {
    // const [modal, setModal] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [size, setSize] = useState('lg');

    const [productName, setProductName] = useState('ex)[타석] - 1개월권');
    const [productType, setProductType] = useState('batterBox');
    const [expirationPeriod, setExpirationPeriod] = useState('1개월');
    const [expirationCount, setExpirationCount] = useState(0);
    const [regularPrice, setRegularPrice] = useState(0);
    const [activation, setActivation] = useState(true);
    const [userCode, setUserCode] = useState('');

    const [validationError, setValidationError] = useState(false);

    const schema = yup.object().shape({
        productName: yup.string().min(2, '상품명 2글자 이상 입력해주세요'),
        regularPrice: yup.number().required('상품 가격을 입력해주세요.').positive('상품 가격을 입력해주세요.'),
    });

    /**
     * Show/hide the modal
     */

    // users(collection) => email(doc) => 1.members(collection) 2. fields(data)
    const email = useSelector((state) => {
        return state.Auth?.user?.email;
    });
    const fectchFirestoreUserCode = async (email) => {
        try {
            const userCodesRef = doc(firestoreDB, 'Users', email);
            const userCodeSnapshot = await getDoc(userCodesRef);
            const userCode = userCodeSnapshot.data().userCode;

            setUserCode(userCode);
        } catch (error) {
            console.log(error);
        }
    };

    const generateProductNumber = (productType, expirationPeriod, productsData) => {
        const getProductTypeCode = (productType) => {
            switch (productType) {
                case 'batterBox':
                    return 'ME';
                case 'lesson':
                    return 'LE';
                case 'locker':
                    return 'LO';
                case 'etc':
                    return 'ET';
                default:
                    return '';
            }
        };

        const getExpirtaionPeriod = (expirationPeriod) => {
            let expirationCode = expirationPeriod ? expirationPeriod : '';

            if (expirationCode.includes('개월')) {
                expirationCode = expirationCode.replace(/개월/g, '');
                while (expirationCode.length < 2) {
                    expirationCode = '0' + expirationCode;
                }
                expirationCode = expirationCode + '000';
            } else if (expirationCode.includes('일')) {
                expirationCode = expirationCode.replace(/일/g, '');
                while (expirationCode.length <= 4) {
                    expirationCode = '0' + expirationCode;
                }
            }

            return expirationCode;
        };

        const getProductOrder = (productsData) => {
            let productOrder = productsData ? productsData.length + 1 + '' : '';

            while (productOrder.length < 3) {
                productOrder = '0' + productOrder;
            }

            return productOrder;
        };

        const productCode =
            userCode +
            '_' +
            getProductTypeCode(productType) +
            '_' +
            getExpirtaionPeriod(expirationPeriod) +
            '_' +
            getProductOrder(productsData);

        return productCode;
    };

    const putFirestoreProductRegistration = async () => {
        setIsRegistering(true);

        try {
            await schema.validate(
                {
                    productName,
                    expirationCount,
                    regularPrice,
                },
                { abortEarly: false }
            );
            // 유효성 검사를 통과한 경우 처리할 로직 작성

            const productsCollectionRef = doc(collection(firestoreDB, 'Users', email, 'Products'));
            const productCode = generateProductNumber(productType, expirationPeriod, productsData);

            const productData = {
                ...firestoreProductsFieldSchema,
                productCode: productCode,
                product: productName,
                type: productType,
                expirationPeriod: expirationPeriod,
                expirationCount: expirationCount,
                regularPrice: regularPrice,
                activation: activation,
                createdDate: new Date().toISOString().split('T')[0],
                modifiedDate: new Date().toISOString().split('T')[0],
            };

            await setDoc(productsCollectionRef, productData);
            setModal(!modal);
        } catch (error) {
            // 유효성 검사에 실패한 경우 처리할 로직 작성
            if (error instanceof yup.ValidationError) {
                // 유효성 검사 오류 처리
                const validationErrors = {};
                error.inner.forEach((validationError) => {
                    validationErrors[validationError.path] = validationError.message;
                });

                setValidationError(validationErrors);
            }
        }

        setIsRegistering(false);
    };

    const toggle = () => {
        setModal(!modal);
    };
    const getProductName = (event) => {
        let name = event.target.value;
        if (name.length > 2) {
            setValidationError({ ...validationError, productName: false });
        }
        setProductName(name);
    };
    const getProductType = (event) => {
        setProductType(event.target.value);
    };
    const getExpirationPeriod = (event) => {
        setExpirationPeriod(event.target.value);
    };
    const getExpirationCount = (event) => {
        let count = event.target.value;
        if (isNaN(Number(count)) || count < 0) {
            count = 0;
        }
        setExpirationCount(Number(count));
    };

    const getRegularPrice = (event) => {
        let price = event.target.value;
        if (isNaN(Number(price)) || price < 0) {
            price = 0;
        }

        if (price > 0) {
            setValidationError({ ...validationError, regularPrice: false });
        }
        setRegularPrice(Number(price));
    };

    useEffect(() => {
        setProductName('');
        setProductType('batterBox');
        setExpirationPeriod('1개월');
        setExpirationCount(0);
        setRegularPrice(0);
        setActivation(true);
    }, [modal]);

    useEffect(() => {
        fectchFirestoreUserCode(email);
    }, []);

    return (
        <>
            <Modal show={modal} onHide={toggle} size={size} centered={true}>
                <Modal.Header className="border-bottom-0" onHide={toggle} closeButton></Modal.Header>
                <Modal.Body style={{ height: '500px', padding: '0px 60px' }}>
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
                                    type="text"
                                    onChange={(e) => {
                                        getProductName(e);
                                    }}
                                    placeholder={'ex) [타석] - 1개월권'}
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: `1px solid ${validationError.productName ? '#fa5c7c' : '#DEE2E6'}`,
                                        borderRadius: '2px',
                                    }}></input>
                                <div style={{ color: '#fa5c7c', fontSize: '12px', marginTop: '2px' }}>
                                    {validationError.productName}
                                </div>
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
                                        cursor: productType === 'etc' ? 'default' : 'pointer',
                                        backgroundColor: productType === 'etc' ? '#FAFAFA' : '',
                                    }}
                                    disabled={productType === 'etc'}>
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
                                    type="text"
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                    }}
                                    value={expirationCount}
                                    disabled={productType === 'locker' || productType === 'etc'}></input>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <div style={{ position: 'relative' }}>
                                    <div className="mb-1">
                                        {' '}
                                        <span>상품 가격</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-100 p-1"
                                        onChange={(e) => {
                                            getRegularPrice(e);
                                        }}
                                        value={regularPrice}
                                        style={{
                                            height: '40px',
                                            border: `1px solid ${validationError.regularPrice ? '#fa5c7c' : '#DEE2E6'}`,
                                            borderRadius: ' 2px',
                                        }}></input>

                                    <span style={{ position: 'absolute', right: '20px', bottom: '10px' }}>원</span>
                                </div>

                                <div style={{ color: '#fa5c7c', fontSize: '12px', marginTop: '2px' }}>
                                    {validationError.regularPrice}
                                </div>
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
                <Modal.Footer className="d-flex justify-content-center border-top-0 ">
                    <Button
                        onClick={putFirestoreProductRegistration}
                        variant="primary"
                        style={{ marginBottom: '36px' }}>
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
