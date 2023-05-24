import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import CardTitle from '../../../components/CardTitle';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderStatus = () => {
    const colors = ['#727cf5', '#fa5c7c','#0acf97'];

    const donutChartData = {
        labels: ['남성', '여성', '기타'],
        datasets: [
            {
                data: [90, 70, 20],
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
                            <i className="mdi mdi-trending-up text-primary mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>90명</span>
                            </h3>
                            <p className="text-muted mb-0">남성</p>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-trending-down text-danger mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>70명</span>
                            </h3>
                            <p className="text-muted mb-0">여성</p>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-trending-down text-success mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>20명</span>
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
