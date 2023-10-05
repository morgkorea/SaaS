import React, { useEffect, useRef } from 'react';
import { Button, Card, Col, Dropdown, Nav, NavDropdown, Row, Spinner, Tab } from 'react-bootstrap';
import { useState } from 'react';
import { firestoreDB } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { query } from 'firebase/database';
import data from './tabContents';
import CustomersTableWrap from './CustomersTableWrap';

const CustomersIndex = () => {
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [tabContents, setTabContents] = useState(data);
    const [activeTab, setActiveTab] = useState('전체회원');
    const [activeGroups, setActiveGroups] = useState(['전체']);
    const [selectedSubcategory, setSelectedSubcategory] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const [showMessage, setShowMessage] = useState(false);

    const email = useSelector((state) => state.Auth?.user.email);
    const prevActiveTabRef = useRef(activeTab);
    const selectedType = getTypeForActiveTab(activeTab);
    const isMaxReached = activeGroups.length >= 10;

    useEffect(() => {
        if (prevActiveTabRef.current !== activeTab) {
            setActiveGroups(['전체']);
            setSelectedSubcategory({});
        }

        prevActiveTabRef.current = activeTab;

        const fetchData = async () => {
            setIsLoading(true);

            const q = query(collection(firestoreDB, 'Users', email, 'Members'));
            const querySnapshot = await getDocs(q);
            const members = [];

            querySnapshot.forEach((doc) => {
                const memberData = doc.data();
                if (applyTitleFilter(memberData, activeTab) && applyGroupFilter(memberData, activeGroups)) {
                    members.push(memberData);
                }
            });

            setFilteredMembers(members);
            setIsLoading(false);
        };

        fetchData();
    }, [activeTab, activeGroups, email]);

    function getTypeForActiveTab(activeTab) {
        for (const tab of tabContents) {
            if (tab.title === activeTab) {
                return tab.type;
            }
        }
        return null;
    }

    function applyTitleFilter(member, titleFilter) {
        switch (titleFilter) {
            case '전체회원':
                return true;
            case '레슨회원':
                return member.availableProducts.some((product) => product.productType === 'lesson');
            case '타석회원':
                return member.availableProducts.some((product) => product.productType === 'batterBox');
            default:
                return false;
        }
    }

    function applyGroupFilter(member, groupFilters) {
        return groupFilters.some((groupFilter) => {
            switch (groupFilter) {
                case '전체':
                    return true;
                case '활성':
                    return (
                        member.availableProducts &&
                        member.availableProducts.length > 0 &&
                        member.availableProducts.some(
                            (product) => product.productType === 'batterBox' || product.productType === 'lesson'
                        )
                    );
                case '만료':
                    return (
                        (!member.availableProducts || member.availableProducts.length === 0) &&
                        member.unavailableProducts &&
                        member.unavailableProducts.some(
                            (product) => product.productType === 'batterBox' || product.productType === 'lesson'
                        )
                    );

                // 레슨 & 타석
                case '잔여 30일 이상':
                    return member.availableProducts.some(
                        (product) => product.productType === selectedType && product.dDay >= 30
                    );
                case '만료 14일전':
                    return member.availableProducts.some(
                        (product) => product.productType === selectedType && product.dDay < 14
                    );
                case '만료 7일전':
                    return member.availableProducts.some(
                        (product) => product.productType === selectedType && product.dDay < 7
                    );

                // 구력별
                case '비기너':
                    return member.golfPeriod === '비기너';
                case '1~3년':
                    return member.golfPeriod === '1~3년';
                case '3~5년':
                    return member.golfPeriod === '3~5년';
                case '5년 이상':
                    return member.golfPeriod === '5년 이상';

                // 연령별
                case '10대':
                    return member.ageGroup === '10대';
                case '20대':
                    return member.ageGroup === '20대';
                case '30대':
                    return member.ageGroup === '30대';
                case '40대':
                    return member.ageGroup === '40대';
                case '50대':
                    return member.ageGroup === '50대';

                // 유형별
                case '잠재':
                    return member.audience === '잠재';
                case '신규':
                    return member.audience === '신규';
                case '재등록':
                    return member.audience === '재등록';

                // 목적별
                case '골프 입문':
                    return member.golfPurpose === '골프 입문';
                case '스윙 교정':
                    return member.golfPurpose === '스윙 교정';
                case '비거리 향상':
                    return member.golfPurpose === '비거리 향상';
                case '스코어':
                    return member.golfPurpose === '스코어';
                case '숏게임':
                    return member.golfPurpose === '숏게임';
                case '퍼팅':
                    return member.golfPurpose === '퍼팅';
                case '필드':
                    return member.golfPurpose === '필드';
                case '백돌이 탈출':
                    return member.golfPurpose === '백돌이 탈출';

                // 관심상품
                case '레슨':
                    return member.product === '레슨';
                case '타석':
                    return member.product === '타석';

                // 유입경로
                case '네이버':
                    return member.inflowPath === '네이버';
                case '지인추천':
                    return member.inflowPath === '지인추천';
                case '인스타그램':
                    return member.inflowPath === '인스타그램';
                case '입주사':
                    return member.inflowPath === '입주사';
                case '제휴사':
                    return member.inflowPath === '제휴사';
                case '카카오톡 채널':
                    return member.inflowPath === '카카오톡 채널';
                case '당근마켓':
                    return member.inflowPath === '당근마켓';
                case '전단지':
                    return member.inflowPath === '전단지';
                case '외부간판 및 현수막':
                    return member.inflowPath === '외부간판 및 현수막';
                default:
                    return false;
            }
        });
    }

    const handleSubgroupClick = (group, subgroup) => {
        if (group === '전체') {
            setActiveGroups(['전체']);
            setSelectedSubcategory({});
        } else {
            const isActive = activeGroups.includes(group);

            let newActiveGroups = [];

            if (isActive) {
                newActiveGroups = activeGroups.filter((activeGroup) => activeGroup !== group && activeGroup !== '전체');
            } else {
                // if (isMaxReached) {
                //     return
                // }

                newActiveGroups = activeGroups.filter((activeGroup) => activeGroup !== '전체');

                const newItem = subgroup || group;

                if (newActiveGroups.includes(newItem)) {
                    newActiveGroups = newActiveGroups.filter((activeGroup) => activeGroup !== newItem);
                } else {
                    newActiveGroups.push(newItem);
                }
            }

            setActiveGroups(newActiveGroups);

            setSelectedSubcategory((prevSelectedSubcategory) => {
                const updatedSelectedSubcategory = { ...prevSelectedSubcategory };

                if (updatedSelectedSubcategory[group]) {
                    const existingItems = updatedSelectedSubcategory[group];
                    const newItem = subgroup || group;

                    if (!existingItems.includes(newItem)) {
                        existingItems.push(newItem);
                    } else {
                        updatedSelectedSubcategory[group] = existingItems.filter((item) => item !== newItem);
                    }

                    if (updatedSelectedSubcategory[group].length === 0) {
                        delete updatedSelectedSubcategory[group];
                    }
                } else {
                    updatedSelectedSubcategory[group] = [subgroup || group];
                }

                return updatedSelectedSubcategory;
            });
        }
    };

    function isGroupActive(group) {
        return activeGroups.includes(group) ? 'active' : '';
    }

    // useEffect(() => {
    //     if (isMaxReached) {
    //         setShowMessage(true);
    //         const timer = setTimeout(() => {
    //             setShowMessage(false);
    //         }, 2000);

    //         return () => clearTimeout(timer);
    //     }
    // }, [isMaxReached]);

    return (
        <>
            <Card>
                <Card.Body>
                    <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                        <Nav variant="tabs" className="nav-bordered" as="ul">
                            {tabContents.map((tab) => {
                                if (!tab.group || tab.group.length === 0) {
                                    return null;
                                }
                                return (
                                    <Nav.Item key={tab.id} as="li">
                                        <Nav.Link eventKey={tab.title}>{tab.title}</Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>

                        <Tab.Content>
                            {tabContents.map((tab) => {
                                if (!tab.group || tab.group.length === 0) {
                                    return null;
                                }
                                return (
                                    <Tab.Pane eventKey={tab.title} key={tab.id}>
                                        <Row>
                                            <Col sm="12">
                                                <Tab.Container onSelect={() => {}}>
                                                    <div className="d-flex flex-wrap mb-3">
                                                        {tab.group.map((group) =>
                                                            group.subgroup ? (
                                                                <Dropdown key={group.category}>
                                                                    <Dropdown.Toggle
                                                                        variant={
                                                                            selectedSubcategory[group.category]
                                                                                ? 'success'
                                                                                : 'light'
                                                                        }
                                                                        className="rounded-pill me-2 mt-2 p-auto"
                                                                        style={{ padding: '4px 16px' }}>
                                                                        {selectedSubcategory[group.category] ||
                                                                            group.category}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu>
                                                                        {group.subgroup.map((subgroup) => (
                                                                            <Dropdown.Item
                                                                                key={subgroup.subcategory}
                                                                                onClick={() =>
                                                                                    handleSubgroupClick(
                                                                                        group.category,
                                                                                        subgroup.subcategory
                                                                                    )
                                                                                }>
                                                                                {subgroup.subcategory}
                                                                            </Dropdown.Item>
                                                                        ))}
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            ) : (
                                                                <Button
                                                                    key={group.category}
                                                                    variant={
                                                                        activeGroups.includes(group.category)
                                                                            ? 'success'
                                                                            : 'light'
                                                                    }
                                                                    className="rounded-pill me-2 mt-2 p-auto"
                                                                    style={{ padding: '4px 16px' }}
                                                                    onClick={() =>
                                                                        handleSubgroupClick(group.category, null)
                                                                    }>
                                                                    {group.category}
                                                                </Button>
                                                            )
                                                        )}
                                                        {/* {showMessage && (
            <p style={{ paddingTop: '1rem' }} 
                className='fw-normal fs-6 mb-0 align-middle text-danger'
            >
                최대 선택 개수는 10개입니다.
            </p>
        )} */}
                                                    </div>

                                                    <Tab.Content>
                                                        {tabContents.map((tab) => {
                                                            if (!tab.group || tab.group.length === 0) {
                                                                return null;
                                                            }
                                                            return (
                                                                <Tab.Pane eventKey={tab.title} key={tab.id}>
                                                                    <Row>
                                                                        <Col sm="12">
                                                                            <Tab.Container onSelect={() => {}}>
                                                                                <Nav
                                                                                    variant="pills"
                                                                                    className="rounded-nav">
                                                                                    {tab.group.map((group) =>
                                                                                        group.subgroup ? (
                                                                                            <NavDropdown
                                                                                                key={group.category}
                                                                                                title={group.category}
                                                                                                id={`group-dropdown-${group.category}`}>
                                                                                                {group.subgroup.map(
                                                                                                    (subgroup) => (
                                                                                                        <NavDropdown.Item
                                                                                                            key={
                                                                                                                subgroup.subcategory
                                                                                                            }
                                                                                                            eventKey={
                                                                                                                subgroup.subcategory
                                                                                                            }
                                                                                                            onClick={() =>
                                                                                                                handleSubgroupClick(
                                                                                                                    subgroup.subcategory
                                                                                                                )
                                                                                                            }
                                                                                                            className={isGroupActive(
                                                                                                                subgroup.subcategory
                                                                                                            )}>
                                                                                                            {
                                                                                                                subgroup.subcategory
                                                                                                            }
                                                                                                        </NavDropdown.Item>
                                                                                                    )
                                                                                                )}
                                                                                            </NavDropdown>
                                                                                        ) : (
                                                                                            <Nav.Item
                                                                                                key={group.category}>
                                                                                                <Nav.Link
                                                                                                    eventKey={
                                                                                                        group.category
                                                                                                    }
                                                                                                    onClick={() =>
                                                                                                        handleSubgroupClick(
                                                                                                            group.category
                                                                                                        )
                                                                                                    }
                                                                                                    className={isGroupActive(
                                                                                                        group.category
                                                                                                    )}>
                                                                                                    {group.category}
                                                                                                </Nav.Link>
                                                                                            </Nav.Item>
                                                                                        )
                                                                                    )}
                                                                                </Nav>
                                                                            </Tab.Container>
                                                                        </Col>
                                                                    </Row>
                                                                </Tab.Pane>
                                                            );
                                                        })}
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                );
                            })}
                        </Tab.Content>

                        {/* <p>{activeGroups}</p> */}
                        {isLoading ? (
                            <div className="position-relative" style={{ height: '450px' }}>
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <Spinner className="spinner-border-lg" tag="span" color="white" />
                                </div>
                            </div>
                        ) : (
                            <CustomersTableWrap data={filteredMembers} />
                        )}
                    </Tab.Container>
                </Card.Body>
            </Card>
        </>
    );
};

export default CustomersIndex;
