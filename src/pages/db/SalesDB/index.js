import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';

import DefaultPagination from '../../../components/DefaultPagination.js';

import SalesTable from './SalesTable.js';

import SalesRegistrationModal from './SalesRegistrationModal.js';
import PaymentDeleteModal from './PaymentDeleteModal.js';
import PaymentRefundModal from './PaymentRefundModal.js';

import { collection, query, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

import { useSelector } from 'react-redux';

import { firestoreDB } from '../../../firebase/firebase.js';

const SalesDB = () => {
    const [salesData, setSalesData] = useState([]);
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [paymentData, setPaymentData] = useState(false);
    const [refundModal, setRefundModal] = useState(false);

    // 페이지네이션
    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

    // 수정하기
    const [editMode, setEditMode] = useState(false);

    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });

    const getFirestoreSalesData = async () => {
        const firestoreSalesCollectionRef = query(collection(firestoreDB, 'Users', email, 'Sales'));

        onSnapshot(firestoreSalesCollectionRef, (querySnapshot) => {
            const salesArray = [];
            querySnapshot.forEach((sale) => {
                salesArray.push({ ...sale.data(), uid: sale.id });
            });

            setSalesData(salesArray);
        });
    };

    useEffect(() => {
        getFirestoreSalesData();

        return () => {
            getFirestoreSalesData();
        };
    }, []);

    const toggle = () => {
        setModal(!modal);
    };
    const tableColumns = [
        {
            id: '1', // 열 ID
            accessor: 'paymentDate', // 해당 열에 표시할 데이터 필드
            Header: '결제일', // 열 헤더 텍스트
            sort: true,
            // ... 추가적인 열 설정
        },
        {
            id: '2', // 열 ID
            accessor: 'paymentTime', // 해당 열에 표시할 데이터 필드
            Header: '결제시간', // 열 헤더 텍스트
            sort: true,
        },
        {
            id: '3', // 열 ID
            accessor: 'name', // 해당 열에 표시할 데이터 필드
            Header: '회원명', // 열 헤더 텍스트
            sort: true,
        },
        {
            id: '4',
            accessor: 'phone',
            Header: '전화번호',
            sort: true,
        },
        {
            id: '5',
            accessor: 'totalPaymentPrice',
            Header: '결제총액',
            sort: true,
            Cell: ({ value, raw }) => {
                return (
                    <div style={{ width: '100%', textAlign: 'right' }} onClick={() => {}}>
                        {value.toLocaleString() + '원'}
                    </div>
                );
            },
        },
        {
            id: '6',
            accessor: 'remainingPaymentPrice',
            Header: '미결제금액',
            sort: true,
            Cell: ({ value, raw }) => {
                return value === 0 ? (
                    <div style={{ width: '100%', textAlign: 'right' }}>{'-'}</div>
                ) : (
                    <div style={{ width: '100%', textAlign: 'right' }}>{value.toLocaleString() + '원'}</div>
                );
            },
        },

        {
            id: '7',
            accessor: 'paymentInfo[0].paymentMethod',
            Header: '결제수단1',
            sort: true,
            Cell: ({ value, raw }) => {
                switch (value) {
                    case 'creditCard':
                        return '카드';
                    case 'cash':
                        return '현금';

                    default:
                        return '-';
                }
            },
        },
        {
            id: '8',
            accessor: 'paymentInfo[0].paymentReceiptNumber',
            Header: '영수증번호1',
            sort: true,
            Cell: ({ value, raw }) => {
                return value ? value : '-';
            },
        },
        {
            id: '9',
            accessor: 'paymentInfo[1].paymentMethod',
            Header: '결제수단2',
            sort: true,
            Cell: ({ value, raw }) => {
                switch (value) {
                    case 'creditCard':
                        return '카드';
                    case 'cash':
                        return '현금';

                    default:
                        return '-';
                }
            },
        },
        {
            id: '10',
            accessor: 'paymentInfo[1].paymentReceiptNumber',
            Header: '영수증번호2',
            sort: true,
            Cell: ({ value, raw }) => {
                return value ? value : '-';
            },
        },
        {
            id: '11',
            accessor: 'uid',
            Header: '환불',
            sort: true,
            Cell: ({ value, raw }) => {
                const refund = salesData.filter((payment) => payment.uid === value)[0]?.refund;
                return (
                    <div
                        onClick={() => {
                            const data = salesData.filter((payment) => payment.uid === value);
                            setPaymentData(data[0]);
                            setRefundModal(!refundModal);
                        }}
                        onMouseEnter={(event) => {
                            if (!refund) {
                                event.target.style.cursor = 'pointer';
                                event.target.style.color = '#03C780';
                            } else {
                                event.target.style.cursor = 'pointer';
                                event.target.style.color = '#03C780';
                            }
                        }}
                        onMouseLeave={(event) => {
                            if (!refund) {
                                event.target.style.color = '#FFBC00';
                            } else {
                                event.target.style.color = '#FA5C7C';
                            }
                        }}
                        style={{
                            color: refund ? '#FA5C7C' : '#FFBC00',
                            textDecoration: 'underline',
                        }}>
                        {refund ? '환불완료' : '환불등록'}
                    </div>
                );
            },
        },
        {
            id: '12',
            accessor: 'uid',
            Header: '삭제',
            sort: true,
            Cell: ({ value, raw }) => {
                return (
                    <div
                        onClick={() => {
                            const data = salesData.filter((payment) => payment.uid === value);
                            setPaymentData(data[0]);
                            setDeleteModal(!deleteModal);
                        }}>
                        <i
                            onMouseEnter={(event) => {
                                event.target.style.cursor = 'pointer';
                                event.target.style.color = '#FA5C7C';
                            }}
                            onMouseLeave={(event) => {
                                event.target.style.color = '#6c757d';
                            }}
                            className="mdi mdi-delete-outline"
                            style={{ fontSize: '20px' }}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <>
            {modal && <SalesRegistrationModal modal={modal} setModal={setModal} />}
            {deleteModal && paymentData ? (
                <PaymentDeleteModal paymentData={paymentData} modal={deleteModal} setModal={setDeleteModal} />
            ) : null}
            {refundModal && paymentData ? (
                <PaymentRefundModal paymentData={paymentData} modal={refundModal} setModal={setRefundModal} />
            ) : null}

            <SalesTable data={salesData} columns={tableColumns} />

            <div className="circle-btn edit-btn-area avatar-md" onClick={toggle}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
        </>
    );
};

export default SalesDB;
