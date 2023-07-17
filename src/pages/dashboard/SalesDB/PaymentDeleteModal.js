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
                        className="mb-2"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: '24px',
                            borderBottom: '1px solid #EEF2F7',
                        }}>
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

                    <div className="paymentDelete-receipt-detail mb-3">
                        <h4 className="paymentDelete-receipt-detail modal-title">결제 상세</h4>

                        <div
                            className="paymentDelete-receipt-detail-body p-2"
                            style={{ height: '180px', overflowY: 'scroll' }}>
                            <div className="mb-2">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div>1. 타석권 12개월</div>
                                        <div>옵션 주간권/23.07.06 ~ 24.07.06</div>
                                    </div>

                                    <div>170000원</div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '12px', paddingLeft: '12px' }}>
                                        {' '}
                                        <div style={{ color: '#727CF5' }}>10프로할인</div>
                                        <div style={{ color: '#727CF5' }}>20,000원 조정</div>
                                    </div>

                                    <div style={{ color: '#727CF5' }}>170,000원</div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div>1. 타석권 12개월</div>
                                        <div>옵션 주간권/23.07.06 ~ 24.07.06</div>
                                    </div>

                                    <div>170000원</div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '12px', paddingLeft: '12px' }}>
                                        {' '}
                                        <div style={{ color: '#727CF5' }}>10프로할인</div>
                                        <div style={{ color: '#727CF5' }}>20,000원 조정</div>
                                    </div>

                                    <div style={{ color: '#727CF5' }}>170,000원</div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div>1. 타석권 12개월</div>
                                        <div>옵션 주간권/23.07.06 ~ 24.07.06</div>
                                    </div>

                                    <div>170000원</div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', gap: '12px', paddingLeft: '12px' }}>
                                        {' '}
                                        <div style={{ color: '#727CF5' }}>10프로할인</div>
                                        <div style={{ color: '#727CF5' }}>20,000원 조정</div>
                                    </div>

                                    <div style={{ color: '#727CF5' }}>170,000원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="mb-2"
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #EEF2F7',
                            padding: '0px 4px 4px 4px',
                        }}>
                        <div style={{ fontSize: '16px', fontWeight: '700' }}>최종 결제 금액</div>
                        <span style={{ color: '#727CF5', fontWeight: '700', fontSize: '16px' }}>200000원</span>
                    </div>
                    <div className="mb-2">
                        <h4 className="modal-title mb-2">결제 정보</h4>
                        <div className="mb-1" style={{ padding: '0px 12px 0px 12px' }}>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '4px',
                                }}>
                                <div style={{ display: 'flex', gap: '26px' }}>
                                    <div>카드결제 </div>
                                    <div>0010002</div>
                                </div>

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
