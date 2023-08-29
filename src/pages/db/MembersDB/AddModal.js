import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { firestoreDB } from '../../../firebase/firebase';
import { firestoreMemebersFieldSchema } from '../../../firebase/firestoreDbSchema';
import { addDoc, collection } from 'firebase/firestore';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Modal, Row } from 'react-bootstrap';

const AddModal = forwardRef((props, ref) => {
    const notify = () => toast('저장되었습니다.');
    const email = useSelector((state) => state.Auth?.user.email);
    const [isValid, setIsValid] = useState(true);

    const [nameValue, setNameValue] = useState('');
    const [sexValue, setSexValue] = useState('');
    const [birthDateValue, setBirthDateValue] = useState('1990-01-01');
    const [phoneValue, setPhoneValue] = useState('');
    const [locationValue, setLocationValue] = useState('');
    const [regionValue, setRegionValue] = useState('');
    const [periodValue, setPeriodValue] = useState('');
    const [purposeValue, setPurposeValue] = useState('');
    const [productValue, setProductValue] = useState('');
    const [hoursUseValue, setHoursUseValue] = useState('');
    const [injuriesValue, setInjuriesValue] = useState('');
    const [injuriedPartValue, setInjuriedPartValue] = useState('');
    const [inflowPathValue, setInflowPathValue] = useState('');
    const [marketingChecked, setMarketingChecked] = React.useState(true);
    const [privateInfoChecked, setPrivateInfoChecked] = React.useState(true);

    const handleFocus = (e) => {
        const { value } = e.target;
        
        if (!value) {
            e.target.placeholder = '';
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (!value) {
            if (name === 'name') {
                e.target.placeholder = '성함을 입력해주세요.';
            } else if (name === 'phone') {
                e.target.placeholder = '010-0000-0000';
            } else if (name === 'region') {
                e.target.placeholder = '거주지를 입력해주세요.';
            }
        }
    };

    function marketingChange(event) {
        setMarketingChecked(event.target.checked);
    }

    function privateInfoChange(event) {
        setPrivateInfoChecked(event.target.checked);
    }

    const handlePhoneNumberChange = (event) => {
        const inputPhoneNumber = event.target.value;
        setPhoneValue(inputPhoneNumber);

        const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

        setIsValid(phoneRegex.test(inputPhoneNumber));
    };

    const handleInjurySelectChange = (selectedOption) => {
        setInjuriedPartValue(selectedOption.value);
        setInjuriesValue(selectedOption.value === '없음' ? '무' : '유');
    };

    const updateFirestoreAddMember = async () => {
        if (!nameValue || !isValid) {
            alert(!nameValue ? '성함을 입력해주세요.' : '연락처를 확인해주세요.');
            return;
        }

        const memberRef = collection(firestoreDB, 'Users', email, 'Members');
        const newMemberData = {
            ...firestoreMemebersFieldSchema,
            name: nameValue,
            createdDate: new Date().toISOString().split('T')[0],
            createdTime: new Date().toTimeString().split(' ')[0],
            sex: sexValue,
            birthDate: birthDateValue,
            phone: phoneValue,
            location: locationValue,
            region: regionValue,
            golfPeriod: periodValue,
            golfPurpose: purposeValue,
            product: productValue,
            hoursUse: hoursUseValue,
            injuries: injuriesValue, 
            injuriedPart: injuriedPartValue,
            inflowPath: inflowPathValue,
            marketingRecieveAllow: marketingChecked,
            privateInfoAllow: privateInfoChecked,
        };

        await addDoc(memberRef, newMemberData);

        notify();
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    useImperativeHandle(ref, () => ({
        updateFirestoreAddMember: () => {
            updateFirestoreAddMember();
        },
    }));

    /**
     * modal
     */
    const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);

    const toggle = () => {
        setModal(!modal);
    };

    const openModalWithClass = (className) => {
        setClassName(className);
        setSize(null);
        toggle();
    };

    return (
        <>
             <div className="circle-btn avatar-md" 
                onClick={() => openModalWithClass('modal-dialog-centered')}
            >
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
            
            <Modal show={modal} className="add-modal" size={'lg'} dialogClassName={className} backdrop="static">
                <Modal.Header onHide={toggle} closeButton className="border-0">
                    <h4 className="modal-title">회원정보 등록</h4>
                </Modal.Header>
                <Modal.Body className="add-modal-content">
                    <Row>
                        <Col>
                            <label>성함</label>
                            <input
                                className="add-modal-input"
                                type="text"
                                name="name"
                                placeholder="성함을 입력해주세요."
                                value={nameValue}
                                onChange={(e) => setNameValue(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </Col>
                        <Col>
                            <label>생년월일</label>
                            <input
                                className="add-modal-input"
                                type="date"
                                name="name"
                                placeholder="생년월일"
                                value={birthDateValue}
                                onChange={(e) => setBirthDateValue(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>전화번호</label>
                            {isValid ? (
                                <i className="uil uil-check-circle text-primary ms-1 opacity-0"></i>
                            ) : (
                                <span className="text-danger ms-1">
                                    <small>올바른 형식의 번호를 입력해주세요.</small>
                                </span>
                            )}
                            <input
                                className={`add-modal-input ${!isValid ? 'invalid' : ''}`}
                                type="text"
                                name="phone"
                                placeholder="010-0000-0000"
                                value={phoneValue}
                                onInput={(e) => {
                                    const onlyNumbersAndHyphen = e.target.value.replace(/[^0-9-]/g, '');
                                    setPhoneValue(onlyNumbersAndHyphen);
                                }}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handlePhoneNumberChange}
                            />
                        </Col>
                        <Col>
                            <label>성별</label>
                            <Select
                                classNamePrefix="react-select"
                                onChange={(e) => setSexValue(e.value)}
                                placeholder="선택"
                                options={[
                                    { value: '남성', label: '남성' },
                                    { value: '여성', label: '여성' },
                                ]}></Select>
                        </Col>
                    </Row>     
                    <Row>
                        <Col>
                            <label>위치</label>
                            <Select
                                classNamePrefix="react-select"
                                placeholder="선택"
                                onChange={(e) => setLocationValue(e.value)}
                                options={[
                                    { value: '자택', label: '자택' },
                                    { value: '직장', label: '직장' },
                                    { value: '기타', label: '기타' },
                                ]}></Select>
                        </Col>
                        <Col>
                            <label>지역</label>
                            <input
                                className="add-modal-input"
                                type="text"
                                name="region"
                                placeholder="거주지를 입력해주세요."
                                value={regionValue}
                                onChange={(e) => setRegionValue(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>골프경력</label>
                            <Select
                                classNamePrefix="react-select"
                                placeholder="선택"
                                onChange={(e) => setPeriodValue(e.value)}
                                options={[
                                    { value: '비기너', label: '비기너' },
                                    { value: '1~3년', label: '1~3년' },
                                    { value: '3~5년', label: '3~5년' },
                                    { value: '5년 이상', label: '5년 이상' },
                                ]}></Select>
                        </Col>
                        <Col>
                            <label>골프목적</label>
                            <Select
                                classNamePrefix="react-select"
                                placeholder="선택"
                                onChange={(e) => setPurposeValue(e.value)}
                                options={[
                                    { value: '골프 입문', label: '골프 입문' },
                                    { value: '스윙 교정', label: '스윙 교정' },
                                    { value: '비거리 향상', label: '비거리 향상' },
                                    { value: '스코어', label: '스코어' },
                                    { value: '숏게임', label: '숏게임' },
                                    { value: '퍼팅', label: '퍼팅' },
                                    { value: '필드', label: '필드' },
                                    { value: '백돌이 탈출', label: '백돌이 탈출' },
                                    { value: '기타', label: '기타' },
                                ]}></Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>이용시간대</label>
                            <Select
                                classNamePrefix="react-select"
                                placeholder="선택"
                                onChange={(e) => setHoursUseValue(e.value)}
                                options={[
                                    { value: '오전', label: '오전' },
                                    { value: '낮', label: '낮' },
                                    { value: '저녁', label: '저녁' },
                                    { value: '밤', label: '밤' },
                            ]}></Select>
                        </Col>
                        <Col>
                            <label>관심상품</label>
                            <Select
                                classNamePrefix="react-select"
                                placeholder="선택"
                                onChange={(e) => setProductValue(e.value)}
                                options={[
                                    { value: '타석', label: '타석' },
                                    { value: '레슨', label: '레슨' },
                                    { value: '기타', label: '기타' },
                            ]}></Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>유입경로</label>
                            <Select
                                classNamePrefix="react-select"
                                placeholder="선택"
                                onChange={(e) => setInflowPathValue(e.value)}
                                options={[
                                    { value: '네이버', label: '네이버' },
                                    { value: '지인추천', label: '지인추천' },
                                    { value: '인스타그램', label: '인스타그램' },
                                    { value: '입주사', label: '입주사' },
                                    { value: '제휴사', label: '제휴사' },
                                    { value: '카카오톡 채널', label: '카카오톡 채널' },
                                    { value: '당근마켓', label: '당근마켓' },
                                    { value: '전단지', label: '전단지' },
                                    { value: '외부간판 및 현수막', label: '외부간판 및 현수막' },
                                    { value: '기타', label: '기타' },
                                ]}></Select>
                        </Col>
                        <Col>
                            <label>부상전적</label>
                            <Select
                                    classNamePrefix="react-select"
                                    placeholder="선택"
                                    onChange={handleInjurySelectChange}
                                    options={[
                                        { value: '없음', label: '없음' },
                                        { value: '팔꿈치', label: '팔꿈치' },
                                        { value: '허리', label: '허리' },
                                        { value: '무릎', label: '무릎' },
                                        { value: '손목', label: '손목' },
                                        { value: '어깨', label: '어깨' },
                                        { value: '등', label: '등' },
                                        { value: '손가락', label: '손가락' },
                                        { value: '기타', label: '기타' },
                            ]}></Select>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-center mt-3">
                        <div>
                            <input
                                type="checkbox"
                                defaultChecked={true} 
                                onChange={marketingChange} 
                                className="custom-checkbox"
                                id="mCheckbox"
                            />
                            <label htmlFor="mCheckbox">마케팅 수신동의</label>
                        </div>
                        <div className="ms-2">
                            <input 
                                type="checkbox" 
                                defaultChecked={true} 
                                onChange={privateInfoChange} 
                                className="custom-checkbox" 
                                id="pCheckbox"
                            />
                            <label htmlFor="pCheckbox">개인정보 수집동의</label>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <Button
                            className="px-5"
                            variant="primary"
                            onClick={() => {
                                updateFirestoreAddMember();
                            }}>
                            등록
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                closeButton={false}
                theme="light"
                limit={1}
            />
        </>
    );
});

export default AddModal;
