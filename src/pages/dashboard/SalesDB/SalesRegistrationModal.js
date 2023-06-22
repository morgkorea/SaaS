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

    useEffect(() => {}, [modal]);

    return (
        <>
            <Modal show={modal} onHide={toggle} size={size} centered={true}>
                <Modal.Header
                    className="border-bottom-0"
                    onHide={toggle}
                    style={{ margin: '12px 0px' }}
                    closeButton></Modal.Header>
                <Modal.Body style={{ width: '100%', height: '615px', padding: '0px 60px' }}>
                    <div style={{ width: '100%', paddingBottom: '32px' }}>
                        <img src={salesRegistrationStep1} style={{ width: '100%' }} />
                    </div>
                    <h4 className="modal-title mb-3 ">회원 검색</h4>

                    <div>
                        <div className="mb-4">
                            <div style={{ marginBottom: '8px' }}>회원성함</div>
                            <div style={{ display: 'flex', border: '1px solid #DEE2E6' }}>
                                <div className="font-24" style={{ marginLeft: '3px' }}>
                                    <i className="mdi mdi-magnify" />
                                </div>
                                <input type="text" className="form-control" style={{ border: 'none', padding: 0 }} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div style={{ marginBottom: '8px' }}>전화번호</div>
                            <div style={{ display: 'flex', border: '1px solid #DEE2E6' }}>
                                <div className="font-24" style={{ marginLeft: '3px' }}>
                                    <i className="mdi mdi-magnify" />
                                </div>
                                <input type="text" className="form-control" style={{ border: 'none', padding: 0 }} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div style={{ marginBottom: '8px' }}>오디언스</div>
                            <div style={{ display: 'flex', border: '1px solid #DEE2E6' }}>
                                <div className="font-24" style={{ marginLeft: '3px' }}>
                                    <i className="mdi mdi-magnify" />
                                </div>
                                <select type="text" className="form-control" style={{ border: 'none', padding: 0 }}>
                                    <option value={true}>활성</option>
                                    <option value={false}>비활성</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <Row className="mb-4">
                            <Col></Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0 ">
                    <Button variant="primary">다음</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SalesRegistrationModal;
