import react, { useState } from 'react';

import { Row, Col, Button, Modal, Alert, Card, Form } from 'react-bootstrap';

const PaymentDeleteModal = ({ modal, setModal, deletePaymentData }) => {
    const [size, setSize] = useState('lg');
    const [isHoverdButton, setIsHoveredButton] = useState(false);

    console.log(isHoverdButton);

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <Modal show={modal} onHide={toggle} size={size} centered={true}>
            <Modal.Header
                className="border-bottom-0"
                onHide={toggle}
                style={{ margin: '12px 0px', paddingLeft: '60px' }}
                closeButton>
                {' '}
                <h3 className="modal-title">결제 삭제</h3>
            </Modal.Header>
            <Modal.Body style={{ width: '100%', height: '570px', padding: '0px 60px' }}>
                <div className="container mb-2" style={{ padding: '0' }}>
                    <h4 className="modal-title mb-2">결제 영수증</h4>
                    <div
                        className="mb-4"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: '24px',
                            borderBottom: '1px solid #EEF2F7',
                        }}>
                        {' '}
                        <div style={{ width: '240px', height: '68px', alignItems: 'flex-start' }}>
                            <div className="mb-1">결제일, 결제시간</div>
                            <div style={{ width: '100%', padding: '10px 16px', border: '1px solid #DEE2E6' }}>
                                2023. 05. 04 AM12:12
                            </div>
                        </div>
                        <div style={{ width: '168px', height: '68px', alignItems: 'flex-start' }}>
                            <div className="mb-1">결제현황</div>
                            <div style={{ width: '100%', padding: '10px 16px', border: '1px solid #DEE2E6' }}>
                                결제 완료
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <h4 className="modal-title mb-2">결제 상세</h4>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '60%', marginBottom: '16px' }}>적용상품</div>
                            <div style={{ width: '40%', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ minWidth: '100px', textAlign: 'right' }}>조정금액</div>
                                <div>상품금액</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div>1. 타석권 12개월 옵션 주간권/23.07.06 ~ 24.07.06</div>
                            <div>170000원</div>
                        </div>

                        <div style={{ padding: '4px' }}>10프로할인 20,000원 조정</div>
                    </div>
                    <div
                        className="mb-2"
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #EEF2F7',
                        }}>
                        <div style={{ fontSize: '16px', fontWeight: '700' }}>최종 결제 금액</div>
                        <span style={{ color: '#03C780', fontSzie: '16px', paddingBottom: '24px' }}>200000</span>
                    </div>
                    <div className="mb-3">
                        <h4 className="modal-title mb-2">결제 정보</h4>
                        <div className="mb-2" style={{ display: 'flex' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ minWidth: '100px', textAlign: 'right' }}>카드결제 -- 0010002</div>
                                <div>상품금액</div>
                            </div>
                        </div>
                        <div className=" mb-2" style={{ display: 'flex' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ minWidth: '100px', textAlign: 'right' }}>카드결제 -- 0010002</div>
                                <div>상품금액</div>
                            </div>
                        </div>
                        <div className=" mb-2" style={{ display: 'flex' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ minWidth: '100px', textAlign: 'right' }}>카드결제 -- 0010002</div>
                                <div>상품금액</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center border-top-0" style={{ paddingBottom: '48px' }}>
                <Button
                    onMouseEnter={(event) => {
                        setIsHoveredButton(true);
                    }}
                    onMouseLeave={() => {
                        setIsHoveredButton(false);
                    }}
                    onClick={(event) => {}}
                    style={{
                        width: '200px',
                        border: '1px solid #FA5C7C',
                        color: '#FA5C7C',
                        backgroundColor: !isHoverdButton ? '#FFFFFF' : '#F9D8DE',
                        boxShadow: 'none',
                    }}>
                    결제정보 삭제하기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentDeleteModal;
