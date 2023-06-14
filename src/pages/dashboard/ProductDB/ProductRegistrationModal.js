// @flow
import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// components
import PageTitle from '../../../components/PageTitle';

// images
import logodark from '../../../assets/images/logo-dark.png';

const ProductRegistrationModal = ({ modal, setModal }) => {
    // const [modal, setModal] = useState(false);
    const [size, setSize] = useState('lg');
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    /**
     * Opens large modal
     */
    const openModalWithSize = (size) => {
        setSize(size);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    /**
     * Opens modal with custom class
     */
    const openModalWithClass = (className) => {
        setClassName(className);
        setSize(null);
        setScroll(null);
        toggle();
    };

    /**
     * Opens large modal
     */
    const openModalWithScroll = () => {
        setScroll(true);
        setSize(null);
        setClassName(null);
        toggle();
    };

    return (
        <>
            <Modal
                show={modal}
                onHide={toggle}
                dialogClassName={className}
                size={size}
                scrollable={scroll}
                centered={true}>
                <Modal.Header className="border-bottom-0" onHide={toggle} closeButton></Modal.Header>
                <Modal.Body style={{ height: '456px' }}>
                    <h5 className="modal-title">상품 등록</h5>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0">
                    <Button variant="primary">등록</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductRegistrationModal;
