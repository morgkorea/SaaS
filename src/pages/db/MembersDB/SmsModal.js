import { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';

import FormInput from '../../../components/FormInput';
import FileUploader from '../../../components/FileUploader';
import moment from 'moment';

const SmsModal = ({ modal, setModal, checkedMembers }) => {
    const [smsModalStep, setSmsModalStep] = useState(1);
    const [messageType, setMessageType] = useState('sms');
    const [reserveType, setReserveType] = useState(false);
    const [receivingMembers, setReceivingMembers] = useState([...checkedMembers]);
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [messageContentBytes, setMessageContentBytes] = useState(90);

    const [reserveDate, setReserveDate] = useState(moment().format('YYYY-MM-DD'));
    const [reserveTime, setReserveTime] = useState(moment().add(11, 'minutes').format('HH:mm'));

    const [uploadFiles, setUploadFiles] = useState([]);

    const calculateMessageContentBytes = (str) => {
        const encoder = new TextEncoder('utf-8');
        const byteArray = encoder.encode(str);
        return byteArray.length;
    };

    const limitMessageBytes = (event) => {
        const content = event.target.value;
        const name = event.target.name;
        const byteLength = calculateMessageContentBytes(content);

        if (name === 'messageTitle' && byteLength <= 40) {
            setMessageTitle(content);
        }

        if (name === 'messageContent' && byteLength <= messageContentBytes) {
            setMessageContent(content);
        }
    };

    const smsSending = async () => {
        // "proxy": "https://asia-northeast3-morg-btob-mvp.cloudfunctions.net"
        const messages = checkedMembers.map((member) => {
            const phone = member.phone.replace(/-/g, '');
            return {
                to: phone,
                subject: messageTitle,
                content: messageContent,
            };
        });

        const requestData = {
            type: messageType,
            from: '01071781117',
            content: messageContent,
            messages: [...messages],
        };

        if (reserveType) {
            const minimumReserveTime = moment().add(11, 'minutes').format('HH:mm');

            if (reserveTime < minimumReserveTime) {
                alert('예약 발송시간을 현재시간보다 11분뒤로 설정해주세요');
                setReserveTime(moment().add(11, 'minutes').format('HH:mm'));
                return;
            } else {
                requestData['reserveTime'] = `${reserveDate} ${reserveTime}`;
                requestData['reserveTimeZone'] = 'Asia/Seoul';
            }
        }

        //=======================================MMS 파일첨부=========================================================
        // const uploadImageFiles = uploadFiles?.map((file) => {
        //     if (file.name) {
        //         console.log('file : ', file);
        //     }
        // });

        // // blob 데이터 base64 인코딩 문자열  변환
        // const encodedBase64 = [...uploadImageFiles].map((file) => {
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         const base64Data = reader.result;
        //         console.log(base64Data);
        //     };
        //     reader.readAsDataURL(file);
        // });
        //=========================================================================================================

        try {
            await fetch('https://asia-northeast3-morg-btob-mvp.cloudfunctions.net/naverSensSendSMS', {
                method: 'POST',
                body: JSON.stringify({ ...requestData }),
            }).then((response) => console.log(response));
            setSmsModalStep(2);
        } catch (error) {
            alert(error.message);
            console.log('문자 송신 오류');
        }

        setSmsModalStep(2);
    };

    const generateByteLimitMessage = (smsType) => {
        switch (smsType) {
            case 'sms':
                return '90byte 이내의 내용을 포함하는 메시지를 발송할 수 있습니다.';
            case 'lms':
                return '40byte 이내의 제목과 2000byte 이내의 내용을 포함하는 메시지를 발송할 수 있습니다.';
            case 'mms':
                return '40byte 이내의 제목과 2000byte 이내의 내용, 300kbyte 이내의 이미지 파일을 포함하는 메시지를 발송할 수 있습니다.';

            default:
                return '90byte 이내의 내용을 포함하는 메시지를 발송할 수 있습니다.';
        }
    };

    useEffect(() => {
        switch (messageType) {
            case 'sms':
                return setMessageContentBytes(90);
            case 'lms':
                return setMessageContentBytes(2000);
            case 'mms':
                return setMessageContentBytes(2000);
        }
    }, [messageType]);

    return (
        <>
            <Modal
                show={modal}
                onHide={() => {
                    setModal(!modal);
                }}
                size={'lg'}
                centered={true}>
                {smsModalStep === 1 && (
                    <div>
                        <Modal.Header
                            className="border-bottom-0"
                            onHide={() => {
                                setModal(!modal);
                            }}
                            style={{ margin: '12px 0px' }}
                            closeButton>
                            {' '}
                            <h3 className="modal-title">{messageType.toUpperCase()}</h3>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ display: 'grid', gap: '4px' }}>
                                <Row style={{ marginBottom: '12px' }}>
                                    <Col xs={3} style={{ padding: '6px 8px' }}>
                                        Type
                                    </Col>{' '}
                                    <Col xs={9} style={{ padding: '0px 8px' }}>
                                        <Form style={{ display: 'flex', gap: '20px' }}>
                                            <Form.Group style={{ display: 'flex', placeItem: 'center', gap: '4px' }}>
                                                {' '}
                                                <Form.Check
                                                    type="radio"
                                                    name="messageType"
                                                    value="sms"
                                                    label="SMS"
                                                    onChange={(event) => {
                                                        setMessageType(event.target.value);
                                                    }}
                                                    defaultChecked
                                                />{' '}
                                            </Form.Group>
                                            <Form.Group style={{ display: 'flex', placeItem: 'center', gap: '4px' }}>
                                                {' '}
                                                <Form.Check
                                                    type="radio"
                                                    name="messageType"
                                                    value="lms"
                                                    label="LMS"
                                                    onChange={(event) => {
                                                        setMessageType(event.target.value);
                                                    }}
                                                />{' '}
                                            </Form.Group>
                                        </Form>
                                        <div style={{ color: '#AAAAAA', marginTop: '4px' }}>
                                            {generateByteLimitMessage(messageType)}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    {' '}
                                    <Col xs={3} style={{ padding: '6px 8px' }}>
                                        수신번호
                                    </Col>
                                    <Col
                                        xs={9}
                                        style={{
                                            padding: '0px 8px',
                                        }}>
                                        {' '}
                                        <div style={{ marginBottom: '5px' }}>{receivingMembers.length}건</div>
                                        <div style={{ maxheight: '500px', overFlow: 'scroll' }}>
                                            {receivingMembers.map((number, index) => {
                                                return (
                                                    <div key={number.phone} style={{ marginBottom: '2px' }}>{`${
                                                        index + 1
                                                    }. ${number.name + ' ' + number.phone}`}</div>
                                                );
                                            })}{' '}
                                        </div>
                                    </Col>
                                </Row>

                                {messageType === 'mms' && (
                                    <div>
                                        <FileUploader
                                            onFileUpload={(files) => {
                                                setUploadFiles(files);
                                            }}
                                            accept="image/jpeg, image/jpeg"
                                            maxFiles={3}
                                            maxSize={30000}
                                            filenameMaxLength={40}
                                            showPreview={true}
                                            removeDuplicatedFiles={true}
                                            dropzoneText="첨부 가능한 파일 확장자는 .jpg, .jpeg 입니다. .jpg, .jpeg 파일이 포함된 압축파일(zip, rar..)은 첨부 되지 않습니다. 첨부파일은 개당 최대 300 KB의 제한이 있으며, 총 3장으로 제한됩니다."
                                        />
                                    </div>
                                )}
                                {messageType !== 'sms' && (
                                    <Row>
                                        <Col xs={3} style={{ padding: '6px 8px' }}>
                                            제목
                                        </Col>
                                        <Col
                                            xs={9}
                                            style={{
                                                padding: '0px 8px',
                                            }}>
                                            <input
                                                type="text"
                                                name="messageTitle"
                                                value={messageTitle}
                                                min="40"
                                                onChange={(event) => {
                                                    limitMessageBytes(event);
                                                }}
                                            />
                                            <span>{' ' + calculateMessageContentBytes(messageTitle)}/40bytes</span>
                                        </Col>
                                    </Row>
                                )}
                                <Row>
                                    <Col xs={3} style={{ padding: '6px 8px' }}>
                                        내용
                                    </Col>
                                    <Col
                                        xs={9}
                                        style={{
                                            padding: '0px 8px',
                                        }}>
                                        <textarea
                                            type="text"
                                            name="messageContent"
                                            value={messageContent}
                                            onChange={(event) => {
                                                limitMessageBytes(event);
                                            }}
                                            style={{
                                                width: '80%',
                                                height: '80px',
                                            }}
                                        />

                                        <span>
                                            {' ' + calculateMessageContentBytes(messageContent)}/{messageContentBytes}
                                            bytes
                                        </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={3} style={{ padding: '6px 8px' }}>
                                        발송설정
                                    </Col>
                                    <Col
                                        xs={9}
                                        style={{
                                            display: 'flex',
                                            placeItems: 'center',
                                            padding: '0px 8px',
                                            gap: '10px',
                                        }}>
                                        <Form.Group style={{ display: 'flex', placeItem: 'center', gap: '4px' }}>
                                            <Form.Check
                                                type="radio"
                                                name="reserve"
                                                value="immediateMessage"
                                                onChange={(event) => {
                                                    setReserveType(false);
                                                }}
                                                defaultChecked
                                            />
                                            <div>즉시발송</div>
                                        </Form.Group>
                                        <Form.Group style={{ display: 'flex', placeItem: 'center', gap: '4px' }}>
                                            <Form.Check
                                                type="radio"
                                                name="reserve"
                                                value="reserveMessage"
                                                onChange={(event) => {
                                                    setReserveType(true);
                                                }}
                                            />
                                            <span>예약발송</span>
                                        </Form.Group>

                                        <Row>
                                            {reserveType && (
                                                <div style={{ display: 'flex' }}>
                                                    {' '}
                                                    <FormInput
                                                        type="date"
                                                        name="reserveDate"
                                                        value={reserveDate}
                                                        min={moment().format('YYYY-MM-DD')}
                                                        onChange={(event) => {
                                                            setReserveDate(event.target.value);
                                                        }}
                                                    />
                                                    <FormInput
                                                        type="time"
                                                        name="reserveTime"
                                                        value={reserveTime}
                                                        min={moment().add(11, 'minutes').format('HH:mm')}
                                                        onChange={(event) => {
                                                            const pickedTime = event.target.value;
                                                            const currentTime = moment()
                                                                .add(11, 'minutes')
                                                                .format('HH:mm');
                                                            if (pickedTime > currentTime) {
                                                                setReserveTime(event.target.value);
                                                            } else {
                                                                setReserveTime(
                                                                    moment().add(11, 'minutes').format('HH:mm')
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </Row>
                                    </Col>
                                </Row>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '30px 0px',
                                    }}>
                                    <Button onClick={smsSending}>보내기</Button>
                                    <Button
                                        onclick={() => {
                                            setModal(!modal);
                                        }}>
                                        취소
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </div>
                )}
                {smsModalStep === 2 && (
                    <div>
                        문자발송완료{' '}
                        <Button
                            onClick={() => {
                                setModal(!modal);
                            }}>
                            닫기
                        </Button>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default SmsModal;
