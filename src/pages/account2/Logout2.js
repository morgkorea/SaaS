// @flow
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//actions
import { logoutUser } from '../../redux/actions';

// components
import AccountLayout from './AccountLayout';

// images
import logoutIcon from '../../assets/images/logout-icon.svg';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer footer-alt">
            <p className="text-muted">
                {t('로그인 화면으로')}{' '}
                <Link to={'/account/login2'} className="text-muted ms-1">
                    <b>{t('이동하기')}</b>
                </Link>
            </p>
        </footer>
    );
};

const Logout2 = (): React$Element<any> | React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center">
                    <h4 className="mt-0">{t('로그아웃 완료')}</h4>
                    <p className="text-muted mb-4">{t('안전하게 로그아웃 되셨어요.')}</p>
                </div>

                <div className="logout-icon m-auto">
                    <img src={logoutIcon} alt="" />
                </div>
            </AccountLayout>
        </>
    );
};

export default Logout2;
