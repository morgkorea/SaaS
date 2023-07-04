import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Customers from './Customers.js';
import { firestoreDB } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SalesDB = () => {
    const [currentMembers, setCurrentMembers] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const email = useSelector((state) => {
        return state.Auth?.user.email;
    });
    const memberRef = collection(firestoreDB, "Users", email, "Members")

    const getMembers = async () => {
        const data = await getDocs(memberRef);
        setCurrentMembers(data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })))
    };
    
    useEffect(() => {
        getMembers()
    }, []);

    // console.log(currentMembers)
    
    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">회원현황</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Customers
                        currentMembers={currentMembers}
                        addMode={addMode}
                        setAddMode={setAddMode}
                    />
                </Col>
            </Row>
        </>
    );
};

export default SalesDB;
