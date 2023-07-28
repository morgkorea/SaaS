// @flow
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// images
import LogoLight from '../../assets/images/logo.png';
import LogoDark from '../../assets/images/logo-dark.png';
import MorgLogo from '../../assets/images/icons/png/Morg.png';

type AccountLayoutProps = {
    bottomLinks?: React$Element<any>,
    children?: any,
};

const AccountLayout = ({ bottomLinks, children }: AccountLayoutProps): React$Element<React$FragmentType> => {
    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        };
    }, []);

    const { t } = useTranslation();

    return (
        <>
            <div className="auth-fluid">
                {/* Auth fluid right content */}
                <div className="auth-fluid-left text-center">
                    <div className="auth-user-testimonial">
                        <h2 className="mb-3">{t('MORG')}</h2>
                        <p className="lead">
                            {/* <i className="mdi mdi-format-quote-open"></i> {t('')}
                            <i className="mdi mdi-format-quote-close"></i> */}
                        </p>
                        <p>{t('')}</p>
                    </div>
                </div>
                {/* Auth fluid left content */}
                <div className="auth-fluid-form-box">
                    <div className="align-items-center d-flex h-100">
                        <Card.Body>
                            {/* logo */}
                            <div className="auth-brand text-center text-lg-start">
                                <Link to="/" className="logo-dark">
                                    <div>
                                        <img src={MorgLogo} alt="" height="27" />
                                    </div>
                                </Link>
                                <Link to="/" className="logo-light">
                                    <div>
                                        <img src={MorgLogo} alt="" height="27" />
                                    </div>
                                </Link>
                            </div>

                            {children}

                            {/* footer links */}
                            {bottomLinks}
                        </Card.Body>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountLayout;
