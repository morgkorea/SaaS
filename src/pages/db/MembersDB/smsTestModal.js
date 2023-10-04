import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const SmsTestModal = ({ modal, setModal }) => {
    return (
        <>
            <Modal
                show={modal}
                onHide={() => {
                    setModal(!modal);
                }}
                size={'lg'}
                centered={true}>
                <Modal.Header
                    className="border-bottom-0"
                    onHide={() => {
                        setModal(!modal);
                    }}
                    style={{ margin: '12px 0px' }}
                    closeButton>
                    {' '}
                    <h3 className="modal-title">SMS</h3>
                </Modal.Header>
                <Modal.Body style={{ display: 'grid', placeItems: 'center', height: '300px' }}>modal body</Modal.Body>
            </Modal>
        </>
    );
};

export default SmsTestModal;
