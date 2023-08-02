import React from 'react';
import { Card } from 'react-bootstrap';

const CurrentUsageInfo = ({ member }) => {
    const hasTaSeokProduct = (member.availableProducts || []).some((product) => {
        return product && product.product && product.productType === 'batterBox';
    });
    const hasLessonProduct = (member.availableProducts || []).some((product) => {
        return product && product.product && product.productType === 'lesson';
    });
    const hasLockerProduct = (member.availableProducts || []).some((product) => {
        return product && product.product && product.productType === 'locker';
    });
    
    return (
        <>
            <Card>
                <Card.Body>
                    <div className="payment-info">
                        <h4 className="me-5">현재 이용 정보</h4>
                        <div className='d-flex'>
                            <div>
                                <h4 className="me-2">타석</h4>
                                <p>
                                    {hasTaSeokProduct ? (
                                        <>
                                            활성 <i className="dripicons-media-record text-primary ms-1" />
                                        </>
                                    ) : (
                                        <>
                                            비활성 <i className="dripicons-cross text-danger ms-1" />
                                        </>
                                    )}
                                </p>
                            </div>
                            <div>
                                <h4 className="me-2">레슨</h4>
                                <p>
                                    {hasLessonProduct ? (
                                        <>
                                            활성 <i className="dripicons-media-record text-primary ms-1" />
                                        </>
                                    ) : (
                                        <>
                                            비활성 <i className="dripicons-cross text-danger ms-1" />
                                        </>
                                    )}
                                </p>
                            </div>
                            <div>
                                <h4 className="me-2">락커</h4>
                                <p>
                                    {hasLockerProduct ? (
                                        <>
                                            활성 <i className="dripicons-media-record text-primary ms-1" />
                                        </>
                                    ) : (
                                        <>
                                            비활성 <i className="dripicons-cross text-danger ms-1" />
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default CurrentUsageInfo;
