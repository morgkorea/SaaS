import { deleteDoc, doc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { firestoreDB } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';
import EditTable from './EditTable';
import Table from './Table';

const MemberInfo = () => {
    const [editMode, setEditMode] = useState(false);

    const location = useLocation();
    const { member } = location.state;
    // console.log('member', member)

    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });

    const id = member.id;

    const deleteUser = async () => {
        const userDoc = doc(firestoreDB, 'Users', email, 'Members', id);
        await deleteDoc(userDoc);
        toggle();
    };

    const childRef = useRef();
    /**
     *  modal
     */
    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState(null);

    const toggle = () => {
        setModal(!modal);
    };

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
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} xxl={12}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div className="payment-info">
                                    <h4 className="me-5">현재 이용 정보</h4>
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
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={12} xl={6} xxl={4}>
                    <Card style={{ height: '700px' }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <h4>기본 정보</h4>
                                <div>
                                    {!editMode ? (
                                        <Button onClick={() => setEditMode((prev) => !prev)}>
                                            <i className="mdi mdi-square-edit-outline"></i>
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => {
                                                childRef.current.modifyMember();
                                            }}>
                                            저장
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => openModalWithClass('modal-dialog-centered')}
                                        className="ms-1">
                                        <i className="mdi mdi-delete"></i>
                                    </Button>
                                    <Modal show={modal} onHide={toggle} dialogClassName={className}>
                                        <Modal.Body>
                                            <h3>Alert</h3>
                                            <p>
                                                {member.name} 님의 회원 정보가 모두 삭제됩니다. 정말 삭제하시겠습니까?
                                            </p>
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
                                </div>
                            </div>
                            {!editMode ? (
                                <Table member={member} />
                            ) : (
                                <EditTable member={member} email={email} id={id} ref={childRef} />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} xl={6} xxl={8}>
                    <Card style={{ height: '700px' }}>
                        <Card.Body className="payment-wrap">
                            <h4 className="mb-4">결제 정보</h4>
                            <div className="payment-list">
                                {payments.map((payment) => {
                                    return (
                                        <div className="payment-card">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex">
                                                    <h4 className='number'>{payment.data1}</h4>
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
        </>
    );
};

export default MemberInfo;
