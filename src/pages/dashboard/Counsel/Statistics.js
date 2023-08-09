import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ members }) => {
    const currentMonth = new Date().getMonth() + 1;
    // const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    // 저번달 데이터, 이번달 데이터 비교 (전달대비 ...)

    // 신규등록 newRegistrations
    // 이번달 기간동안 첫매출이 일어난 사람 (이전 상품 결제내역 없어야 함.)
    // 조건 1. (members - unavailableProducts = 0) 이 조건이 해당되는 회원중에,
    // 조건 2. members - availableProducts - productType = "batterBox" 이거나 "lesson" 인 상품 중에서
    // members - availableProducts - paymentDate를 오늘 날짜를 비교해서 이번달에 해당된다면 +1
    const newRegistrations = members.reduce((count, member) => {
        const hasPreviousPurchase = member.unavailableProducts > 0;
        const hasValidProduct = member.availableProducts.some(
            (product) =>
                ['batterBox', 'lesson'].includes(product.productType) &&
                new Date(product.paymentDate).getMonth() + 1 === currentMonth
        );
        if (!hasPreviousPurchase && hasValidProduct) {
            count++;
        }
        return count;
    }, 0);

    // 재등록 reRegistrations
    // 조건 1. (members -> unavailableProducts = 1이상) 이 조건이 해당되는 회원 중에,
    // 조건 2. members - availableProducts - productType = "batterBox" 이거나 "lesson" 인 상품 중에서
    // members - availableProducts - paymentDate를 오늘 날짜를 비교해서 이번달에 해당된다면 +1
    const reRegistrations = members.reduce((count, member) => {
        const hasPreviousPurchase = member.unavailableProducts >= 1;
        const hasValidProduct = member.availableProducts.some(
            (product) =>
                ['batterBox', 'lesson'].includes(product.productType) &&
                new Date(product.paymentDate).getMonth() + 1 === currentMonth
        );
        if (hasPreviousPurchase && hasValidProduct) {
            count++;
        }
        return count;
    }, 0);
    
    // 신규등록률
    // newRegistrationsRate ( newRegistrations / members.length ) * 100
    const newRegistrationsRate = (newRegistrations / members.length) * 100;
   
    // 재등록률
    // reRegistrationsRate ( reRegistrations / allproject 1이상 ) * 100
    const allProjectsCount = members.filter(member => member.unavailableProducts >= 1).length;
    const reRegistrationsRate = allProjectsCount > 0 ? (reRegistrations / allProjectsCount) * 100 : 0;    

    
    const counselData = [
        {
            title: '신규등록률',
            stats: newRegistrationsRate.toFixed(0) + '%',
            value: '?' + '%',
            color: 'text-success',
            icon: 'up',
            border: 'primary',
        },
        {
            title: '재등록률',
            stats: reRegistrationsRate.toFixed(0) + '%',
            value: '?'+ '%',
            color: 'text-danger',
            icon: 'down',
            border: 'danger',
        },
        {
            title: '신규등록',
            stats: newRegistrations + '명',
            value: '?' + '명',
            color: 'text-success',
            icon: 'up',
        },
        {
            title: '재등록',
            stats: reRegistrations + '명',
            value: '?' + '명',
            color: 'text-danger',
            icon: 'down',
        },
        {
            title: '상담유입',
            stats: members.length + '명',
            value: '?' + '명',
            color: 'text-success',
            icon: 'up',
        },
        {
            title: '재등록대상',
            stats: '?' + '명',
            value: '?' + '%',
            color: 'text-success',
            icon: 'up',
        },
    ];

    return (
        <Row>
            {counselData.map((data, index) => {
                return (
                    <Col key={index} xl={6}>
                        <StatisticsWidget
                            icon="mdi mdi-account-multiple"
                            description={data.title}
                            border={data.border}
                            title={data.title}
                            stats={data.stats}
                            trend={{
                                textClass: `${data.color}`,
                                icon: `mdi mdi-arrow-${data.icon}-bold`,
                                value: `${data.value}`,
                                time: '전달 대비',
                            }}></StatisticsWidget>
                    </Col>
                );
            })}
        </Row>
    );
};

export default Statistics;
