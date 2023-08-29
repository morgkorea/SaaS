import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Customers from './Customers.js';
import { firestoreDB } from '../../../firebase/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import AddModal from './AddModal.js';

const MembersDB = () => {
    const [currentMembers, setCurrentMembers] = useState([]);

    const email = useSelector((state) => state.Auth?.user.email);
    const memberRef = collection(firestoreDB, 'Users', email, 'Members');

    const updateMembersDB = (data) => {
        const today = new Date(new Date().toISOString().split('T')[0] + ' 00:00:00');

        const newData = data.map((member) => {
            const updatedMember = { ...member };

            // 나이 구하기
            const birthDate = updatedMember.birthDate || null;
            const todayDate = moment();
            const birthday = birthDate ? moment(birthDate, 'YYYY-MM-DD') : null;
            const age = birthDate ? todayDate.diff(birthday, 'years') : null;
            const ageGroup = age !== null
                    ? age < 20
                        ? '10대'
                        : age < 30
                        ? '20대'
                        : age < 40
                        ? '30대'
                        : age < 50
                        ? '40대'
                        : age < 60
                        ? '50대'
                        : '60대 이상'
                    : '';

            updatedMember.age = age;
            updatedMember.ageGroup = ageGroup;

            if (Array.isArray(updatedMember.availableProducts)) {
                // 상품 필터링
                const availableProducts = updatedMember.availableProducts.filter((product) => {
                    const endDate = new Date(new Date(product?.endDate).toISOString().split('T')[0] + ' 00:00:00');
                    return endDate >= today;
                });
                const unavailableProducts = updatedMember.availableProducts.filter((product) => {
                    const endDate = new Date(new Date(product?.endDate).toISOString().split('T')[0] + ' 00:00:00');
                    return endDate < today;
                });
                
                updatedMember.availableProducts = availableProducts;
                updatedMember.unavailableProducts = [
                    ...(updatedMember.unavailableProducts || []),
                    ...unavailableProducts,
                ];

                // 활성상품 D-day
                for (const product of availableProducts) {
                    const endDate = new Date(product?.endDate);
                    const timeDiff = endDate.getTime() - today.getTime();
                    const dDay = Math.floor(timeDiff / (1000 * 3600 * 24)); // 밀리초를 일(day)로 변환
                    product.dDay = dDay;
                }
            }

            return updatedMember;
        });

        setCurrentMembers(newData);

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
        updateMembersDB(data);
    };

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">회원 DB</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Customers currentMembers={currentMembers} />
                </Col>
            </Row>
           <AddModal/>
        </>
    );
};

export default MembersDB;
