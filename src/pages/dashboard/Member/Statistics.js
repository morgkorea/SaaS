import React, { useState } from 'react';
import StatisticsWidget from '../../../components/StatisticsWidget';

const Statistics = ({ members, index }) => {
    const allMember = members.length;
    let expiredUser = 2; // 만료예정 / 기간만료회원

    
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

            <StatisticsWidget
                height={186}
                icon="uil uil-window-restore float-end"
                border="danger"
                description="Refund"
                title={index === 1 ? '만료예정 회원(1개월 내 만료예정)' : '기간 만료 회원'}
                stats={expiredUser + '명'}
                trend={{
                    textClass: 'text-danger',
                    icon: 'mdi mdi-arrow-down-bold',
                    value: '1.87%',
                    time: '전달 대비',
                }}></StatisticsWidget>
        </>
    );
};

export default Statistics;
