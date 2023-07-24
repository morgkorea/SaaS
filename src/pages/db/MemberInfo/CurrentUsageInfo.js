import React from 'react';
import { Card } from 'react-bootstrap';

const CurrentUsageInfo = ({ member }) => {
    const taSeokActive = member.taSeokActive;
    const lessonActive = member.lessonActive;
    const lockerActive = member.lockerActive;

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="payment-info">
                        <h4 className="me-5">현재 이용 정보</h4>
                        <div className='d-flex'>
                            <div>
                                <h4 className="me-2">타석</h4>
                                <p>{taSeokActive}
                                    {taSeokActive ? (
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
                                <p>{lessonActive}
                                    {lessonActive ? (
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
                                <p>{lockerActive}
                                    {lockerActive ? (
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
