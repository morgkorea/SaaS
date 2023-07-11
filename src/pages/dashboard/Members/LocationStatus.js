import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import CardTitle from '../../../components/CardTitle';

ChartJS.register(ArcElement, Tooltip, Legend);

const LocationStatus = ({ members }) => {
    let home = 0;
    let office = 0;
    let etc = 0;

    function gender() {
        members.map((user) => {
            if (user.location === '자택') {
                return home++;
            } else if (user.location === '직장') {
                return office++;
            } else {
                return etc++;
            }
        });
    }
    gender();

    const colors = ['#0acf97', '#727cf5', '#fa5c7c'];

    const donutChartData = {
        labels: ['자택', '직장', '기타'],
        datasets: [
            {
                data: [home, office, etc],
                backgroundColor: colors,
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
                    containerClass="d-flex align-items-center justify-content-between"
                    title="위치 추이"
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
                            <i className="mdi mdi-checkbox-blank text-success mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{home}</span>
                            </h3>
                            <p className="text-muted mb-0">자택</p>
                        </div>
                    </Col>

                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-primary mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{office}</span>
                            </h3>
                            <p className="text-muted mb-0">직장</p>
                        </div>
                    </Col>

                    <Col sm={4}>
                        <div className="my-2 my-sm-0">
                            <i className="mdi mdi-checkbox-blank text-danger mt-3 h3"></i>
                            <h3 className="fw-normal">
                                <span>{etc}</span>
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
