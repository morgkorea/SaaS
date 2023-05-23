import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
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
            const pushData = snapshot.val().map((member) => {
                let schema = { ...firestoreMemebersFieldSchema[0] };

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

        console.log(snapshot.val());
        console.log(realtimeDbMembers);
        console.log('Firestore DB synchronized with Realtime DB');
    } catch (error) {
        console.error(error);
    }

    // console.log('state', email);

    // try {

    // }catch{

    // }
    // const dbRef = ref(getDatabase());
    // return await get(child(dbRef, `members/${email.toLowerCase().replace('@', 'ATSIGN').replace('.', 'DOT')}`))
    //     .then((snapshot) => {
    //         if (snapshot.exists()) {
    //             const pushData = snapshot.val().map((member) => {
    //                 let schema = { ...firestoreMemebersFieldSchema[0] };

    //                 for (let key in member) {
    //                     if (schema.hasOwnProperty(key) && key === 'createdTime') {
    //                         const dateTime = new Date(member[key]);
    //                         const createdDate = dateTime.toISOString().split('T')[0];
    //                         const createdTime = dateTime.toISOString().split('T')[1].split('.')[0];
    //                         schema['createdDate'] = createdDate;
    //                         schema['createdTime'] = createdTime;
    //                     } else if (schema.hasOwnProperty(key) && key !== 'createdTime') {
    //                         schema[key] = member[key];
    //                     }
    //                 }
    //                 return schema;
    //             });

    //            updateDoc(
    //                 doc(firestoreDB, 'Users', `${email}`),
    //                 { members: arrayUnion(...pushData) }
    //                     .then(() => {
    //                         console.log('reatime db updated successfully', { members: arrayUnion(...pushData) });
    //                     })
    //                     .catch((error) => {
    //                         console.log('reatime db error: ' + error);
    //                     })
    //             );

    //             console.log(snapshot.val());
    //             console.log(pushData);
    //             console.log('FirestoreDB syncronized with realtimeDB');
    //         } else {
    //             console.log('No data available');
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
};
