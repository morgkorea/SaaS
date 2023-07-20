// @flow
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

// crypto password
import CryptoJS from 'crypto-js';

import {
    forgotPasswordConfirm,
    firebaseLogin as firebaseLoginApi,
    firebaseSignup as firebaseSignupApi,
    firebaseLogout as firebaseLogoutApi,
    firebaseFakeSingupForEmailVerification as firebaseFakeSingupForEmailVerificationApi,
    firebaseSendEmailVerification as firebaseSendEmailVerificationApi,
    firebaseWatchEmailVerification as firebaseWatchEmailVerificationApi,
    firebaseForgotPasswordSendPasswordResetEmail as firebaseForgotPasswordSendPasswordResetEmailApi,
    firebaseUpdateProfile as firebaseUpdateProfileApi,
    firebaseDeleteUser as firebaseDeleteUserApi,
    firebaseFakeUpdateProfile as firebaseFakeUpdateProfileApi,
    firebaseDeleteFakeUser as firebaseDeleteFakeUserApi,
} from '../../helpers/';
import { APICore, setAuthorization } from '../../helpers/api/apiCore';

import { AuthActionTypes } from './constants';
import { authApiResponseSuccess, authApiResponseError } from './actions';

import { firestoreDB } from '../../firebase/firebase';
import { firestoreDbSchema, firestoreMemebersFieldSchema } from '../../firebase/firestoreDbSchema';
import { firestoreMembersDataSyncWithRealtime } from '../../firebase/firestore';

import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { getAuth, deleteUser } from 'firebase/auth';

import { errorConverter } from '../../utils/errorConverter';

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */

function* login({ payload: { email, password } }) {
    try {
        const response = yield call(firebaseLoginApi, { email, password });

        const firebaseAuthSession = {
            id: response.user.uid,
            email: response.user.email,
            username: response.user.displayName || '',
            role: 'Admin',
            token: response.user.accessToken,
            refreshToken: response.user.refreshToken,
            // lastName: 'user', //optional
            // password: 'test', //optional
            // accessToken: response.user.accessToken, //optional
            // providerData: response.user.providerData,
            // operationType: response.operationType,
            // proviersDAta : response.user.providerData
        };

        api.setLoggedInUser(firebaseAuthSession);

        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, firebaseAuthSession));
    } catch (error) {
        console.log('login error: ' + error.message);
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, errorConverter(error.code)));
        api.setLoggedInUser(null);
        setAuthorization(null);
        console.log(errorConverter(error.code));
    }
}

/**
 * Logout the user
 */
function* logout() {
    try {
        const response = yield call(firebaseLogoutApi);
        api.setLoggedInUser(null);
        setAuthorization(null);

        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, errorConverter(error.code)));
    }
}

function* signup({ payload: { username, phone, email, password } }) {
    try {
        // 회원가입 Api
        const response = yield call(firebaseSignupApi, { email, password });

        // username update
        yield call(firebaseUpdateProfileApi, { username });

        // usersCodes pool에서 추출후 회원정보에 할당

        const koCodesRef = yield doc(firestoreDB, 'UsersCodes', 'koCodes');
        const koCodes = yield getDoc(koCodesRef);
        const userCode = koCodes.data()?.codePool?.length ? koCodes.data()?.codePool[0] : 'KO';

        //codePool에서 userCode 추출 및 제거, codeInUse 병합
        yield updateDoc(koCodesRef, {
            codePool: arrayRemove(userCode),
        });
        yield updateDoc(koCodesRef, {
            codeInUse: arrayUnion(userCode),
        });

        // 회원 Firebase RealtimeDB Init 스키마 생성 & 연동

        const firebaseAuthSession = {
            id: response.user.uid,
            email: response.user.email,
            username: response.user.displayName || username,
            lastName: 'user', //optional
            password: 'test', //optional
            role: 'Admin',
            token: response.user.accessToken,
            refreshToken: response.refreshToken,
            providerData: response.user.providerData,
            operationType: response.operationType,
        };

        //Firestore DB init setup , signup과 함께 DB 구조 생성
        yield setDoc(doc(firestoreDB, 'Users', email), firestoreDbSchema({ username, phone, email, userCode }));

        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, firebaseAuthSession));

        api.setLoggedInUser(firebaseAuthSession);
    } catch (error) {
        console.log('signup error message :', error.message);

        api.setLoggedInUser(null);
        yield call(firebaseDeleteUserApi);
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, errorConverter(error.code)));

        // setAuthorization(null);
    }
}

//이메일 인증
function* fakeSignupForEmailVerification({ payload: { email } }) {
    try {
        const array = new Uint32Array(1);
        const temporalPassword = window.crypto.getRandomValues(array)[0].toString();
        const encryptedPassword = CryptoJS.AES.encrypt(
            temporalPassword,
            `${process.env.REACT_APP_FIREBASE_CRYPTO_SECRET_KEY}`
        ).toString();

        yield call(firebaseDeleteFakeUserApi);

        yield call(firebaseFakeSingupForEmailVerificationApi, { email, encryptedPassword });

        yield call(firebaseSendEmailVerificationApi);

        yield put(authApiResponseSuccess(AuthActionTypes.SEND_VERIFYING_EMAIL));

        yield call(firebaseFakeUpdateProfileApi, '모그(Morg)');

        yield call(firebaseWatchEmailVerificationApi);

        yield put(authApiResponseSuccess(AuthActionTypes.EMAIL_VERIFIED));
    } catch (error) {
        // yield call(firebaseDeleteUserApi);

        yield put(authApiResponseError(AuthActionTypes.SEND_VERIFYING_EMAIL, errorConverter(error.code)));

        yield put(authApiResponseError(AuthActionTypes.EMAIL_VERIFIED, errorConverter(error.code)));
    }
}

function* forgotPassword({ payload: { email } }) {
    try {
        const response = yield call(firebaseForgotPasswordSendPasswordResetEmailApi, { email });

        yield put(
            authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, {
                data: '발송된 E-mail을 확인하고 비밀번호를 변경해주세요.',
            })
        );
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, errorConverter(error.code)));

        console.log(error);
    }
}

function* forgotPasswordChange({ payload: { data } }) {
    try {
        const response = yield call(forgotPasswordConfirm, data);
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD_CHANGE, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD_CHANGE, error));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout(): any {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}
export function* watchFakeSignupForEmailVerification(): any {
    yield takeEvery(AuthActionTypes.SEND_VERIFYING_EMAIL, fakeSignupForEmailVerification);
}

export function* watchForgotPassword(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchForgotPasswordChange(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD_CHANGE, forgotPasswordChange);
}

function* authSaga(): any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchFakeSignupForEmailVerification),
        fork(watchForgotPassword),
        fork(watchForgotPasswordChange),
    ]);
}

export default authSaga;
