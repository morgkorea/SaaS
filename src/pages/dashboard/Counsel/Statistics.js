import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StatisticsWidget from '../../../components/StatisticsWidget';
import { counselData } from './data.js';

const Statistics = () => {
    return (
        <Row>
            {counselData.map((data, index) => {
                return (
                    <Col key={index} xl={6}>
                        <StatisticsWidget 
                            icon="mdi mdi-account-multiple"
                            description={data.title}
                            border={data.border}
                            title={data.title}
                            stats={data.stats}
                            trend={{
                                textClass: `${data.color}`,
                                icon: `mdi mdi-arrow-${data.icon}-bold`,
                                value: `${data.value}`,
                                time: '전달 대비',
                            }}></StatisticsWidget>
                    </Col>
                );
            })}
        </Row>
    );
};

export default Statistics;
