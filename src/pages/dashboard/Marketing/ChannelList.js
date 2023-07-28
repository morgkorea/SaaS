import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { channelData } from './data';

const ChannelList = () => {
    return (
        <Card className="text-center">
            <Card.Body>
                <Row>
                    {channelData.map((data) => {
                        return (
                            <Col>
                                <h5 className='fw-normal mt-0 text-muted'>{data.channel}</h5>
                                <h3 className="dripicons-browser mb-2"></h3>
                                <p className='fw-normal mt-0 text-muted'>노출수</p>
                                <h4>{data.impression}</h4>
                                <p className='fw-normal mt-0 text-muted'>링크 클릭수</p>
                                <h4>{data.linkStats}</h4>
                            </Col>
                        );
                    })}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ChannelList;
