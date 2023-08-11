import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ members }) => {
    const currentMonth = new Date().getMonth() + 1;

    // * -------------------------------
    // * 신규
    // * -------------------------------
    
    // 유입
    const newMembers = members.filter((member) => {
        const createdDate = new Date(member.createdDate);
        const createdMonth = createdDate.getMonth() + 1;

        return createdMonth === currentMonth;
    });

    // 전달 유입
    const previousMonthNewMembers = members.filter((member) => {
        const createdDate = new Date(member.createdDate);
        const createdMonth = createdDate.getMonth() + 1;
        const previousMonth = currentMonth - 1;

        return createdMonth === previousMonth;
    }).length;

    // 신규등록
    const newRegistrations = newMembers.reduce((count, member) => {
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

    // 전달 신규 등록
    const previousMonthNewRegistrations = members.reduce((count, member) => {
        const hasPreviousPurchase = member.unavailableProducts > 0;
        const hasValidProduct = member.availableProducts.some(
            (product) =>
                ['batterBox', 'lesson'].includes(product.productType) &&
                new Date(product.paymentDate).getMonth() + 1 === currentMonth - 1
        );

        if (!hasPreviousPurchase && hasValidProduct) {
            count++;
        }
        return count;
    }, 0);

    // 신규등록률
    const newRegistrationsRate = newMembers.length !== 0 ? (newRegistrations / newMembers.length) * 100 : 0;

    // 전달 신규등록률
    const previousMonthNewRegistrationsRate = previousMonthNewMembers !== 0 
        ? (previousMonthNewRegistrations / previousMonthNewMembers) * 100 : 0;







    // * -------------------------------
    // * 재등록
    // * -------------------------------

    // 재등록 대상
    const reRegisteredMembers = members.filter((member) => {
        const hasValidAvailableProduct = member.availableProducts.some(
            (product) =>
                (product.productType === 'batterBox' || product.productType === 'lesson') &&
                new Date(product.endDate).getMonth() + 1 === currentMonth
        );

        return hasValidAvailableProduct;
    });

    const reRegisteredMembersCount = reRegisteredMembers.length || 0;

    // 전달 재등록 대상 수
    const previousMonthReRegisteredMembers = members.filter((member) => {
        const hasValidAvailableProduct = member.availableProducts.some(
            (product) =>
                (product.productType === 'batterBox' || product.productType === 'lesson') &&
                new Date(product.endDate).getMonth() + 1 === currentMonth - 1
        );

        return hasValidAvailableProduct;
    }).length;

    // 재등록
    const reRegistrations = reRegisteredMembers.reduce((count, member) => {
        const hasPreviousPurchase = member.unavailableProducts.some((product) =>
            ['batterBox', 'lesson'].includes(product.productType)
        );

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

    // 전달 재등록
    const previousMonthReRegistrations = reRegisteredMembers.reduce((count, member) => {
        const hasPreviousPurchase = member.unavailableProducts.some((product) =>
            ['batterBox', 'lesson'].includes(product.productType)
        );

        const hasValidProduct = member.availableProducts.some(
            (product) =>
                ['batterBox', 'lesson'].includes(product.productType) &&
                new Date(product.paymentDate).getMonth() + 1 === currentMonth - 1
        );

        if (hasPreviousPurchase && hasValidProduct) {
            count++;
        }
        return count;
    }, 0);

    // 재등록률
    const allProjectsCount = reRegisteredMembers.filter((member) => {
        return member.unavailableProducts.some((product) => ['batterBox', 'lesson'].includes(product.productType));
    }).length;

    const reRegistrationsRate = allProjectsCount > 0 ? (reRegistrations / allProjectsCount) * 100 : 0;

    // 전달 재등록률
    const previousMonthReRegistrationsRate = allProjectsCount > 0 ? (previousMonthReRegistrations / allProjectsCount) * 100 : 0;




    // * -------------------------------
    // * 전달대비
    // * -------------------------------
    const calculatePercentageChange = (lastMonthValue, thisMonthValue) => {
        if (lastMonthValue === 0) {
            if (thisMonthValue === 0) {
                return 0;
            } else {
                return 100;
            }
        }

        const rawChange = ((thisMonthValue - lastMonthValue) / lastMonthValue) * 100;
        const cappedChange = Math.min(rawChange, 100);

        return isNaN(cappedChange) ? 0 : cappedChange;
    };

    return (
        <Row>
            <Col xs={6}>
                <StatisticsWidget
                    icon="mdi mdi-account-multiple"
                    title="신규등록률"
                    border="primary"
                    stats={newRegistrationsRate.toFixed(0) + '%'}
                    trend={{
                        textClass: `text-${
                            calculatePercentageChange(previousMonthNewRegistrationsRate, newRegistrationsRate) >= 0
                                ? 'success'
                                : 'danger'
                        }`,
                        icon: `mdi mdi-arrow-${
                            calculatePercentageChange(previousMonthNewRegistrationsRate, newRegistrationsRate) >= 0
                                ? 'up'
                                : 'down'
                        }-bold`,
                        value: `${Math.abs(
                            isNaN(calculatePercentageChange(previousMonthNewRegistrationsRate, newRegistrationsRate))
                                ? 0
                                : calculatePercentageChange(
                                      previousMonthNewRegistrationsRate,
                                      newRegistrationsRate
                                  ).toFixed(2)
                        )}%`,
                        time: '전달 대비',
                    }}
                />
            </Col>

            <Col xs={6}>
                <StatisticsWidget
                    icon="mdi mdi-account-multiple"
                    title="재등록률"
                    border="primary"
                    stats={reRegistrationsRate.toFixed(0) + '%'}
                    trend={{
                        textClass: `text-${
                            calculatePercentageChange(previousMonthReRegistrationsRate, reRegistrationsRate) >= 0
                                ? 'success'
                                : 'danger'
                        }`,
                        icon: `mdi mdi-arrow-${
                            calculatePercentageChange(previousMonthReRegistrationsRate, reRegistrationsRate) >= 0
                                ? 'up'
                                : 'down'
                        }-bold`,
                        value: `${Math.abs(
                            calculatePercentageChange(previousMonthReRegistrationsRate, reRegistrationsRate).toFixed(2)
                        )}%`,
                        time: '전달 대비',
                    }}
                />
            </Col>

            <Col xs={6}>
                <StatisticsWidget
                    icon="mdi mdi-account-multiple"
                    title="신규등록"
                    stats={newRegistrations + '명'}
                    trend={{
                        textClass: `text-${
                            calculatePercentageChange(previousMonthNewRegistrations, newRegistrations) >= 0
                                ? 'success'
                                : 'danger'
                        }`,
                        icon: `mdi mdi-arrow-${
                            calculatePercentageChange(previousMonthNewRegistrations, newRegistrations) >= 0
                                ? 'up'
                                : 'down'
                        }-bold`,
                        value: `${Math.abs(
                            calculatePercentageChange(previousMonthNewRegistrations, newRegistrations).toFixed(2)
                        )}%`,
                        time: '전달 대비',
                    }}
                />
            </Col>

            <Col xs={6}>
                <StatisticsWidget
                    icon="mdi mdi-account-multiple"
                    title="재등록"
                    stats={reRegistrations + '명'}
                    trend={{
                        textClass: `text-${
                            calculatePercentageChange(previousMonthReRegistrations, reRegistrations) >= 0
                                ? 'success'
                                : 'danger'
                        }`,
                        icon: `mdi mdi-arrow-${
                            calculatePercentageChange(previousMonthReRegistrations, reRegistrations) >= 0
                                ? 'up'
                                : 'down'
                        }-bold`,
                        value: `${Math.abs(
                            calculatePercentageChange(previousMonthReRegistrations, reRegistrations).toFixed(2)
                        )}%`,
                        time: '전달 대비',
                    }}
                />
            </Col>

            <Col xs={6}>
                <StatisticsWidget
                    icon="mdi mdi-account-multiple"
                    title="상담유입"
                    stats={newMembers.length + '명'}
                    trend={{
                        textClass: `text-${
                            calculatePercentageChange(previousMonthNewMembers, newMembers) >= 0 ? 'success' : 'danger'
                        }`,
                        icon: `mdi mdi-arrow-${
                            calculatePercentageChange(previousMonthNewMembers, newMembers) >= 0 ? 'up' : 'down'
                        }-bold`,
                        value: `${Math.abs(
                            calculatePercentageChange(previousMonthNewMembers, newMembers).toFixed(2)
                        )}%`,
                        time: '전달 대비',
                    }}
                />
            </Col>

            <Col xs={6}>
                <StatisticsWidget
                    icon="mdi mdi-account-multiple"
                    title="재등록대상"
                    stats={reRegisteredMembersCount + '명'}
                    trend={{
                        textClass: `text-${
                            calculatePercentageChange(previousMonthReRegisteredMembers, reRegisteredMembersCount) >= 0
                                ? 'success'
                                : 'danger'
                        }`,
                        icon: `mdi mdi-arrow-${
                            calculatePercentageChange(previousMonthReRegisteredMembers, reRegisteredMembersCount) >= 0
                                ? 'up'
                                : 'down'
                        }-bold`,
                        value: `${Math.abs(
                            calculatePercentageChange(previousMonthReRegisteredMembers, reRegisteredMembersCount).toFixed(2)
                        )}%`,
                        time: '전달 대비',
                    }}
                />
            </Col>
        </Row>
    );
};

export default Statistics;
