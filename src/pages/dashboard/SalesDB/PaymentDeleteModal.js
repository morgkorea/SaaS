import react, { useState } from 'react';

import { Row, Col, Button, Modal, Alert, Card, Form } from 'react-bootstrap';

const PaymentDeleteModal = ({ modal, setModal, deletePaymentData }) => {
    const [size, setSize] = useState('lg');

    console.log(deletePaymentData);

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <Modal show={modal} onHide={toggle} size={size} centered={true}>
            <Modal.Header
                className="border-bottom-0"
                onHide={toggle}
                style={{ margin: '12px 0px' }}
                closeButton></Modal.Header>
            <Modal.Body style={{ width: '100%', height: '570px', padding: '0px 60px' }}></Modal.Body>
            <Modal.Footer
                className="d-flex justify-content-center border-top-0"
                style={{ paddingBottom: '48px' }}></Modal.Footer>
        </Modal>
    );
};

export default PaymentDeleteModal;
