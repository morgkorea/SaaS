import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import EditTable from './EditTable';
import Table from './Table';
import MemberMemo from './MemberMemo';
import PaymentInfo from './PaymentInfo';
import CurrentUsageInfo from './CurrentUsageInfo';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';
import 'react-toastify/dist/ReactToastify.css';

const MemberInfo = () => {
    const [editMode, setEditMode] = useState(false);
    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState(null);
    const [memberData, setMemberData] = useState(null);

    const location = useLocation();
    const childRef = useRef();

    const member = location.state && location.state.member;
    const id = location.state?.member?.id;
    const email = useSelector((state) => state.Auth?.user.email);
    const memberRef = id ? doc(firestoreDB, 'Users', email, 'Members', id) : null;

    useEffect(() => {
        if (memberRef) {
            const unsubscribe = onSnapshot(memberRef, (snapshot) => {
                const data = snapshot.data();
                setMemberData(data || {});
            });

            return () => unsubscribe();
        }
    }, []);

    const deleteUser = async () => {
        await deleteDoc(memberRef);

        toggle();
        notify();

        setTimeout(() => {
            window.location.replace('/database/members-db'); // 하은 - 주소 변경 시 수정하기
        }, 1500);
    };

    const notify = () => toast('삭제되었습니다.');
    const toggle = () => setModal(!modal);

    const openModalWithClass = (className) => {
        setClassName(className);
        toggle();
    };

    if (!member) {
        return (
            <Row className="justify-content-md-center mt-4">
                <Col xs={12} xl={4} xxl={3}>
                    <Card style={{ height: '850px' }}>
                        <Card.Body className="position-relative">
                            <div className="d-flex justify-content-between">
                                <h4>기본 정보</h4>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} xl={8} xxl={9}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} xxl={12}>
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="payment-info">
                                            <h4 className="me-5">현재 이용 정보</h4>
                                        </div>
                                        <h4 className="text-danger">미등록 회원</h4>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card className="centralized-parents" style={{ height: '740px' }}>
                                <div className="centralized">
                                    <h5>회원 정보가 없습니다.</h5>
                                    <div className="mt-3">
                                        <Warning />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    if (!memberData) {
        return (
            <>
                <p>Loading...</p>
            </>
        );
    }

    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col xs={12} xl={4} xxl={3}>
                    <Card style={{ height: '850px' }}>
                        <Card.Body className="position-relative">
                            <div className="d-flex justify-content-between">
                                <h4>기본 정보</h4>
                            </div>
                            {!editMode ? (
                                <Table member={memberData} />
                            ) : (
                                <EditTable member={memberData} email={email} id={id} ref={childRef} />
                            )}
                            <div className="box-wrap d-flex justify-content-center">
                                {!editMode ? (
                                    <Button className="px-5" onClick={() => setEditMode((prev) => !prev)}>
                                        수정하기
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => openModalWithClass('modal-dialog-centered')}
                                            className="me-1 px-3"
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
                <Col xs={12} xl={8} xxl={9}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} xxl={12}>
                            <CurrentUsageInfo member={memberData} />
                        </Col>
                        <Col>
                            <PaymentInfo member={memberData} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <MemberMemo memberData={memberData} memberRef={memberRef} />
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
                    <p>{memberData.name} 님의 회원 정보가 모두 삭제됩니다. 정말 삭제하시겠습니까?</p>
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
