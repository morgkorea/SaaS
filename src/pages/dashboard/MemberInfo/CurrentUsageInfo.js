import React from 'react';
import { Card } from 'react-bootstrap';

const CurrentUsageInfo = ({ member }) => {

    return (
        <>
            <Card>
                <Card.Body>

                        <div className="payment-info">
                            <h4 className="me-5">현재 이용 정보</h4>
                            <div className='d-flex'>
                                <div><h4 className='me-2'>타석</h4><p>활성</p></div>
                                <div><h4 className='me-2'>레슨</h4><p>비활성</p></div>
                                <div><h4 className='me-2'>락커</h4><p>만료예정</p></div>
                                <div><h4 className='me-2'>기타</h4><p>-</p></div>
                            </div>
                        </div>
                        {/* {!member.availableProducts || member.availableProducts.length === 0 ? (
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
                        )} */}

                </Card.Body>
            </Card>
        </>
    );
};

export default CurrentUsageInfo;
