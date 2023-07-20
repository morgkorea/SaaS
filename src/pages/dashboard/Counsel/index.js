import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PerformanceChart from './PerformanceChart';
import BarChart from './BarChart';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { firestoreDB } from '../../../firebase/firebase';

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
                    <BarChart members={members} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <PerformanceChart members={members}/>
                </Col>
            </Row>
        </>
    );
};

export default Counsel;
