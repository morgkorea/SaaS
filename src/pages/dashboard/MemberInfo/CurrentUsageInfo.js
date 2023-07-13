import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const CurrentUsageInfo = ({ member }) => {

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        {!member.availableProducts || member.availableProducts.length === 0 ? (
                            <>
                                <div className="payment-info">
                                    <h4 className="me-5">현재 이용 정보</h4>
                                </div>
                                <div>
                                    <h4 className="text-primary">비활성 회원</h4>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="payment-info">
                                    <h4 className="me-5">현재 이용 정보</h4>
                                    <h4 className="me-2">{member.availableProducts[0].index}회차</h4>
                                    <p>{member.availableProducts[0].product}</p>
                                    <p>{member.availableProducts[0].discountRate}% 할인</p>
                                    <p>
                                        {member.availableProducts[0].startDate} ~ {member.availableProducts[0].endDate}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-primary">활성 회원</h4>
                                </div>
                            </>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default CurrentUsageInfo;
