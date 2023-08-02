import { useState, useEffect } from 'react';

import { Button, Modal } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';

import { FormInput } from '../../../components/';

import WarningIcon from '../../../assets/images/icons/png/warning-icon.png';

const PaymentRefundModal = ({ modal, setModal, paymentData }) => {
    const [isHoverdButton, setIsHoveredButton] = useState(false);
    const [refundConfirmModal, setRefundConfirmModal] = useState(false);
    const [penaltyPrice, setPenaltyPrice] = useState(0);
    const [refundEachProducts, setRefundEachProducts] = useState([0, 0, 0, 0, 0]);
    const [totalRefundPrice, setTotalRefundPrice] = useState(0);
    const [paymentMemberId, setPaymentMemberId] = useState(false);

    //환불  => 회원 이용가능상품(availableProducts), 불가능상품 (unavailableProducts) 분기
    const updataFirestoreMembersSalesProduct = async () => {
        try {
            if (paymentMemberId) {
                const memberRef = doc(firestoreDB, 'Users', email, 'Members', paymentMemberId);
                const memberDoc = await getDoc(memberRef);

                if (memberDoc.data() && paymentData?.salesProducts) {
                    let isUpdated = false;

                    const memberAvailableProducts = memberDoc.data().availableProducts;
                    const memberUnAvailableProducts = memberDoc.data().unavailableProducts;
                    const paymentSalesProducts = paymentData.salesProducts;

                    if (memberAvailableProducts.length) {
                        for (let idx = 0; idx < memberAvailableProducts.length; idx++) {
                            for (const salesProduct of paymentSalesProducts) {
                                if (
                                    salesProduct.product === memberAvailableProducts[idx].product &&
                                    salesProduct.adjustedPrice === memberAvailableProducts[idx].adjustedPrice &&
                                    salesProduct.startDate === memberAvailableProducts[idx].startDate &&
                                    salesProduct.endDate === memberAvailableProducts[idx].endDate &&
                                    salesProduct.paymentDate === memberAvailableProducts[idx].paymentDate &&
                                    salesProduct.paymentTime === memberAvailableProducts[idx].paymentTime &&
                                    salesProduct.productType === memberAvailableProducts[idx].productType &&
                                    salesProduct.product === memberAvailableProducts[idx].product &&
                                    memberAvailableProducts[idx].deleted_at === false
                                ) {
                                    memberAvailableProducts.splice(idx, 1);
                                    memberUnAvailableProducts.push({
                                        ...salesProduct,
                                        refund: true,
                                        refundDate: new Date().toISOString().split('T')[0],
                                    });
                                    idx = 0;
                                    isUpdated = true;
                                    break;
                                }
                            }
                        }
                    }

                    if (isUpdated) {
                        await updateDoc(memberRef, {
                            availableProducts: memberAvailableProducts,
                            unavailableProducts: memberUnAvailableProducts,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let refundPrices = refundEachProducts.reduce((acc, curr) => acc + curr, 0);
        let totalPayment = paymentData.totalPaymentPrice ? paymentData.totalPaymentPrice : 0;
        let totalRefund = totalPayment - (refundPrices + penaltyPrice);
        let memberId = paymentData?.memberId ? paymentData.memberId : false;
        setTotalRefundPrice(totalRefund);
        setPaymentMemberId(memberId);

        return () => {
            setTotalRefundPrice(0);
        };
    }, [paymentData, refundEachProducts, penaltyPrice]);

    const email = useSelector((state) => state.Auth?.user?.email);

    const toggle = () => {
        setModal(!modal);
    };

    const updateFirestoreSalesData = async () => {
        const currentDocId = paymentData?.uid;
        const salesProducts =
            paymentData?.salesProducts?.map((product, idx) => {
                return {
                    ...product,
                    refund: true,
                    refundDate: new Date().toISOString().split('T')[0],
                    refundAdjustment: refundEachProducts[idx],
                };
            }) || [];
        const refundFields = {
            refund: true,
            refundDate: new Date().toISOString().split('T')[0],
            refundPrice: totalRefundPrice,
            refundPenaltyPrice: penaltyPrice,
            salesProducts: salesProducts,
        };

        try {
            const firstoreSalesDocRef = doc(firestoreDB, 'Users', email, 'Sales', currentDocId);
            await updateDoc(firstoreSalesDocRef, refundFields);
        } catch (error) {
            console.log(error);
        }
    };

    const getPenaltyPrice = (event) => {
        let penalty = Number(event.target.value.replace(/,/g, ''));
        if (penalty < 0 || isNaN(penalty)) {
            penalty = 0;
        }
        setPenaltyPrice(penalty);
    };

    const getRefundEachProducts = (event, index) => {
        let reufndPrice = Number(event.target.value.replace(/,/g, ''));
        let maximumPrice = paymentData.salesProducts[index].adjustedPrice;
        if (reufndPrice > maximumPrice) {
            reufndPrice = maximumPrice;
        }
        if (!reufndPrice < 0 || !isNaN(reufndPrice)) {
            const refundEachProductsArray = [...refundEachProducts];
            refundEachProductsArray[index] = reufndPrice;
            setRefundEachProducts([...refundEachProductsArray]);
        }
    };
    const handleRefundButtonClick = async () => {
        try {
            await updateFirestoreSalesData();
            await updataFirestoreMembersSalesProduct();
            await setRefundConfirmModal(!refundConfirmModal);
            await toggle();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {!refundConfirmModal ? (
                <Modal show={modal} onHide={toggle} size={'lg'} centered={true} fullscreen={'xxl-down'}>
                    <Modal.Header
                        className="border-bottom-0"
                        onHide={toggle}
                        style={{ margin: '12px 0px', paddingLeft: '60px' }}
                        closeButton>
                        {' '}
                        <h3 className="modal-title">환불 요청</h3>
                    </Modal.Header>
                    <Modal.Body style={{ width: '100%', height: '850px', padding: '0px 60px' }}>
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
                                        {paymentData && paymentData.paymentDate + ' ' + paymentData.paymentTime}
                                    </div>
                                </div>
                                <div style={{ width: '168px', height: '68px', alignItems: 'flex-start' }}>
                                    <div className="mb-1">결제현황</div>

                                    <div
                                        style={{
                                            width: '100%',
                                            padding: '6px 12px',
                                            border: '1px solid #DEE2E6',
                                            color: `${!paymentData.refund ? '#727CF5' : '#FA5C7C'}`,
                                        }}>
                                        {!paymentData.refund ? '결제 완료' : '환불 완료'}
                                    </div>
                                </div>
                            </div>

                            <div className="paymentRefund-receipt-detail mb-3">
                                <h4 className="paymentRefund-receipt-detail modal-title">결제 상세</h4>

                                <div
                                    className="paymentRefund-receipt-detail-body p-2"
                                    style={{ height: '180px', overflowY: 'scroll' }}>
                                    {paymentData.salesProducts?.length &&
                                        paymentData.salesProducts.map((product, idx) => (
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
                                                                `${product.discountRate}% 할인적용`}
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
                                    {paymentData.totalPaymentPrice &&
                                        paymentData.totalPaymentPrice.toLocaleString() + '원'}
                                </span>
                            </div>
                            <div className="mb-2">
                                <h4 className="modal-title mb-2">결제 정보</h4>
                                <div
                                    className="mb-1"
                                    style={{ padding: '0px 12px 12px 12px', borderBottom: '1px solid #EEF2F7' }}>
                                    {paymentData.paymentInfo?.length &&
                                        paymentData.paymentInfo.map((paymentInfo, dix) => (
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
                            <div className="paymentRefund-info-detail mb-3">
                                <h4 className="paymentRefund-info-detail modal-title">환불 정보</h4>

                                <div
                                    className="paymentRefund-info-detail-body p-2"
                                    style={{ height: '230px', overflowY: 'scroll' }}>
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '18px',
                                            alignItems: 'center',
                                        }}>
                                        <div>
                                            <div>이용정보</div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '26px', alignItems: 'center' }}>
                                            <div style={{ color: '#FA5C7C' }}>위약금 설정</div>
                                            {paymentData.refund ? (
                                                <div style={{ color: '#FA5C7C' }}>
                                                    {paymentData.refundPenaltyPrice.toLocaleString() + '원'}
                                                </div>
                                            ) : (
                                                <FormInput
                                                    type="text"
                                                    name="penaltyPrice"
                                                    placeholder="-"
                                                    containerClass={''}
                                                    onChange={getPenaltyPrice}
                                                    value={penaltyPrice.toLocaleString()}
                                                    style={{ padding: '2px 8px', textAlign: 'right', color: '#FA5C7C' }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {paymentData.salesProducts?.length &&
                                        paymentData.salesProducts.map((product, idx) => (
                                            <div className="mb-2">
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        marginBottom: '4px',
                                                    }}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            gap: '12px',
                                                            color: paymentData.refund ? '#FA5C7C' : '',
                                                        }}>
                                                        <div>{product.product && idx + 1 + '. ' + product.product}</div>
                                                        <div>
                                                            {product.startDate &&
                                                                product.startDate + ' ~ ' + product.endDate}
                                                        </div>
                                                    </div>
                                                    {paymentData.refund ? (
                                                        <div style={{ color: paymentData.refund ? '#FA5C7C' : '' }}>
                                                            {product.refundAdjustment
                                                                ? product.refundAdjustment.toLocaleString()
                                                                : 0}
                                                            원
                                                        </div>
                                                    ) : (
                                                        <FormInput
                                                            type="text"
                                                            name="penaltyPrice"
                                                            placeholder="-"
                                                            containerClass={''}
                                                            onChange={(event) => {
                                                                getRefundEachProducts(event, idx);
                                                            }}
                                                            value={refundEachProducts[idx].toLocaleString()}
                                                            style={{
                                                                padding: '2px 8px',
                                                                textAlign: 'right',
                                                                color: '#FA5C7C',
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div
                                    className="mt-3"
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'space-between',

                                        padding: '0px 4px 4px 4px',
                                    }}>
                                    <div style={{ fontSize: '16px', fontWeight: '700' }}>환불액</div>
                                    <span style={{ color: '#FA5C7C', fontWeight: '700', fontSize: '16px' }}>
                                        {!paymentData.refund && paymentData.totalPaymentPrice
                                            ? totalRefundPrice.toLocaleString() + '원'
                                            : paymentData.refundPrice.toLocaleString() + '원'}
                                    </span>
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
                            disabled={paymentData.refund}
                            onClick={() => {
                                setRefundConfirmModal(!refundConfirmModal);
                            }}
                            style={{
                                width: '200px',
                                border: `${paymentData.refund ? '1px solid #6C757D' : '1px solid #FA5C7C'}`,
                                color: `${paymentData.refund ? '#6C757D' : '#FA5C7C'}`,
                                backgroundColor: !isHoverdButton ? '#FFFFFF' : '#F9D8DE',
                                boxShadow: 'none',
                            }}>
                            {paymentData.refund ? '환불 완료' : '환불 등록'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (
                <Modal
                    show={refundConfirmModal}
                    onHide={() => {
                        setRefundConfirmModal(!refundConfirmModal);
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
                                해당결제건을 환불하시겠어요?
                            </div>
                            <div style={{ display: 'grid', placeItems: 'center', marginBottom: '42px' }}>
                                <img src={WarningIcon} alt="warning" />
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
                                        setRefundConfirmModal(!refundConfirmModal);
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
                                    onClick={handleRefundButtonClick}
                                    style={{
                                        width: '150px',
                                        border: '1px solid #FA5C7C',
                                        color: '#FA5C7C',
                                        backgroundColor: '#FFFFFF',
                                        boxShadow: 'none',
                                    }}>
                                    환불하기
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>{' '}
                </Modal>
            )}
        </>
    );
};

export default PaymentRefundModal;
