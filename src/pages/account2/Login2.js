// @flow
import React, { useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Link, Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { resetAuth, loginUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';

//loading spinner
import Spinner from '../../components/Spinner';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('아이디가 없으신가요?')}{' '}
                <Link to={'/account/register2'} className="text-muted ms-1">
                    <b>{t('회원가입')}</b>
                </Link>
            </p>
            <p className="text-muted">
                {t('비밀번호 재설정 E-mail 받기')}{' '}
                <Link to={'/account/forget-password2'} className="text-muted ms-1">
                    <b>{t('비밀번호 재설정')}</b>
                </Link>
            </p>
        </footer>
    );
};

const Login2 = (): React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const location = useLocation();
    const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('E-mail을 입력해주세요')).email('유효한 E-mail을 입력해주세요'),
            password: yup.string().required(t('비밀번호를 입력해주세요')).min(8, '비밀번호는 8자리 이상입니다.'),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        dispatch(loginUser(formData['email'], formData['password']));
    };

    return (
        <>
            {(userLoggedIn || user) && <Navigate to={redirectUrl} />}
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center">
                    <h4 className="mt-0">{t('안녕하세요 MORG 입니다')}</h4>
                    <p className="text-muted mb-4">{t('로그인 후 이용하실 수 있어요')}</p>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{ email: '', password: '' }}>
                    {/* */}
                    <FormInput
                        label={t('ID (E-Mail)')}
                        type="input"
                        name="email"
                        placeholder={t('E-mail을 입력해주세요.')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('비밀번호 (Password)')}
                        type="password"
                        name="password"
                        placeholder={t('비밀번호를 입력해주세요')}
                        containerClass={'mb-3'}>
                        {/* <Link to="/account/forget-password2" className="text-muted float-end">
                            <small>{t('Forgot your password?')}</small>
                        </Link> */}
                    </FormInput>

                    <div className="d-grid mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? (
                                <Spinner
                                    className="me-1"
                                    size="sm"
                                    color="white"
                                    style={{ width: '15px', height: '15px' }}
                                />
                            ) : (
                                <i className="mdi mdi-login"> </i>
                            )}
                            {t('로그인')}
                        </Button>
                    </div>

                    {/* social links */}
                    {/* <div className="text-center mt-4">
                        <p className="text-muted font-16">{t('Sign in with')}</p>
                        <ul className="social-list list-inline mt-3">
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-primary text-primary">
                                    <i className="mdi mdi-facebook"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-danger text-danger">
                                    <i className="mdi mdi-google"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-info text-info">
                                    <i className="mdi mdi-twitter"></i>
                                </Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="#" className="social-list-item border-secondary text-secondary">
                                    <i className="mdi mdi-github"></i>
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login2;
