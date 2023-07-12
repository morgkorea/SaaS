import React from 'react';
import { Card } from 'react-bootstrap';

const CurrentUsageInfo = ({ member }) => {

    return (
        <>
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div className="payment-info">
                            <h4 className="me-5">현재 이용 정보</h4>
                            <h4 className="me-2">회차</h4>
                            {!member.availableProducts || member.availableProducts.length === 0 ? (
                                <></>
                            ) : (
                                <>
                                    <p>{member.availableProducts[0].product}</p>
                                    <p>{member.availableProducts[0].discountRate}% 할인</p>
                                    <p>
                                        {member.availableProducts[0].startDate} ~ {member.availableProducts[0].endDate}
                                    </p>
                                </>
                            )}
                        </div>
                        <h4 className="text-primary">{member?.activation} 회원</h4>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default CurrentUsageInfo;
