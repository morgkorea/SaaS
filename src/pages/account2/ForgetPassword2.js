// @flow
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// actions
import { resetAuth, forgotPassword } from '../../redux/actions';

//firbase auth , sending password reset email func
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// components
import { VerticalForm, FormInput } from '../../components';

import AccountLayout from './AccountLayout';

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('로그인화면으로')}{' '}
                <Link to={'/account/login2'} className="text-muted ms-1">
                    <b>{t('이동하기')}</b>
                </Link>
            </p>
        </footer>
    );
};

const ForgetPassword2 = (): React$Element<React$FragmentType> => {
    const [isSendPasswordResetEmail, setIsSendPasswordResetEmail] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, passwordReset, resetPasswordSuccess, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        resetPasswordSuccess: state.Auth.resetPasswordSuccess,
        error: state.Auth.error,
        passwordReset: state.Auth.passwordReset,
    }));

    useEffect(() => {
        return passwordReset ? setIsSendPasswordResetEmail(false) : setIsSendPasswordResetEmail(true);
    }, [passwordReset]);

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('E-mail을 입력해주세요')).email('유효한 E-mail을 입력해주세요'),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        dispatch(forgotPassword(formData['email']));
        setIsSendPasswordResetEmail(true);
    };

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <h4 className="mt-0">{t('비밀번호를 재설정하시겠어요?')}</h4>
                <p className="text-muted mb-4">
                    {t('하단에 이메일(E-mail)을 알려주세요. 비밀번호 변경 메일을 발송해드릴게요.')}
                </p>

                {resetPasswordSuccess && <Alert variant="success">{resetPasswordSuccess.data}</Alert>}

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                {!passwordReset && (
                    <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                        <FormInput
                            label={t('ID (E-mail)')}
                            type="text"
                            name="email"
                            placeholder={t('E-mail을 입력해주세요')}
                            containerClass={'mb-3'}
                        />

                        <div className="mb-0 text-center d-grid">
                            <Button variant="primary" type="submit" disabled={loading || !isSendPasswordResetEmail}>
                                <i className="mdi mdi-lock-reset"></i> {t('비밀번호 변경 mail 받기')}
                            </Button>
                        </div>
                    </VerticalForm>
                )}
                {resetPasswordSuccess && (
                    <div className="mb-0 text-center d-grid">
                        <Link to={'/account/login2'} className="btn btn-primary" type="button" disabled={loading}>
                            <i className="mdi mdi-login"> </i>
                            {t('로그인화면으로 이동')}
                        </Link>
                    </div>
                )}
            </AccountLayout>
        </>
    );
};

export default ForgetPassword2;
