import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import HyperDatepicker from '../../../components/Datepicker';
import FormInput from '../../../components/FormInput';
import moment from 'moment';

const SmsTestModal = ({ modal, setModal }) => {
    const [messageType, setMessageType] = useState('sms');
    const [reserveType, setReserveType] = useState(false);
    const [receivingNumber, setReceivingNumber] = useState(['01077778888', '01092933949']);
    const [messageContent, setMessageContent] = useState('');
    const [messageContentBytes, setMessageContentBytes] = useState(50);
    const [reserveDate, setReserveDate] = useState(moment().format('YYYY-MM-DD'));
    const [reserveTime, setReserveTime] = useState(moment().add(5, 'minutes').format('HH:mm'));

    console.log(reserveDate, '  ', reserveTime, 'reserveDateTime');

    const calculateMessageContentBytes = (str) => {
        const encoder = new TextEncoder('utf-8');
        const byteArray = encoder.encode(str);
        console.log(byteArray.length);
        return byteArray.length;
    };

    const limitMessageContent = (content) => {
        const byteLength = calculateMessageContentBytes(content);

        if (byteLength <= messageContentBytes) {
            setMessageContent(content);
        }
    };

    const smsTypeHandler = () => {};

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
                <Modal.Body style={{ display: 'grid', placeItems: 'center', height: '300px' }}>
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
                            <div>
                                {receivingNumber.map((number, index) => {
                                    return <span key={number}>{`${index + 1}. ${number}`}</span>;
                                })}{' '}
                            </div>
                        </div>
                        <div>
                            <div>내용</div>
                            <div>
                                <input
                                    type="text"
                                    value={messageContent}
                                    onChange={(event) => {
                                        limitMessageContent(event.target.value);
                                    }}
                                />
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
                                        min={reserveTime}
                                        onChange={(event) => {
                                            const pickedTime = event.target.value;
                                            if (pickedTime > reserveTime) {
                                                setReserveTime(event.target.value);
                                            } else {
                                                setReserveTime(reserveTime);
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
