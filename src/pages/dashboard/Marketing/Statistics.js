import React from 'react';
import StatisticsWidget from '../../../components/StatisticsWidget';
import { Col, Row } from 'react-bootstrap';
import { mkData } from './data.js'

const Statistics = () => {
    return (
        <Row>
            {mkData.map((data, index) => {
                return (
                    <Col key={index} xl={4}>
                        <StatisticsWidget 
                            icon=""
                            description={data.title}
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
