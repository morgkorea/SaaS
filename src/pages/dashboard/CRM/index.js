import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { records } from './data.js';
import FormInput from '../../../components/FormInput.js';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import profileImage from '../../../assets/images/profileImage.png';
import DefaultPagination from './DefaultPagination.js';
import StripedRowsTable from './Table.js';
import Checkbox from './Checkbox.js';

const RoundedCircle = ({ size }) => {
    return (
        <>
            <img src={profileImage} alt="" className={classNames('img-fluid', 'rounded-circle', 'avatar-' + size)} />
        </>
    );
};

const Crm = () => {
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

    // form
    const methods = useForm({
        defaultValues: {
            statictext: 'email@example.com',
            color: '#727cf5',
        },
    });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

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
                    <StripedRowsTable limit={limit} offset={offset} />
                </Col>
            </Row>
            <Row>
                <Col>
                    {records?.length > limit && (
                        <DefaultPagination total={records.length} limit={limit} page={page} setPage={setPage} />
                    )}
                </Col>
            </Row>

            <div className="edit-btn-area avatar-md" onClick={() => openModalWithClass('modal-dialog-centered')}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-account-edit" />
                </span>
            </div>

            {/* <div className="app-search mt-3">
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
            </div> */}

            <div className="modal-content">
                <p className="text-muted">회원 검색이 되지 않는 경우, 직접 입력하여 회원 등록이 가능합니다.</p>
                <div className="text-center my-5">
                    <p className="text-muted">검색결과가 없습니다.</p>
                    <Button>회원 정보 입력</Button>
                </div>
            </div>

            <Modal show={modal} onHide={toggle} dialogClassName={className} size="lg" scrollable={scroll}>
                <Modal.Header className="border-bottom-0 p-4 pb-2" closeButton />
                <Modal.Body className="px-5 pb-5 pt-0">
                    <h2 className="modal-title">회원등록</h2>

                    <div className="col-md-2 mx-auto text-center">
                        <RoundedCircle size="lg" />
                        <p className="pt-2">기본 프로필 이미지</p>
                    </div>

                    <form onSubmit={handleSubmit()}>
                        <FormInput
                            label="이름"
                            type="text"
                            name="text"
                            containerClass={'mb-2'}
                            register={register}
                            key="text"
                            errors={errors}
                            control={control}
                        />

                        <FormInput
                            name="select"
                            label="성별"
                            type="select"
                            containerClass={'mb-2'}
                            className="form-select"
                            register={register}
                            key="select"
                            errors={errors}
                            control={control}>
                            <option>성별 선택</option>
                            <option>남성</option>
                            <option>여성</option>
                        </FormInput>
                        <FormInput
                            label="생년월일"
                            type="date"
                            name="date"
                            containerClass={'mb-2'}
                            register={register}
                            key="date"
                            errors={errors}
                            control={control}
                        />
                        <FormInput
                            label="이메일"
                            type="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            containerClass={'mb-2'}
                            register={register}
                            key="email"
                            errors={errors}
                            control={control}
                        />

                        <FormInput
                            label="비밀번호 설정"
                            type="password"
                            name="password"
                            placeholder="회원 비밀번호는 필요없지않나?"
                            // placeholder="최소 8자리 이상 영문, 숫자, 특수문자 3가지 이상으로 조합해주세요."
                            containerClass={'mb-2'}
                            register={register}
                            key="password"
                            errors={errors}
                            control={control}
                        />
                        {/* <span>최초 앱 로그인을 위해 필요한 임시 비밀번호 입니다.</span> */}

                        <Checkbox />
                    </form>

                    <Button variant="primary" type="submit"
                        className="col-md-3 mt-4 mx-auto d-flex justify-content-center">
                        등록
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Crm;
