import { BrowserRouter } from 'react-router-dom';
import { AllRoutes } from './index';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import React, { useEffect, useState } from 'react';

const Routes = () => {
    // const [isAuthLoading, setIsAuthLoading] = useState(false);
    // const AUTH_SESSION_KEY = 'hyper_user';
    // const auth = getAuth();

    // const firebaseOnAuthStateChanged = () => {
    //     const tempararyUserinfo = sessionStorage.getItem(AUTH_SESSION_KEY);

    //     return onAuthStateChanged(auth, (response) => {
    //         if (response.accessToken === tempararyUserinfo ) {
    //             console.log('is logged in firebase auth', response);
    //             const firebaseAuthSession = {
    //                 id: response.uid,
    //                 username: response.email,
    //                 role: 'Admin', //필수
    //                 token: response.accessToken, //필수
    //                 refreshToken: response.refreshToken,
    //                 // displayName: 'response.displayName', //optional
    //                 // refreshToken: response.accessToken, //optional
    //                 // providerData: response.providerData,
    //                 // operationType: response.operationType,
    //             };

    //             if (firebaseAuthSession && firebaseAuthSession.emailVerified)
    //                 sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(firebaseAuthSession));

    //             setIsAuthLoading(true);

    //             return firebaseAuthSession;
    //         } else {
    //             //dispatch sign out
    //             sessionStorage.removeItem(AUTH_SESSION_KEY);
    //             setIsAuthLoading(true);
    //             return {};
    //         }
    //     });
    // };
    // useEffect(() => {
    //     if (isAuthLoading === false) {
    //         firebaseOnAuthStateChanged();
    //     }
    // });
    // return (
    //     <BrowserRouter>
    //         {isAuthLoading ? <AllRoutes /> : <div className="isloading_viewer">Now Loading..</div>}
    //     </BrowserRouter>
    // );

    return (
        <BrowserRouter>
            <AllRoutes />
        </BrowserRouter>
    );
};

export default Routes;
