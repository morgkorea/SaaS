import react, { useState } from 'react';

import { Row, Col, Button, Modal, Alert, Card, Form } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import { doc, deleteDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';
import WarningIcon from '../../../assets/images/icons/png/warning-icon.png';

const PaymentDeleteModal = ({ modal, setModal, deletePaymentData }) => {
    const [size, setSize] = useState('lg');
    const [isHoverdButton, setIsHoveredButton] = useState(false);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

    const email = useSelector((state) => state.Auth?.user?.email);

    const toggle = () => {
        setModal(!modal);
    };

    const deleteFirestoreSalesData = async () => {
        const currentDocId = deletePaymentData?.uid;
        try {
            const firstoreSalesDocRef = doc(firestoreDB, 'Users', email, 'Sales', currentDocId);
            await deleteDoc(firstoreSalesDocRef);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!deleteConfirmModal ? (
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
                                    <div style={{ width: '100%', padding: '6px 12px', border: '1px solid #DEE2E6' }}>
                                        {deletePaymentData &&
                                            deletePaymentData.paymentDate + ' ' + deletePaymentData.paymentTime}
                                    </div>
                                </div>
                                <div style={{ width: '168px', height: '68px', alignItems: 'flex-start' }}>
                                    <div className="mb-1">결제현황</div>

                                    <div
                                        style={{
                                            width: '100%',
                                            padding: '6px 12px',
                                            border: '1px solid #DEE2E6',
                                            color: `${
                                                deletePaymentData.remainingPaymentPrice === 0 ? '#727CF5' : '#FA5C7C'
                                            }`,
                                        }}>
                                        {deletePaymentData.remainingPaymentPrice === 0
                                            ? '결제 완료'
                                            : '미결제 : ' +
                                              deletePaymentData.remainingPaymentPrice.toLocaleString() +
                                              '원'}
                                    </div>
                                </div>
                            </div>

                            <div className="paymentDelete-receipt-detail mb-3">
                                <h4 className="paymentDelete-receipt-detail modal-title">결제 상세</h4>

                                <div
                                    className="paymentDelete-receipt-detail-body p-2"
                                    style={{ height: '180px', overflowY: 'scroll' }}>
                                    {deletePaymentData.salesProducts?.length &&
                                        deletePaymentData.salesProducts.map((product, idx) => (
                                            <div className="mb-2">
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        marginBottom: '4px',
                                                    }}>
                                                    <div style={{ display: 'flex', gap: '12px' }}>
                                                        <div>{product.product && idx + 1 + '. ' + product.product}</div>
                                                        <div>
                                                            {product.startDate &&
                                                                product.startDate + ' ~ ' + product.endDate}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {product.regularPrice &&
                                                            product.regularPrice.toLocaleString() + '원'}
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', gap: '12px', paddingLeft: '12px' }}>
                                                        {' '}
                                                        <div style={{ color: '#727CF5' }}>
                                                            {product.discountRate > 0 &&
                                                                product.discountRate + '%' + ' 할인 적용'}
                                                        </div>
                                                        <div style={{ color: '#727CF5' }}>
                                                            {product.adjustedPrice !== product.discountPrice &&
                                                                (
                                                                    product.discountPrice - product.adjustedPrice
                                                                ).toLocaleString() + '원 조정'}
                                                        </div>
                                                    </div>

                                                    <div style={{ color: '#727CF5' }}>
                                                        {product.adjustedPrice &&
                                                            product.adjustedPrice.toLocaleString() + '원'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
                                <span style={{ color: '#727CF5', fontWeight: '700', fontSize: '16px' }}>
                                    {deletePaymentData.totalPaymentPrice &&
                                        deletePaymentData.totalPaymentPrice.toLocaleString() + '원'}
                                </span>
                            </div>
                            <div className="mb-2">
                                <h4 className="modal-title mb-2">결제 정보</h4>
                                <div className="mb-1" style={{ padding: '0px 12px 0px 12px' }}>
                                    {deletePaymentData.paymentInfo?.length &&
                                        deletePaymentData.paymentInfo.map((paymentInfo, dix) => (
                                            <div
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '4px',
                                                }}>
                                                <div style={{ display: 'flex', gap: '26px' }}>
                                                    <div>
                                                        {paymentInfo.paymentMethod &&
                                                        paymentInfo.paymentMethod === 'creditCard'
                                                            ? '카드결제'
                                                            : '현금결제'}
                                                    </div>
                                                    <div>
                                                        {paymentInfo.paymentReceiptNumber &&
                                                            paymentInfo.paymentReceiptNumber}
                                                    </div>
                                                </div>

                                                <div>
                                                    {' '}
                                                    {paymentInfo.paymentPrice &&
                                                        paymentInfo.paymentPrice.toLocaleString() + '원'}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer
                        className="d-flex justify-content-center border-top-0"
                        style={{ paddingBottom: '48px' }}>
                        <Button
                            onMouseEnter={(event) => {
                                setIsHoveredButton(true);
                            }}
                            onMouseLeave={() => {
                                setIsHoveredButton(false);
                            }}
                            onClick={(event) => {
                                setDeleteConfirmModal(!deleteConfirmModal);
                            }}
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
            ) : (
                <Modal
                    show={deleteConfirmModal}
                    onHide={() => {
                        setDeleteConfirmModal(!deleteConfirmModal);
                    }}
                    backdrop="static"
                    centered={true}>
                    <Modal.Body style={{ display: 'grid', placeItems: 'center', height: '300px' }}>
                        <div>
                            <div
                                style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    textAlign: 'center',
                                    marginBottom: '21px',
                                }}>
                                해당결제건을 삭제하시겠어요?
                            </div>
                            <div style={{ display: 'grid', placeItems: 'center', marginBottom: '42px' }}>
                                <img src={WarningIcon} />
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Button
                                    onMouseEnter={(event) => {
                                        event.target.style.backgroundColor = '#D3D4D4';
                                    }}
                                    onMouseLeave={(event) => {
                                        event.target.style.backgroundColor = '#FFFFFF';
                                    }}
                                    onClick={(event) => {
                                        setDeleteConfirmModal(!deleteConfirmModal);
                                    }}
                                    style={{
                                        width: '150px',
                                        border: '1px solid #6C757D',
                                        color: '#6C757D',
                                        backgroundColor: '#FFFFFF',
                                        boxShadow: 'none',
                                    }}>
                                    아니오
                                </Button>
                                <Button
                                    onMouseEnter={(event) => {
                                        event.target.style.backgroundColor = '#F9D8DE';
                                    }}
                                    onMouseLeave={(event) => {
                                        event.target.style.backgroundColor = '#FFFFFF';
                                    }}
                                    onClick={() => {
                                        deleteFirestoreSalesData();
                                        setDeleteConfirmModal(!deleteConfirmModal);
                                        toggle();
                                    }}
                                    style={{
                                        width: '150px',
                                        border: '1px solid #FA5C7C',
                                        color: '#FA5C7C',
                                        backgroundColor: '#FFFFFF',
                                        boxShadow: 'none',
                                    }}>
                                    결제정보 삭제하기
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>{' '}
                </Modal>
            )}
        </>
    );
};

export default PaymentDeleteModal;
