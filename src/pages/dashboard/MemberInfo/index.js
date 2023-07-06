import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import EditTable from './EditTable';
import Table from './Table';
import Memo from './Memo';

const MemberInfo = () => {
    const [editMode, setEditMode] = useState(false);

    const location = useLocation();
    const { member } = location.state;

    const email = useSelector((state) => state.Auth?.user.email);

    const id = member.id;

    const childRef = useRef();

    const deleteUser = async () => {
        const userDoc = doc(firestoreDB, 'Users', email, 'Members', id);
        await deleteDoc(userDoc);

        toggle();
        notify();

        setTimeout(() => {
            window.location.replace('/dashboard/members-db'); // 주소 변경 시 수정하기
        }, 1500);
    };

    const notify = () => toast('삭제되었습니다.');

    const toggle = () => {
        setModal(!modal);
    };

    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState(null);

    const openModalWithClass = (className) => {
        setClassName(className);
        toggle();
    };

    const payments = [
        {
            data1: '1회차',
            data2: '락커 결제',
            data3: '6개월권',
            data4: '10% 할인',
            data5: '2022.07.12 ~ 2023.01.08',
            data6: 3451,
        },
        {
            data1: '2회차',
            data2: '회원권 결제',
            data3: '3개월권',
            data4: '20% 할인',
            data5: '2022.07.12 ~ 2023.01.08',
            data6: 59301,
        },
        {
            data1: '3회차',
            data2: '회원권 결제',
            data3: '1개월권',
            data4: '30% 할인',
            data5: '2022.07.12 ~ 2023.01.08',
            data6: 300000,
        },
        {
            data1: '4회차',
            data2: '회원권 결제',
            data3: '6개월권',
            data4: '10% 할인',
            data5: '2022.07.12 ~ 2023.01.08',
            data6: 400000,
        },
        {
            data1: '5회차',
            data2: '회원권 결제',
            data3: '6개월권',
            data4: '10% 할인',
            data5: '2022.07.12 ~ 2023.01.08',
            data6: 500000,
        },
        {
            data1: '6회차',
            data2: '회원권 결제',
            data3: '6개월권',
            data4: '10% 할인',
            data5: '2022.07.12 ~ 2023.01.08',
            data6: 600000,
        },
        {
            data1: '7회차',
            data2: '회원권 결제',
            data3: '6개월권',
            data4: '10% 할인',
            data5: '2022.07.12 ~ 2023.01.08',
            data6: 202222110,
        },
    ];

    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col xs={12} xl={6} xxl={4}>
                    <Card style={{ height: '850px' }}>
                        <Card.Body className='position-relative'>
                            <div className="d-flex justify-content-between">
                                <h4>
                                    <span className="me-2">ℹ️</span>기본 정보
                                </h4>
                            </div>
                            {!editMode ? (
                                <Table member={member} />
                            ) : (
                                <EditTable member={member} email={email} id={id} ref={childRef} />
                            )}
                            <div className='box-wrap d-flex justify-content-center'>
                                {!editMode ? (
                                    <Button className="px-5" onClick={() => setEditMode((prev) => !prev)}>
                                        수정하기
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => openModalWithClass('modal-dialog-centered')}
                                            className="me-1 px-4"
                                            variant="outline-danger">
                                            삭제하기
                                        </Button>
                                        <Button
                                            className="px-5"
                                            onClick={() => {
                                                childRef.current.modifyMember();
                                            }}>
                                            저장하기
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} xl={6} xxl={8}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} xxl={12}>
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="payment-info">
                                            <h4 className="me-5">
                                                <span className="me-2">🕦</span>현재 이용 정보
                                            </h4>
                                            <h4 className="me-2">7회차</h4>
                                            <p>회원권 결제</p>
                                            <p>6개월권</p>
                                            <p>10% 할인</p>
                                            <p>2022.07.12 ~ 2023.01.08</p>
                                        </div>
                                        <h4 className="text-primary">{member?.activation} 회원</h4>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card style={{ height: '740px' }}>
                                <Card.Body className="payment-wrap">
                                    <h4 className="mb-4">
                                        <span className="me-2">💰</span>결제 정보
                                    </h4>
                                    <div className="payment-list">
                                        {payments.map((payment) => {
                                            return (
                                                <div className="payment-card">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex">
                                                            <h4 className="number">{payment.data1}</h4>
                                                            <div className="payment-info">
                                                                <p>{payment.data2}</p>
                                                                <p>{payment.data3}</p>
                                                                <p>{payment.data4}</p>
                                                                <p>{payment.data5}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4>{payment.data6.toLocaleString()} 원</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="position-absolute bottom-0 end-0 p-4">
                                        <div className="payment-amount">
                                            <p>평균 200,000 원</p>
                                            <p className="text-primary">
                                                총 <span className="h2">1,000,000</span> 원
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Memo member={member} email={email} id={id}/>
                </Col>
            </Row>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                closeButton={false}
                theme="light"
                limit={1}
            />

            <Modal show={modal} onHide={toggle} dialogClassName={className}>
                <Modal.Body>
                    <h3>Alert</h3>
                    <p>{member.name} 님의 회원 정보가 모두 삭제됩니다. 정말 삭제하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggle}>
                        취소
                    </Button>
                    <Button variant="info" onClick={deleteUser}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MemberInfo;
