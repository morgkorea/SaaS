import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import FormInput from '../../../components/FormInput.js';
import classNames from 'classnames';
import profileImage from '../../../assets/images/profileImage.png';
import DefaultPagination from './DefaultPagination.js';
import StripedRowsTable from './Table.js';
import Checkbox from './Checkbox.js';

import { firestoreDB } from '../../../firebase/firebase';
import { doc, setDoc, collection, where, getDocs, query, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const RoundedCircle = ({ size }) => {
    return (
        <>
            <img src={profileImage} alt="" className={classNames('img-fluid', 'rounded-circle', 'avatar-' + size)} />
        </>
    );
};

const Crm = () => {
    const [currentMembers, setCurrentMembers] = useState([]);

    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });
    const memberRef = collection(firestoreDB, 'Users', email, 'Members');

    const getMembers = async () => {
        const data = await getDocs(memberRef);

        setCurrentMembers(
            data.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        );
    };

    useEffect(() => {
        getMembers();
    }, []);

    const updateFirestoreAddMember = async () => {
        const washingtonRef = doc(firestoreDB, 'Users', email);
        const newMember = {
            typeFormToken: 'testtest',
            memberNumber: 'testest', //회원번호
            createdDate: 'test', //date 생성날짜 2023-04-23
            createdTime: 'testtest', //time 생성시간 04:10:42
            name: 'test', //이름
            phone: 'test', //전화번호
            sex: 'test', //성별
            birthDate: 'test', //date 생일
            ageGroup: 'test', //연령대
            location: 'test', //위치
            golfPeriod: 'test', //골프경력
            golfPurpose: 'test', //골프목적
            hoursUse: 'test', //이용시간
            injuriedPart: 'test', //부상부위
            marketingRecieveAllow: false, //마케팅수신동의
            privateInfoAllow: false, //개인정보수집동의
            amountPayments: 'test', //누적결제수
            lifetimeValue: 'test', //LTV - 누적결제금액
            amountPaymentAverage: 'test', //평균결제금액
            audience: 'test', //오디언스
            activation: false, //활성여부 false || true

            //이용가능상품
            availableProducts: [
                {
                    activateProduct: '레슨', //활성상품
                    startDate: '2023-05-24', //시작일
                    endDate: '2023-05-30', //종료일
                    dDays: '6', //남은일수 endDate - startDate
                },
                {
                    activateProduct: '락커', //활성상품
                    startDate: '2023-02-19', //시작일
                    endDate: '2023-07-19', //종료일
                    dDays: '120', //남은일수
                },
            ],

            //이용불가상품
            unavailableProducts: [
                {
                    inactiveProduct: '락커', //종료상품
                    startDate: '2023-02-19', //시작일
                    endDate: '2023-02-19', //종료일
                    dDays: 0, //남은일수
                    refund: false,
                },
            ],
        };

        if (currentMembers.length) {
            try {
                await updateDoc(washingtonRef, {
                    members: [...currentMembers, newMember],
                });
            } catch (error) {
                console.log(error);
            }
        }
        // Set the "capital" field of the city 'DC'
    };

    const updateAddMembers = () => {
        updateFirestoreAddMember();
    };

    const modifyingFirestoreMember = async () => {
        const washingtonRef = doc(firestoreDB, 'Users', email);
        if (currentMembers.length) {
            const modifyingMembers = [...currentMembers].map((member, idx) => {
                if (idx === 0) {
                    const memberData = { ...member, name: '심수정' };
                    return memberData;
                } else {
                    return member;
                }
            });

            try {
                await updateDoc(washingtonRef, {
                    members: [...modifyingMembers],
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const modifyMember = () => {
        modifyingFirestoreMember();
    };

    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    const toggle = () => {
        setModal(!modal);
    };

    const openModalWithClass = (className) => {
        setClassName(className);
        setSize(null);
        setScroll(null);
        toggle();
    };

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">
                            회원관리 <span className="text-primary">총 999명</span>
                        </h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={updateAddMembers}>Update Member</button>
                    <button onClick={modifyMember}>Modifying Member</button>
                    <StripedRowsTable limit={limit} offset={offset} currentMembers={currentMembers} />
                </Col>
            </Row>
            <Row>
                <Col>
                    {currentMembers?.length > limit && (
                        <DefaultPagination total={currentMembers.length} limit={limit} page={page} setPage={setPage} />
                    )}
                </Col>
            </Row>
            <div className="circle-btn avatar-md" onClick={() => openModalWithClass('modal-dialog-centered')}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-account-edit" />
                </span>
            </div>

            <Modal show={modal} onHide={toggle} dialogClassName={className} size="lg" scrollable={scroll}>
                <Modal.Header className="border-bottom-0 p-4 pb-2" closeButton />
                <Modal.Body className="px-5 pb-5 pt-0">
                    <h2 className="modal-title">회원등록</h2>
                    <div className="col-md-2 mx-auto text-center">
                        <RoundedCircle size="lg" />
                        <p className="pt-2">기본 프로필 이미지</p>
                    </div>
                    <form>
                        <FormInput label="이름" type="text" name="text" containerClass={'mb-2'} key="text" />
                        <FormInput
                            name="select"
                            label="성별"
                            type="select"
                            containerClass={'mb-2'}
                            className="form-select"
                            key="select">
                            <option>남성</option>
                            <option>여성</option>
                        </FormInput>
                        <FormInput label="생년월일" type="date" name="date" containerClass={'mb-2'} key="date" />
                        <FormInput
                            label="이메일"
                            type="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            containerClass={'mb-2'}
                            key="email"
                            // onChange={handleInput}
                        />
                        <FormInput
                            label="휴대전화 번호"
                            type="number"
                            name="phone"
                            placeholder="010-0000-0000"
                            containerClass={'mb-2'}
                            key="phone"
                        />
                        <Checkbox />
                        <Button
                            variant="primary"
                            type="submit"
                            className="col-md-3 mt-4 mx-auto d-flex justify-content-center">
                            등록
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            <div className="app-search mt-3">
                <Form.Group>
                    <InputGroup className="mb-2">
                        <Form.Control
                            placeholder="이름 또는 번호('-') 제외 검색"
                            aria-label="이름 또는 번호('-') 제외 검색"
                            aria-describedby="basic-addon2"
                            className="input-lg"
                        />
                        <span className="mdi mdi-magnify search-icon"></span>
                        <Button variant="primary" id="button-addon2">
                            검색
                        </Button>
                    </InputGroup>
                </Form.Group>
            </div>
            <div className="modal-content">
                <p className="text-muted">회원 검색이 되지 않는 경우, 직접 입력하여 회원 등록이 가능합니다.</p>
                <div className="text-center my-5">
                    <p className="text-muted">검색결과가 없습니다.</p>
                    <Button>회원 정보 입력</Button>
                </div>
            </div>
        </>
    );
};

export default Crm;
