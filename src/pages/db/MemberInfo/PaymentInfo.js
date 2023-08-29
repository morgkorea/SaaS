import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';

const PaymentInfo = ({ member }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [refundProducts, setRefundProducts] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [averageValue, setAverageValue] = useState(0);

    const sortProductsByDate = () => {
        const sortedProducts = [...allProducts].sort((a, b) => {
            const dateA = new Date(a.paymentDate);
            const dateB = new Date(b.paymentDate);
            return dateA - dateB;
        });
        setSortedProducts(sortedProducts);
    };

    useEffect(() => {
        if (member.availableProducts && member.unavailableProducts) {
            const products = [...member.availableProducts, ...member.unavailableProducts].filter((product) => {
                return product.deleted_at === false && product.refund === false;
            });

            const amounts = products.map((data) => data.adjustedPrice);
            const totalValue = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const averageValue = amounts.length > 0 ? Math.floor(totalValue / amounts.length) : 0;

            setAllProducts(products);
            setTotalValue(totalValue);
            setAverageValue(averageValue);
            setRefundProducts(refunds);
        }
    }, [member.availableProducts, member.unavailableProducts]);

    useEffect(() => {
        sortProductsByDate();
    }, [allProducts]);

    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Card style={{ height: '740px' }}>
                <Card.Body className="payment-wrap centralized-parents">
                    <div className="d-flex justify-content-between">
                        <h4 className="mb-4">결제 정보</h4>
                    </div>
                    {(!member.availableProducts || member.availableProducts.length) === 0 &&
                    (!member.unavailableProducts || member.unavailableProducts.length === 0) ? (
                        <>
                            <div className="centralized">
                                <h5>결제 정보가 없습니다.</h5>
                                <div className="mt-3">
                                    <Warning />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="member-info-list">
                                {sortedProducts.reverse().map((data, index) => {
                                    const reversedIndex = sortedProducts.length - index;
                                    return (
                                        <div key={index} className="member-info-card">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex">
                                                    <h4 className="number">{reversedIndex}회차</h4>
                                                    <div className="payment-info">
                                                        <div className="d-flex">
                                                            <div>
                                                                <p>{data.product}</p>
                                                            </div>
                                                            {!data.expirationPeriod ? null : (
                                                                <div>
                                                                    <p>{data.expirationPeriod}</p>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <p>{data.discountRate}% 할인</p>
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    {data.startDate} ~ {data.endDate}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4>{data.adjustedPrice.toLocaleString()}원</h4>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {
                                    refundProducts.map((data, index) => {
                                        return (
                                            <div key={index} className="member-info-card">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex">
                                                        <h4 className="number text-warning">환불건</h4>
                                                        <div className="payment-info">
                                                            <div className="d-flex" style={{ color: '#ccc'}}>
                                                                <div>
                                                                    <p>{data.product}</p>
                                                                </div>
                                                                {!data.expirationPeriod ? null : (
                                                                    <div>
                                                                        <p>{data.expirationPeriod}</p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <p>{data.discountRate}% 할인</p>
                                                                </div>
                                                                <div>
                                                                    <p>
                                                                        {data.startDate} ~ {data.endDate}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ color: '#ccc'}}>{data.adjustedPrice.toLocaleString()}원</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="position-absolute bottom-0 end-0 p-4">
                                <div className="payment-amount">
                                    <p>평균 {averageValue.toLocaleString()} 원</p>
                                    <p className="text-primary">
                                        총 <span className="h2">{totalValue.toLocaleString()}</span> 원
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default PaymentInfo;
