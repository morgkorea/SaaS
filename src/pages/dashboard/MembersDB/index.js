import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Customers from './Customers.js';
import { firestoreDB } from '../../../firebase/firebase';
import { collection, doc, getDocs, updateDoc,onSnapshot } from 'firebase/firestore';

const MembersDB = () => {
    const [currentMembers, setCurrentMembers] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const email = useSelector((state) => state.Auth?.user.email);
    const memberRef = collection(firestoreDB, 'Users', email, 'Members');

    const moveUnavailableProducts = (data) => {
        const today = new Date();
        
        const newData = data.map((member) => {
            const updatedMember = { ...member };
            
            if (Array.isArray(updatedMember.availableProducts)) {
                
                const availableProducts = (updatedMember.availableProducts || []).filter((product)=> {
                    const endDate = new Date(product?.endDate);
                    return endDate >= today;
                });
            
                const unavailableProducts = (updatedMember.availableProducts || []).filter((product) => {
                    const endDate = new Date(product?.endDate);
                    return endDate < today;
                });
          
                updatedMember.availableProducts = availableProducts;
                updatedMember.unavailableProducts = [
                    ...(updatedMember.unavailableProducts || []),
                    ...unavailableProducts,
                ];
            }

            return updatedMember;
        });
      
        setCurrentMembers(newData);
      
        // 파이어베이스에 업데이트
        newData.forEach((updatedMember) => {
            const docRef = doc(firestoreDB, 'Users', email, 'Members', updatedMember.id);
            updateDoc(docRef, updatedMember);
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
    console.log("currentMembers",currentMembers)
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
