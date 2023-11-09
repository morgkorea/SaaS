import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

import FormInput from '../../../components/FormInput';
import FileUploader from '../../../components/FileUploader';
import moment from 'moment';

const SmsTestModal = ({ modal, setModal, checkedMembers }) => {
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

        // try {
        //     await fetch('https://asia-northeast3-morg-btob-mvp.cloudfunctions.net/naverSensSendSMS', {
        //         method: 'POST',
        //         body: JSON.stringify({ ...requestData }),
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
                                {/* <div>
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
                                </div> */}
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
                                    removeDuplicatedFiles={true}
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
                                        min={moment().add(11, 'minutes').format('HH:mm')}
                                        onChange={(event) => {
                                            const pickedTime = event.target.value;
                                            const currentTime = moment().add(11, 'minutes').format('HH:mm');
                                            if (pickedTime > currentTime) {
                                                setReserveTime(event.target.value);
                                            } else {
                                                setReserveTime(moment().add(11, 'minutes').format('HH:mm'));
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <Button onClick={smsSending}>보내기</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SmsTestModal;
