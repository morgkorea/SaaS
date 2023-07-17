import React, { useEffect, useState } from 'react';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ members, index }) => {
    const allMember = members.length; // 전체회원
    const [teeActiveMembers, setTeeActiveMembers] = useState(0); // 타석활성회원
    const [lessonActiveMembers, setLessonActiveMembers] = useState(0); // 레슨활성회원
    const [teeExpires, setTeeExpires] = useState(0); // 타석만료예정
    const [lessonExpires, setLessonExpires] = useState(0); // 레슨만료예정
    const [expiredMembers, setExpiredMembers] = useState(0); // 기간 만료회원

    useEffect(() => {
        const countMembersWithTeeProduct = () => {
            const count = members.filter((member) => {
                return (
                    Array.isArray(member.availableProducts) &&
                    member.availableProducts.some((product) => product.product === '타석')
                );
            }).length;
            return setTeeActiveMembers(count);
        };

        const countMembersWithLessonProduct = () => {
            const count = members.filter((member) => {
                return (
                    Array.isArray(member.availableProducts) &&
                    member.availableProducts.some((product) => product.product.includes('레슨'))
                );
            }).length;

            return setLessonActiveMembers(count);
        };

        const filterDataWithin30Days = () => {
            const today = new Date();
            const thirtyDaysFromNow = new Date();
            thirtyDaysFromNow.setDate(today.getDate() + 30);

            let teeCount = 0;
            let lessonCount = 0;

            const filteredMembers = members.filter((member) => {
                if (Array.isArray(member.availableProducts) && member.availableProducts.length > 0) {
                  const hasTeeProductWithin30Days = member.availableProducts.some((product) => {
                    if (product && product.product === '타석' && product.endDate) {
                      const endDate = new Date(product.endDate);
                      return endDate >= today && endDate <= thirtyDaysFromNow;
                    }
                    return false;
                  });
            
                  const hasLessonProductWithin30Days = member.availableProducts.some((product) => {
                    if (product && product.product === '레슨' && product.endDate) {
                      const endDate = new Date(product.endDate);
                      return endDate >= today && endDate <= thirtyDaysFromNow;
                    }
                    return false;
                  });
            
                  if (hasTeeProductWithin30Days) {
                    teeCount++;
                  }
            
                  if (hasLessonProductWithin30Days) {
                    lessonCount++;
                  }
            
                  return hasTeeProductWithin30Days || hasLessonProductWithin30Days;
                }
                return false;
              });

            setTeeExpires(teeCount);
            setLessonExpires(lessonCount);
        };

        countMembersWithTeeProduct();
        countMembersWithLessonProduct();
        filterDataWithin30Days();
    }, [members]);

    useEffect(() => {
        const FindUserWithMissingValue = () => {
            let count = 0;

            members.filter((member) => {
                if ((!member.availableProducts || member.availableProducts.length === 0) && member.unavailableProducts && member.unavailableProducts.length > 0) {
                    count++;
                    // console.log('기간만료 회원:', member.name)
                }
            });
            setExpiredMembers(count);
        };
        FindUserWithMissingValue();
    }, [members]);

    return (
        <>
            {index === 1 ? (
                <>
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-users-alt float-end"
                        description="Revenue"
                        title='타석 활성 회원'
                        stats={teeActiveMembers + '명'}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '1%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-window-restore float-end"
                        border="danger"
                        description="Refund"
                        title="타석 만료 예정 회원 (1개월 내)"
                        stats={teeExpires + '명'}
                        // trend={{
                        //     textClass: 'text-danger',
                        //     icon: 'mdi mdi-arrow-down-bold',
                        //     value: '1.87%',
                        //     time: '전달 대비',
                        // }}
                        ></StatisticsWidget>
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-window-restore float-end"
                        description="Refund"
                        title="레슨 활성 회원"
                        stats={lessonActiveMembers + '명'}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: '1.87%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-window-restore float-end"
                        border="danger"
                        description="Refund"
                        title="레슨 만료 예정 회원 (1개월 내)"
                        stats={lessonExpires + '명'}
                        // trend={{
                        //     textClass: 'text-danger',
                        //     icon: 'mdi mdi-arrow-down-bold',
                        //     value: '1.87%',
                        //     time: '전달 대비',
                        // }}
                        ></StatisticsWidget>
                </>
            ) : (
                <>
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-users-alt float-end"
                        description="Revenue"
                        title='전체 회원'
                        stats={allMember + '명'}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '1%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                    <StatisticsWidget
                        height={186}
                        icon="uil uil-window-restore float-end"
                        border="danger"
                        description="Refund"
                        title="기간 만료 회원"
                        stats={expiredMembers + '명'}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'mdi mdi-arrow-down-bold',
                            value: '1.87%',
                            time: '전달 대비',
                        }}></StatisticsWidget>
                </>
            )}
        </>
    );
};

export default Statistics;
