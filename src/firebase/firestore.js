import { doc, collection, setDoc, getDoc, getDocs, updateDoc, arrayUnion, query } from 'firebase/firestore';
import { getDatabase, ref, child, get } from 'firebase/database';

import { firestoreDB } from './firebase';
import { firestoreMemebersFieldSchema } from './firestoreDbSchema';

export const firestoreMembersDataSyncWithRealtime = async (email) => {
    try {
        const dbRef = ref(getDatabase());
        const snapshot = await get(
            child(dbRef, `members/${email?.toLowerCase().replace('@', 'ATSIGN').replace('.', 'DOT')}`)
        );
        // const firestoreMembersCollectionRef = collection(firestoreDB, 'Users', email, 'Members');
        // const firestoreMembersSnapshot = await getDocs(firestoreMembersCollectionRef);

        // const firestoreMembersArray = [];
        // firestoreMembersSnapshot.forEach((member) => {
        //     firestoreMembersArray.push(member.data());
        // });

        let realtimeDbMembers;
        if (snapshot.exists()) {
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
        } else {
            console.log('No data available');
        }

        // await updateDoc(doc(firestoreDB, 'Users', email), { members: arrayUnion(...realtimeDbMembers) });

        // Member collection에 각 회원 문서 생성하는 로직 추가
        const firestoreMembersData = await getDocs(collection(firestoreDB, 'Users', email, 'Members'));
        const firestoreMembers = {};
        firestoreMembersData.forEach((doc) => {
            const member = doc.data();
            firestoreMembers[member.name] = member;
        });

        // firestore회원 realtimeDB회원 중복 필터 : 조건 이름, 전화번호
        const newMembers = realtimeDbMembers.filter((member) => {
            return firestoreMembers.hasOwnProperty(member.name) && firestoreMembers[member.name].phone === member.phone
                ? false
                : true;
        });

        // firestore Members collection에 신규회원 등록
        newMembers.forEach(async (newMember) => {
            try {
                const membersCollectionRef = doc(collection(firestoreDB, 'Users', email, 'Members'));
                await setDoc(membersCollectionRef, newMember);
                console.log('update newMember docs successfully');
            } catch (error) {
                console.log('update newMember docs : failed', error);
            }
        });

        console.log(realtimeDbMembers);

        console.log('Firestore DB synchronized with Realtime DB');
        console.log(newMembers);
    } catch (error) {
        console.error('reatimeDB sync error', error);
    }
};
