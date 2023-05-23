// @flow
import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//actions
import { signupUser, sendVerifyingEmail } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Already have account?')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Register = (): React$Element<React$FragmentType> => {
    const [emailAddress, setEmailAddress] = useState('');
    const [emailVerifying, setEmailVerifying] = useState(false); //initial value must be false

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, userSignUp, error, registerError } = useSelector((state) => ({
        loading: state.Auth.loading,
        error: state.Auth.error,
        userSignUp: state.Auth.userSignUp,
        registerError: state.Auth.registerError,
    }));

    const { isEmailVerified, isEmailVerifying } = useSelector((state) => ({
        isEmailVerified: state.Auth.emailVerified,
        isEmailVerifying: state.Auth.sendVerifyingEmail,
    }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            // fullname: yup.string().required(t('Please enter Fullname')),
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
            password: yup.string().required(t('Please enter Password')).min(6).required(`6글자 이상 입력하세요`),
            passwordconfirm: yup
                .string()
                .required('please confirm your password')
                .oneOf([yup.ref('password')], 'password must be match'),
            // .when('password', (password, field) =>
            //     password ? field.required('password confirm').oneOf([yup.ref('password'),null]) : field
            // )
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        dispatch(signupUser(formData['email'], formData['password']));
    };

    const getEmailAddress = (event) => {
        setEmailAddress(event.target.value);
    };

    const getVerfiedUserFromFirebase = () => {
        dispatch(sendVerifyingEmail(emailAddress));
        setEmailVerifying(true);
    };

    return (
        <>
            {userSignUp ? <Navigate to={'/account/confirm'} /> : null}

            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Free Sign Up')}</h4>
                    <p className="text-muted mb-4">
                        {t("Don't have an account? Create your account, it takes less than a minute.")}
                    </p>
                </div>

                {isEmailVerifying ? (
                    !isEmailVerified ? (
                        <Alert variant="primary" className="my-2">
                            인증 이메일이 발송되었습니다. 이메일을 확인해주세요.
                        </Alert>
                    ) : (
                        <Alert variant="success" className="my-2">
                            인증되었습니다
                        </Alert>
                    )
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

                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{ email: '', password: '' }}>
                    <FormInput
                        label={t('Email address')}
                        type="input"
                        name="email"
                        placeholder={t('Enter your email')}
                        containerStyle={{ display: 'flex' }}
                        emailVerfication={true}
                        isEmailVerifying={isEmailVerifying}
                        onChange={getEmailAddress}
                        getVerfiedUserFromFirebase={getVerfiedUserFromFirebase}
                        isEmailVerified={isEmailVerified}
                    />

                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password confirm')}
                        type="password"
                        name="passwordconfirm"
                        placeholder={t('Confirm your password')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('I accept Terms and Conditions')}
                        type="checkbox"
                        name="checkboxsignup"
                        containerClass={'mb-3 text-muted'}
                    />

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading || !isEmailVerified}>
                            {t('Sign Up')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Register;
