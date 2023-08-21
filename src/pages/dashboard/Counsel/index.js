import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PerformanceChart from './PerformanceChart';
import BarChart from './BarChart';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { firestoreDB } from '../../../firebase/firebase';
import Statistics from './Statistics';

const Counsel = () => {
    const [members, setMembers] = useState([]);
    const email = useSelector((state) => state.Auth?.user.email);
    const memberRef = collection(firestoreDB, 'Users', email, 'Members');

    const getMembers = async () => {
        const querySnapshot = await getDocs(memberRef);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMembers(data);
    };

    useEffect(() => {
        getMembers();
    }, []);

    const [items, setItems] = useState([
        {
            id: 1,
            name: 'Amazing Modern Chair',
            size: 'Large',
            color: 'Light Green',
            price: 148.66,
            qty: 5,
            total: 743.3,
        },
    ]);

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <h4 className="page-title">상담</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Statistics members={members} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <BarChart members={members} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <PerformanceChart members={members} />
                </Col>
            </Row>
        </>
    );
};

export default Counsel;
