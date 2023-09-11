import React, { useEffect } from 'react';
import { Card, Col, Nav, NavDropdown, Row, Tab } from 'react-bootstrap';
import { useState } from 'react';
import data from './tabContents';
import CustomersTableWrap from './CustomersTableWrap';
import { firestoreDB } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { query } from 'firebase/database';

const CustomersIndex = () => {
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [tabContents, setTabContents] = useState(data);
    const [activeTab, setActiveTab] = useState('전체회원');
    const [activeGroup, setActiveGroup] = useState('전체');
    
    const email = useSelector((state) => state.Auth?.user.email);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(firestoreDB, 'Users', email, 'Members'));
            const querySnapshot = await getDocs(q);
            const members = [];

            querySnapshot.forEach((doc) => {
                const memberData = doc.data();
                if (applyTitleFilter(memberData, activeTab) && applyGroupFilter(memberData, activeGroup)) {
                    members.push(memberData);
                }
            });

            setFilteredMembers(members);
        };

        fetchData();
    }, [activeTab, activeGroup, email])

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

    function applyGroupFilter(member, groupFilter) {
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
    }

    const handleSubgroupClick = (subcategory) => {
        setActiveGroup(subcategory);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                        <Nav variant="tabs" className="nav-bordered" as="ul">
                            {data.map((tab) => {
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
                        <Tab.Container activeKey={activeGroup} onSelect={(key) => setActiveGroup(key)}>
                            <Nav variant="pills" className="rounded-nav">
                                {tab.group.map((group) =>
                                    group.subgroup ? (
                                        <NavDropdown
                                            key={group.category}
                                            title={group.category}
                                            id={`group-dropdown-${group.category}`}>
                                            {group.subgroup.map((subgroup) => (
                                                <NavDropdown.Item
                                                    key={subgroup.subcategory}
                                                    eventKey={subgroup.subcategory}
                                                    onClick={() =>handleSubgroupClick(subgroup.subcategory)}
                                                >
                                                    {subgroup.subcategory}
                                                </NavDropdown.Item>
                                            ))}
                                        </NavDropdown>
                                    ) : (
                                        <Nav.Item key={group.category}>
                                            <Nav.Link eventKey={group.category} onClick={() => setActiveGroup(group.category)}>
                                                {group.category}
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                )}
                            </Nav>
                            <Tab.Content>
                                {tab.group.map((group, groupIndex) =>
                                    group.subgroup ? (
                                        <>
                                            {group.subgroup.map((subgroup) => (
                                                <Tab.Pane key={subgroup.subcategory} eventKey={subgroup.subcategory}>
                                                    <Row>
                                                        <Col sm="12">
                                                            <CustomersTableWrap data={filteredMembers} />
                                                        </Col>
                                                    </Row>
                                                </Tab.Pane>
                                            ))}
                                        </>
                                    ) : 
                                    <Tab.Pane
                                        eventKey={group.category}
                                        id={groupIndex}
                                        key={groupIndex}
                                    >
                                        <Row>
                                            <Col sm="12">
                                                <CustomersTableWrap data={filteredMembers} />
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                )}
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Tab.Pane>
        );
    })}
</Tab.Content>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </>
    );
};

export default CustomersIndex;
