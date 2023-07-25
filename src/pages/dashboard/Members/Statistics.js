import React, { useEffect, useState } from 'react';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ members, index }) => {
    const allMember = members.length; // 전체회원
    const [expiredMembers, setExpiredMembers] = useState(0); // 기간 만료회원
    const [taSeokActiveMembers, setTaSeokActiveMembers] = useState(0); // 타석 활성회원
    const [lessonActiveMembers, setLessonActiveMembers] = useState(0); // 레슨 활성회원
    const [taSeokExpires, setTaSeokExpires] = useState(0); // 타석 만료예정
    const [lessonExpires, setLessonExpires] = useState(0); // 레슨 만료예정

    const [membersLastMonth, setMembersLastMonth] = useState(0);
    const [membersThisMonth, setMembersThisMonth] = useState(0);
    const [percentageIncrease, setPercentageIncrease] = useState(0); // 전체회원 전달대비ㄴ율

    const [lastMonthTaseok, setLastMonthTaseok] = useState(0);
    const [lastMonthLesson, setLastMonthLesson] = useState(0);

    const [taseokChangeRate, setTaseokChangeRate] = useState(0);
    const [lessonChangeRate, setLessonChangeRate] = useState(0);

    // 타석/레슨 회원 수, 만료예정 수
    useEffect(() => {
        const countMembersWithTaSeokProduct = () => {
            const taSeokMembers = members.filter((member) => member.taSeokActive === true);

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
            const lessonMembers = members.filter((member) => member.lessonActive === true);

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
        setMembersThisMonth(thisMonthCount);

        if (membersLastMonth === 0) {
            setPercentageIncrease(membersThisMonth === 0 ? 0 : 100);
        } else {
            const increase = membersThisMonth - membersLastMonth;
            const percentage = (increase / membersLastMonth) * 100;
            setPercentageIncrease(percentage);
        }

        // console.log(percentageIncrease)
    }, [members, allMember, membersLastMonth, percentageIncrease, membersThisMonth]);

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
                    // console.log('기간만료 회원:', member.name)
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
                    products.some((product) => product.product && product.product.includes(targetProduct));

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

        const lastMonthMembersForTaseok = getLastMonthMembers(members, '타석');
        const lastMonthMembersForLesson = getLastMonthMembers(members, '레슨');

        setLastMonthTaseok(lastMonthMembersForTaseok.length);
        setLastMonthLesson(lastMonthMembersForLesson.length);

        // console.log('지난달 타석 활성 회원:', lastMonthMembersForTaseok, lastMonthTaseok);
        // console.log('지난달 레슨 활성 회원:', lastMonthMembersForLesson, lastMonthLesson);

        // 상승률 계산
        const calculatePercentageChange = (lastMonthValue, thisMonthValue) => {
            if (lastMonthValue === 0) {
                return thisMonthValue === 0 ? 0 : 100;
            }

            return ((thisMonthValue - lastMonthValue) / lastMonthValue) * 100;
        };

        setTaseokChangeRate(calculatePercentageChange(lastMonthTaseok, taSeokActiveMembers));
        setLessonChangeRate(calculatePercentageChange(lastMonthLesson, lessonActiveMembers));

        // console.log(`전달 대비 이번달 상승 또는 하락 비율: ${taseokChangeRate}%, ${lessonChangeRate}%`);
    }, [
        members,
        lastMonthLesson,
        lastMonthTaseok,
        lessonActiveMembers,
        taSeokActiveMembers,
        lessonChangeRate,
        taseokChangeRate,
    ]);

    return (
        <>
            {index === 1 ? (
                <>
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-users-alt float-end"
                        description="Revenue"
                        title="타석 활성 회원"
                        stats={taSeokActiveMembers + '명'}
                        trend={{
                            textClass: `text-${taseokChangeRate >= 0 ? 'success' : 'danger'}`,
                            icon: `mdi mdi-arrow-${taseokChangeRate >= 0 ? 'up' : 'down'}-bold`,
                            value: `${Math.abs(taseokChangeRate.toFixed(2))}%`,
                            time: '전달 대비',
                        }}
                    />
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-stopwatch float-end danger"
                        border="danger"
                        description="Refund"
                        title="타석 만료 예정 회원 (1개월 내)"
                        stats={taSeokExpires + '명'}
                    />
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-users-alt float-end"
                        description="Refund"
                        title="레슨 활성 회원"
                        stats={lessonActiveMembers + '명'}
                        trend={{
                            textClass: `text-${lessonChangeRate >= 0 ? 'success' : 'danger'}`,
                            icon: `mdi mdi-arrow-${lessonChangeRate >= 0 ? 'up' : 'down'}-bold`,
                            value: `${Math.abs(lessonChangeRate.toFixed(2))}%`,
                            time: '전달 대비',
                        }}
                    />
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-stopwatch float-end danger"
                        border="danger"
                        description="Refund"
                        title="레슨 만료 예정 회원 (1개월 내)"
                        stats={lessonExpires + '명'}
                    />
                </>
            ) : (
                <>
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-users-alt float-end"
                        description="Revenue"
                        title="전체 회원"
                        stats={allMember + '명'}
                        trend={{
                            textClass: 'text-success',
                            icon: `mdi mdi-arrow-${percentageIncrease >= 0 ? 'up' : 'down'}-bold`,
                            value: `${Math.abs(percentageIncrease.toFixed(2))}%`,
                            time: '전달 대비',
                        }}
                    />
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-stopwatch float-end danger"
                        border="danger"
                        description="Refund"
                        title="기간 만료 회원"
                        stats={expiredMembers + '명'}
                    />
                </>
            )}
        </>
    );
};

export default Statistics;
