import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { firestoreDB } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';

const MemberInfo = () => {
    const location = useLocation();
    const { member } = location.state;
    const id = member.id;
    
    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });

    // console.log(location);
    console.log('member:', member, 'memberId:', id);

    const editUser = async () => {
        const userDoc = doc(firestoreDB, 'Users', email, 'Members', id);
        console.log('userDoc:', userDoc)
        await updateDoc(userDoc, { name: '메롱' });
    }

    const deleteUser = async () => {
        const userDoc = doc(firestoreDB, 'Users', email, 'Members', id);
        await deleteDoc(userDoc);
    }

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
                            <Row>
                                <Col lg={2}>
                                    <h4>✔️ 현재 이용 정보</h4>
                                </Col>
                                <Col lg={8}>
                                    <p className='align-middle'><span className=''>7회차</span>회원권 결제 / 6개월권 / 10% 할인 / 2022.07.12 ~ 2023.01.08 </p>
                                </Col>
                                <Col lg={2}>
                                    <h4>{member.activation} 회원</h4>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <Card>
                        <Card.Body>
                            <h4>📂 기본 정보</h4>
                                <Button onClick={() => editUser()}>
                                    <i className="mdi mdi-square-edit-outline"></i>
                                </Button>
                                <Button onClick={deleteUser}>
                                    <i className="mdi mdi-delete"></i>
                                </Button>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>성함</th>
                                        <td>{member.name} 회원님</td>
                                    </tr>
                                    <tr>
                                        <th>생년월일</th>
                                        <td>{member.birthDate} 만 25세(수정)</td>
                                    </tr>
                                    <tr>
                                        <th>휴대전화</th>
                                        <td>{member.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>위치</th>
                                        <td>
                                            {member.region} / {member.location}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>회원번호</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>생성일자</th>
                                        <td>{member.createdDate} {member.createdTime}</td>
                                    </tr>
                                    <tr>
                                        <th>골프 경력</th>
                                        <td>{member.golfPeriod}</td>
                                    </tr>
                                    <tr>
                                        <th>상담 유형</th>
                                        <td>{member.audience}</td>
                                    </tr>
                                    <tr>
                                        <th>관심 품목</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>이용시간</th>
                                        <td>{member.hoursUse}</td>
                                    </tr>
                                    <tr>
                                        <th>부상 전적</th>
                                        <td>
                                            {member.injuries}
                                            {member.injuries === '무' ? null : ` / ${member.injuriedPart}`}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>유입 경로</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>개인정보수집동의</th>
                                        <td>{member.privateInfoAllow}</td>
                                    </tr>
                                    <tr>
                                        <th>마케팅수집동의</th>
                                        <td>{member.marketingRecieveAllow}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={8}>
                    <Card>
                        <Card.Body style={{ height: '500px' }}>
                            <h4>💰 결제 정보</h4>
                            <Card>
                                <Row>
                                    <Col>
                                        <h4>1회차</h4>
                                    </Col>
                                    <Col>
                                        <p>회원권 결제 / 회원권 결제 / 6개월권 / 10% 할인 / 2022.07.12 ~ 2023.01.08</p>
                                    </Col>
                                    <Col>
                                        <h4>202,222,110</h4>
                                    </Col>
                                </Row>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default MemberInfo;
