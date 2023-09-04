import jwtDecode from 'jwt-decode';
import axios from 'axios';

import config from '../../config';

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    deleteUser,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth';

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;

// intercepting to capture errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;

        if (error && error.response && error.response.status === 404) {
            // window.location.href = '/not-found';
        } else if (error && error.response && error.response.status === 403) {
            window.location.href = '/access-denied';
        } else {
            switch (error.response.status) {
                case 401:
                    message = 'Invalid credentials';
                    break;
                case 403:
                    message = 'Access Forbidden';
                    break;
                case 404:
                    message = 'Sorry! the data you are looking for could not be found';
                    break;
                default: {
                    message =
                        error.response && error.response.data ? error.response.data['message'] : error.message || error;
                }
            }
            return Promise.reject(message);
        }
    }
);

const AUTH_SESSION_KEY = 'Morg_Auth';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromSession = () => {
    const user = sessionStorage.getItem(AUTH_SESSION_KEY);

    return user ? (typeof user == 'object' ? { user } : JSON.parse(user)) : null;
};

class APICore {
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }
        return response;
    };

    getFile = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {
            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    };

    getMultiple = (urls, params) => {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`));
        }
        return axios.all(reqs);
    };

    /**
     * post given data to url
     */

    //firebase auth func api

    firebaseLogin = (params) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, params.email, params.password);
    };

    firebaseSignup = (params) => {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, params.email, params.password);
    };

    firebaseFakeSingupForEmailVerification = (params) => {
        const auth = getAuth();
        return createUserWithEmailAndPassword(auth, params.email, params.encryptedPassword);
    };

    firebaseFakeUpdateProfile = (params) => {
        const auth = getAuth();
        const user = auth.currentUser;
        return updateProfile(user, { displayName: params + '회원', appName: params });
    };

    firebaseDeleteFakeUser = () => {
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user && user.emailVerified === false) {
                deleteUser(user)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } else {
                resolve();
            }
        });
    };
    firebaseLogout = () => {
        const auth = getAuth();
        return signOut(auth);
    };

    firebaseSendEmailVerification = () => {
        const auth = getAuth();
        return sendEmailVerification(auth.currentUser);
    };

    firebaseWatchEmailVerification = () => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const auth = getAuth();
                const user = auth.currentUser;
                user?.reload();

                if (user?.emailVerified) {
                    deleteUser(user)
                        .then(() => {
                            clearInterval(interval);
                            resolve(); // 작업이 성공적으로 완료되면 resolve 호출
                        })
                        .catch((error) => {
                            clearInterval(interval);
                            reject(error); // 작업 중에 에러가 발생하면 reject 호출
                        });
                }
            }, 1000);

            setTimeout(() => {
                clearInterval(interval);

                reject(new Error('Timeout')); // 타임아웃이 발생하면 reject 호출
            }, 180000);
        });
    };

    firebaseDeleteUser = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            return new Promise((resolve, reject) => {
                deleteUser(user)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    };

    firebaseForgotPasswordSendPasswordResetEmail = (params) => {
        const auth = getAuth();
        return sendPasswordResetEmail(auth, params.email);
    };

    firebaseUpdateProfile = (params) => {
        const auth = getAuth();
        const user = auth.currentUser;
        return updateProfile(user, { displayName: params.username });
    };

    create = (url, data) => {
        return axios.post(url, data);
    };

    /**
     * Updates patch data
     */
    updatePatch = (url, data) => {
        return axios.patch(url, data);
    };

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.put(url, data);
    };

    /**
     * Deletes data
     */
    delete = (url) => {
        return axios.delete(url);
    };

    /**
     * post given data to url with file
     */
    createWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    };

    /**
     * post given data to url with file
     */
    updateWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.patch(url, formData, config);
    };

    isUserAuthenticated = () => {
        const user = this.getLoggedInUser();
        if (!user) {
            return false;
        } else {
            return true;
        }
        // if (!user || (user && !user.token)) {
        //     return false;
        // } else {
        //     return true;
        // }
    };

    setLoggedInUser = (session) => {
        if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
        else {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
    };

    /**
     * Returns the logged in user
     */
    getLoggedInUser = () => {
        return getUserFromSession();
    };

    setUserInSession = (modifiedUser) => {
        let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (userInfo) {
            const { token, user } = JSON.parse(userInfo);
            this.setLoggedInUser({ token, ...user, ...modifiedUser });
        }
    };

    naverSenseSmsApi = (timeStamp) => {
        const header = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': timeStamp,
            'x-ncp-iam-access-key': 'Sub Account Access Key',
            'x-ncp-apigw-signature-v2': 'API Gateway Signature',
        };
    };
}

/*
Check if token available in session
*/
// let user = getUserFromSession();
// if (user) {
//     const { token } = user;

//     if (token && user?.emailVerified) {
//         setAuthorization(token);
//     }
// }

export { APICore, setAuthorization };
