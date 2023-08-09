import React, { useEffect, useState } from 'react';
import StatisticsWidget from '../../../components/StatisticsWidget';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

const Statistics = ({
    previousActivateBatterboxMembers,
    previousActivateLessonMembers,
    activateBatterboxMembers,
    activateLessonMembers,
    members,
    index,
}) => {
    const allMember = members.length || 0; // 전체회원

    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    const currentBatterboxMembers = activateBatterboxMembers ? activateBatterboxMembers[currentDay - 1] : 0;
    const currentLessonMembers = activateLessonMembers ? activateLessonMembers[currentDay - 1] : 0;
    const previousBatterboxMembers = previousActivateBatterboxMembers
        ? previousActivateBatterboxMembers[currentDay - 1]
        : 0;
    const previouslessonMembers = previousActivateBatterboxMembers ? previousActivateLessonMembers[currentDay - 1] : 0;

    const [expiredMembers, setExpiredMembers] = useState(0); // 기간 만료회원
    const [taSeokActiveMembers, setTaSeokActiveMembers] = useState(0); // 타석 활성회원
    const [lessonActiveMembers, setLessonActiveMembers] = useState(0); // 레슨 활성회원
    const [taSeokExpires, setTaSeokExpires] = useState(0); // 타석 만료예정
    const [lessonExpires, setLessonExpires] = useState(0); // 레슨 만료예정

    const [membersLastMonth, setMembersLastMonth] = useState(0);
    const [lastMonthTaseok, setLastMonthTaseok] = useState(0);
    const [lastMonthLesson, setLastMonthLesson] = useState(0);

    const [membersChangeRate, setMembersChangeRate] = useState(0);
    const [taseokChangeRate, setTaseokChangeRate] = useState(0);
    const [lessonChangeRate, setLessonChangeRate] = useState(0);

    // 타석/레슨 회원 수, 만료예정 수
    useEffect(() => {
        const countMembersWithTaSeokProduct = () => {
            const taSeokMembers = members.filter((member) => {
                if (member.availableProducts && Array.isArray(member.availableProducts)) {
                    return member.availableProducts.some((product) => product.productType === 'batterBox');
                }

                return false;
            });

            const count = taSeokMembers.length;
            setTaSeokActiveMembers(count);

            const countExpiresSoon = taSeokMembers.filter((member) => {
                if (Array.isArray(member.availableProducts)) {
                    return member.availableProducts.some((product) => product.dDay <= 30);
                }
                return false;
            }).length;

            setTaSeokExpires(countExpiresSoon);
        };

        const countMembersWithLessonProduct = () => {
            const lessonMembers = members.filter((member) => {
                if (member.availableProducts && Array.isArray(member.availableProducts)) {
                    return member.availableProducts.some((product) => product.productType === 'lesson');
                }

                return false;
            });

            const count = lessonMembers.length;
            setLessonActiveMembers(count);

            const countExpiresSoon = lessonMembers.filter((member) => {
                if (Array.isArray(member.availableProducts)) {
                    return member.availableProducts.some((product) => product.dDay <= 30);
                }
                return false;
            }).length;

            setLessonExpires(countExpiresSoon);
        };

        countMembersWithTaSeokProduct();
        countMembersWithLessonProduct();
    }, [members]);

    // 전체회원 전달 대비
    useEffect(() => {
        const today = new Date();
        const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        let lastMonthCount = 0;
        let thisMonthCount = 0;

        members.forEach((member) => {
            const createdDate = new Date(member.createdDate);

            if (createdDate >= firstDayOfLastMonth && createdDate <= lastDayOfLastMonth) {
                lastMonthCount++;
            }

            if (createdDate >= firstDayOfThisMonth) {
                thisMonthCount++;
            }
        });

        setMembersLastMonth(lastMonthCount);

        let membersThisMonthValue = thisMonthCount;

        if (membersLastMonth === 0) {
            setMembersChangeRate(membersThisMonthValue === 0 ? 0 : 100);
        } else {
            const increase = membersThisMonthValue - membersLastMonth;
            const percentage = (increase / membersLastMonth) * 100;
            setMembersChangeRate(percentage);
        }
    }, [members, allMember, membersLastMonth, membersChangeRate]);

    // 기간만료 회원
    useEffect(() => {
        const FindUserWithMissingValue = () => {
            let count = 0;

            members.filter((member) => {
                if (
                    (!member.availableProducts || member.availableProducts.length === 0) &&
                    member.unavailableProducts &&
                    member.unavailableProducts.length > 0
                ) {
                    count++;
                }
            });
            setExpiredMembers(count);
        };
        FindUserWithMissingValue();
    }, [members]);

    // 타석/레슨 전달 대비
    useEffect(() => {
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const lastMonthIndex = lastMonth.getMonth() + 1; // 전달

        // 지난달 활성 회원을 구하는 함수
        const getLastMonthMembers = (members, targetProduct) => {
            const lastMonth = new Date(today);
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            const lastMonthIndex = lastMonth.getMonth() + 1;

            return members.filter((member) => {
                const { availableProducts, unavailableProducts } = member;

                const hasTargetProduct = (products) =>
                    Array.isArray(products) &&
                    products.some((product) => product.product && product.product.productType === targetProduct);

                const isWithinTargetMonths = (startDate, endDate) => {
                    const startMonth = new Date(startDate).getMonth() + 1;
                    const endMonth = new Date(endDate).getMonth() + 1;

                    return lastMonthIndex >= startMonth && lastMonthIndex <= endMonth;
                };

                const hasAvailableInLastMonth =
                    hasTargetProduct(availableProducts) &&
                    availableProducts.some((product) => isWithinTargetMonths(product.startDate, product.endDate));

                const hasUnavailableInLastMonth =
                    hasTargetProduct(unavailableProducts) &&
                    unavailableProducts.some((product) => isWithinTargetMonths(product.startDate, product.endDate));

                return hasAvailableInLastMonth || hasUnavailableInLastMonth;
            });
        };

        const lastMonthMembersForTaseok = getLastMonthMembers(members, 'batterBox');
        const lastMonthMembersForLesson = getLastMonthMembers(members, 'lesson');

        // 상승률 계산
        const calculatePercentageChange = (lastMonthValue, thisMonthValue) => {
            if (lastMonthValue === 0) {
                return thisMonthValue === 0 ? 0 : 100;
            }

            const rawChange = ((thisMonthValue - lastMonthValue) / lastMonthValue) * 100;
            const cappedChange = Math.min(rawChange, 100);

            return cappedChange;
        };

        setTaseokChangeRate(calculatePercentageChange(lastMonthTaseok, taSeokActiveMembers));
        setLessonChangeRate(calculatePercentageChange(lastMonthLesson, lessonActiveMembers));
    }, [
        members,
        lastMonthLesson,
        lastMonthTaseok,
        lessonActiveMembers,
        taSeokActiveMembers,
        lessonChangeRate,
        taseokChangeRate,
    ]);

    const calculatePercentageChange = (lastMonthValue, thisMonthValue) => {
        if (lastMonthValue === 0) {
            return thisMonthValue === 0 ? 0 : 100;
        }

        const rawChange = ((thisMonthValue - lastMonthValue) / lastMonthValue) * 100;
        const cappedChange = Math.min(rawChange, 100);

        return isNaN(cappedChange) ? 0 : cappedChange;
    };

    return (
        <>
            {index === 1 ? (
                <Row>
                    <Col xl={12} xs={6}>
                        <StatisticsWidget
                            height={186}
                            icon="uil uil-users-alt float-end"
                            // description="Revenue"
                            title="타석 활성 회원"
                            stats={currentBatterboxMembers + '명'}
                            trend={{
                                textClass: `text-${
                                    calculatePercentageChange(previousBatterboxMembers, currentBatterboxMembers) >= 0
                                        ? 'success'
                                        : 'danger'
                                }`,
                                icon: `mdi mdi-arrow-${
                                    calculatePercentageChange(previousBatterboxMembers, currentBatterboxMembers) >= 0
                                        ? 'up'
                                        : 'down'
                                }-bold`,
                                value: `${Math.abs(
                                    calculatePercentageChange(
                                        previousBatterboxMembers,
                                        currentBatterboxMembers
                                    ).toFixed(2)
                                )}%`,
                                time: '전달 대비',
                            }}
                        />
                    </Col>
                    <Col xl={12} xs={6}>
                        <StatisticsWidget
                            height={186}
                            icon="uil uil-stopwatch float-end danger"
                            border="danger"
                            // description="Refund"
                            title={
                                <>
                                    타석 만료 예정
                                    <OverlayTrigger
                                        overlay={<Tooltip id="tooltip-disabled">1개월 내 만료 예정 회원</Tooltip>}>
                                        <span className="d-inline-block">
                                            <button
                                                disabled
                                                style={{ pointerEvents: 'none', border: 'none', background: 'none' }}>
                                                <i className="uil uil-question-circle" />
                                            </button>
                                        </span>
                                    </OverlayTrigger>
                                </>
                            }
                            stats={taSeokExpires + '명'}
                        />
                    </Col>
                    <Col xl={12} xs={6}>
                        <StatisticsWidget
                            height={186}
                            icon="uil uil-users-alt float-end"
                            // description="Refund"
                            title="레슨 활성 회원"
                            stats={currentLessonMembers + '명'}
                            trend={{
                                textClass: `text-${
                                    calculatePercentageChange(previouslessonMembers, currentLessonMembers) >= 0
                                        ? 'success'
                                        : 'danger'
                                }`,
                                icon: `mdi mdi-arrow-${
                                    calculatePercentageChange(previouslessonMembers, currentLessonMembers) >= 0
                                        ? 'up'
                                        : 'down'
                                }-bold`,
                                value: `${Math.abs(
                                    calculatePercentageChange(previouslessonMembers, currentLessonMembers).toFixed(2)
                                )}%`,
                                time: '전달 대비',
                            }}
                        />
                    </Col>
                    <Col xl={12} xs={6}>
                        <StatisticsWidget
                            height={186}
                            icon="uil uil-stopwatch float-end danger"
                            border="danger"
                            // description="Refund"
                            title={
                                <>
                                    레슨 만료 예정
                                    <OverlayTrigger
                                        overlay={<Tooltip id="tooltip-disabled">1개월 내 만료 예정 회원</Tooltip>}>
                                        <span className="d-inline-block">
                                            <button
                                                disabled
                                                style={{ pointerEvents: 'none', border: 'none', background: 'none' }}>
                                                <i className="uil uil-question-circle" />
                                            </button>
                                        </span>
                                    </OverlayTrigger>
                                </>
                            }
                            stats={lessonExpires + '명'}
                        />
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col xl={12} xs={6}>
                        <StatisticsWidget
                            height={186}
                            icon="uil uil-users-alt float-end"
                            // description="Revenue"
                            title="전체 회원"
                            stats={allMember + '명'}
                            trend={{
                                textClass: 'text-success',
                                icon: `mdi mdi-arrow-${membersChangeRate >= 0 ? 'up' : 'down'}-bold`,
                                value: `${Math.abs(membersChangeRate.toFixed(2))}%`,
                                time: '전달 대비',
                            }}
                        />
                    </Col>
                    <Col xl={12} xs={6}>
                        <StatisticsWidget
                            height={186}
                            icon="uil uil-stopwatch float-end danger"
                            border="danger"
                            // description="Refund"
                            // title="기간 만료 회원"
                            title={
                                <>
                                    기간 만료 회원
                                    <OverlayTrigger
                                        overlay={<Tooltip id="tooltip-disabled">상품 이용 기간이 만료된 회원</Tooltip>}>
                                        <span className="d-inline-block">
                                            <button
                                                disabled
                                                style={{ pointerEvents: 'none', border: 'none', background: 'none' }}>
                                                <i className="uil uil-question-circle" />
                                            </button>
                                        </span>
                                    </OverlayTrigger>
                                </>
                            }
                            stats={expiredMembers + '명'}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};

export default Statistics;
