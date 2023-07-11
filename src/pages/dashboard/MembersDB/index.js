import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Customers from './Customers.js';
import { firestoreDB } from '../../../firebase/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const MembersDB = () => {
    const [currentMembers, setCurrentMembers] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const email = useSelector((state) => state.Auth?.user.email);
    const memberRef = collection(firestoreDB, 'Users', email, 'Members');

    const moveUnavailableProducts = (data) => {
        const today = new Date();

        const newData = data.map((doc) => {
            const updatedDoc = { ...doc };

            if (Array.isArray(updatedDoc.availableProducts)) {
                const unavailableProducts = [];
                updatedDoc.availableProducts = updatedDoc.availableProducts.filter((product) => {
                    const endDate = new Date(product.endDate);
                    if (endDate < today) {
                        unavailableProducts.push(product);
                        return false;
                    }
                    return true;
                });
                updatedDoc.unavailableProducts = unavailableProducts;
            }

            return updatedDoc;
        });

        setCurrentMembers(newData);

        // 파이어베이스에 업데이트
        newData.forEach((updatedDoc) => {
            const docRef = doc(firestoreDB, 'Users', email, 'Members', updatedDoc.id);
            updateDoc(docRef, updatedDoc);
        });
    };

    const getMembers = async () => {
        const querySnapshot = await getDocs(memberRef);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setCurrentMembers(data);
        moveUnavailableProducts(data);
    };

    useEffect(() => {
        getMembers();
    }, []);

    console.log('member:', currentMembers);

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
                    <Customers currentMembers={currentMembers} addMode={addMode} setAddMode={setAddMode} />
                </Col>
            </Row>
        </>
    );
};

export default MembersDB;
