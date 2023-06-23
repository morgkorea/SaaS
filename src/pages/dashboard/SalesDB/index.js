import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DefaultPagination from '../../../components/DefaultPagination.js';

import SalesRegistrationModal from './SalesRegistrationModal.js';

import { collection, query, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';

import { useSelector } from 'react-redux';

import { firestoreDB } from '../../../firebase/firebase.js';

const SalesDB = () => {
    const [modal, setModal] = useState(false);
    const [currentMembers, setCurrentMembers] = useState('');

    // 페이지네이션
    const [page, setPage] = useState(1);
    const limit = 20;
    const offset = (page - 1) * limit;

    // 수정하기
    const [editMode, setEditMode] = useState(false);
    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });
    const memberRef = collection(firestoreDB, 'Users', email, 'Members');

    const getMembers = async () => {
        const data = await getDocs(memberRef);

        setCurrentMembers(
            data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        );
    };

    useEffect(() => {
        getMembers();
    }, []);

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <>
            {/* <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}
            <SalesRegistrationModal modal={modal} setModal={setModal} />
            <div className="edit-btn-area avatar-md" style={{ zIndex: '100' }} onClick={toggle}>
                <span className="avatar-title bg-primary text-white font-20 rounded-circle shadow-lg">
                    <i className="mdi mdi-plus" />
                </span>
            </div>
        </>
    );
};

export default SalesDB;
