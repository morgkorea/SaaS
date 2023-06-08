import { doc, collection, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
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

        realtimeDbMembers.forEach(async (member, idx) => {
            const docName = member.name + ' ' + member.phone;
            const docRef = doc((firestoreDB, 'Users', email, 'Members'));
            console.log('realtimeDBMembers ele :', member);
            return await setDoc(docRef, { ...member });
        });
        // const docRef = await doc(collection(firestoreDB, 'Users', email, 'Members'));
        // await setDoc(docRef, { ...realtimeDbMembers });

        console.log(snapshot.val());
        console.log(realtimeDbMembers);
        console.log('Firestore DB synchronized with Realtime DB');
    } catch (error) {
        console.error('reatimeDB sync error', error);
    }
};

export const getFirestoreUserData = async (email) => {
    const docRef = doc(firestoreDB, 'Users', email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
    }
};
