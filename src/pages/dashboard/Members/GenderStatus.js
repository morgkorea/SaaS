import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import CardTitle from '../../../components/CardTitle';

const GenderStatus = ({ members }) => {
    const totalMembers = members.length;
    const genderCounts = members.reduce((acc, member) => {
        const { sex } = member;
        acc[sex === '남성' ? 'man' : sex === '여성' ? 'woman' : 'etc']++;
        return acc;
    }, { man: 0, woman: 0, etc: 0 });

    const colors = ['#727cf5', '#fa5c7c', '#0acf97'];
    const donutChartData = {
        labels: ['남성', '여성', '기타'],
        datasets: [
            {
                data: totalMembers === 0 ? [1, 1, 1] : [genderCounts.man, genderCounts.woman, genderCounts.etc],
                backgroundColor: totalMembers === 0 ? ['#F5F5F5', '#F5F5F5', '#F5F5F5'] : colors,
                borderColor: 'transparent',
                borderWidth: '2',
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
                    title="성별 추이"
                />
                <div className="my-4" style={{ height: '180px' }}>
                    <Doughnut data={donutChartData} options={donutChartOpts} />
                </div>
                <Row className="text-center mt-2 py-2">
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank mt-3 h3" style={{color: '#727cf5'}}></i>
                            <h3 className="fw-normal">
                                <span>{genderCounts.man}명</span>
                            </h3>
                            <p className="text-muted mb-0">남성</p>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-danger mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{genderCounts.woman}명</span>
                            </h3>
                            <p className="text-muted mb-0">여성</p>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-success mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{genderCounts.etc}명</span>
                            </h3>
                            <p className="text-muted mb-0">기타</p>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default GenderStatus;
