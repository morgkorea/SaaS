import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import CardTitle from '../../../components/CardTitle';

const GenderStatus = ({ members }) => {
    let man = 0;
    let woman = 0;
    let junior = 0;

    members.forEach((member) => {
        if (member.sex === '남성') {
            return man++;
        } else if (member.sex === '여성') {
            return woman++;
        } else {
            return junior++;
        }
    });

    const colors = ['#727cf5', '#fa5c7c', '#0acf97'];
    const donutChartData = {
        labels: ['남성', '여성', '주니어'],
        datasets: [
            {
                data: [man, woman, junior],
                backgroundColor: colors,
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
                    containerClass="d-flex align-items-center justify-content-between"
                    title="성별 추이"
                    menuItems={[
                        { label: 'Weekly Report' },
                        { label: 'Monthly Report' },
                        { label: 'Action' },
                        { label: 'Settings' },
                    ]}
                />

                <div className="my-4" style={{ height: '180px' }}>
                    <Doughnut data={donutChartData} options={donutChartOpts} />
                </div>

                <Row className="text-center mt-2 py-2">
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-primary mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{man}명</span>
                            </h3>
                            <p className="text-muted mb-0">남성</p>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-danger mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{woman}명</span>
                            </h3>
                            <p className="text-muted mb-0">여성</p>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-success mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{junior}명</span>
                            </h3>
                            <p className="text-muted mb-0">주니어</p>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default GenderStatus;
