// @flow
import { AuthActionTypes } from './constants';

type AuthAction = { type: string, payload: {} | string };

// common success
export const authApiResponseSuccess = (actionType: string, data: any): AuthAction => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthAction => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const loginUser = (email: string, password: string): AuthAction => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { email, password },
});

export const logoutUser = (): AuthAction => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const signupUser = (username: string, phone: string, email: string, password: string): AuthAction => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { username, phone, email, password },
});

export const forgotPassword = (email: string): AuthAction => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { email },
});

export const forgotPasswordChange = (email: string): AuthAction => ({
    type: AuthActionTypes.FORGOT_PASSWORD_CHANGE,
    payload: { email },
});

// export const watchFirebaseLoginAuth = () => ({
//     type: AuthActionTypes.WATCH_FIREBASE_LOGIN,
//     payload: {},
// });
export const testStateUpdate = (): AuthAction => ({
    type: AuthActionTypes.TEXT_STATE_UPDATE,
    payload: { test: 'test' },
});

export const emailVerified = () => {
    console.log('emailvierfied excueteeddfdsf');
    return { type: AuthActionTypes.EMAIL_VERIFIED, payload: {} };
};

export const sendVerifyingEmail = (email) => {
    console.log({
        type: AuthActionTypes.SEND_VERIFYING_EMAIL,
        payload: { email },
    });
    return {
        type: AuthActionTypes.SEND_VERIFYING_EMAIL,
        payload: { email },
    };
};

export const resetAuth = (): AuthAction => ({
    type: AuthActionTypes.RESET,
    payload: {},
});
