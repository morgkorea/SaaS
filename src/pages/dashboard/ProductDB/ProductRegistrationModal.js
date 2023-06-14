// @flow
import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Alert, ListGroup } from 'react-bootstrap';

// components
import PageTitle from '../../../components/PageTitle';

// images
import logodark from '../../../assets/images/logo-dark.png';

const ProductRegistrationModal = ({ modal, setModal }) => {
    // const [modal, setModal] = useState(false);
    const [size, setSize] = useState('lg');
    const [productType, setProductType] = useState(null);
    const [expirationPeriod, setExpirationPeriod] = useState(0);
    const [regularPrice, setRegularPrice] = useState(0);
    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };
    const getProductType = (event) => {
        setProductType(event.target.value);
        console.log(event.target.value);
    };
    const getExpirationPeriod = (event) => {
        setExpirationPeriod(event.target.value);
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
                                    <option value="lesson">2개월</option>
                                    <option value="locker">3개월</option>
                                    <option value="etc">4개월</option>
                                    <option>5개월</option>
                                    <option>6개월</option>
                                    <option>7개월</option>
                                    <option>8개월</option>
                                    <option>9개월</option>
                                    <option>10개월</option>
                                    <option>11개월</option>
                                    <option>12개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                    <option>11개월</option>
                                </select>
                            </Col>
                            <Col>
                                <div className="mb-1">
                                    {' '}
                                    <span>유효횟수</span>
                                </div>
                                <input
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
                                    value="0"
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
                                    {' '}
                                    <span>판매등록</span>
                                </div>
                                <input
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                    }}></input>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0">
                    <Button variant="primary">등록</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductRegistrationModal;
