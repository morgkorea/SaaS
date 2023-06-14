// @flow
import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// components
import PageTitle from '../../../components/PageTitle';

// images
import logodark from '../../../assets/images/logo-dark.png';

const ProductRegistrationModal = ({ modal, setModal }) => {
    // const [modal, setModal] = useState(false);
    const [size, setSize] = useState('lg');

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    return (
        <>
            <Modal show={modal} onHide={toggle} size={size} centered={true}>
                <Modal.Header className="border-bottom-0" onHide={toggle} closeButton></Modal.Header>
                <Modal.Body style={{ height: '456px', padding: '0px 60px' }}>
                    <h5 className="modal-title mb-3">상품 등록</h5>
                    <Alert variant="info" dismissible className="mb-3">
                        <span className="fw-bold">패키지 상품 관련 안내</span> - 패키지는 각가의 단품상품 등록 후
                        매출등록에서 금액조정을 해주셔야 해요.
                    </Alert>
                    <div className="container text-center">
                        <Row>
                            <Col>
                                <input className="w-100"></input>
                            </Col>
                            <Col>
                                <input className="w-100"></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className="w-100"></input>
                            </Col>
                            <Col>
                                <input className="w-100"></input>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className="w-100"></input>
                            </Col>
                            <Col>
                                <input className="w-100"></input>
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
