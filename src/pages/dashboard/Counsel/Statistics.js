import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';
import Chart from 'react-apexcharts';

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
    const previousMonthNewRegistrationsRate =
        previousMonthNewMembers !== 0 ? (previousMonthNewRegistrations / previousMonthNewMembers) * 100 : 0;

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
    const previousMonthReRegistrationsRate =
        allProjectsCount > 0 ? (previousMonthReRegistrations / allProjectsCount) * 100 : 0;

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

    // * -------------------------------
    // * 목표 설정 컴포넌트
    // * -------------------------------ㄴ
    const [targetSales, setTargetSales] = useState(0);

    useEffect(() => {
        const savedTargetSales = localStorage.getItem('targetSales');
        if (savedTargetSales) {
            setTargetSales(Number(savedTargetSales));
        }
    }, []);

    const handleTargetChange = (event) => {
        const inputText = event.target.value;
        const numberInput = inputText.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
        setTargetSales(Number(numberInput));
    };

    const handleSaveClick = () => {
        localStorage.setItem('targetSales', targetSales.toString());
        alert('목표가 저장되었습니다.');
    };

    const calculateProgress = () => {
        if (targetSales === 0) {
            return 0;
        }

        const progress = (newRegistrationsRate / targetSales) * 100;

        return Math.min(100, progress);
    };

    // 차트
    const apexBarChartOpts = {
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                    margin: 0,
                    size: '60%',
                    background: 'transparent',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#fff',
                        fontSize: '17px',
                    },
                    value: {
                        formatter: function (val) {
                            return parseInt(val);
                        },
                        color: '#111',
                        fontSize: '36px',
                        show: true,
                    },
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                // shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100],
            },
        },
        stroke: {
            lineCap: 'round',
        },
        labels: ['달성율'],
    };

    const apexBarChartData = [calculateProgress()];

    return (
        <Row>
            <Col xs={12} xl={6}>
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h5>
                                <span className="text-primary">이번달 목표</span>를 설정하고 목표를 향해 같이 열심히
                                해봐요!
                            </h5>
                            <Button className="ms-2 py-1 px-3">설정하기</Button>
                        </div>
                    </Card.Body>
                </Card>

                <Card className="bg-info text-white">
                    <Card.Body>
                        <h5>목표</h5>
                        {/* <div className='d-flex'>
                            <div>진행중</div>
                            <p className='ms-2'>100,000,000 중 60,000,000원 을 달성했어요.</p>
                        </div> */}
                        <div className="d-flex align-items-center mt-2">
                            <ProgressBar
                                now={calculateProgress()}
                                style={{ width: '300px' }}
                                className="progress-lg"
                                variant="dark"
                            />
                            <h3 className="ms-2">{calculateProgress().toFixed(2)} %</h3>
                        </div>
                    </Card.Body>
                </Card>

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <h4>신규등록률</h4>
                                <Chart
                                    options={apexBarChartOpts}
                                    series={apexBarChartData}
                                    type="radialBar"
                                    className="apex-charts"
                                    height={304}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <h4>목표</h4>
                                <Chart
                                    options={apexBarChartOpts}
                                    series={apexBarChartData}
                                    type="radialBar"
                                    className="apex-charts"
                                    height={304}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>

            <Col sx={12} xl={6}>
                <Row>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <h5 className="fw-normal mt-0">신규등록률</h5>
                                <h3 className="mt-3 mb-3">{newRegistrationsRate.toFixed(2)}%</h3>
                                <label>
                                    목표:
                                    <input
                                        className="editInput ms-2"
                                        style={{ width: '50px' }}
                                        type="text"
                                        value={targetSales}
                                        onChange={handleTargetChange}
                                    />{' '}
                                    %
                                </label>
                                <Button className="ms-2 py-0 px-1" onClick={handleSaveClick}>
                                    <i className="mdi mdi-content-save" />
                                </Button>
                                <p>달성율 : {calculateProgress().toFixed(2)}%</p>
                                <p>달성하기 위해 {(100 - calculateProgress()).toFixed(2)}% 남았습니다</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={6}>
                        <StatisticsWidget
                            icon="mdi mdi-account-multiple"
                            title="재등록률"
                            border="primary"
                            stats={reRegistrationsRate.toFixed(0) + '%'}
                            trend={{
                                textClass: `text-${
                                    calculatePercentageChange(previousMonthReRegistrationsRate, reRegistrationsRate) >=
                                    0
                                        ? 'success'
                                        : 'danger'
                                }`,
                                icon: `mdi mdi-arrow-${
                                    calculatePercentageChange(previousMonthReRegistrationsRate, reRegistrationsRate) >=
                                    0
                                        ? 'up'
                                        : 'down'
                                }-bold`,
                                value: `${Math.abs(
                                    calculatePercentageChange(
                                        previousMonthReRegistrationsRate,
                                        reRegistrationsRate
                                    ).toFixed(2)
                                )}%`,
                                time: '전달 대비',
                            }}
                        />
                    </Col>

                    <Col xs={6}>
                        <StatisticsWidget
                            icon="mdi mdi-account-multiple"
                            title="신규등록/이탈"
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
                                    calculatePercentageChange(previousMonthNewRegistrations, newRegistrations).toFixed(
                                        2
                                    )
                                )}%`,
                                time: '전달 대비',
                            }}
                        />
                    </Col>

                    <Col xs={6}>
                        <StatisticsWidget
                            icon="mdi mdi-account-multiple"
                            title="재등록/이탈"
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
                                    calculatePercentageChange(previousMonthNewMembers, newMembers) >= 0
                                        ? 'success'
                                        : 'danger'
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
                            link={{
                                value: '/database/members-db',
                            }}
                        />
                    </Col>
                </Row>
            </Col>

            {/* <Col sx={12} xl={6}>
                <h4>타석</h4>
                <Row>
                    <Col xs={6}>
                        <StatisticsWidget
                            icon="mdi mdi-account-multiple"
                            title="신규등록률"
                            border="primary"
                            stats={newRegistrationsRate.toFixed(0) + '%'}
                            trend={{
                                textClass: `text-${
                                    calculatePercentageChange(
                                        previousMonthNewRegistrationsRate,
                                        newRegistrationsRate
                                    ) >= 0
                                        ? 'success'
                                        : 'danger'
                                }`,
                                icon: `mdi mdi-arrow-${
                                    calculatePercentageChange(
                                        previousMonthNewRegistrationsRate,
                                        newRegistrationsRate
                                    ) >= 0
                                        ? 'up'
                                        : 'down'
                                }-bold`,
                                value: `${Math.abs(
                                    isNaN(
                                        calculatePercentageChange(
                                            previousMonthNewRegistrationsRate,
                                            newRegistrationsRate
                                        )
                                    )
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
                                    calculatePercentageChange(previousMonthReRegistrationsRate, reRegistrationsRate) >=
                                    0
                                        ? 'success'
                                        : 'danger'
                                }`,
                                icon: `mdi mdi-arrow-${
                                    calculatePercentageChange(previousMonthReRegistrationsRate, reRegistrationsRate) >=
                                    0
                                        ? 'up'
                                        : 'down'
                                }-bold`,
                                value: `${Math.abs(
                                    calculatePercentageChange(
                                        previousMonthReRegistrationsRate,
                                        reRegistrationsRate
                                    ).toFixed(2)
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
                                    calculatePercentageChange(previousMonthNewRegistrations, newRegistrations).toFixed(
                                        2
                                    )
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
                                    calculatePercentageChange(previousMonthNewMembers, newMembers) >= 0
                                        ? 'success'
                                        : 'danger'
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
                            link={{
                                value: '/database/members-db',
                            }}
                        />
                    </Col>
                </Row>
            </Col> */}
        </Row>
    );
};

export default Statistics;
