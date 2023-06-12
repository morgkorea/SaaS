import { doc, collection, setDoc, getDoc, getDocs, updateDoc, arrayUnion, query } from 'firebase/firestore';
import { getDatabase, ref, child, get } from 'firebase/database';

import { firestoreDB } from './firebase';
import { firestoreMemebersFieldSchema } from './firestoreDbSchema';

export const firestoreMembersDataSyncWithRealtime = async (email) => {
    console.log('state', email);

    try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(
            child(dbRef, `members/${email.toLowerCase().replace('@', 'ATSIGN').replace('.', 'DOT')}`)
        );
        let realtimeDbMembers;
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const pushData = snapshot.val().map((member) => {
                let schema = { ...firestoreMemebersFieldSchema };

                for (let key in member) {
                    if (schema.hasOwnProperty(key) && key === 'createdTime') {
                        const dateTime = new Date(member[key]);

                        if (isNaN(dateTime.getTime())) {
                            console.log('Invalid time value:', member[key]);
                            continue; // 잘못된 시간 값이면 다음 요소로 넘어감
                        }

                        schema['createdDate'] = dateTime.toISOString().split('T')[0];
                        schema['createdTime'] = dateTime.toISOString().split('T')[1].split('.')[0];
                    } else if (schema.hasOwnProperty(key) && key !== 'createdTime') {
                        schema[key] = member[key];
                    }
                }
                return schema;
            });

            realtimeDbMembers = pushData;
            console.log('realtime DB updated successfully', { members: arrayUnion(...realtimeDbMembers) });
        } else {
            console.log('No data available');
        }

        await updateDoc(doc(firestoreDB, 'Users', email), { members: arrayUnion(...realtimeDbMembers) });
        // Member collection에 각 회원 문서 생성하는 로직 추가

        const currentMembers = await getDocs(collection(firestoreDB, 'Users', email, 'Members'));
        const phoneNumberOfMembers = [];
        currentMembers.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            phoneNumberOfMembers.push(doc.data().phone);
        });

        //현재 members 콜렉션 문서들 불러오기 (회원)
        if (currentMembers) {
            console.log('currentMembers data : ', phoneNumberOfMembers);
        } else {
            console.log('currentMembers call failed');
        }
        //회원 phoneNumber로 검색 -> 기존회원목록, 신규회원목록 비교 중복 필터 ->
        //회원데이터 문서 생성
        realtimeDbMembers.forEach(async (member) => {
            if (member.phone) {
                const memberPhone = member.phone;
                const docRef = doc(collection(firestoreDB, 'Users', email, 'Members'));
                console.log('realtimeDBMembers ele :', !phoneNumberOfMembers.includes(memberPhone));

                return !phoneNumberOfMembers.includes(memberPhone) ? await setDoc(docRef, { ...member }) : null;
            }
        });

        console.log(snapshot.val());
        console.log(realtimeDbMembers);
        console.log('Firestore DB synchronized with Realtime DB');
    } catch (error) {
        console.error('reatimeDB sync error', error);
    }
};
