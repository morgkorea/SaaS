// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Alert } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import { doc, getDoc, setDoc, collection } from 'firebase/firestore';

import { firestoreDB } from '../../../firebase/firebase';
import { firestoreProductsFieldSchema } from '../../../firebase/firestoreDbSchema';

import salesRegistrationStep1 from '../../../assets/images/icons/png/salesRegistrationStep1.png';

//loading spinner
import Spinner from '../../../components/Spinner';

const SalesRegistrationModal = ({ modal, setModal }) => {
    const [size, setSize] = useState('lg');

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <>
            <Modal show={modal} onHide={toggle} size={size} centered={true}>
                <Modal.Header className="border-bottom-0" onHide={toggle} closeButton></Modal.Header>
                <Modal.Body style={{ width: '800px', height: '731px', padding: '0px 60px' }}>
                    <h4 className="modal-title mb-3 ">상품 등록</h4>

                    <div className="container">
                        <div>
                            <img src={salesRegistrationStep1} />
                            <div></div>
                        </div>
                        <Row className="mb-4">
                            <Col></Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0">
                    {/* <Button onClick={productRegistration} variant="primary">
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
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SalesRegistrationModal;
