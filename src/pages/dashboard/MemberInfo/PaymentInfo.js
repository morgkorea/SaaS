import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ReactComponent as Warning } from '../../../assets/images/warning.svg';

const PaymentInfo = ({ member, handleTabChange }) => {
    const [amounts, setAmounts] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [averageValue, setAverageValue] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const sortProductsByDate = () => {
      const sortedProducts = [...allProducts].sort((a, b) => {
        const dateA = new Date(a.paymentDate);
        const dateB = new Date(b.paymentDate);
        return dateA - dateB;
      });
      setSortedProducts(sortedProducts);
    };

    console.log(allProducts)
    console.log('sortedProducts', sortedProducts)

    useEffect(() => {
        if (member.availableProducts && member.unavailableProducts) {
            const products = [...member.availableProducts, ...member.unavailableProducts];
            const amounts = products.map((data) => {
                const regularPrice = data.regularPrice || 0;
                const discountPrice = data.discountPrice || 0;
                return regularPrice - discountPrice;
            });

            const totalValue = Math.floor(amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
            const averageValue = Math.floor(totalValue / amounts.length);

            setAmounts(amounts);
            setTotalValue(totalValue);
            setAverageValue(averageValue);
            setAllProducts(products);
        }
    }, [member.availableProducts, member.unavailableProducts]);

    useEffect(() => {
        sortProductsByDate();
    }, []);

    return (
        <>
            <Card style={{ height: '740px' }}>
                <Card.Body className="payment-wrap centralized-parents">
                    <div className="d-flex justify-content-between">
                        <h4 className="mb-4">결제 정보</h4>
                        <p onClick={() => handleTabChange('memo')} className="btn btn-link text-decoration-underline">
                            회원 메모
                        </p>
                    </div>
                    {(!member.availableProducts || member.availableProducts.length) === 0 && (!member.unavailableProducts || member.unavailableProducts.length === 0) ? (
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
                                {sortedProducts.map((data, index) => {
                                    return (
                                        <div key={index} className="member-info-card">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex">
                                                    <h4 className="number">{index + 1}회차</h4>
                                                    <div className="payment-info">
                                                        <p>{data.product}</p>
                                                        {!data.expirationPeriod ? <></> :
                                                            (
                                                                <p>{data.expirationPeriod}</p>
                                                            )
                                                        }
                                                        <p>{data.discountRate}% 할인</p>
                                                        <p>
                                                            {data.startDate} ~ {data.endDate}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4>
                                                        {(data.regularPrice && data.discountPrice) ? (data.regularPrice - data.discountPrice).toLocaleString() + '원' : '0원'}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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
