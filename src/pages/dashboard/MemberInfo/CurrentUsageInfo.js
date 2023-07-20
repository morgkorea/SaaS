import React from 'react';
import { Card } from 'react-bootstrap';

const findKeywordInProducts = (availableProducts, keyword) => {
    if (Array.isArray(availableProducts) && availableProducts.length > 0) {
        return availableProducts.some((product) => {
            return product && product.product.includes(keyword);
        });
    }
    return false;
};

const CurrentUsageInfo = ({ member }) => {
    const availableProducts = member.availableProducts;
    const taSeokActive = findKeywordInProducts(availableProducts, '타석') ? '활성' : '비활성';
    const lessonActive = findKeywordInProducts(availableProducts, '레슨') ? '활성' : '비활성';
    const lockerActive = findKeywordInProducts(availableProducts, '락커') ? '활성' : '비활성';

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
                                    {
                                        taSeokActive === '활성' ? <i className="dripicons-media-record text-primary ms-1" /> : <i className="dripicons-cross text-danger ms-1" />
                                    }
                                </p>
                            </div>
                            <div>
                                <h4 className="me-2">레슨</h4>
                                <p>{lessonActive}
                                    {
                                        lessonActive === '활성' ? <i className="dripicons-media-record text-primary ms-1" /> : <i className="dripicons-cross text-danger ms-1" />
                                    }</p>
                            </div>
                            <div>
                                <h4 className="me-2">락커</h4>
                                <p>{lockerActive}
                                    {
                                        lockerActive === '활성' ? <i className="dripicons-media-record text-primary ms-1" /> : <i className="dripicons-cross text-danger ms-1" />
                                    }</p>
                            </div>
                            <div>
                                <h4 className="me-2">기타</h4>
                                <p>-</p>
                                {/* <i className="dripicons-warning"></i> */}
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default CurrentUsageInfo;
