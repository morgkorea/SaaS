// @flow
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { getAuth, deleteUser } from 'firebase/auth';

//loading spinner
import Spinner from '../../components/Spinner';

// actions
import { resetAuth, signupUser, sendVerifyingEmail } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('이미 아이디가 있으신가요?')}{' '}
                <Link to={'/account/login2'} className="text-muted ms-1">
                    <b>{t('로그인 하기')}</b>
                </Link>
            </p>
        </footer>
    );
};

const Register2 = (): React$Element<React$FragmentType> => {
    const [userName, setUserName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, userSignUp, error, registerError } = useSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
        registerError: state.Auth.registerError,
    }));

    const { isEmailVerified, emailVerifying, sentVerifyEmail } = useSelector((state) => ({
        isEmailVerified: state.Auth.emailVerified,
        emailVerifying: state.Auth.sendVerifyingEmail,
        sentVerifyEmail: state.Auth.sentVerifyEmail,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup
                .string()
                .min(2, '2글자 이상 입력해주세요')
                .required(t('성함을 입력해주세요'))
                .test('is-valid-username', '단일 모음 또는 단일 자음은 사용할 수 없습니다', (value) => {
                    if (value) {
                        const regex = /^[^aeiouㄱ-ㅎㅏ-ㅣ]+$/i;
                        return regex.test(value);
                    }
                    return true;
                })
                .matches(/^[a-zA-Z가-힣]+$/, '특수문자, 숫자, 공백을 제외한 문자로 입력해주세요'),
            email: yup.string().required(t('E-mail을 입력해주세요')).email('유효한 E-mail을 입력해주세요'),
            password: yup.string().required(t('비밀번호를 입력해주세요')).min(8, `8자 이상 입력해주세요`),
            passwordconfirm: yup
                .string()
                .required('비밀번호를 입력해주세요')
                .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        dispatch(signupUser(formData['username'], formData['email'], formData['password']));
    };

    const getEmailAddress = (event) => {
        setEmailAddress(event.target.value);
    };
    const getUsername = (event) => {
        setUserName(event.target.value);
    };

    const getVerfiedUserFromFirebase = () => {
        dispatch(sendVerifyingEmail(emailAddress));
    };

    return (
        <>
            {userSignUp ? <Navigate to={'/dashboard/ecommerce'} /> : null}

            <AccountLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-6">{t('Morg 회원가입')}</h4>
                {/* <p className="text-muted mb-4">{t('')}</p> */}
                {sentVerifyEmail && (
                    <Alert variant="primary" className="my-2">
                        인증 이메일이 발송되었습니다. 이메일을 확인해주세요.
                    </Alert>
                )}
                {isEmailVerified ? (
                    <Alert variant="success" className="my-2">
                        인증되었습니다
                    </Alert>
                ) : (
                    error && (
                        <Alert variant="danger" className="my-2">
                            {error}
                        </Alert>
                    )
                )}

                {registerError && (
                    <Alert variant="danger" className="my-2">
                        {registerError}
                    </Alert>
                )}
                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ username: '', email: '', password: '' }}>
                    <FormInput
                        label={t('이름')}
                        type="text"
                        name="username"
                        placeholder={t('이름을 입력해주세요')}
                        containerClass={'mb-3'}
                        onChange={getUsername}
                        isEmailVerifying={emailVerifying}
                        isEmailVerified={isEmailVerified}
                        loading={loading}
                    />
                    <FormInput
                        label={t('ID (E-mail)')}
                        type="input"
                        name="email"
                        placeholder={t('E-mail을 입력해주세요.')}
                        containerClass={'mb-3'}
                        containerStyle={{ display: 'flex' }}
                        emailVerfication={true}
                        isEmailVerifying={emailVerifying}
                        onChange={getEmailAddress}
                        getVerfiedUserFromFirebase={getVerfiedUserFromFirebase}
                        isEmailVerified={isEmailVerified}
                        loading={loading}
                    />
                    <FormInput
                        label={t('비밀번호')}
                        type="password"
                        name="password"
                        placeholder={t('비밀번호를 입력해주세요')}
                        containerClass={'mb-3'}
                        isEmailVerifying={emailVerifying}
                    />

                    <FormInput
                        label={t('비밀번호 확인')}
                        type="password"
                        name="passwordconfirm"
                        placeholder={t('비밀번호를 입력해주세요')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('이용약관에 동의합니다.')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3 text-muted'}
                    />
                    <div className="mb-0 d-grid text-center">
                        <Button variant="primary" type="submit" disabled={loading || !isEmailVerified}>
                            {loading ? (
                                <Spinner
                                    className="me-1"
                                    size="sm"
                                    color="white"
                                    style={{ width: '15px', height: '15px' }}
                                />
                            ) : (
                                <i className="mdi mdi-account-circle"></i>
                            )}
                            {t(' 회원가입')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Register2;
