import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../../firebase/firebase';
import moment from 'moment';

const Memo = ({ member, email, id }) => {
    const [memoContent, setMemoContent] = useState([])

    const updateMemo = async () => {
        const memberRef = doc(firestoreDB, 'Users', email, 'Members', id);

        const newMemberMemoData = {
            memo: {
                created: moment().format('YY/MM/DD hh:mm A'),
                contents: memoContent,
            },
        };

        await updateDoc(memberRef, newMemberMemoData);

        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h4>메모장</h4>
                    <textarea 
                        name="memberMemo" 
                        cols="50" 
                        rows="5"
                        onChange={(e) => setMemoContent(e.target.value)}
                    ></textarea>
                    <div>
                        {/* <Button onClick={() => addMemo()}>추가</Button> */}
                        <Button onClick={() => updateMemo()}>수정</Button>
                    </div>
                    <div className='mt-4'>
                        {
                            !member.memo  ? null 
                                : <>
                                    <h4>메모 LIST</h4>
                                    <p>{member.memo.contents}</p>
                                    <p>작성날짜: {member.memo.created}</p>
                                </>
                        }
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default Memo;
