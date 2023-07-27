import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';

const MemberMemo = ({ memberRef, memberData  }) => {
    const [memoContent, setMemoContent] = useState('');
    const notify = (message) => toast(message);

    const updateMemo = async () => {
        const memberDoc = await getDoc(memberRef);
        const memberData = memberDoc.data();

        const newMemo = {
            created: moment().format('YYYY.MM.DD kk:mm'),
            contents: memoContent,
        };

        let memos = (memberData && memberData.memo) || [];
        memos.push(newMemo);

        const updatedMemberData = {
            ...memberData,
            memo: memos,
        };

        notify('메모가 추가되었습니다.');

        setTimeout(async () => {
            await updateDoc(memberRef, updatedMemberData);
            setMemoContent('');
            // window.location.reload();
        }, 1000);
    };

    const deleteMemo = async (index) => {
        const memberDoc = await getDoc(memberRef);
        const memberData = memberDoc.data();

        let memos = (memberData && memberData.memo) || [];
        memos.splice(index, 1);

        const updatedMemberData = {
            ...memberData,
            memo: memos,
        };

        notify('메모가 삭제되었습니다.');

        setTimeout(async () => {
            await updateDoc(memberRef, updatedMemberData);
            // window.location.reload();
        }, 1000);
    };

    if (!memberData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Card style={{ height: '500px', }}>
                <Card.Body>
                    <div className="d-flex justify-content-between align-content-center">
                        <h4 className="mb-4">회원 메모</h4>
                    </div>

                    <div className="member-info-card mb-4">
                        <Row>
                            <Col xxl={10} xl={9}>
                                <textarea
                                    className="memoTextarea"
                                    name="memberMemo"
                                    value={memoContent}
                                    placeholder="회원님의 메모를 등록해주세요"
                                    onChange={(e) => setMemoContent(e.target.value)}></textarea>
                            </Col>
                            <Col xxl={2} xl={3} className="d-flex flex-wrap align-items-center justify-content-end">
                                <Button className="px-4" onClick={() => updateMemo()}>
                                    등록
                                </Button>
                            </Col>
                        </Row>
                    </div>

                    <div className="member-info-list memo">
                        {memberData.memo && memberData.memo.length > 0 ? (
                            <>
                                {memberData.memo.map((memo, index) => (
                                    <div className="member-info-card" key={index}>
                                        <Row className="d-flex justify-content-between">
                                            <Col xxl={10} xl={8}>
                                                <p className='mb-0'>{memo.contents}</p>
                                            </Col>
                                            <Col
                                                xxl={2}
                                                xl={4}
                                                className="d-flex align-items-start justify-content-end">
                                                <p className='mb-0'>{memo.created}</p>
                                                <button className="basic-icon ms-2" onClick={() => deleteMemo(index)}>
                                                    <i className="dripicons-trash"></i>
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <div className="text-center pt-4">
                                    <h5>회원메모가 없습니다. 회원 메모를 등록해주세요.</h5>
                                </div>
                            </>
                        )}
                    </div>

                    <ToastContainer
                        position="top-right"
                        autoClose={500}
                        hideProgressBar={false}
                        closeButton={false}
                        theme="light"
                        limit={1}
                    />
                </Card.Body>
            </Card>
        </>
    );
};

export default MemberMemo;
