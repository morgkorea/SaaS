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
                <Modal.Body style={{ display: 'grid', placeItems: 'center', height: '300px' }}>
                    <div>
                        <div>
                            <div>type</div>{' '}
                            <div>
                                <input type="radio" name="smsType" value="sms" /> <span>sms</span>
                                <input type="radio" name="smsType" value="lms" />
                                <span>lms</span>
                                <input type="radio" name="smsType" value="mms" /> <span>mms</span>
                            </div>
                        </div>
                        <div>
                            <div>수신번호</div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            <div>내용</div>
                            <div>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SmsTestModal;
