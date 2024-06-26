// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';

// images
import avatar1 from '../../assets/images/users/avatar-1.jpg';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('본인이 아닌가요?')}{' '}
                <Link to={'/account/login2'} className="text-muted ms-1">
                    <b>{t('다른 아이디로 로그인하기')}</b>
                </Link>
            </p>
        </footer>
    );
};

const LockScreen2 = (): React$Element<any> => {
    const { t } = useTranslation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            password: yup.string().required(t('비밀번호를 입력해주세요.')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {};

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto">
                    <img src={avatar1} height="64" alt="" className="rounded-circle shadow" />
                    <h4 className="text-dark-50 text-center mt-3 fw-bold">{t('안녕하세요!') + ' ' + '대표님!'}</h4>
                    <p className="text-muted mb-4">{t('대표님의 비밀번호를 입력해주세요')}</p>
                </div>

                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label={t('비밀번호')}
                        type="password"
                        name="password"
                        placeholder={t('비밀번호를 입력해주세요.')}
                        containerClass={'mb-3'}
                    />

                    <div className="mb-0 text-center d-grid">
                        <Button variant="primary" type="submit">
                            <i className="mdi mdi-login"></i> {t('로그인')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default LockScreen2;
