import { firebaseAuthErrorCodes } from '../firebase/firebaseAuthErrorCodes';

export const errorConverter = (errorCode) => {
    return firebaseAuthErrorCodes[`${errorCode}`];
};
