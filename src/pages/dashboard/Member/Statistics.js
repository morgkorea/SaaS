import React, { useEffect, useState } from 'react';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ members, index }) => {
    const allMember = members.length;
    const [expires30Days, setExpires30Days] = useState(0);
    const [expiredMembers, setExpiredMembers] = useState(0);

    // 기간만료 회원 (availableProducts X, unavailableProducts O)
    useEffect(() => {
        const FindUserWithMissingValue = () => {
            let count = 0;
            members.filter((member) => {
                if (!member.availableProducts && member.unavailableProducts) {
                    count++;
                }
            });

            setExpiredMembers(count);
        };

        FindUserWithMissingValue();
    }, []);

    // 만료 예정 회원 (availableProducts의 endData가 30일 이내 인 회원)
    useEffect(() => {
        const filterDataWithin30Days = () => {
            const today = new Date();

            const filteredMembers = members.filter((member) => {
                if (member.availableProducts) {
                    const endDate = member?.availableProducts
                        .map((products) => products.endDate)
                        .filter((endDate) => endDate !== '' && typeof endDate !== 'undefined');

                    // console.log(endDate);
                }
                return false;
            });

            // console.log('30일 이내 만료 예정 회원:', filteredMembers);
            // setExpires30Days(filteredMembers);
        };

        filterDataWithin30Days();
    }, [members]);

    return (
        <>
            <StatisticsWidget
                height={186}
                icon="uil uil-users-alt float-end"
                description="Revenue"
                title={index === 1 ? '활성 회원' : '전체 회원'}
                stats={allMember + '명'}
                trend={{
                    textClass: 'text-success',
                    icon: 'mdi mdi-arrow-up-bold',
                    value: '1%',
                    time: '전달 대비',
                }}></StatisticsWidget>

            {index === 1 ? (
                <StatisticsWidget
                    height={186}
                    icon="uil uil-window-restore float-end"
                    border="danger"
                    description="Refund"
                    title="만료 예정 회원 (1개월 내)"
                    stats={expires30Days + '명'}
                    trend={{
                        textClass: 'text-danger',
                        icon: 'mdi mdi-arrow-down-bold',
                        value: '1.87%',
                        time: '전달 대비',
                    }}></StatisticsWidget>
            ) : (
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
            )}
        </>
    );
};

export default Statistics;
