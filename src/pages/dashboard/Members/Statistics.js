import React, { useEffect, useMemo, useState } from 'react';
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
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;

    const currentBatterboxMembers = activateBatterboxMembers ? activateBatterboxMembers[currentDay - 1] : 0; // 타석 활성회원
    const currentLessonMembers = activateLessonMembers ? activateLessonMembers[currentDay - 1] : 0; // 레슨 활성회원
    const previousBatterboxMembers = previousActivateBatterboxMembers ? previousActivateBatterboxMembers[currentDay - 1] : 0;
    const previouslessonMembers = previousActivateBatterboxMembers ? previousActivateLessonMembers[currentDay - 1] : 0;

    const [taSeokExpires, setTaSeokExpires] = useState(0); // 타석 만료예정
    const [lessonExpires, setLessonExpires] = useState(0); // 레슨 만료예정
    const [expiredMembers, setExpiredMembers] = useState(0); // 기간 만료회원

    // 상담 유입
    const newMembers = useMemo(() => {
        return members.filter((member) => {
            const createdDate = new Date(member.createdDate);
            const createdMonth = createdDate.getMonth() + 1;

            return createdMonth === currentMonth;
        });
    }, [members, currentMonth]);
    const previousMembers = members.length - newMembers.length;

    
    // 타석/레슨 만료예정
    useEffect(() => {
        const countMembersWithTaSeokProduct = () => {
            const count = members.filter((member) =>
                member.availableProducts?.some((product) =>
                    product.productType === 'batterBox' && product.dDay <= 30
                )
            ).length;
        
            setTaSeokExpires(count);
        };

        const countMembersWithLessonProduct = () => {
            const count = members.filter((member) =>
                member.availableProducts?.some((product) =>
                    product.productType === 'lesson' && product.dDay <= 30
                )
            ).length;
        
            setLessonExpires(count);
        };
        
        countMembersWithTaSeokProduct();
        countMembersWithLessonProduct();
    }, [members]);

    // 기간만료 회원
    useEffect(() => {
        const FindUserWithMissingValue = () => {
            let count = 0;
    
            members.filter((member) => {
                if (
                    (!member.availableProducts || member.availableProducts.length === 0) &&
                    member.unavailableProducts && member.unavailableProducts.some((product) =>
                        product.productType === 'batterBox' || product.productType === 'lesson'
                    )
                ) {
                    count++;
                }
            });
            setExpiredMembers(count);
        };
    
        FindUserWithMissingValue();
    }, [members]);

    // 전달대비
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
                            title="전체 회원"
                            stats={members.length + '명'}
                            trend={{
                                textClass: `text-${
                                    calculatePercentageChange(previousMembers, newMembers) >= 0
                                        ? 'success'
                                        : 'danger'
                                }`,
                                icon: `mdi mdi-arrow-${
                                    calculatePercentageChange(previousMembers, newMembers) >= 0
                                        ? 'up'
                                        : 'down'
                                }-bold`,
                                value: `${Math.abs(
                                    calculatePercentageChange(previousMembers, newMembers).toFixed(2)
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
