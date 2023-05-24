import React from 'react';
import { Card } from 'react-bootstrap';

const Statistics = () => {
    return (
        <>
            <Card className="tilebox-one" style={{ height: '186px' }}>
                <Card.Body>
                    <i className="uil uil-users-alt float-end"></i>
                    <h6 className="text-uppercase mt-0">전체회원</h6>
                    <h2 className="my-2" id="active-users-count">
                        121명
                    </h2>
                    <p className="mb-0 text-muted">
                        <span className="text-success me-2">
                            25명 <span className="mdi mdi-arrow-up-bold"></span>
                        </span>
                        <span className="text-nowrap">전달 대비</span>
                    </p>
                </Card.Body>
            </Card>

            <Card className="tilebox-one" style={{ height: '186px' }}>
                <Card.Body>
                    <i className="uil uil-window-restore float-end"></i>
                    <h6 className="text-uppercase mt-0">기간 만료 회원</h6>
                    <h2 className="my-2" id="active-users-count">
                        12명
                    </h2>
                    <p className="mb-0 text-muted">
                        <span className="text-nowrap">확인하기</span>
                    </p>
                </Card.Body>
            </Card>
        </>
    );
};

export default Statistics;
