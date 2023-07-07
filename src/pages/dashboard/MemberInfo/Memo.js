import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Memo = ({ email, id }) => {
    const [memoContent, setMemoContent] = useState('');
    const [memberData, setMemberData] = useState(null);

    const memberRef = doc(firestoreDB, 'Users', email, 'Members', id);

    const notify = (message) => toast(message);

    useEffect(() => {
        const unsubscribe = onSnapshot(memberRef, (snapshot) => {
            const data = snapshot.data();
            setMemberData(data);
        });
        return () => unsubscribe();
    }, [email, id]);

    const updateMemo = async () => {
        const newMemo = {
            created: moment().format('YY/MM/DD hh:mm A'),
            contents: memoContent,
        };

        const memberDoc = await getDoc(memberRef);
        const memberData = memberDoc.data();

        let memos = (memberData && memberData.memo) || [];
        memos.push(newMemo);

        const updatedMemberData = {
            ...memberData,
            memo: memos,
        };

        notify('메모가 추가되었습니다.');

        setTimeout(async () => {
            await updateDoc(memberRef, updatedMemberData);
            setMemoContent('')
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
            <Card>
                <Card.Body>
                    <h4>메모</h4>
                    <textarea
                        name="memberMemo"
                        cols="50"
                        rows="5"
                        value={memoContent}
                        onChange={(e) => setMemoContent(e.target.value)}></textarea>
                    <div>
                        <Button onClick={() => updateMemo()}>추가</Button>
                    </div>
                    <div className="mt-4">
                        {memberData.memo && memberData.memo.length > 0 && (
                            <>
                                <h4>메모 LIST</h4>
                                {memberData.memo.map((memo, index) => (
                                    <Card>
                                        <Card.Body>
                                            <div key={index}>
                                                <p>{memo.contents}</p>
                                                <p>작성날짜: {memo.created}</p>
                                                <Button onClick={() => deleteMemo(index)}>삭제</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </>
                        )}
                    </div>
                </Card.Body>
            </Card>

            <ToastContainer
                position="top-right"
                autoClose={500}
                hideProgressBar={false}
                closeButton={false}
                theme="light"
                limit={1}
            />
        </>
    );
};

export default Memo;
