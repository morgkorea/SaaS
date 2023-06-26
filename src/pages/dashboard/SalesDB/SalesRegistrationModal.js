// @flow
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Row, Col, Button, Modal, Alert, Card } from 'react-bootstrap';
import classNames from 'classnames';

import { firestoreDB } from '../../../firebase/firebase';
import { firestoreSalesFieldSchema } from '../../../firebase/firestoreDbSchema';

import { collection, query, where, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

import * as Hangul from 'hangul-js';
import { disassemble } from 'hangul-js';

import salesRegistrationStep1 from '../../../assets/images/icons/png/salesRegistrationStep1.png';
import salesRegistrationStep2 from '../../../assets/images/icons/png/salesRegistrationStep2.png';
import salesRegistrationStep3 from '../../../assets/images/icons/png/salesRegistrationStep3.png';
import salesRegistrationStep4 from '../../../assets/images/icons/png/salesRegistrationStep4.png';

//loading spinner
import Spinner from '../../../components/Spinner';

const SalesRegistrationModal = ({ modal, setModal }) => {
    const [registrationStep, setRegistrationStep] = useState(1);

    //step 1 =================================================================
    //선택 회원
    const [isSelectedMember, setIsSelectedMember] = useState(false);

    // 회원 이름 , 전화번호 검색
    const [searchingName, setSearchingName] = useState('');
    const [searchingPhone, setSearchingPhone] = useState('');
    const [searchedMembersList, setSearchedMembersList] = useState([]);

    // fetching data
    const [membersList, setMembersList] = useState([]);

    const [isHoveredCard, setIsHoveredCard] = useState(false);

    //step 2 ==================================================================
    // fetching data
    const [productsList, setProductsList] = useState([]);

    const [size, setSize] = useState('lg');

    const toggle = () => {
        setModal(!modal);
    };

    const email = useSelector((state) => {
        return state.Auth?.user?.email;
    });
    const switchRegistrationStepImg = (registrationStep) => {
        switch (registrationStep) {
            case 1:
                return salesRegistrationStep1;
                break;
            case 2:
                return salesRegistrationStep2;
                break;
            case 3:
                return salesRegistrationStep3;
                break;
            case 4:
                return salesRegistrationStep4;
                break;

            default:
                return salesRegistrationStep1;
        }
    };

    const swithRegistrationStepForm = (registrationStep) => {
        switch (registrationStep) {
            case 1:
                return salesRegistrationStep1;
                break;
            case 2:
                return salesRegistrationStep2;
                break;
            case 3:
                return salesRegistrationStep3;
                break;
            case 4:
                return salesRegistrationStep4;
                break;

            default:
                return salesRegistrationStep1;
        }
    };
    const handleRegistrationStep = (event) => {
        console.log(event.target.textContent);
        return event.target.textContent === '다음'
            ? setRegistrationStep(registrationStep + 1)
            : setRegistrationStep(registrationStep - 1);
    };
    console.log('registrationStep', registrationStep);
    const getSelectedMember = (searchedMembersList, idx) => {
        if (!isSelectedMember) {
            setIsSelectedMember(searchedMembersList[idx]);
        } else {
            setIsSelectedMember(false);
        }

        console.log(isSelectedMember);
    };

    const getSearchingName = (event) => {
        // event.persist(); // event pooling , event 객체 null 값 방지
        console.log(event.target.value);
        setSearchingName(event.target.value);
    };
    const getSearchingPhone = (event) => {
        setSearchingPhone(event.target.value);
    };

    const searchMembers = (membersList) => {
        if (searchingName.length || searchingPhone.length) {
            let members =
                membersList.length > 0
                    ? [...membersList].filter((member) => {
                          if (member && typeof member.name === 'string') {
                              let memberCho = disassemble(member.name, true)
                                  .map((ele) => ele[0])
                                  .join('');
                              return (
                                  ([...searchingName].every((element, idx) => {
                                      return element === memberCho[idx];
                                  }) || member.name?.includes(searchingName)
                                      ? true
                                      : false) && member.phone?.includes(searchingPhone)
                              );
                          }
                      })
                    : [];
            console.log(members);
            setSearchedMembersList(members);
        } else if (searchingName.length < 1 && searchingPhone.length < 1) {
            setSearchedMembersList([]);
        }
    };
    useEffect(() => {
        searchMembers(membersList);
    }, [searchingName, searchingPhone]);

    const getFirestoreMembersList = async () => {
        try {
            const memebersCollectionRef = collection(firestoreDB, 'Users', email, 'Members');
            onSnapshot(memebersCollectionRef, (querySnapshot) => {
                const membersArray = [];
                querySnapshot.forEach((member) => {
                    membersArray.push(member.data());
                });
                console.log(membersArray);
                setMembersList(membersArray);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const createSearchedMembersCard = (searchedMembersList, isSelectedMember) => {
        const handleMouseEnter = (e, idx) => {
            e.preventDefault();

            setIsHoveredCard(idx);
            console.log(isHoveredCard);
        };

        const handleMouseLeave = () => {
            setIsHoveredCard(false);
        };

        if (isSelectedMember) {
            return (
                <div
                    className="mb-2 "
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '49%',
                        minWidth: '162px',
                        height: '80px',
                        border: '2px solid #03C780',
                        borderRadius: '6px',
                        padding: '9px 15px',
                        cursor: 'pointer',
                    }}
                    onClick={(event) => {
                        getSelectedMember();
                    }}>
                    <div>
                        {' '}
                        <div
                            style={{
                                color: '#313A46',
                                fontSize: '15px',
                                fontWeight: '700',
                            }}>
                            {isSelectedMember.name}
                        </div>
                        <div style={{ color: '#6C757D', fontSize: '14px' }}>{isSelectedMember.phone}</div>
                    </div>

                    <div>
                        <i className="mdi mdi-radiobox-marked" style={{ color: '#03C780', fontSize: '24px' }}></i>
                    </div>
                </div>
            );
        } else if (searchedMembersList.length) {
            return searchedMembersList.map((member, idx) => {
                return (
                    <div
                        key={member.memberNumber + idx}
                        className="mb-2 "
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '49%',
                            minWidth: '162px',
                            height: '80px',
                            border: isHoveredCard === idx ? '2px solid #03C780' : '1px solid #EEF2F7',
                            borderRadius: '6px',
                            padding: isHoveredCard === idx ? '9px 15px' : '10px 16px',
                            cursor: 'pointer',
                        }}
                        onClick={(event) => {
                            getSelectedMember(searchedMembersList, idx);
                        }}
                        onMouseEnter={(event) => {
                            handleMouseEnter(event, idx);
                        }}
                        onMouseLeave={handleMouseLeave}>
                        <div>
                            {' '}
                            <div
                                style={{
                                    color: '#313A46',
                                    fontSize: '15px',
                                    fontWeight: '700',
                                }}>
                                {member.name}
                            </div>
                            <div style={{ color: '#6C757D', fontSize: '14px' }}>{member.phone}</div>
                        </div>

                        <div>
                            <i
                                className="mdi mdi-radiobox-blank"
                                style={{ color: isHoveredCard === idx ? '#03C780' : '#EEF2F7', fontSize: '24px' }}></i>
                        </div>
                    </div>
                );
            });
        }
    };

    const handleRederingBodyContent = (registrationStep) => {
        switch (registrationStep) {
            case 1:
                return (
                    <div className="container">
                        <h4 className="modal-title mb-2">회원 검색</h4>

                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                {' '}
                                <div className="mb-2">
                                    <div>회원성함</div>
                                    <div style={{ display: 'flex', border: '1px solid #EEF2F7', borderRadius: '6px' }}>
                                        <div className="font-24" style={{ marginLeft: '3px' }}>
                                            <i className="mdi mdi-magnify" />
                                        </div>
                                        <input
                                            onChange={(event) => {
                                                getSearchingName(event);
                                            }}
                                            type="text"
                                            className="form-control"
                                            style={{ border: 'none', padding: 0 }}
                                        />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <div>전화번호</div>
                                    <div style={{ display: 'flex', border: '1px solid #EEF2F7', borderRadius: '6px' }}>
                                        <div className="font-24" style={{ marginLeft: '3px' }}>
                                            <i className="mdi mdi-magnify" />
                                        </div>
                                        <input
                                            onChange={(event) => {
                                                getSearchingPhone(event);
                                            }}
                                            type="text"
                                            className="form-control"
                                            style={{ border: 'none', padding: 0 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mb-2">
                        <div>오디언스</div>
                        <div style={{ display: 'flex', border: '1px solid #EEF2F7', borderRadius: '6px' }}>
                            <select
                                className="w-100 p-1"
                                style={{
                                    height: '40px',
                                    border: '1px solid #DEE2E6',
                                    borderRadius: ' 2px',
                                    cursor: 'pointer',
                                }}>
                                <option value={true}>신규</option>
                                <option value={false}>재등록</option>
                            </select>
                        </div>
                    </div> */}
                            <div
                                className="p-2"
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    overflowY: 'auto',
                                    maxHeight: '300px',
                                }}>
                                {' '}
                                {createSearchedMembersCard(searchedMembersList, isSelectedMember)}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="container" style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <h4 className="modal-title mb-2">
                                {isSelectedMember.name ? isSelectedMember.name + ' ' : ''}회원 상품 적용
                            </h4>
                            <div className="mb-2">
                                <div>상품</div>
                                <select
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                        cursor: 'pointer',
                                    }}
                                    name="product"
                                    required
                                    placeholder="상품을 선택해주세요.">
                                    <option value="" selected disabled>
                                        상품을 선택해 주세요
                                    </option>
                                    {productsList.map((product, idx) => {
                                        if (product.activation && product.product.length) {
                                            return (
                                                <option key={product.product + '_' + idx} value={product.product}>
                                                    {product.product}
                                                </option>
                                            );
                                        }
                                    })}
                                </select>
                            </div>
                            <div className="mb-2">
                                <div>할인율</div>
                                {/* <select
                                    className="w-100 p-1"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                        cursor: 'pointer',
                                    }}
                                    name="product"
                                    required
                                    placeholder="-">
                                    <option value={0} selected>
                                        -
                                    </option>
                                </select> */}
                                <input
                                    type="number"
                                    className="w-100 p-1"
                                    min={0}
                                    max={100}
                                    placeholder="-"
                                    style={{
                                        height: '40px',
                                        border: '1px solid #DEE2E6',
                                        borderRadius: ' 2px',
                                        cursor: 'pointer',
                                    }}></input>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const getFiresotreProductsList = async () => {
        try {
            const productsCollectionRef = collection(firestoreDB, 'Users', email, 'Products');
            onSnapshot(productsCollectionRef, (querySnapshot) => {
                const productArray = [];
                querySnapshot.forEach((product) => {
                    productArray.push(product.data());
                });
                console.log(productArray);
                setProductsList(productArray);
            });
        } catch (error) {
            console.log(error);
        }
    };

    //test
    useEffect(() => {
        getFirestoreMembersList();
        getFiresotreProductsList();
    }, []);

    return (
        <>
            <Modal show={modal} onHide={toggle} size={size} centered={true}>
                <Modal.Header
                    className="border-bottom-0"
                    onHide={toggle}
                    style={{ margin: '12px 0px' }}
                    closeButton></Modal.Header>
                <Modal.Body style={{ width: '100%', height: '570px', padding: '0px 60px' }}>
                    <div style={{ width: '100%', paddingBottom: '32px' }}>
                        <img src={switchRegistrationStepImg(registrationStep)} style={{ width: '100%' }} />
                    </div>
                    {handleRederingBodyContent(registrationStep)}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0" style={{ paddingBottom: '48px' }}>
                    <Button
                        variant="primary"
                        onClick={(event) => {
                            handleRegistrationStep(event);
                        }}
                        disabled={!isSelectedMember}
                        style={{ width: '200px' }}>
                        다음
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SalesRegistrationModal;
