// @flow
import { APICore } from './apiCore';

const api = new APICore();

// account
function firebaseOnAuthStateChanged() {
    return api.firebaseOnAuthStateChanged();
}
function firebaseLogin(params) {
    return api.firebaseLogin(params);
}

function firebaseSignup(params) {
    return api.firebaseSignup(params);
}

function firebaseFakeSingupForEmailVerification(params) {
    return api.firebaseFakeSingupForEmailVerification(params);
}

function firebaseFakeUpdateProfile(params) {
    return api.firebaseFakeUpdateProfile(params);
}

function firebaseDeleteFakeUser() {
    return api.firebaseDeleteFakeUser();
}

function firebaseWatchEmailVerification() {
    return api.firebaseWatchEmailVerification();
}

function firebaseLogout() {
    return api.firebaseLogout();
}
function firebaseSendEmailVerification() {
    return api.firebaseSendEmailVerification();
}

function firebaseForgotPasswordSendPasswordResetEmail(params) {
    return api.firebaseForgotPasswordSendPasswordResetEmail(params);
}
function firebaseUpdateProfile(params) {
    return api.firebaseUpdateProfile(params);
}
function firebaseDeleteUser() {
    return api.firebaseDeleteUser();
}

function login(params: any): any {
    const baseUrl = '/login/';
    return api.create(`${baseUrl}`, params);
}

function logout(): any {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signup(params: any): any {
    const baseUrl = '/register/';
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: any): any {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params: any): any {
    const baseUrl = '/password/reset/confirm/';
    return api.create(`${baseUrl}`, params);
}

export {
    login,
    logout,
    signup,
    forgotPassword,
    forgotPasswordConfirm,
    firebaseLogin,
    firebaseSignup,
    firebaseLogout,
    firebaseOnAuthStateChanged,
    firebaseFakeSingupForEmailVerification,
    firebaseSendEmailVerification,
    firebaseWatchEmailVerification,
    firebaseForgotPasswordSendPasswordResetEmail,
    firebaseDeleteUser,
    firebaseUpdateProfile,
    firebaseFakeUpdateProfile,
    firebaseDeleteFakeUser,
};
