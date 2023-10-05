import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

import FormInput from '../../../components/FormInput';
import FileUploader from '../../../components/FileUploader';
import moment from 'moment';

const SmsTestModal = ({ modal, setModal, checkedMembers }) => {
    console.log(checkedMembers);
    const [messageType, setMessageType] = useState('sms');
    const [reserveType, setReserveType] = useState(false);
    const [receivingMembers, setReceivingMembers] = useState([...checkedMembers]);
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [messageContentBytes, setMessageContentBytes] = useState(90);

    const [reserveDate, setReserveDate] = useState(moment().format('YYYY-MM-DD'));
    const [reserveTime, setReserveTime] = useState(moment().add(5, 'minutes').format('HH:mm'));

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
        console.log('sms sending excuted');
        // "proxy": "https://asia-northeast3-morg-btob-mvp.cloudfunctions.net"

        const messages = checkedMembers.map((member) => {
            const phone = member.phone.relpace('-');
            const subject = messageType !== 'sms' ? messageTitle : '';
            const content = messageContent;
            return {
                to: phone,
                subject: subject,
                content: content,
            };
        });

        const requestData = {
            method: 'POST',
            body: JSON.stringify({
                type: messageType,
                contentType: 'COMM',
                countryCode: '82',
                from: '01071781117',
                subject: '',
                content: '',
                messages: [...messages],
                // messages: [
                //     {
                //         to: '',
                //         subject: '',
                //         content: '',
                //     },
                // ],
                // files: [
                //     {
                //         fileId: '',
                //     },
                // ],
                // reserveTime: 'yyyy-MM-dd HH:mm',
                // reserveTimeZone: 'Asia/Seoul',
            }),
        };

        // try {
        //     await fetch('https://asia-northeast3-morg-btob-mvp.cloudfunctions.net/naverSensSendSMS', {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             type: 'SMS', // SMS, LMS, MMS (소문자 가능)
        //             contentType: 'COMM', // optional  COMM: 일반메시지, AD: 광고메시지, default: COMM
        //             countryCode: '82', // Optional, SENS에서 제공하는 국가로의 발송만 가능, default: 82
        //             from: '01071781117', // Mandatory, 발신번호, 사전 등록된 발신번호만 사용 가능
        //             subject: '기본메시지 제목 TEST', // Optional, LMS, MMS에서만 사용 가능 최대 40byte
        //             content: '기본메시지 내용 TEST', // Mandatory	SMS: 최대 90byte, LMS, MMS: 최대 2000byte
        //             messages: [
        //                 {
        //                     to: '01071781117', // Mandatory(필수), messages.to	수신번호, -를 제외한 숫자만 입력 가능
        //                     subject: 'process.env test', // Optional, messages.subject	개별 메시지 제목, LMS, MMS에서만 사용 가능
        //                     content: '마지막 테스트...', // Optional, messages.content	개별 메시지 내용, SMS: 최대 80byte, LMS, MMS: 최대 2000byte
        //                 },
        //             ],
        //
        //         }),
        //     }).then((response) => console.log(response));
        // } catch (error) {
        //     console.log(error.message);
        // }
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
                <Modal.Header
                    className="border-bottom-0"
                    onHide={() => {
                        setModal(!modal);
                    }}
                    style={{ margin: '12px 0px' }}
                    closeButton>
                    {' '}
                    <h3 className="modal-title">SMS</h3>
                </Modal.Header>
                <Modal.Body style={{ display: 'grid', placeItems: 'center' }}>
                    <div>
                        <div>
                            <div>type</div>{' '}
                            <div>
                                <div>
                                    {' '}
                                    <input
                                        type="radio"
                                        name="messageType"
                                        value="sms"
                                        onChange={(event) => {
                                            setMessageType(event.target.value);
                                        }}
                                        defaultChecked
                                    />{' '}
                                    <span>sms</span>
                                </div>
                                <div>
                                    {' '}
                                    <input
                                        type="radio"
                                        name="messageType"
                                        value="lms"
                                        onChange={(event) => {
                                            setMessageType(event.target.value);
                                        }}
                                    />{' '}
                                    <span>lms</span>
                                </div>
                                <div>
                                    {' '}
                                    <input
                                        type="radio"
                                        name="messageType"
                                        value="mms"
                                        onChange={(event) => {
                                            setMessageType(event.target.value);
                                        }}
                                    />{' '}
                                    <span>mms</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>수신번호</div>
                            <span>{receivingMembers.length}개</span>
                            <div>
                                {receivingMembers.map((number, index) => {
                                    return (
                                        <span key={number.phone}>{`${index + 1}. ${
                                            number.name + ' ' + number.phone
                                        }`}</span>
                                    );
                                })}{' '}
                            </div>
                        </div>
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
                                    dropzoneText="첨부 가능한 파일 확장자는 .jpg, .jpeg 입니다. .jpg, .jpeg 파일이 포함된 압축파일(zip, rar..)은 첨부 되지 않습니다. 첨부파일은 개당 최대 300 KB의 제한이 있으며, 총 3장으로 제한됩니다."
                                />
                            </div>
                        )}
                        {messageType !== 'sms' && (
                            <div>
                                <div>제목</div>
                                <div>
                                    <input
                                        type="text"
                                        name="messageTitle"
                                        value={messageTitle}
                                        min="40"
                                        onChange={(event) => {
                                            limitMessageBytes(event);
                                        }}
                                    />
                                </div>
                                <span>{calculateMessageContentBytes(messageTitle)}/40bytes</span>
                            </div>
                        )}
                        <div>
                            <div>
                                <span>내용</span>
                                <div>
                                    <input
                                        type="text"
                                        name="messageContent"
                                        value={messageContent}
                                        onChange={(event) => {
                                            limitMessageBytes(event);
                                        }}
                                    />
                                </div>
                                <span>
                                    {calculateMessageContentBytes(messageContent)}/{messageContentBytes}bytes
                                </span>
                            </div>
                        </div>
                        <div>
                            <div>발송설정</div>
                            <div>
                                <input
                                    type="radio"
                                    name="reserve"
                                    value="immediateMessage"
                                    onChange={(event) => {
                                        setReserveType(false);
                                    }}
                                    defaultChecked
                                />
                                <span>즉시발송</span>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="reserve"
                                    value="reserveMessage"
                                    onChange={(event) => {
                                        setReserveType(true);
                                    }}
                                />
                                <span>예약발송</span>
                            </div>
                            {reserveType && (
                                <div>
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
                                        min={moment().add(5, 'minutes').format('HH:mm')}
                                        onChange={(event) => {
                                            const pickedTime = event.target.value;
                                            if (pickedTime > reserveTime) {
                                                setReserveTime(event.target.value);
                                            } else {
                                                setReserveTime(moment().add(5, 'minutes').format('HH:mm'));
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SmsTestModal;
