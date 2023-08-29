// @flow
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreDB } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const SellerBox = (): React$Element<any> => {
    const [myProfile, setMyProfile] = useState(null);
    const email = useSelector((state) => state.Auth?.user.email);
    const docRef = doc(firestoreDB, 'Users', email);

    const fetchMyProfile = async () => {
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setMyProfile(docSnap.data());
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching my profile:', error);
        }
    };

    useEffect(() => {
        fetchMyProfile();
    }, []);

    return (
        <Card style={{marginTop: '2rem'}}>
            <Card.Body>
                <h4 className="header-title mt-0 mb-3 text-dark">내 정보</h4>

                <div className="text-start">
                    <p className="text-dark">
                        <strong>사업장 :</strong> <span className="text-muted ms-2">{myProfile?.store}</span>
                    </p>

                    <p className="text-dark">
                        <strong>성함 :</strong> 
                        <span className="text-muted ms-2">{myProfile?.username}</span>
                    </p>

                    <p className="text-dark">
                        <strong>로그인 아이디 :</strong> 
                        <span className="text-muted ms-2">{myProfile?.email}</span>
                    </p>

                    <p className="text-dark">
                        <strong>이메일 :</strong> 
                        <span className="text-muted ms-2">{myProfile?.email}</span>
                    </p>
                    
                    <p className="text-dark">
                        <strong>연락처 :</strong>
                        <span className="text-muted ms-2">{myProfile?.ownerPhone}</span>
                    </p>

                    <p className="text-dark mb-0">
                        <strong>SNS :</strong>
                        <Link className="d-inline-block ms-2 text-muted" to="#">
                            <i className="mdi mdi-facebook"></i>
                        </Link>
                        <Link className="d-inline-block ms-2 text-muted" to="#">
                            <i className="mdi mdi-instagram"></i>
                        </Link>
                        <Link className="d-inline-block ms-2 text-muted" to="#">
                            <i className="mdi mdi-twitter"></i>
                        </Link>
                    </p>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SellerBox;
