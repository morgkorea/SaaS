import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import CardTitle from '../../../components/CardTitle';

ChartJS.register(ArcElement, Tooltip, Legend);

const LocationStatus = ({ members }) => {
    const totalMembers = members.length;
    const locationCounts = members.reduce((acc, member) => {
        const {location} = member;
        acc[location === '자택' ? 'home' : location === '직장' ? 'office' : 'etc']++;
        return acc;
    }, {home: 0, office: 0, etc: 0})

    const colors = ['#727cf5', '#fa5c7c', '#0acf97'];

    const donutChartData = {
        labels: ['자택', '직장', '기타'],
        datasets: [
            {
                data: totalMembers === 0 ? [1, 1, 1] : [locationCounts.home, locationCounts.office, locationCounts.etc],
                backgroundColor: totalMembers === 0 ? ['#F5F5F5', '#F5F5F5', '#F5F5F5'] : colors,
                borderColor: 'transparent',
                borderWidth: '3',
            },
        ],
    };

    const donutChartOpts = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        cutout: '80%',
    };

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between py-1"
                    title="위치 추이"
                />

                <div className="my-4" style={{ height: '180px' }}>
                    <Doughnut data={donutChartData} options={donutChartOpts} />
                </div>

                <Row className="text-center mt-2 py-2">
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank mt-3 h3"  style={{color: '#727cf5'}}></i>
                            <h3 className="fw-normal">
                                <span>{locationCounts.home}명</span>
                            </h3>
                            <p className="text-muted mb-0">자택</p>
                        </div>
                    </Col>

                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-danger mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{locationCounts.office}명</span>
                            </h3>
                            <p className="text-muted mb-0">직장</p>
                        </div>
                    </Col>

                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-primary mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{locationCounts.etc}명</span>
                            </h3>
                            <p className="text-muted mb-0">기타</p>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default LocationStatus;
