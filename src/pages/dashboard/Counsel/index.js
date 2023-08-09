import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';
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
                <Col xxl={4}>
                    <Statistics members={members} />
                </Col>
                <Col xxl={8}>
                    <Row>
                        <Col>
                            <BarChart members={members} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <Table responsive className="table-centered table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th>신규상담</th>
                                            <th>신규등록</th>
                                            <th>신규등록률</th>
                                            <th>재등록대상</th>
                                            <th>재등록</th>
                                            <th>이탈</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ borderTop: '1px solid #f7f7f7' }}>
                                        {items.map((item, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>84명</td>
                                                    {/* <td>${item.price.toFixed(2)}</td> */}
                                                    <td>56명</td>
                                                    <td>72%</td>
                                                    <td>3명</td>
                                                    <td>23명</td>
                                                    <td>120명</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
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
