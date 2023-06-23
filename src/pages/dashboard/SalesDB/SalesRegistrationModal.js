// @flow
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Row, Col, Button, Modal, Alert, Card } from 'react-bootstrap';
import classNames from 'classnames';

import { firestoreDB } from '../../../firebase/firebase';
import { firestoreSalesFieldSchema } from '../../../firebase/firestoreDbSchema';

import { collection, query, where, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

import { debounce } from 'lodash';
import * as Hangul from 'hangul-js';
import { getInitials } from 'hangul-js';

import salesRegistrationStep1 from '../../../assets/images/icons/png/salesRegistrationStep1.png';
import salesRegistrationStep2 from '../../../assets/images/icons/png/salesRegistrationStep2.png';
import salesRegistrationStep3 from '../../../assets/images/icons/png/salesRegistrationStep3.png';
import salesRegistrationStep4 from '../../../assets/images/icons/png/salesRegistrationStep4.png';

//loading spinner
import Spinner from '../../../components/Spinner';

const SalesRegistrationModal = ({ modal, setModal }) => {
    const [registrationStep, setRegistrationStep] = useState(1);
    const [searchingName, setSearchingName] = useState(null);
    const [searchingPhone, setSearchingPhone] = useState('');
    const [membersList, setMembersList] = useState([]);
    const [searchedMembersList, setSearchedMembersList] = useState([]);
    const [size, setSize] = useState('lg');

    const toggle = () => {
        setModal(!modal);
    };

    const email = useSelector((state) => {
        return state.Auth?.user?.email;
    });

    const getSearchingName = (event) => {
        // event.persist(); // event pooling , event 객체 null 값 방지
        console.log(event.target.value);
        setSearchingName(event.target.value);
    };
    const getSearchingPhone = (event) => {
        setSearchingPhone(event.target.value);
    };

    const searchMembers = (membersList) => {
        const members = [...membersList].filter((member) => {
            const memberCho = Hangul.disassemble(member.name, true)
                .map((ele) => {
                    return ele[0];
                })
                .join('');
            return (
                ([...searchingName].every((element, idx) => {
                    return element === memberCho[idx];
                }) || member.name?.includes(searchingName)
                    ? true
                    : false) && member.phone?.includes(searchingPhone)
            );
        });

        setSearchedMembersList(members);
    };
    useEffect(() => {
        searchMembers(membersList);
    }, [searchingName, searchingPhone]);

    const getFirestoreMembersList = async () => {
        try {
            const memebersCollectionRef = collection(firestoreDB, 'Users', email, 'Members');
            onSnapshot(memebersCollectionRef, (querySnampshot) => {
                const membersArray = [];
                querySnampshot.forEach((member) => {
                    membersArray.push(member.data());
                });
                console.log(membersArray);
                setMembersList(membersArray);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const createSearchedMembersCard = (searchedMembersList) => {
        if (searchedMembersList.length) {
            return searchedMembersList.map((member, idx) => {
                return (
                    <div
                        key={member.memeberNumber + member.idx}
                        className="mb-2 "
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            border: '1px solid #EEF2F7',
                            borderRadius: '6px',
                            padding: '10px 16px',
                            cursor: 'pointer',
                        }}>
                        <div>
                            {' '}
                            <div style={{ color: '#313A46', fontSize: '15px', fontWeight: '700' }}>{member.name}</div>
                            <div style={{ color: '#6C757D', fontSize: '14px' }}>{member.phone}</div>
                        </div>

                        <div>
                            <i className="mdi mdi-radiobox-blank" style={{ fontSize: '24px' }}></i>
                            <i className="mdi mdi-radiobox-marked" style={{ fontSize: '24px' }}></i>
                        </div>
                    </div>
                );
            });
        }
    };

    useEffect(() => {
        getFirestoreMembersList();
    }, []);

    const switchRegistrationStepImg = (registrationStep) => {
        switch (registrationStep) {
            case 1:
                return salesRegistrationStep1;
            case 2:
                return salesRegistrationStep2;
            case 3:
                return salesRegistrationStep3;
            case 4:
                return salesRegistrationStep4;

            default:
                return salesRegistrationStep1;
        }
    };

    const swithRegistrationStepForm = (registrationStep) => {
        switch (registrationStep) {
            case 1:
                return salesRegistrationStep1;
            case 2:
                return salesRegistrationStep2;
            case 3:
                return salesRegistrationStep3;
            case 4:
                return salesRegistrationStep4;

            default:
                return salesRegistrationStep1;
        }
    };

    //test
    useEffect(() => {}, []);

    useEffect(() => {}, [modal]);

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

                            <div className="mb-2">
                                <div>오디언스</div>
                                <div style={{ display: 'flex', border: '1px solid #EEF2F7', borderRadius: '6px' }}>
                                    {/* <select className="form-control" style={{ border: 'none', padding: 0 }}> */}
                                    <select
                                        className="w-100 p-1"
                                        style={{
                                            height: '40px',
                                            border: '1px solid #DEE2E6',
                                            borderRadius: ' 2px',
                                            cursor: 'pointer',
                                        }}>
                                        <option value={true}>활성</option>
                                        <option value={false}>비활성</option>
                                    </select>
                                </div>
                            </div>

                            {createSearchedMembersCard(searchedMembersList)}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center border-top-0" style={{ paddingBottom: '48px' }}>
                    <Button variant="primary" disabled={true} style={{ width: '200px' }}>
                        다음
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SalesRegistrationModal;
