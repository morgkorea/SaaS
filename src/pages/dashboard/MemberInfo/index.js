import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { firestoreDB } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';
import EditTable from './EditTable';

const MemberInfo = () => {
    const [editMode, setEditMode] = useState(false);
    const location = useLocation();
    const { member } = location.state;
    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });
    const id = member.id;

    const deleteUser = async () => {
        const userDoc = doc(firestoreDB, 'Users', email, 'Members', id);
        await deleteDoc(userDoc);
        toggle()
    };

    console.log(member)
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

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">회원DB</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <h4>현재 이용 정보</h4>
                                <div className="payment-info">
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
            <Row>
                <Col xs={12} xl={4}>
                    <Card>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <h4>기본 정보</h4>
                                <div>
                                    {!editMode ? (
                                        <Button onClick={() => setEditMode((prev) => !prev)}>
                                            <i className="mdi mdi-square-edit-outline"></i>
                                        </Button>
                                    ) : (
                                        <Button onClick={() => console.log('저장')}>저장</Button>
                                    )}
                                    <Button  onClick={() => openModalWithClass('modal-dialog-centered')} className="ms-1">
                                        <i className="mdi mdi-delete"></i>
                                    </Button>
                                    <Modal show={modal} onHide={toggle} dialogClassName={className}>
                                        <Modal.Body>
                                            <h4>Alerts</h4>
                                            <p>{member.name} 님의 회원 정보가 모두 삭제됩니다. 정말 삭제하시겠습니까?</p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="light" onClick={toggle}>
                                                취소
                                            </Button>
                                            <Button variant="primary" onClick={deleteUser}>
                                                삭제
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                            {!editMode ? (
                                <table className="basic-table mt-3">
                                    <tbody>
                                        <tr>
                                            <th>성함</th>
                                            <td>
                                                <span className="text-primary fs-4 me-1 fw-600">{member?.name}</span>
                                                회원님
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>생년월일</th>
                                            <td>{member?.birthDate} 만 25세</td>
                                        </tr>
                                        <tr>
                                            <th>휴대전화</th>
                                            <td>{member?.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>위치</th>
                                            <td>
                                                {member?.region} / {member?.location}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>회원번호</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>생성일자</th>
                                            <td>
                                                {member?.createdDate} / {member?.createdTime}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>골프 경력</th>
                                            <td>{member?.golfPeriod}</td>
                                        </tr>
                                        <tr>
                                            <th>상담 유형</th>
                                            <td>{member?.audience}</td>
                                        </tr>
                                        <tr>
                                            <th>관심 품목</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>이용시간</th>
                                            <td>{member?.hoursUse}</td>
                                        </tr>
                                        <tr>
                                            <th>부상 전적</th>
                                            <td>
                                                {member?.injuries}
                                                {member.injuries === '무' ? null : ` / ${member?.injuriedPart}`}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>유입 경로</th>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th>개인정보수집동의</th>
                                            <td>
                                                {member?.privateInfoAllow === true ? (
                                                    <i className="mdi mdi-check widget-icon2" />
                                                ) : (
                                                    <i className="mdi mdi-check" />
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>마케팅수집동의</th>
                                            <td>
                                                {member?.marketingRecieveAllow === true ? (
                                                    <i className="mdi mdi-check widget-icon2" />
                                                ) : (
                                                    <i className="mdi mdi-check" />
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <EditTable member={member} email={email} id={id} />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} xl={8}>
                    <Card>
                        <Card.Body>
                            <h4>결제 정보</h4>
                            <div className="payment-card">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4>1회차</h4>
                                    </div>
                                    <div className="d-flex">
                                        <div className="payment-info">
                                            <p>회원권 결제</p>
                                            <p>6개월권</p>
                                            <p>10% 할인</p>
                                            <p>2022.07.12 ~ 2023.01.08</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4>202,222,110</h4>
                                    </div>
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
